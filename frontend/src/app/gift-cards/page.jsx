"use client";
import React, { useState } from "react";

const giftCardsData = [
  { id: 1, name: "Almonds Gift Card", price: "$50", expiry: "31 Dec 2025", category: "Nuts", image: "https://via.placeholder.com/100" },
  { id: 2, name: "Cashews Gift Card", price: "$30", expiry: "31 Jan 2026", category: "Nuts", image: "https://via.placeholder.com/100" },
  { id: 3, name: "Walnuts Gift Card", price: "$40", expiry: "30 Nov 2025", category: "Premium", image: "https://via.placeholder.com/100" },
  { id: 4, name: "Dates Gift Card", price: "$25", expiry: "15 Oct 2025", category: "Dried Fruits", image: "https://via.placeholder.com/100" },
  { id: 5, name: "Raisins Gift Card", price: "$20", expiry: "10 Sep 2025", category: "Dried Fruits", image: "https://via.placeholder.com/100" },
];

const GiftCardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCards =
    selectedCategory === "All"
      ? giftCardsData
      : giftCardsData.filter((card) => card.category === selectedCategory);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Dry Fruits Gift Cards</h1>

      {/* Category Filters */}
      <div className="flex justify-center space-x-4 mb-6">
        {["All", "Nuts", "Dried Fruits", "Premium"].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === category ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gift Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCards.map((card) => (
          <div key={card.id} className="border p-4 rounded-lg shadow-lg flex items-center">
            <img src={card.image} alt={card.name} className="w-20 h-20 object-cover mr-4" />
            <div>
              <h2 className="text-lg font-semibold">{card.name}</h2>
              <p className="text-gray-600">Price: {card.price}</p>
              <p className="text-gray-500">Expiry: {card.expiry}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftCardPage;
