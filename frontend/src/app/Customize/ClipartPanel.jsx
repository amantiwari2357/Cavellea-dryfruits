"use client";
import { useState } from "react";
import clipartdata from "@/app/data/clipartData";

const ClipartPanel = ({ onClipartSelect, selectedImage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCliparts = clipartdata.filter(
    (clipart) =>
      (selectedCategory === "All" || clipart.category === selectedCategory) &&
      clipart.alt &&
      clipart.alt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-6 p-4 border rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-bold">Choose Clipart</h4>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search cliparts..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="All">All Categories</option>
          <option value="Graduation">Graduation</option>
          <option value="Birthday">Birthday</option>
          <option value="Wedding">Wedding</option>
          <option value="Holiday">Holiday</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-4">
        {filteredCliparts.map((clipart, index) => (
          <div
            key={index}
            onClick={() => onClipartSelect(clipart.src)}
            className={`cursor-pointer p-1 rounded-md ${
              selectedImage === clipart.src ? "ring-2 ring-yellow-500" : ""
            }`}
          >
            <img
              src={clipart.src}
              alt={clipart.alt}
              className="w-full aspect-square object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClipartPanel;