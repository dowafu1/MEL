import os
import uuid
from fastapi import UploadFile, HTTPException
from core.config import bucket

async def upload_image(image_file: UploadFile) -> str:
    try:
        if not image_file.filename:
            raise ValueError("Не указано имя файла")
        
        ext = os.path.splitext(image_file.filename)[1]
        name = f"{uuid.uuid4()}{ext}"
        blob = bucket.blob(f"5/{name}")
        
        await image_file.seek(0)
        blob.upload_from_string(await image_file.read(), content_type=image_file.content_type)
        blob.make_public()
        
        return blob.public_url
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка загрузки: {str(e)}")
