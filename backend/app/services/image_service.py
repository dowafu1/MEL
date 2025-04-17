import os
import uuid
import logging
from fastapi import UploadFile, HTTPException
from app.core.config import UPLOAD_DIR, ALLOWED_EXTENSIONS, MAX_FILE_SIZE
from pathlib import Path

logger = logging.getLogger(__name__)

async def upload_image(image_file: UploadFile) -> str:
    """Upload an image to local storage and return its URL."""
    try:
        # Validate file extension
        ext = Path(image_file.filename).suffix.lower()
        if ext not in ALLOWED_EXTENSIONS:
            logger.error(f"Invalid file extension: {ext}")
            raise HTTPException(status_code=400, detail="Invalid file extension")

        # Validate file size
        await image_file.seek(0)
        size = len(await image_file.read())
        if size > MAX_FILE_SIZE:
            logger.error(f"File too large: {size} bytes")
            raise HTTPException(status_code=400, detail="File too large")

        # Generate unique filename
        filename = f"{uuid.uuid4()}{ext}"
        file_path = UPLOAD_DIR / filename

        # Save file
        await image_file.seek(0)
        with open(file_path, "wb") as f:
            f.write(await image_file.read())

        # Generate URL (assuming static files are served at /static/uploads)
        url = f"http://localhost:8000/static/uploads/{filename}"
        logger.info(f"Image uploaded successfully: {url}")
        return url

    except Exception as e:
        logger.error(f"Error uploading image: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error uploading image: {str(e)}")