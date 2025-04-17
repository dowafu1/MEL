import uuid
from datetime import datetime
from fastapi import HTTPException
from core.config import db
from typing import Optional, List, Dict

async def save_image_metadata(image_url: str, description: str, image_id: Optional[str] = None) -> dict:
    try:
        image_id = image_id or str(uuid.uuid4())
        doc_ref = db.collection('images').document(image_id)
        data = {
            'id': image_id,
            'url': image_url,
            'description': description,
            'created_at': datetime.utcnow().isoformat()
        }
        doc_ref.set(data)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail="Ошибка сохранения метаданных")

async def get_all_items() -> List[Dict]:
    try:
        docs = db.collection('images').stream()
        return [doc.to_dict() for doc in docs]
    except Exception as e:
        raise HTTPException(status_code=500, detail="Ошибка получения данных")

async def get_item_by_id(item_id: str) -> Dict:
    try:
        doc = db.collection('images').document(item_id).get()
        if doc.exists:
            return doc.to_dict()
        raise HTTPException(status_code=404, detail="Элемент не найден")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Ошибка сервера")
