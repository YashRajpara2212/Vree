// import React from 'react'
import Lenses from "./utils/Lenses";
import Frame from "./utils/Frame";
import Temple from "./utils/Temple";
import { useState } from "react";
import { SketchPicker } from "react-color";
import { vreeStore } from "../VreeStore";

const ColorComponent = ({ selectedSection }) => {
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [showColorPicker, setShowColorPicker] = useState(false); // For showing the color picker
  const colors = [
    "#FFFFFF",
    "#D5BC93",
    "#AC252B",
    "#185848",
    "#025D98",
    "#D2A693",
    "Custom",
  ];

  const handleColorSelect = (color) => {
    if (!color || !color.hex) {
      console.error("Invalid color object:", color);
      return;
    }
    setSelectedColor(color.hex); // Set the selected color
    // Apply color based on the selected section (frame, temple, or lense)
    if (selectedSection === "frame") {
      Frame.updateFrameColor(color.hex);
      console.log(vreeStore.frameColor, "frameColor");
      console.log(vreeStore.frameTexture, "frameColor");
      //   console.log(vreeStore.frameColor, "frameColor");
      //   console.log(vreeStore.frameColor, "frameColor");
      //   console.log(vreeStore.frameColor, "frameColor");
    } else if (selectedSection === "temple") {
      Temple.updateTempleColor(color.hex);
    } else if (selectedSection === "lense") {
      Lenses.updateLenseColor(color.hex);
    }
    // setShowColorPicker(false);
  };

  const handleCustomColorClick = () => {
    // if (!showColorPicker) {
    //   setShowColorPicker(true);
    // }
    // Toggle the color picker visibility
    setShowColorPicker(!showColorPicker);
  };

  return (
    <>
    {/* items-center */}
      <div className="flex flex-col  p-4">
        {/* Color palette */}
        <div className="flex space-x-7 mb-4">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`w-13 h-13 rounded-full bg-cover bg-center transition-all duration-300 ${
                selectedColor === color
                  ? "border-4 border-blue-500"
                  : "hover:border-4 hover:border-white"
              }`}
              // Apply backgroundColor or backgroundImage based on color
              style={{
                backgroundColor: color === "Custom" ? "#FFFFFF" : color,
                backgroundImage:
                  color === "Custom"
                    ? `url('/assets/texture/custom.png')`
                    : "none",
              }}
              onClick={() => {
                if (color === "Custom") {
                  handleCustomColorClick(); // Show color picker when "Custom" is clicked
                } else {
                  handleColorSelect({ hex: color }); // Apply the selected predefined color
                }
              }}
            />
          ))}
        </div>

        {/* Color Picker for Custom Color */}
        {showColorPicker && (
          <div className="absolute top-60 left-100 z-50">
            <SketchPicker
              color={selectedColor} // Initial color for the color picker
              onChangeComplete={handleColorSelect} // Set color when user selects from the color picker
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ColorComponent;
