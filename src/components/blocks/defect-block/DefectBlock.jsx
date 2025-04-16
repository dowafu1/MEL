import './defect-block.css';

const DefectBlock = () => {
    return (
        <div className='defect-block__block'>
            <h1 className='defect-block__text'>ТИПЫ ДЕФЕКТОВ</h1>
            
                <div className="defect-block-reserve__checks">

                  <label className="defect-block-reserve__check check">
                    <input
                      type="checkbox"
                      name="table_1"
                      className="check__input"
                    />
                    <span className="check__mark"></span>
                    <span className="check__label">Смазанная картинка</span>
                  </label>

                  <label className="defect-block-reserve__check check">
                    <input
                      type="checkbox"
                      name="table_2"
                      className="check__input"
                    />
                    <span className="check__mark"></span>
                    <span className="check__label">Искажённые тексты</span>
                  </label>

                  <label className="defect-block-reserve__check check">
                    <input
                      type="checkbox"
                      name="table_3"
                      className="check__input"
                    />
                    <span className="check__mark"></span>
                    <span className="check__label">Несоответствие цветов</span>
                  </label>

                  <label className="defect-block-reserve__check check">
                    <input
                      type="checkbox"
                      name="table_4"
                      className="check__input"
                    />
                    <span className="check__mark"></span>
                    <span className="check__label">Всё</span>
                  </label>

                </div>

            
        </div>
    )
}

export default DefectBlock;