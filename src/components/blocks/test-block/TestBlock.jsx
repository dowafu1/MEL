import './test-block.css';
import saveSvg from './savesvg.svg';
import manJpg from './man.jpg';
import pencilSng from './pencil.svg';

const PictureBlock = () => {
    return (
        <div className='picture-block__container'>
            <div className="picture-block__title">
                <p className="picture-block__text">ВАШИ ИЗОБРАЖЕНИЯ</p>
                <div className="">
                    <button className="picture-block__btn1">
                        Сохранить все карточки
                    </button>
                </div>
                <div className="">
                    <img 
                        src={saveSvg} 
                        alt="download" 
                        className="picture-block__svg"
                    />
                </div>
            </div>

            <div className="picture-block__blocks-list">
                <div className="picture-block__blocks">
                <div className="picture-block__left-block">
                    <img 
                        src={manJpg} 
                        alt="download" 
                        className="picture-block__img"
                    />
                </div>
                <div className="picture-block__right-block">
                    <p className="picture-block__name-file">
                        Имя файла
                    </p>
                    <div className="picture-block__result">
                        <p className="picture-block__result-text1">
                            РЕЗУЛЬТАТ:
                        </p>
                        <div className="picture-block__results">
                            <div className="picture-block__result1">
                                <p className="picture-block__result-percent">
                                    85,81%
                                </p>
                                <p className="picture-block__result-text2">
                                    совпадение<br/>с примером
                                </p>
                            </div>
                            <div className="picture-block__result2">
                                <p className="picture-block__result-percent">
                                    83,51%
                                </p>
                                <p className="picture-block__result-text2">
                                    уверенность ИИ<br/>в своем вердикте
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="picture-block__defects">
                        <p className="picture-block__defect-text">
                            ДЕФЕКТЫ:
                        </p>
                        <div className="picture-block__defect-list">
                            <div className="picture-block__defect">
                                <div className="picture-block__defect1-part1">
                                    <p className="picture-block__defect-text1">
                                        Смазанная картинка
                                    </p>
                                    <img 
                                        src={pencilSng} 
                                        alt="pencil" 
                                        className="picture-block__svg1"
                                    />
                                </div>
                                
                                <div className="picture-block__defect1-part2">
                                    <p className="picture-block__defect-text1">
                                        A область
                                    </p>
                                    <img 
                                        src={pencilSng} 
                                        alt="pencil" 
                                        className="picture-block__svg1"
                                    />
                                </div>
                            </div>
                            <div className="picture-block__defect">
                                <div className="picture-block__defect1-part1">
                                    <p className="picture-block__defect-text1">
                                        Искаженные тексты
                                    </p>
                                    <img 
                                        src={pencilSng} 
                                        alt="pencil" 
                                        className="picture-block__svg1"
                                    />
                                </div>
                                
                                <div className="picture-block__defect1-part2">
                                    <p className="picture-block__defect-text1">
                                        В область
                                    </p>
                                    <img 
                                        src={pencilSng} 
                                        alt="pencil" 
                                        className="picture-block__svg1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="picture-block__btns">
                        <div className="">
                            <button className="picture-block__btn2">
                                Внести изменения
                            </button>
                        </div>

                        <div className="">
                            <button className="picture-block__btn3">
                                Сохранить карточку
                            </button>
                        </div>
                    </div>
                </div>
                </div>

                

                
            </div>
      
        </div>
    )
}

export default PictureBlock;