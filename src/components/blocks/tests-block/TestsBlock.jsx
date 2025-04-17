import React, { useState } from 'react';
import './tests-block.css';

const CustomCheckboxes = () => {
  const [checkedState, setCheckedState] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedState(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  return (
    <div className="custom-checkbox-container">
      <h3 className='download-block__text'>ТИПЫ ДЕФЕКТОВ</h3>
      
      <div className="download-block__checkbox-list">
        {["Смазанная картинка", "Искаженные тексты", "Несоответствие цветов"].map((num) => (
          <div key={`checkbox${num}`} className="download-block__checkbox-item">
            <input
              type="checkbox"
              id={`checkbox${num}`}
              name={`checkbox${num}`}
              className="download-block__checkbox-input"
              checked={checkedState[`checkbox${num}`]}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`checkbox${num}`} className="download-block__checkbox-label">
               {num}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCheckboxes;