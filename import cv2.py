import cv2
import numpy as np
import os
import json  # Добавляем импорт для работы с JSON

def preprocess_image(image):
    """
    Предобработка изображения: размытие по Гауссу и преобразование в цветовое пространство LAB.
    """
    blurred = cv2.GaussianBlur(image, (5, 5), 0)  # Размытие для снижения шума
    lab_image = cv2.cvtColor(blurred, cv2.COLOR_BGR2LAB)  # Преобразование в LAB
    return lab_image

def compare_images(reference_image_path, test_image_path, threshold=30):
    """
    Сравнивает два изображения и выявляет области несоответствия цветов.
    
    :param reference_image_path: Путь к эталонному изображению
    :param test_image_path: Путь к проверочному изображению
    :param threshold: Пороговое значение для определения несоответствий
    :return: Изображение с отмеченными несоответствиями и список координат дефектов
    """
    # Загрузка изображений
    reference_image = cv2.imread(reference_image_path)
    test_image = cv2.imread(test_image_path)

    # Проверка успешности загрузки
    if reference_image is None or test_image is None:
        raise ValueError("Ошибка: Не удалось загрузить одно из изображений.")

    # Приведение изображений к одинаковому размеру
    reference_height, reference_width = reference_image.shape[:2]
    test_height, test_width = test_image.shape[:2]

    if (reference_height, reference_width) != (test_height, test_width):
        print("Размеры изображений различаются. Приводим их к одному размеру.")
        test_image = cv2.resize(test_image, (reference_width, reference_height))

    # Предобработка изображений
    reference_image = preprocess_image(reference_image)
    test_image = preprocess_image(test_image)

    # Вычисление абсолютной разности между эталоном и проверочным изображением
    diff = cv2.absdiff(reference_image, test_image)

    # Преобразование разности в градации серого
    diff_gray = cv2.cvtColor(diff, cv2.COLOR_BGR2GRAY)

    # Адаптивная бинаризация
    _, mask = cv2.threshold(diff_gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    # Морфологическая обработка для очистки результата
    kernel = np.ones((5, 5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)  # Закрытие для заполнения пробелов
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)   # Открытие для удаления шума

    # Нахождение контуров на маске
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Создание копии тестового изображения для результата
    result_image = test_image.copy()

    # Цветовая палитра для дефектов
    colors = [
        (255, 0, 0),     # Красный
        (0, 255, 0),     # Зеленый
        (0, 0, 255),     # Синий
        (255, 255, 0),   # Желтый
        (255, 0, 255),   # Пурпурный
        (0, 255, 255),   # Голубой
        (128, 0, 0),     # Темно-красный
        (0, 128, 0),     # Темно-зеленый
        (0, 0, 128),     # Темно-синий
    ]

    # Список для хранения координат дефектов
    defect_coordinates = []

    # Отрисовка контуров и нумерация дефектов
    used_positions = []  # Список занятых позиций для текста
    for i, contour in enumerate(contours):
        x, y, w, h = cv2.boundingRect(contour)
        if w * h > 100:  # Фильтрация маленьких областей
            # Сохраняем координаты дефекта
            defect_coordinates.append({"id": i + 1, "x": int(x), "y": int(y), "width": int(w), "height": int(h)})

            # Выбор цвета из палитры
            color = colors[i % len(colors)]

            # Рисуем прямоугольник вокруг дефекта
            cv2.rectangle(result_image, (x, y), (x + w, y + h), color, 2)

            # Добавляем номер дефекта, учитывая пересечения
            font_scale = 0.6  # Размер шрифта
            thickness = 1     # Толщина текста
            text = str(i + 1)
            text_size, _ = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, font_scale, thickness)
            text_width, text_height = text_size

            # Ищем свободное место для текста
            position_found = False
            for offset_y in range(0, h + text_height, text_height):
                for offset_x in range(0, w + text_width, text_width):
                    new_x = x + offset_x
                    new_y = y - offset_y - text_height
                    if new_y < 0:  # Если текст выходит за пределы изображения сверху
                        continue

                    # Проверяем, не пересекается ли новая позиция с уже занятыми
                    overlap = False
                    for pos_x, pos_y, pos_w, pos_h in used_positions:
                        if (new_x < pos_x + pos_w and new_x + text_width > pos_x and
                            new_y < pos_y + pos_h and new_y + text_height > pos_y):
                            overlap = True
                            break

                    if not overlap:
                        # Сохраняем позицию текста
                        used_positions.append((new_x, new_y, text_width, text_height))
                        position_found = True
                        break

                if position_found:
                    break

            # Если свободное место найдено, рисуем текст
            if position_found:
                cv2.putText(result_image, text, (new_x, new_y + text_height), 
                            cv2.FONT_HERSHEY_SIMPLEX, font_scale, color, thickness)

    return result_image, defect_coordinates  # Возвращаем изображение и координаты дефектов

# Основная часть программы
if __name__ == "__main__":
    # Получаем текущую директорию, где находится скрипт
    current_directory = os.path.dirname(os.path.abspath(__file__))

    # Имена файлов изображений (должны находиться в той же папке, что и скрипт)
    reference_image_name = "reference_image.jpg"  # Эталонное изображение
    test_image_name = "test_image.jpg"           # Проверочное изображение

    # Полные пути к изображениям
    reference_image_path = os.path.join(current_directory, reference_image_name)
    test_image_path = os.path.join(current_directory, test_image_name)

    # Сравнение изображений
    try:
        result_image, defect_coordinates = compare_images(reference_image_path, test_image_path, threshold=30)

        # Увеличение размера выходного изображения
        scale_factor = 3  # Масштабный коэффициент (увеличение в 3 раза)
        new_width = int(result_image.shape[1] * scale_factor)
        new_height = int(result_image.shape[0] * scale_factor)
        resized_result_image = cv2.resize(result_image, (new_width, new_height))

        # Сохранение результата в ту же папку
        output_image_name = "result_with_numbered_defects_resized.jpg"
        output_image_path = os.path.join(current_directory, output_image_name)
        cv2.imwrite(output_image_path, resized_result_image)

        print(f"Результат сохранен в файл: {output_image_path}")

        # Сохранение координат дефектов в JSON
        output_json_name = "defect_coordinates.json"
        output_json_path = os.path.join(current_directory, output_json_name)
        with open(output_json_path, "w") as json_file:
            json.dump(defect_coordinates, json_file, indent=4)

        print(f"Координаты дефектов сохранены в файл: {output_json_path}")

        # Отображение результата (опционально)
        cv2.imshow("Resized Result with Numbered Defects", resized_result_image)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    except ValueError as e:
        print(e)