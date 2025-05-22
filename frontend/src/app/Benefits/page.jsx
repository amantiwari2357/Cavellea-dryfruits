"use client";
import { useState } from "react";

const sidebarOptions = [
  { id: 1, title: "About Us", content: "We are a leading dry fruit e-commerce brand, providing premium quality organic products to customers worldwide." },
  { id: 2, title: "Why Choose Us?", content: "We provide 100% organic and fresh dry fruits, sourced from the best farms worldwide." },
  { id: 3, title: "Our Quality", content: "Premium quality dry fruits with no preservatives, ensuring natural taste and health benefits." },
  { id: 4, title: "Fast Delivery", content: "We offer fast and secure delivery so you get the freshest products quickly." },
  { id: 5, title: "Affordable Prices", content: "Best prices in the market with seasonal discounts and bulk purchase offers." },
  { id: 6, title: "Customer Support", content: "Our 24/7 customer support ensures you always get the best service." },
];

export default function SidebarExample() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(sidebarOptions[0]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-6 relative">
      {/* Mobile Sidebar Button */}
      <button
        className="md:hidden bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
        onClick={() => setSidebarOpen(true)}
      >
        Open Menu
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg border-r border-gray-200 p-6 transition-transform duration-300 md:relative md:w-1/4 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Menu</h2>
          {/* Close button for mobile */}
          <button
            className="md:hidden text-red-600 text-lg font-bold"
            onClick={() => setSidebarOpen(false)}
          >
            ✖
          </button>
        </div>
        <ul className="space-y-2">
          {sidebarOptions.map((option) => (
            <li
              key={option.id}
              className={`cursor-pointer px-4 py-2 rounded-md transition-all ${
                selectedOption.id === option.id
                  ? "bg-blue-600 text-white font-semibold shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                setSelectedOption(option);
                setSidebarOpen(false); // Close sidebar on mobile
              }}
            >
              {option.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Dynamic Content */}
      <section className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">{selectedOption.title}</h1>
        <p className="text-gray-600 mt-4">{selectedOption.content}</p>
      </section>
    </main>
  );
}
