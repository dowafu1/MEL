import './main-block.css';
import img from './img.svg';

const MainBlock = () => {
    return (
        <div className='main-block__block'>
            <div className='main-block__container'>
                <h1 className='main-block__text'>КОНТРОЛЬ КАЧЕСТВА <br></br>ЭТИКЕТОК</h1>
                
                <div className='main-block__text2'>
                    <h3 className='main-block__btn'>Больше никаких дефектов</h3>
                    <h3 className='main-block__btn2'>Высокий уровень проверки<br></br>искуственным интелектом</h3>
                </div>            
            </div> 

            <img className='main-block__img' src={img} alt="img" />
        </div>
    )
}

export default MainBlock;