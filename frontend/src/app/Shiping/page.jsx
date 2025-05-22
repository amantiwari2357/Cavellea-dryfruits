"use client";
import { useState } from "react";

const shippingDetails = [
  {
    id: 1,
    title: "Shipping Policy",
    content: "We offer fast and secure shipping across all major cities. Orders are processed within 24-48 hours and delivered within 5-7 business days.",
  },
  {
    id: 2,
    title: "Delivery Process",
    content: "Once your order is shipped, you will receive a tracking number via email. Our logistics partners ensure safe and timely delivery to your doorstep.",
  },
  {
    id: 3,
    title: "Shipping Charges",
    content: "Standard shipping is free for orders above ₹999. For orders below this amount, a flat shipping charge of ₹49 applies.",
  },
  {
    id: 4,
    title: "International Shipping",
    content: "We also offer international shipping. Charges vary based on location and package weight. Contact our support team for more details.",
  },
  {
    id: 5,
    title: "Returns & Refunds",
    content: "If you're not satisfied with your order, you can request a return within 7 days of delivery. Refunds are processed within 5-10 business days.",
  },
];

export default function ShippingDelivery() {
  const [selectedSection, setSelectedSection] = useState(shippingDetails[0]);

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside className="md:w-1/4 bg-white shadow-lg border border-gray-200 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping & Delivery</h2>
        <ul className="space-y-2">
          {shippingDetails.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer px-4 py-2 rounded-md transition-all ${
                selectedSection.id === item.id ? "bg-blue-600 text-white font-semibold" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setSelectedSection(item)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* Content Area */}
      <section className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">{selectedSection.title}</h1>
        <p className="text-gray-600 mt-4">{selectedSection.content}</p>
      </section>
    </main>
  );
}
