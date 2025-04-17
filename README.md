# 🚀 FastAPI + Google Cloud: Загрузка изображений

Этот проект реализует REST API для:

- загрузки изображений в **Google Cloud Storage**
- сохранения метаданных в **Google Firestore**
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
```

### 🔐 Настройка доступа к Google Cloud
1. Перейдите в Google Cloud Console

2.Создайте сервисный аккаунт и скачайте JSON-файл

3. Поместите его в директорию credentials/ под именем service.json


### ▶️ Запуск проекта
```bash
uvicorn app.main:app --reload
```

### 🧭 Структура проекта
```bash
backend/
│
├── app/
│   ├── main.py            # Точка входа FastAPI
│   ├── routers/           # Эндпоинты API
│   ├── services/          # Логика загрузки и работы с Firestore
│   ├── core/              # Конфигурации и инициализация GCP
│
├── credentials/           # service.json ключ
├── requirements.txt       # Зависимости
└── README.md

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