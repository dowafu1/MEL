from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
from app.routes.image_router import router as image_router
from app.core.logger import setup_logger

app = FastAPI(title="Image Upload API")

# Setup logging
setup_logger()

# Serve static files
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(image_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to the Image Upload API!"}

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)