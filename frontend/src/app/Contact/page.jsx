"use client";
import { useState } from "react";
import Image from "next/image";

// Sidebar Options
const sidebarOptions = [
  { id: "contact", title: "Contact Us", content: "" }, // Contact Us is default now
  { id: "about", title: "About Us", content: "We are a leading dry fruit e-commerce brand, providing premium quality organic products to customers worldwide." },
  { id: "why-choose", title: "Why Choose Us?", content: "We provide 100% organic and fresh dry fruits, sourced from the best farms worldwide." },
  { id: "products", title: "Our Products", content: "" }, // Products displayed dynamically
];

// Products Data
const products = [
  { id: 1, name: "Premium Almonds", price: 499, image: "/images/almonds.jpg", description: "Fresh and crunchy premium quality almonds." },
  { id: 2, name: "Cashew Nuts", price: 599, image: "/images/cashews.jpg", description: "Rich and creamy cashew nuts, perfect for snacking." },
  { id: 3, name: "Walnuts", price: 699, image: "/images/walnuts.jpg", description: "Organic walnuts with amazing health benefits." },
  { id: 4, name: "Pistachios", price: 649, image: "/images/pistachios.jpg", description: "Salted and roasted pistachios for an irresistible taste." },
];

export default function SidebarExample() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    sidebarOptions.find(option => option.id === "contact") || sidebarOptions[0]
  ); // Ensuring selectedOption is never undefined

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-6 relative">
      {/* Mobile Sidebar Button */}
      <button className="md:hidden bg-blue-600 text-white px-4 py-2 rounded-md mb-4" onClick={() => setSidebarOpen(true)}>
        Open Menu
      </button>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg border-r border-gray-200 p-6 transition-transform duration-300 md:relative md:w-1/4 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Menu</h2>
          <button className="md:hidden text-red-600 text-lg font-bold" onClick={() => setSidebarOpen(false)}>✖</button>
        </div>
        <ul className="space-y-2">
          {sidebarOptions.map((option) => (
            <li key={option.id} className={`cursor-pointer px-4 py-2 rounded-md transition-all ${selectedOption.id === option.id ? "bg-blue-600 text-white font-semibold shadow-md" : "text-gray-700 hover:bg-gray-100"}`} onClick={() => {
              setSelectedOption(option);
              setSidebarOpen(false); // Close sidebar on mobile
            }}>
              {option.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay for Mobile */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>}

      {/* Dynamic Content */}
      <section className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">{selectedOption.title}</h1>
        <p className="text-gray-600 mt-4">{selectedOption.content}</p>
      </section>
    </main>
  );
}
