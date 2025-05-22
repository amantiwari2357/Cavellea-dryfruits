"use client";
import React, { useState } from "react";

const notificationsData = [
  { id: 1, message: "Flat 20% off on Almonds!", date: "10 Mar 2025", type: "Discount" },
  { id: 2, message: "New stock available for Cashews.", date: "09 Mar 2025", type: "Stock Update" },
  { id: 3, message: "Special Offer: Buy 1 Get 1 Free on Dates!", date: "08 Mar 2025", type: "Offer" },
  { id: 4, message: "Limited stock left for Walnuts!", date: "07 Mar 2025", type: "Stock Update" },
  { id: 5, message: "Exclusive Deal: 15% off on Raisins!", date: "06 Mar 2025", type: "Discount" },
];

const NotificationPage = () => {
  const [selectedType, setSelectedType] = useState("All");

  const filteredNotifications =
    selectedType === "All"
      ? notificationsData
      : notificationsData.filter((notification) => notification.type === selectedType);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Dry Fruits Notifications</h1>

      {/* Filter Options */}
      <div className="flex justify-center space-x-4 mb-6">
        {["All", "Discount", "Stock Update", "Offer"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-md ${
              selectedType === type ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div key={notification.id} className="border p-4 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">{notification.message}</p>
            <p className="text-gray-500 text-sm">{notification.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;