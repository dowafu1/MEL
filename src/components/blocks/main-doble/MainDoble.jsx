
import './main-doble.css';
import img from './img.svg';

const MainDoble = () => {
    return (
        
        <div className='main-doble__container'>
            
                <p  className='main-doble__text'>КОНТРОЛЬ КАЧЕСТВА <br></br>ЭТИКЕТОК</p>
                
            <img className='main-doble__img' src={img} alt="img" />

                <div className='main-doble__text2'>

                <div className='main-doble__btnn'></div>
                    <p className='main-doble__btn'>Проверка с использованием ИИ</p>

                    <p className='main-doble__btn2'>Больше никаких дефектов</p>

                </div>            
          

        </div>
    )
}

export default MainDoble;
