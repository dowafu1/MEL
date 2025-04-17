import os
from google.cloud import firestore, storage

# Получаем путь до корня проекта backend/
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))

CREDENTIALS_PATH = os.path.join(BASE_DIR, 'credentials', 'service.json')

db = firestore.Client.from_service_account_json(CREDENTIALS_PATH)
storage_client = storage.Client.from_service_account_json(CREDENTIALS_PATH)
bucket = storage_client.bucket('your-bucket-name')  # Замени на реальное имя бакета
