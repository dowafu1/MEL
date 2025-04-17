import json
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from fastapi.responses import JSONResponse
from app.services.image_service import upload_image
from app.services.firestore_service import save_image_metadata, get_all_items, get_item_by_id

router = APIRouter()

@router.post('/items')
async def add_item(
    files: list[UploadFile] = File(...),  # Принимаем список файлов
    defectTypes: str = Form(...),          # JSON-строка с типами дефектов
):
    try:
        # Загружаем все изображения
        image_urls = []
        for file in files:
            image_url = await upload_image(file)  # Загружаем каждый файл
            image_urls.append(image_url)
        
        # Разбираем JSON с дефектами
        defects = json.loads(defectTypes)
        
        # Сохраняем метаданные
        data = await save_image_metadata(image_urls, defects)
        return JSONResponse(content=data, status_code=201)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка загрузки: {str(e)}")
    
@router.get('/items')
async def fetch_all():
    return JSONResponse(content=await get_all_items())

@router.get('/items/{item_id}')
async def fetch_item(item_id: str):
    return JSONResponse(content=await get_item_by_id(item_id))
