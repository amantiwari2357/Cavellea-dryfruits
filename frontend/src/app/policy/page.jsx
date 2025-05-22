"use client";
import { useState } from "react";

// Return Policy Details
const returnPolicyDetails = [
  {
    id: 1,
    title: "Return Eligibility",
    content: "Items can be returned within 7 days of delivery if they are unused, in original packaging, and in resalable condition. Perishable items like food products cannot be returned.",
  },
  {
    id: 2,
    title: "Refund Process",
    content: "Once we receive the returned item, it will be inspected. If approved, the refund will be processed within 5-10 business days via the original payment method.",
  },
  {
    id: 3,
    title: "Exchange Policy",
    content: "We offer product exchanges for defective or damaged items. Customers must provide proof of damage via photos within 48 hours of receiving the order.",
  },
  {
    id: 4,
    title: "Non-Returnable Items",
    content: "Gift cards, personalized items, and perishable goods like food or flowers are not eligible for return or exchange.",
  },
  {
    id: 5,
    title: "Return Shipping",
    content: "Customers are responsible for return shipping charges unless the product is defective or incorrect. In such cases, we will provide a prepaid return label.",
  },
  {
    id: 6,
    title: "How to Initiate a Return?",
    content: "To initiate a return, contact our support team via email or call our helpline. We will guide you through the return process and provide a return shipping address.",
  },
];

export default function ReturnPolicy() {
  const [selectedSection, setSelectedSection] = useState(returnPolicyDetails[0]); // Default open first section

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside className="md:w-1/4 bg-white shadow-lg border border-gray-200 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Return Policy</h2>
        <ul className="space-y-2">
          {returnPolicyDetails.map((item) => (
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
