from fastapi import FastAPI
from app.routes.image_router import router as image_router
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(image_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Добро пожаловать в API!"}

if __name__ == '__main__':
    uvicorn.run(app, host='localhost', port=8000)
