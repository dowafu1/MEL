import './download-block.css';
import downloadSvg from './downloadsvg.svg';
import moredownloadSvg from './moredownloadsvg.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';

const DownloadBlock = () => {
    const [leftFile, setLeftFile] = useState(null);
    const [rightFiles, setRightFiles] = useState([]);
    const [checkedState, setCheckedState] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
    });
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    const defectTypes = [
        { id: 1, name: 'Смазанная картинка' },
        { id: 2, name: 'Искаженные тексты' },
        { id: 3, name: 'Несоответствие цветов' },
    ];

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedState((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleLeftFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Проверка типа файла
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                setError('Эталонный файл должен быть в формате jpg, jpeg, png или gif');
                return;
            }
            // Проверка размера файла (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Эталонный файл не должен превышать 5 МБ');
                return;
            }
            setLeftFile(file);
            setError(null);
        }
    };

    const handleRightFilesChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 20) {
            setError('Максимальное количество файлов - 20');
            return;
        }
        // Проверка типов и размеров файлов
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        for (const file of files) {
            if (!validTypes.includes(file.type)) {
                setError('Файлы должны быть в формате jpg, jpeg, png или gif');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError('Каждый файл не должен превышать 5 МБ');
                return;
            }
        }
        setRightFiles(files);
        setError(null);
    };

    const handleSubmit = async () => {
        // Валидация
        if (!leftFile || rightFiles.length === 0) {
            setError('Пожалуйста, загрузите файлы в оба блока');
            return;
        }
        const selectedDefects = defectTypes
            .filter((_, i) => checkedState[`checkbox${i + 1}`])
            .map((d) => d.name);
        if (selectedDefects.length === 0) {
            setError('Пожалуйста, выберите хотя бы один тип дефекта');
            return;
        }
    
        const formData = new FormData();
        formData.append('defectTypes', JSON.stringify(selectedDefects));
        formData.append('files', leftFile);
        rightFiles.forEach((file) => {
            formData.append('files', file);
        });
    
        try {
            const response = await axios.post(
                'http://localhost:8000/api/items/', // Добавлен слеш в конце
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            setImages((prev) => [...response.data, ...prev]);
            setLeftFile(null);
            setRightFiles([]);
            setCheckedState({ checkbox1: false, checkbox2: false, checkbox3: false });
            setError(null);
            alert('Файлы успешно отправлены на проверку');
        } catch (error) {
            const errorMessage =
                error.response?.data?.detail || 'Произошла ошибка при отправке файлов';
            setError(errorMessage);
        }
    };

    // Получение всех загруженных изображений
    const fetchImages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/items');
            setImages(response.data);
            setError(null);
        } catch (error) {
            setError('Ошибка при получении изображений');
        }
    };

    // Загрузка изображений при монтировании
    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div className="download-block__container">
            <div className="download-block__typedefects">
                <p className="download-block__text">ТИПЫ ДЕФЕКТОВ</p>
                <div className="download-block__typedefects-list">
                    {defectTypes.map((defect, index) => (
                        <div key={`checkbox${index + 1}`} className="download-block__checkbox-item">
                            <input
                                type="checkbox"
                                id={`checkbox${index + 1}`}
                                name={`checkbox${index + 1}`}
                                className="download-block__checkbox-input"
                                checked={checkedState[`checkbox${index + 1}`]}
                                onChange={handleCheckboxChange}
                            />
                            <label
                                htmlFor={`checkbox${index + 1}`}
                                className="download-block__checkbox-label"
                            >
                                {defect.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <p className="download-block__text">ЗАГРУЗКА ФАЙЛОВ</p>
            <div className="download-block__blocks">
                <div className="download-block__left-block">
                    <div className="download-block__block">
                        <div className="download-block__text-overlay">ВАШ ЭТАЛОН</div>
                        <div className="download-block__content">
                            {leftFile ? (
                                <div className="download-block__file-info">
                                    <p>{leftFile.name}</p>
                                    <p>{(leftFile.size / 1024).toFixed(2)} KB</p>
                                </div>
                            ) : (
                                <>
                                    <div className="download-block__download">
                                        <img
                                            src={downloadSvg}
                                            alt="download"
                                            className="download-block__svg"
                                        />
                                        <div className="download-block__text1">1 файл</div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div>
                        <input
                            type="file"
                            id="left-file-input"
                            style={{ display: 'none' }}
                            onChange={handleLeftFileChange}
                            accept="image/jpeg,image/png,image/gif"
                        />
                        <button
                            className="download-block__btn"
                            onClick={() => document.getElementById('left-file-input').click()}
                        >
                            {leftFile ? 'Файл выбран' : 'Выберите файл'}
                        </button>
                    </div>
                </div>

                <div className="download-block__right-block">
                    <div className="download-block__block">
                        <div className="download-block__text-overlay">ЧТО ПРОВЕРИТЬ</div>
                        <div className="download-block__content">
                            {rightFiles.length > 0 ? (
                                <div className="download-block__files-list">
                                    <p>Выбрано файлов: {rightFiles.length}/20</p>
                                    {rightFiles.slice(0, 3).map((file) => (
                                        <p key={file.name}>{file.name}</p>
                                    ))}
                                    {rightFiles.length > 3 && (
                                        <p>...и еще {rightFiles.length - 3}</p>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div className="download-block__download">
                                        <img
                                            src={moredownloadSvg}
                                            alt="download"
                                            className="download-block__svg"
                                        />
                                        <div className="download-block__text1">
                                            максимум<br />20 файлов
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div>
                        <input
                            type="file"
                            id="right-files-input"
                            style={{ display: 'none' }}
                            onChange={handleRightFilesChange}
                            multiple
                            accept="image/jpeg,image/png,image/gif"
                        />
                        <button
                            className="download-block__btn"
                            onClick={() => document.getElementById('right-files-input').click()}
                        >
                            {rightFiles.length > 0
                                ? `Выбрано ${rightFiles.length} файлов`
                                : 'Выберите файлы'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="download-block__submit-container">
                <button className="download-block__submit-btn" onClick={handleSubmit}>
                    Начать проверку
                </button>
            </div>

            {/* Отображение ошибок */}
            {error && <p className="download-block__error" style={{ color: 'red' }}>{error}</p>}

            {/* Отображение загруженных изображений */}
            <div className="download-block__images">
                <h2>Загруженные изображения</h2>
                {images.length === 0 ? (
                    <p>Нет загруженных изображений</p>
                ) : (
                    <ul>
                        {images.map((image) => (
                            <li key={image.id}>
                                <img
                                    src={image.url}
                                    alt="Uploaded"
                                    style={{ maxWidth: '200px' }}
                                />
                                <p>Дефекты: {image.defect_types.join(', ')}</p>
                                <p>
                                    Загружено:{' '}
                                    {new Date(image.created_at).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DownloadBlock;