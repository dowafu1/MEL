import './picture-block.css';
import { useEffect, useState } from 'react';
import saveSvg from './savesvg.svg';
import manJpg from './man.jpg';
import pencilSng from './pencil.svg';

const PictureBlock = () => {
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.json'); // потом заменим на FastAPI
                const data = await response.json();
                setCards(data);
            } catch (err) {
                setError('Ошибка при загрузке');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    // Если выбрана конкретная карточка
    if (selectedCard) {
        return (
            <div className="picture-block__container">
                <button className="picture-block__btn2" onClick={() => setSelectedCard(null)}>
                    Назад к списку
                </button>
                <div className="picture-block__blocks1">
                    <div className="picture-block__left-block">
                        <img
                            src={selectedCard.processedImage || manJpg}
                            alt="preview"
                            className="picture-block__img"
                        />
                    </div>
                    <div className="picture-block__right-block">
                        <p className="picture-block__name-file">
                            {selectedCard.filename}
                        </p>
                        <div className="picture-block__result">
                            <p className="picture-block__result-text1">РЕЗУЛЬТАТ:</p>
                            <div className="picture-block__results">
                                <div className="picture-block__result1">
                                    <p className="picture-block__result-percent">
                                        {selectedCard.matchPercent}%
                                    </p>
                                    <p className="picture-block__result-text2">
                                        совпадение<br />с примером
                                    </p>
                                </div>
                                <div className="picture-block__result2">
                                    <p className="picture-block__result-percent">
                                        {selectedCard.confidence}%
                                    </p>
                                    <p className="picture-block__result-text2">
                                        уверенность ИИ<br />в своем вердикте
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="picture-block__defects">
                            <p className="picture-block__defect-text">ДЕФЕКТЫ:</p>
                            <div className="picture-block__defect-list">
                                {selectedCard.defects.map((def) => (
                                    <div className="picture-block__defect" key={def.id}>
                                        <div className="picture-block__defect1-part1">
                                            <p className="picture-block__defect-text1">{def.type}</p>
                                            <img src={pencilSng} alt="pencil" className="picture-block__svg1" />
                                        </div>
                                        <div className="picture-block__defect1-part2">
                                            <p className="picture-block__defect-text1">{def.region}</p>
                                            <img src={pencilSng} alt="pencil" className="picture-block__svg1" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="picture-block__btns">
                            <button className="picture-block__btn2" onClick={() => setIsEditing(true)}>
                                Внести изменения
                            </button>
                            <button className="picture-block__btn3">
                                Сохранить карточку
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Отображение всех карточек
    return (
        <div className="picture-block__container">
            <div className="picture-block__title">
                <p className="picture-block__text">ВАШИ ИЗОБРАЖЕНИЯ</p>
                <button className="picture-block__btn1">Сохранить все карточки</button>
                <img src={saveSvg} alt="save" className="picture-block__svg" />
            </div>

            <div className="picture-block__blocks-list">
                {cards.map((card, index) => (
                    <div key={index} className="picture-block__blocks2">
                        <div className="picture-block__picture">
                            <img src={card.processedImage || manJpg} alt="preview" className="picture-block__img" />
                            <div className="picture-block__namefile-overlay">
                                <div className="picture-block__namefile-text">{card.filename}</div>
                            </div>
                        </div>
                        <div className="picture-block__results1">
                            <div className="picture-block__results-text1">Результат:</div>
                            <div className="picture-block__results-text2">
                                {card.matchPercent}% - совпадение с примером
                            </div>
                        </div>

                        <div className="picture-block__defects">
                            <p className="picture-block__defect-text">ДЕФЕКТЫ:</p>
                            <div className="picture-block__defect-list">
                                {card.defects.map((def) => (
                                    <div className="picture-block__defect" key={def.id}>
                                        <div className="picture-block__defect1-part1">
                                            <p className="picture-block__defect-text1">{def.type}</p>
                                            <img src={pencilSng} alt="pencil" className="picture-block__svg1" />
                                        </div>
                                        <div className="picture-block__defect1-part2">
                                            <p className="picture-block__defect-text1">{def.region}</p>
                                            <img src={pencilSng} alt="pencil" className="picture-block__svg1" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="picture-block__btns">
                            <button className="picture-block__btn2" onClick={() => setSelectedCard(card)}>
                                Внести изменения
                            </button>
                            <img src={saveSvg} alt="save" className="picture-block__svgs" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PictureBlock;




<div className="picture-block__defects">
                                    <p className="picture-block__defect-text">
                                        ДЕФЕКТЫ:
                                    </p>
                                    <div className="picture-block__defect-list">
                                        {card.defects.map((def) => (
                                            <div className="picture-block__defect" key={def.id}>
                                                <div className="picture-block__defect1-part1">
                                                    <p className="picture-block__defect-text1">
                                                        {def.type}
                                                    </p>
                                                    <img 
                                                        src={pencilSng} 
                                                        alt="pencil" 
                                                        className="picture-block__svg1"
                                                    />
                                                </div>

                                                <div className="picture-block__defect1-part2">
                                                    <p className="picture-block__defect-text1">
                                                        {def.region}
                                                    </p>
                                                    <img 
                                                        src={pencilSng} 
                                                        alt="pencil" 
                                                        className="picture-block__svg1"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
