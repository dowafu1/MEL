import { useEffect, useState } from 'react';

const PictureBlock = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/images');
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Ошибка при загрузке изображений:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      {cards.map((card, index) => (
        <div key={index}>
          <h3>Файл: {card.filename}</h3>
          <ul>
            {card.defects.map((defect) => (
              <li key={defect.id}>
                ID: {defect.id}, Вид дефекта: {defect.type}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PictureBlock;