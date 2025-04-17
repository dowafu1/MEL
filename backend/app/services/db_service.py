import sqlite3
import uuid
from datetime import datetime
from typing import List, Dict
from fastapi import HTTPException
from app.core.config import DB_PATH
import logging
import json

logger = logging.getLogger(__name__)

async def save_image_metadata(image_url: str, description: str, defect_types: List[str], image_id: str = None) -> Dict:
    """Save image metadata to SQLite database."""
    try:
        image_id = image_id or str(uuid.uuid4())
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            
            cursor.execute(
                """
                INSERT INTO images (id, url, description, defect_types, created_at)
                VALUES (?, ?, ?, ?, ?)
                """,
                (image_id, image_url, description, json.dumps(defect_types), datetime.utcnow().isoformat())
            )
            
            conn.commit()
        
        data = {
            "id": image_id,
            "url": image_url,
            "description": description,
            "created_at": datetime.utcnow().isoformat(),
            "defect_types": defect_types
        }
        logger.info(f"Image metadata saved: {image_id}")
        return data

    except Exception as e:
        logger.error(f"Error saving metadata: {str(e)}")
        raise HTTPException(status_code=500, detail="Error saving metadata")

async def get_all_items() -> List[Dict]:
    """Retrieve all image metadata from SQLite database."""
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            
            cursor.execute("SELECT * FROM images")
            rows = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]
            
            results = []
            for row in rows:
                result = dict(zip(columns, row))
                result["defect_types"] = json.loads(result["defect_types"] or "[]")
                results.append(result)
        
        logger.info(f"Retrieved {len(results)} images")
        return results

    except Exception as e:
        logger.error(f"Error fetching all items: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching data")

async def get_item_by_id(item_id: str) -> Dict:
    """Retrieve image metadata by ID from SQLite database."""
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            
            cursor.execute("SELECT * FROM images WHERE id = ?", (item_id,))
            row = cursor.fetchone()
            
            if not row:
                logger.warning(f"Image not found: {item_id}")
                raise HTTPException(status_code=404, detail="Image not found")
            
            columns = [desc[0] for desc in cursor.description]
            result = dict(zip(columns, row))
            result["defect_types"] = json.loads(result["defect_types"] or "[]")
        
        logger.info(f"Retrieved image: {item_id}")
        return result

    except Exception as e:
        logger.error(f"Error fetching image {item_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching image")