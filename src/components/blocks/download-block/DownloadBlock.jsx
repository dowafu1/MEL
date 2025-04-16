import './download-block.css';
import downloadSvg from './downloadsvg.svg';

const DownloadBlock = () => {
    return (
        <div className='download-block__container'>
            <p className="download-block__text">ЗАГРУЗКА ФАЙЛОВ</p>
            <div className="download-block__blocks">
                <div className="download-block__left-block">
                    <div className="download-block__block">
                        <div className="download-block__text-overlay">
                            ПРИМЕР
                        </div>

                        <div className="">
                            <img 
                                src={downloadSvg} 
                                alt="download" 
                                className="download-block__svg"
                            />
                        </div>
                    </div>
                    <div className="">
                        <button className="download-block__btn">
                            Выберете файлы
                        </button>
                    </div>
                </div>

                <div className="download-block__right-block">
                    <div className="download-block__block">
                        <div className="download-block__text-overlay">
                            ЧТО ПРОВЕРИТЬ
                        </div>

                        <div className="">
                            <img 
                                src={downloadSvg} 
                                alt="Star" 
                                className="download-block__svg"
                            />
                        </div>
                        <p className="download-block__text2">
                            максимум<br/>20 файлов
                        </p>
                    </div>
                    <div className="">
                        <button className="download-block__btn">
                            Выберете файлы
                        </button>
                    </div>
                </div>
            </div>
      
        </div>
    )
}

export default DownloadBlock;