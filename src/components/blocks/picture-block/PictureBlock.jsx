import './picture-block.css';
import { useEffect, useState, useRef } from 'react';
import saveSvg from './savesvg.svg';
import manJpg from './man.jpg';
import pencilSng from './pencil.svg';
import goBack from './goback.svg';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import SVG from 'react-inlinesvg';

const PictureBlock = () => {
    const containerRef = useRef(null);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDefect, setSelectedDefect] = useState(null);

    const svgContainerRef = useRef(null);
    // const [svgContent, setSvgContent] = useState('');

    const saveAllImages = async () => {
        if (containerRef.current) {
            const canvas = await html2canvas(containerRef.current);
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = '/images/image1_processed.png';
            link.click();
        }
    };

   

    const saveCardAsPdf = async (card) => {
        const doc = new jsPDF();
        const canvas = await html2canvas(containerRef.current);
        const imgData = canvas.toDataURL('image/png');

        doc.addImage(imgData, 'PNG', 10, 10, 180, 160);
        doc.save(`${card.filename}.pdf`);
    };

    const removeSelectedDefect = () => {
        if (selectedDefect !== null && selectedCard?.defects) {
          const updatedDefects = selectedCard.defects.filter(defect => defect.id !== selectedDefect);
    
          setSelectedCard(prev => ({
            ...prev,
            defects: updatedDefects
          }));
    
          setSelectedDefect(null);
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.json'); // сюда крутим апишку
                const data = await response.json();
                setCards(data);
            } catch {
                setError('Ошибка при загрузке');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="picture-block__container">
            {selectedCard ? (
                <div>
                    <button className="picture-block__arrowbtn" onClick={() => setSelectedCard(null)}>
                        <img
                            src={goBack}
                            alt="preview"
                            className="picture-block__arrow"
                        />
                    </button>

                    <div className="picture-block__blocks-list">
                        <div className="picture-block__blocks1">
                            <div className="picture-block__left-block">
                                <div className="picture-block__image-wrapper">
                                  <img
                                    src={selectedCard?.processedImage || manJpg}
                                    alt="preview"
                                    className="picture-block__img"
                                  />

                                  <div className="picture-block__svg-overlay" ref={svgContainerRef}>
                                    {selectedCard.defects.map((defect) => (
                                      <img
                                        key={defect.id}
                                        src={defect.correctionSvg}
                                        data-id={defect.id}
                                        alt={`defect-${defect.id}`}
                                        className="svg-overlay__image"
                                      />
                                    ))}
                                  </div>
                                </div>
                            </div>

                            <div className="picture-block__right-block">
                                <p className="picture-block__name-file">{selectedCard.filename}</p>

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
                                        {selectedCard.defects.map((defect) => (
                                            <div className="picture-block__defect" key={defect.id}>
                                                <div className="picture-block__defect1-part1">
                                                    <p className="picture-block__defect-text1">{defect.type}</p>
                                                    <img
                                                        src={pencilSng}
                                                        alt="pencil"
                                                        className={`picture-block__svg1 ${selectedDefect === defect.id ? 'selected' : ''}`}
                                                        onClick={() => setSelectedDefect(defect.id)}
                                                    />
                                                </div>

                                                <div className="picture-block__defect1-part2">
                                                    <p className="picture-block__defect-text1">{defect.region}</p>
                                                    <img
                                                        src={pencilSng}
                                                        alt="pencil"
                                                        className={`picture-block__svg1 ${selectedDefect === defect.id ? 'selected' : ''}`}
                                                        onClick={() => setSelectedDefect(defect.id)}
                                                    />
                                                    
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="picture-block__btns">
                                    <button className="picture-block__btn2" onClick={removeSelectedDefect}>
                                        Удалить дефект
                                    </button>
                                    <button className="picture-block__btn3" onClick={() => saveCardAsPdf(selectedCard)}>
                                        Сохранить карточку
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="picture-block__title">
                        <p className="picture-block__text">ВАШИ ИЗОБРАЖЕНИЯ</p>
                        <div>
                            <button className="picture-block__btn1" onClick={saveAllImages}>
                                Сохранить все карточки
                            </button>
                        </div>
                        <div>
                            <img src={saveSvg} alt="download" className="picture-block__svg" />
                        </div>
                    </div>

                    <div className="picture-block__blocks-list">
                        {cards.map((card, index) => (
                            <div className="picture-block__blocks1" key={index}>
                                <div className="picture-block__left-block">
                                    <div className="picture-block__image-wrapper">
                                      <img
                                        src={card.processedImage || manJpg}
                                        alt="preview"
                                        className="picture-block__img"
                                      />
                                      <div className="picture-block__svg-overlay" ref={svgContainerRef}>
                                            {card.defects?.map((defect) => (
                                          <img
                                            key={defect.id}
                                            src={defect.correctionSvg}
                                            data-id={defect.id}
                                            alt={`defect-${defect.id}`}
                                            className="svg-overlay__image"
                                          />
                                        ))}
                                      </div>
                                    </div>
                                </div>

                                <div className="picture-block__right-block">
                                    <p className="picture-block__name-file">{card.filename}</p>

                                    <div className="picture-block__result">
                                        <p className="picture-block__result-text1">РЕЗУЛЬТАТ:</p>
                                        <div className="picture-block__results">
                                            <div className="picture-block__result1">
                                                <p className="picture-block__result-percent">
                                                    {card.matchPercent}%
                                                </p>
                                                <p className="picture-block__result-text2">
                                                    совпадение<br />с примером
                                                </p>
                                            </div>
                                            <div className="picture-block__result2">
                                                <p className="picture-block__result-percent">
                                                    {card.confidence}%
                                                </p>
                                                <p className="picture-block__result-text2">
                                                    уверенность ИИ<br />в своем вердикте
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="picture-block__btns">
                                        <div>
                                            <button 
                                                className="picture-block__btn2" 
                                                onClick={() => setSelectedCard(card)}
                                            >
                                                Внести изменения
                                            </button>
                                        </div>

                                        <div>
                                            <button className="picture-block__btn3" onClick={() => saveCardAsPdf(card)}>
                                                Сохранить карточку
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PictureBlock;
