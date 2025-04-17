from fastapi import FastAPI
from routes.image_router import router as image_router

app = FastAPI()

app.include_router(image_router)

@app.get("/")
async def root():
    return {"message": "Добро пожаловать в API!"}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)