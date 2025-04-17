from fastapi import FastAPI
from app.routes.image_router import router as image_router
import uvicorn

app = FastAPI()

app.include_router(image_router)

@app.get("/")
async def root():
    return {"message": "Добро пожаловать в API!"}

if __name__ == '__main__':
    uvicorn.run(app, host='localhost', port=8000)