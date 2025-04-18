# 🚀 FastAPI + Google Cloud: Загрузка изображений

Этот проект реализует REST API для:

- загрузки изображений в **SQLite**
- получения информации через **FastAPI**

---

## 📦 Установка и запуск backend

### 1. 🔁 Клонирование репозитория

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### 2. 🧪 Создание виртуального окружения (Windows)

```bash
python -m venv venv
```

### 3. ⚙️ Активация окружения (Windows, Linux)

```bash
(Windows)
.\.venv\Scripts\activate 

(Git Bash VS Code)
source venv/Scripts/activate 
```

### 4. 📥 Установка зависимостей

```bash
pip install -r requirements.txt
python -c "from app.core.config import init_db; init_db()"
```

### ▶️ Запуск проекта
```bash
uvicorn main:app --reload
```

### 🧭 Структура проекта
```bash
backend/
├── app/
│   ├── core/
│   │   ├── config.py          # Configuration and database setup
│   │   ├── logger.py          # Logging configuration
│   ├── ML
│   │   ├── cv2.py
│   ├── models/
│   │   ├── image.py           # Data models
│   ├── services/
│   │   ├── image_service.py    # Image handling logic
│   │   ├── db_service.py      # SQLite database operations
│   ├── routes/
│   │   ├── image_router.py    # API routes
│   ├── static/
│   │   ├── uploads/           # Directory for uploaded images
│   ├── __init__.py
├── main.py                    # FastAPI app entry point
├── requirements.txt           # Dependencies
├── README.md                  # Project documentation

```

## 📦 Установка и запуск frontend
### 1. Установка зависимостей
```bash
npm install
```
### 2. Запуск разработки
```bash
npm run dev
```
### 3. Открыть можно по ссылке
```bash
http://localhost:5173/
```
