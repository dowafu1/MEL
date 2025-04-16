import './page-header.css';
import logo from './logo.svg';
import line from './line.svg';

const PageHeader = () => {
    return (
        <div className='page-header__block'>
            <div className="page-header__right-block">
                <img className='page-header__logo' src={logo} alt="logo" />
                <img className='page-header__line' src={line} alt="line" />
                <h1 className='page-header__text'>WHY</h1> 
                <h1 className='page-header__text2'>[Б]</h1> 
                <h1 className='page-header__text3'>MEN</h1> 
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
