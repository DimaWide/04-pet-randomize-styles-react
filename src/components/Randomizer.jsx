import React, { useState, useEffect } from 'react';
import { Slider, Button } from 'antd';
import 'antd/dist/reset.css'; // Импорт стилей Ant Design

// Функция для генерации случайных чисел в заданном диапазоне
const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Функция для генерации случайного пастельного цвета в формате HSL
const getRandomPastelColor = (hueRange, saturationRange, lightnessRange) => {
  const h = getRandomInRange(hueRange[0], hueRange[1]);
  const s = getRandomInRange(saturationRange[0], saturationRange[1]);
  const l = getRandomInRange(lightnessRange[0], lightnessRange[1]);
  return `hsl(${h}, ${s}%, ${l}%)`;
};

const Randomizer = ({ onChange }) => {
  const [hueRange, setHueRange] = useState([0, 280]);
  const [saturationRange, setSaturationRange] = useState([30, 80]);
  const [lightnessRange, setLightnessRange] = useState([20, 90]);

  // Загрузка сохраненных стилей из localStorage при монтировании компонента
  useEffect(() => {
    const savedStyles = JSON.parse(localStorage.getItem('styles'));
    if (savedStyles) {
      onChange(savedStyles);
    }
  }, [onChange]);

  // Функция для обновления стилей и передачи их родительскому компоненту
  const handleStyleChange = () => {
    const newBackgroundColor = getRandomPastelColor(hueRange, saturationRange, lightnessRange);
    const newButtonColor = getRandomPastelColor(hueRange, saturationRange, lightnessRange);

    const newStyles = {
      backgroundColor: newBackgroundColor,
      buttonColor: newButtonColor,
    };

    // Сохранение новых стилей в localStorage
    localStorage.setItem('styles', JSON.stringify(newStyles));

    // Передача обновленных стилей родительскому компоненту
    onChange(newStyles);
  };

  return (
    <div>
      <h3>Adjust Color Settings</h3>

      <div>
        <p>Hue Range:</p>
        <Slider
          min={0}
          max={360}
          value={hueRange[1]}
          onChange={(value) => setHueRange([hueRange[0], value])}
        />
      </div>
      <div>
        <p>Saturation Range:</p>
        <Slider
          min={0}
          max={100}
          value={saturationRange[1]}
          onChange={(value) => setSaturationRange([saturationRange[0], value])}
        />
      </div>
      <div>
        <p>Lightness Range:</p>
        <Slider
          min={0}
          max={100}
          value={lightnessRange[1]}
          onChange={(value) => setLightnessRange([lightnessRange[0], value])}
        />
      </div>
      
      {/* Кнопка для изменения стилей, если нужно */}
      <Button type="primary" onClick={handleStyleChange}>Change Styles</Button>
    </div>
  );
};

export default Randomizer;
