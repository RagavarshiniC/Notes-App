// ColorPicker.js
import React, { useState } from 'react';
import '../Styles/ColorPicker.css';

const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF','#6691FF']; // Add more colors as needed

const ColorPicker = ({ onSelect }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorClick = (color) => {
    setSelectedColor(color);
    onSelect(color);
    console.log(selectedColor);
  };

  return (
    <div className="color-picker">
      {colors.map((color) => (
        <div
          key={color}
          className={`color-option ${selectedColor === color ? 'selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorClick(color)}
        ></div>
      ))}
    </div>
  );
};

export default ColorPicker;
