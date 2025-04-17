# 🚀 FastAPI + Google Cloud: Загрузка изображений

Этот проект реализует REST API для:

- загрузки изображений в **Google Cloud Storage**
- сохранения метаданных в **Google Firestore**
- получения информации через **FastAPI**

---

## 📦 Установка и запуск

### 1. 🔁 Клонирование репозитория

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### 2. 🧪 Создание виртуального окружения (Windows)

```bash
python -m venv venv
```

### 3. ⚙️ Активация окружения (Windows)

```bash
.\.venv\Scripts\activate
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
uvicorn main:app --reload
```

### 🧭 Структура проекта
backend/
│
├── app/
│   ├── main.py              # Основной файл приложения
│   ├── core/config.py       # Настройки и инициализация Firestore/Storage
│   ├── services/            # Загрузка файлов и работа с базой
│   └── routers/             # Эндпоинты API
│
├── credentials/
│   └── service.json         # Учетные данные Google Cloud
│
├── requirements.txt         # Зависимости проекта
└── README.md