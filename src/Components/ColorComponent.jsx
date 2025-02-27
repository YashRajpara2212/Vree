

import Lenses from "./utils/Lenses";
import Frame from "./utils/Frame";
import Temple from "./utils/Temple";
import { useState } from "react";
import { SketchPicker } from "react-color";
import { vreeStore } from "../VreeStore";
import { observer } from "mobx-react";

const ColorComponent = observer(({ selectedSection }) => {
  const [showColorPicker, setShowColorPicker] = useState(false); // For showing the color picker
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });

  const colors = [
    "#FFFFFF",
    "#D5BC93",
    "#AC252B",
    "#185848",
    "#025D98",
    "#D2A693",
    "Custom",
  ];

  const getSelectedColor = () => {
    if (selectedSection === "frame") {
      return vreeStore.frameColor;
    } else if (selectedSection === "temple") {
      return vreeStore.templeColor;
    } else if (selectedSection === "lense") {
      return vreeStore.lensColor;
    }
    return "#FFFFFF"; // Default fallback color
  };

  const handleColorSelect = (color) => {
    if (!color || !color.hex) {
      console.error("Invalid color object:", color);
      return;
    }

    if (selectedSection === "frame") {
      vreeStore.frameColor = color.hex;
      Frame.updateFrameColor(color.hex);
    } else if (selectedSection === "temple") {
      vreeStore.templeColor = color.hex;
      Temple.updateTempleColor(color.hex);
    } else if (selectedSection === "lense") {
      vreeStore.lensColor = color.hex;
      Lenses.updateLensesColor(color.hex);
    }
  };

  const handleCustomColorClick = (e) => {
    // Get the position of the clicked element
    const rect = e.target.getBoundingClientRect();
    // Calculate the position to place the color picker below the clicked element
    setPickerPosition({
      top: rect.bottom + window.scrollY, // Below the element
      left: rect.left + window.scrollX, // Align with the left of the element
    });
    // Toggle the visibility of the color picker
    setShowColorPicker(!showColorPicker);
  };

  return (
    <div className="">
      <div className={` text-xl font-bold ${vreeStore.isDarkMode ? "text-white" : "text-gray-900"}`}>Color</div>
      <div className="flex flex-col p-4">
        {/* Color palette */}
        <div className="flex flex-wrap space-x-12 mx-5 my-3 overflow-x-auto mb-4">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`w-13 h-13 my-3 rounded-full bg-cover bg-center transition-all duration-300 ${getSelectedColor() === color
                ? "border-4 border-blue-500"
                : "hover:border-4 hover:border-white"
                }`}
              style={{
                backgroundColor: color === "Custom" ? "#FFFFFF" : color,
                backgroundImage:
                  color === "Custom"
                    ? `url('/assets/texture/custom.png')`
                    : "none",
              }}
              onClick={(e) => {
                if (color === "Custom") {
                  handleCustomColorClick(e); // Show color picker when "Custom" is clicked
                } else {
                  handleColorSelect({ hex: color }); // Apply the selected predefined color
                }
              }}
            />
          ))}
        </div>

        {/* Color Picker for Custom Color */}
        {showColorPicker && (
          <div
            className="absolute z-50"
            style={{
              top: pickerPosition.top + "px", // Position the picker dynamically
              left: pickerPosition.left + "px", // Align the picker with the clicked element
            }}
          >
            <SketchPicker
              color={getSelectedColor()} // Initial color for the color picker
              onChangeComplete={handleColorSelect} // Set color when user selects from the color picker
            />
          </div>
        )}
      </div>
    </div>
  );
});
export default ColorComponent;