import './page-header.css';
import logo from './logo.svg';
import line from './line.svg';

const PageHeader = () => {
    return (
        <div className='page-header__block'>
            <div className="page-header__right-block">
                <img className='page-header__logo' href="https://moskva.mts.ru/personal" src={logo} alt="logo" />
                <img className='page-header__line' src={line} alt="line" />
                <div className='page-header__text'>WHY</div> 
                <div className='page-header__text2'>[Б]</div> 
                <div className='page-header__text3'>MEN</div> 
            </div>


            
            <div className="page-header__container">
            <nav className="page-header__nav">
                <a href="#" className="page-header__nav-link">Главная</a>
                <a href="#" className="page-header__nav-link">Наша команда</a>
            </nav>
            </div>

            <div className="page-header__oc">
                <h3 className="page-header__left-block">
                    <a href="#" className="page-header__btns btns">Обратная связь</a>
                </h3>
            </div>

        </div>
    )
}

export default PageHeader;
