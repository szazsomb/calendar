import React, { useState } from 'react';
import { CirclePicker, SketchPicker } from 'react-color';

type ColorPickerProps = {
    setColor: (color: string) => void;
};

export function ColorPicker({setColor}: ColorPickerProps) {
    const [selectedColor, setSelectedColor] = useState<string | undefined>('#000000');
    
    const handleColorChange = (color: string) => {
      setSelectedColor(color);
      setColor(color);
    };
  
    return (
      <>
        <CirclePicker color={selectedColor} onChange={(color) => handleColorChange(color.hex)} />
        <p>Selected Color: {selectedColor}</p>
      </>
    );
  }