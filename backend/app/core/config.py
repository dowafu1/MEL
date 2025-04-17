import os
import sqlite3
from pathlib import Path

# Project root directory
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# SQLite database path
DB_PATH = BASE_DIR / "database.db"

# Upload directory
UPLOAD_DIR = BASE_DIR / "app" / "static" / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Allowed file extensions
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif"}

# Maximum file size (5MB)
MAX_FILE_SIZE = 5 * 1024 * 1024

def init_db():
    """Initialize SQLite database and create tables."""
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS images (
                id TEXT PRIMARY KEY,
                url TEXT NOT NULL,
                description TEXT,
                defect_types TEXT,
                created_at TEXT NOT NULL
            )
        """)
        conn.commit()