"use client";
import { useState } from "react";

const TextEditorPanel = ({
  onTextChange,
  onFontStyleChange,
  firstLine,
  secondLine,
  selectedFontStyle
}) => {
  const [tempFirstLine, setTempFirstLine] = useState(firstLine);
  const [tempSecondLine, setTempSecondLine] = useState(secondLine);
  const [tempFontStyle, setTempFontStyle] = useState(selectedFontStyle);

  const fontStyles = ["Bold", "Regular", "Light", "Script", "Italic"];

  const handleTextConfirm = () => {
    onTextChange(tempFirstLine, tempSecondLine);
    onFontStyleChange(tempFontStyle);
  };

  return (
    <div className="mt-6 p-4 border rounded-md shadow-md">
      <h4 className="text-lg font-bold mb-4">Add Your Text</h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Line
          </label>
          <input
            type="text"
            value={tempFirstLine}
            onChange={(e) => setTempFirstLine(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Type first line"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Second Line
          </label>
          <input
            type="text"
            value={tempSecondLine}
            onChange={(e) => setTempSecondLine(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Type second line"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Style
          </label>
          <div className="grid grid-cols-3 gap-2">
            {fontStyles.map((style) => (
              <button
                key={style}
                onClick={() => setTempFontStyle(style)}
                className={`px-3 py-2 text-sm ${
                  tempFontStyle === style
                    ? "bg-yellow-100 border-yellow-500 border-2"
                    : "bg-gray-100"
                } rounded-md transition-colors`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleTextConfirm}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
          >
            Apply Text
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditorPanel;