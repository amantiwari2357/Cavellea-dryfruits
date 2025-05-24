"use client";
import React from "react";

const ColorPicker = ({ selectedColors, onSelectColor, maxSelections = 3 }) => {
  const colorOptions = [
    { name: 'Dark Blue', value: '#000080', key: 'darkBlue' },
    { name: 'Black', value: '#000000', key: 'black' },
    { name: 'Purple', value: '#800080', key: 'purple' },
    { name: 'Maroon', value: '#800000', key: 'maroon' },
    { name: 'Brown', value: '#8B4513', key: 'brown' },
    { name: 'White', value: '#FFFFFF', key: 'white' },
    { name: 'Blue', value: '#0074BC', key: 'blue' },
    { name: 'Red', value: '#BC0034', key: 'red' },
    { name: 'Yellow', value: '#F9D71C', key: 'yellow' },
    { name: 'Pearl', value: '#F5F5F5', key: 'pearl' },
    { name: 'Pink', value: '#F5A3C7', key: 'pink' },
    { name: 'Light Blue', value: '#A3E0F5', key: 'lightBlue' },
    { name: 'Dark Green', value: '#007C36', key: 'darkGreen' },
    { name: 'Platinum', value: '#E5E4E2', key: 'platinum' },
    { name: 'Orange', value: '#FF5C00', key: 'orange' },
    { name: 'Light Purple', value: '#C1A7E2', key: 'lightPurple' },
    { name: 'Dark Pink', value: '#D6218F', key: 'darkPink' },
    { name: 'Dark Yellow', value: '#EFAA22', key: 'darkYellow' },
  ];

  const isSelected = (color) => selectedColors.includes(color.key);
  const canSelect = (color) => isSelected(color) || selectedColors.length < maxSelections;

  const handleColorClick = (color) => {
    if (isSelected(color)) {
      onSelectColor(selectedColors.filter((c) => c !== color.key));
    } else if (canSelect(color)) {
      onSelectColor([...selectedColors, color.key]);
    }
  };

  // Group colors into rows of 5 for display
  const colorRows = [];
  for (let i = 0; i < colorOptions.length; i += 5) {
    colorRows.push(colorOptions.slice(i, i + 5));
  }

  return (
    <div className="mt-6">
      <div className="sidebar-container">
        <div className="bg-white p-4 rounded-lg shadow">
          {/* yaha ham select color ke dive ko manage kreneg 🔝 */}
          <h3 className="text-xl font-bold mb-4">Select Colors</h3>

          {colorRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-4 mb-4">
              {row.map((color) => (
                <div key={color.key} className="flex flex-col items-center">
                  <button
                    onClick={() => handleColorClick(color)}
                    disabled={!canSelect(color) && !isSelected(color)}
                    className={`w-12 h-12 rounded-full transition-transform duration-200 ${
                      isSelected(color)
                        ? "ring-2 ring-offset-2 ring-black scale-110"
                        : canSelect(color)
                          ? "hover:scale-105 hover:shadow-lg"
                          : "opacity-50 cursor-not-allowed"
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={`Select ${color.name}`}
                  >
                    {/* <span
                      className={`text-sm font-bold ${
                        ["#FFFFFF", "#F5F5F5", "#E5E4E2", "#A3E0F5"].includes(color.value)
                          ? "text-gray-700"
                          : "text-white"
                      }`}
                    >
                      C
                    </span> */}
                  </button>
                  <span className="mt-1 text-xs font-medium text-gray-700">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          ))}

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold">
                Selected colors: {selectedColors.length}/{maxSelections}
              </h3>
            </div>

            <div className="flex mt-2 space-x-2">
              {selectedColors.map((colorKey) => {
                const color = colorOptions.find((c) => c.key === colorKey);
                return (
                  <div
                    key={colorKey}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: color?.value ?? "#000" }}
                  >
                    {/* <span
                      className={`text-sm font-bold ${
                        ["#FFFFFF", "#F5F5F5", "#E5E4E2", "#A3E0F5"].includes(color?.value)
                          ? "text-gray-700"
                          : "text-white"
                      }`}
                    >
                      m
                    </span> */}
                  </div>
                );
              })}
              {Array.from({ length: maxSelections - selectedColors.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
