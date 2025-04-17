from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
from app.services.image_service import upload_image
from app.services.firestore_service import save_image_metadata, get_all_items, get_item_by_id

router = APIRouter()

@router.post('/items')
async def add_item(image: UploadFile = File(...), description: str = Form(...), image_id: str = Form(None)):
    image_url = await upload_image(image)
    data = await save_image_metadata(image_url, description, image_id)
    return JSONResponse(content=data, status_code=201)

@router.get('/items')
async def fetch_all():
    return JSONResponse(content=await get_all_items())

@router.get('/items/{item_id}')
async def fetch_item(item_id: str):
    return JSONResponse(content=await get_item_by_id(item_id))
