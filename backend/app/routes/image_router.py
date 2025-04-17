from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
from app.services.image_service import upload_image
from app.services.db_service import save_image_metadata, get_all_items, get_item_by_id
from app.models.image import ImageResponse
import logging
import json
from typing import List

router = APIRouter(prefix="/items", tags=["images"])
logger = logging.getLogger(__name__)

@router.post("/", response_model=List[ImageResponse])
async def add_item(
    files: list[UploadFile] = File(...),
    defectTypes: str = Form(...),
):
    """Upload images and save metadata for each."""
    try:
        # Log input for debugging
        logger.debug(f"Received defectTypes: {defectTypes}")

        # Check if defectTypes is empty or invalid
        if not defectTypes or defectTypes.strip() == "":
            logger.error("defectTypes is empty or missing")
            raise HTTPException(status_code=400, detail="defectTypes cannot be empty")

        # Parse and validate JSON
        try:
            defect_types = json.loads(defectTypes)
        except json.JSONDecodeError as e:
            logger.error(f"Invalid JSON in defectTypes: {str(e)}")
            raise HTTPException(status_code=400, detail=f"Invalid JSON in defectTypes: {str(e)}")

        # Validate that defect_types is a list
        if not isinstance(defect_types, list):
            logger.error(f"Invalid defect_types format: expected list, got {type(defect_types)}")
            raise HTTPException(status_code=400, detail="defectTypes must be a list")

        # Upload images and save metadata
        results = []
        for file in files:
            url = await upload_image(file)
            data = await save_image_metadata(
                image_url=url,
                description=None,
                defect_types=defect_types
            )
            results.append(data)
        
        logger.info(f"Created {len(results)} items")
        return JSONResponse(content=results, status_code=201)

    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error creating item: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error creating item: {str(e)}")

@router.get("/", response_model=List[ImageResponse])
async def fetch_all():
    """Retrieve all images."""
    return JSONResponse(content=await get_all_items())

@router.get("/{item_id}", response_model=ImageResponse)
async def fetch_item(item_id: str):
    """Retrieve an image by ID."""
    return JSONResponse(content=await get_item_by_id(item_id))