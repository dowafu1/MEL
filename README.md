# Проект на FastAPI с использованием Google Cloud (Firestore и Storage)

Этот проект реализует API для загрузки изображений в **Google Cloud Storage**, сохранения метаданных в **Firestore** и получения данных через FastAPI.

## Установка

1. **Клонируйте репозиторий:**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository

2. **Создайте виртуальное окружение(Windows):**

   ```bash
   python -m venv venv

3. **Активируйте виртуальное окружение(Windows):**

   ```bash
   .\.venv\Scripts\activate

4. **Установите зависимости:**

   ```bash
   pip install -r requirements.txt

5. **Настройте Google Cloud:**

    **1. Скачайте файл с учетными данными сервиса Google Cloud (JSON).**

    **2. Поместите файл service.json в директорию credentials/.**

6. **Запуск локального сервера через Uvicorn:**
   ```bash
    uvicorn main:app --reload

7. **Структура проекта**
    **main.py - основной файл приложения, где определены маршруты и логика работы с Google Cloud.**

    **core/config.py - настройки подключения к Google Cloud (Firestore и Storage).**

    **credentials/service.json - файл учетных данных Google Cloud.**

    **requirements.txt - список зависимостей проекта.**