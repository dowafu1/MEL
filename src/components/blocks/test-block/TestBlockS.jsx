import { useEffect, useState } from 'react';

const TestBlock = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.json'); // Заменить на реальный путь к файлу
                const data = await response.json();
                setCards(data); // Обновляем состояние с данными
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="picture-block__container">
            <div className="picture-block__title">
                <h2 className="picture-block__text">Изображения с дефектами</h2>
            </div>

            {/* Для обычного экрана */}
            <div className="picture-block__blocks1">
                {cards.map((card, index) => (
                    <div key={index} className="picture-block__left-block">
                        <img src={card.processedImage} alt="Result" className="picture-block__img" />
                        <div className="picture-block__name-file">{card.filename}</div>
                        <div className="picture-block__result">
                            <div className="picture-block__result-text1">Совпадение: {card.matchPercent}%</div>
                            <div className="picture-block__result-text2">Уверенность: {card.confidence}%</div>
                        </div>
                        <div className="picture-block__defects">
                            <div className="picture-block__defect-text">Дефекты:</div>
                            <div className="picture-block__defect-list">
                                {card.defects.map((defect) => (
                                    <div className="picture-block__defect" key={defect.id}>
                                        <span>{defect.type}</span>
                                        <span>{defect.region}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Для адаптивного экрана (мобильная версия) */}
            <div className="picture-block__blocks2">
                {cards.map((card, index) => (
                    <div key={index} className="picture-block__left-block">
                        <div className="picture-block__namefile-overlay">
                            <div className="picture-block__namefile-text">{card.filename}</div>
                        </div>
                        <img src={card.processedImage} alt="Result" className="picture-block__img" />
                        <div className="picture-block__results1">
                            <div className="picture-block__results-text1">Совпадение: {card.matchPercent}%</div>
                            <div className="picture-block__results-text2">Уверенность: {card.confidence}%</div>
                        </div>
                        <div className="picture-block__defects">
                            <div className="picture-block__defect-text">Дефекты:</div>
                            <div className="picture-block__defect-list">
                                {card.defects.map((defect) => (
                                    <div className="picture-block__defect" key={defect.id}>
                                        <span>{defect.type}</span>
                                        <span>{defect.region}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestBlock;
