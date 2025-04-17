from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.responses import JSONResponse
from google.cloud import firestore, storage
import os
import logging
import uuid
from datetime import datetime


# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Инициализация Firestore и Cloud Storage
try:
    db = firestore.Client.from_service_account_json('credentials/service.json')
    storage_client = storage.Client.from_service_account_json('credentials/service.json')
    bucket = storage_client.bucket('teamit-fd85a.appspot.com')  # Убрал gs:// из названия
except Exception as e:
    logger.error(f"Ошибка инициализации Firestore и Cloud Storage: {e}")
    raise HTTPException(status_code=500, detail="Internal Server Error")


async def upload_image(image_file: UploadFile) -> str:
    """Загружает изображение в Cloud Storage и возвращает URL"""
    try:
        # Проверяем, что файл не пустой
        if not image_file.filename:
            raise ValueError("Не указано имя файла")

        # Генерируем уникальное имя файла
        file_ext = os.path.splitext(image_file.filename)[1]
        file_name = f"{uuid.uuid4()}{file_ext}"

        # Загружаем файл
        blob = bucket.blob(f'5/{file_name}')

        # Важно: сбрасываем указатель файла на начало
        await image_file.seek(0)

        # Загружаем содержимое файла
        blob.upload_from_string(await image_file.read(), content_type=image_file.content_type)

        # Делаем файл публичным (если нужно)
        blob.make_public()

        # Получаем публичный URL
        image_url = blob.public_url

        logger.info(f"Изображение загружено: {image_url}")
        return image_url

    except Exception as e:
        logger.error(f"Ошибка загрузки: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Не удалось загрузить изображение: {str(e)}"
        )
    
async def save_image_metadata(image_url: str, description: str, image_id: str = None) -> dict:
    """Сохраняет метаданные изображения в Firestore"""
    try:
        # Если image_id не указан, генерируем новый
        if not image_id:
            image_id = str(uuid.uuid4())

        doc_ref = db.collection('images').document(image_id)
        data = {
            'url': image_url,
            'description': description,
            'id': image_id,
             'created_at': datetime.utcnow().isoformat()  
        }
        doc_ref.set(data)

        logger.info(f"Метаданные сохранены с ID: {image_id}")
        return data
    except Exception as e:
        logger.error(f"Ошибка сохранения метаданных: {e}")
        raise HTTPException(status_code=500, detail="Ошибка сохранения данных")

# Эндпоинты
@app.post('/items')
async def add_item(
        image: UploadFile = File(..., description="Файл изображения"),
        description: str = Form(..., min_length=3, max_length=500),
        image_id: str = Form(None)
):
    """
    Добавляет новый элемент с изображением

    - **image**: файл изображения (JPEG, PNG)
    - **description**: описание изображения (3-500 символов)
    - **image_id**: (опционально) если не указан, будет сгенерирован автоматически
    """
    try:
        image_url = await upload_image(image)
        item_data = await save_image_metadata(image_url, description, image_id)
        return JSONResponse(content=item_data, status_code=201)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Ошибка добавления элемента: {e}")
        raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")


@app.get('/items')
async def get_items():
    """Получает список всех элементов"""
    try:
        docs = db.collection('images').stream()
        items = []
        for doc in docs:
            item = doc.to_dict()
            # Проверяем тип поля created_at
            if 'created_at' in item and isinstance(item['created_at'], datetime):
                item['created_at'] = item['created_at'].isoformat()  # Преобразуем в строку
            items.append(item)
        return JSONResponse(content=items)
    except Exception as e:
        logger.error(f"Ошибка получения списка: {e}")
        raise HTTPException(status_code=500, detail="Ошибка получения данных")




@app.get('/items/{item_id}')
async def get_item(item_id: str):
    """Получает элемент по ID"""
    try:
        doc = db.collection('images').document(item_id).get()
        if doc.exists:
            return JSONResponse(content=doc.to_dict())
        raise HTTPException(status_code=404, detail="Элемент не найден")
    except Exception as e:
        logger.error(f"Ошибка получения элемента: {e}")
        raise HTTPException(status_code=500, detail="Ошибка сервера")


@app.get("/")
async def root():
    return {"message": "Добро пожаловать в API!"}


if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app, host='127.0.0.1', port=8000)