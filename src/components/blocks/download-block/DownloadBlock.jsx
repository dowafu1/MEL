import './download-block.css';
import downloadSvg from './downloadsvg.svg';
import { useState } from 'react';

const DownloadBlock = () => {
    const [leftFile, setLeftFile] = useState(null);
    const [rightFiles, setRightFiles] = useState([]);

    const handleLeftFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLeftFile(file);
        }
    };

    const handleRightFilesChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 20) {
            alert('Максимальное количество файлов - 20');
            return;
        }
        setRightFiles(files);
    };

    const handleSubmit = async () => {
        if (!leftFile || rightFiles.length === 0) {
            alert('Пожалуйста, загрузите файлы в оба блока');
            return;
        }

        const formData = new FormData();
        formData.append('example', leftFile);
        rightFiles.forEach((file) => {
            formData.append(`filesToCheck`, file);
        });

        try {
            const response = await fetch('https://....', { // сюда апи 
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке файлов');
            }

            const result = await response.json();
            console.log('Файлы успешно отправлены:', result);
            alert('Файлы успешно отправлены на проверку');
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке файлов');
        }
    };

    return (
        <div className='download-block__container'>
            <p className="download-block__text">ЗАГРУЗКА ФАЙЛОВ</p>
            <div className="download-block__blocks">
                <div className="download-block__left-block">
                    <div className="download-block__block">
                        <div className="download-block__text-overlay">
                            ПРИМЕР
                        </div>
                        <div className="download-block__content">
                            {leftFile ? (
                                <div className="download-block__file-info">
                                    <p>{leftFile.name}</p>
                                    <p>{(leftFile.size / 1024).toFixed(2)} KB</p>
                                </div>
                            ) : (
                                <img 
                                    src={downloadSvg} 
                                    alt="download" 
                                    className="download-block__svg"
                                />
                            )}
                        </div>
                    </div>
                    <div className="">
                        <input 
                            type="file" 
                            id="left-file-input" 
                            style={{ display: 'none' }} 
                            onChange={handleLeftFileChange}
                            accept="*"
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
                        <div className="download-block__text-overlay">
                            ЧТО ПРОВЕРИТЬ
                        </div>
                        <div className="download-block__content">
                            {rightFiles.length > 0 ? (
                                <div className="download-block__files-list">
                                    <p>Выбрано файлов: {rightFiles.length}/20</p>
                                    {rightFiles.slice(0, 3).map((file) => (
                                        <p key={file.name}>{file.name}</p>
                                    ))}
                                    {rightFiles.length > 3 && <p>...и еще {rightFiles.length - 3}</p>}
                                </div>
                            ) : (
                                <>
                                    <div className="download-block__download2">
                                        <img 
                                            src={downloadSvg} 
                                            alt="download" 
                                            className="download-block__svg"
                                        />
                                        <p className="download-block__text2">
                                            максимум<br/>20 файлов
                                        </p>
                                    </div>
                                    
                                </>
                            )}
                        </div>
                    </div>
                    <div className="">
                        <input 
                            type="file" 
                            id="right-files-input" 
                            style={{ display: 'none' }} 
                            onChange={handleRightFilesChange}
                            multiple
                            accept="*"
                        />
                        <button 
                            className="download-block__btn"
                            onClick={() => document.getElementById('right-files-input').click()}
                        >
                            {rightFiles.length > 0 ? `Выбрано ${rightFiles.length} файлов` : 'Выберите файлы'}
                        </button>
                    </div>
                </div>
            </div>
            <div className="download-block__submit-container">
                <button 
                    className="download-block__submit-btn"
                    onClick={handleSubmit}
                >
                    Начать проверку
                </button>
            </div>
        </div>
    )
}

export default DownloadBlock;