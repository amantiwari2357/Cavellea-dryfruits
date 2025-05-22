"use client";
import { useState } from "react";

// Policy Details
const policyDetails = {
  "Return Policy": [
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
  ],
  "Privacy Policy": [
    {
      id: 1,
      title: "🔒 What Information We Collect?",
      content: "We collect personal information such as your **name, email, phone number, shipping address**, and payment details when you register, make a purchase, or interact with our services.",
    },
    {
      id: 2,
      title: "🔐 How We Use Your Information?",
      content: "**Your data is used to:**\n- Process orders and payments securely.\n- Provide customer support and resolve disputes.\n- Improve website functionality and user experience.\n- Send promotional emails (only if you opt-in).\n- Prevent fraud and ensure security.",
    },
    {
      id: 3,
      title: "🍪 Cookies & Tracking",
      content: "**We use cookies to:**\n- Enhance your browsing experience.\n- Analyze website traffic and user behavior.\n- Personalize product recommendations.\n- Improve security and prevent fraud.\n\n📌 You can manage cookie preferences in your browser settings.",
    },
    {
      id: 4,
      title: "📜 Data Protection & Security",
      content: "**How we protect your data:**\n- We use **SSL encryption** to secure all transactions.\n- Personal data is **never shared** with third parties without consent.\n- Regular security audits to protect against data breaches.\n- You can request **data deletion** at any time.",
    },
    {
      id: 5,
      title: "📞 Contact for Privacy Concerns",
      content: "For any privacy-related concerns, you can reach us at **privacy@yourwebsite.com** or call **+91 9876543210**.",
    },
  ],
};

export default function PolicyPage() {
  const [selectedCategory, setSelectedCategory] = useState("Privacy Policy"); // Default to Privacy Policy
  const [selectedSection, setSelectedSection] = useState(policyDetails["Privacy Policy"][0]);

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside className="md:w-1/4 bg-white shadow-lg border border-gray-200 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Policies</h2>
        <div className="space-y-4">
          {/* Policy Categories */}
          {Object.keys(policyDetails).map((category) => (
            <div key={category}>
              <button
                className={`w-full text-left font-semibold text-lg px-4 py-2 rounded-md transition-all ${
                  selectedCategory === category ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedSection(policyDetails[category][0]);
                }}
              >
                {category}
              </button>
              {/* Policy Sections */}
              {selectedCategory === category && (
                <ul className="mt-2 space-y-2">
                  {policyDetails[category].map((item) => (
                    <li
                      key={item.id}
                      className={`cursor-pointer px-4 py-2 rounded-md transition-all ${
                        selectedSection.id === item.id ? "bg-yellow-300 text-gray-900 font-semibold border-l-4 border-yellow-600" : "text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => setSelectedSection(item)}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Content Area */}
      <section className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md border-l-8 border-blue-600">
        <h1 className="text-3xl font-bold text-blue-800">{selectedSection.title}</h1>
        <p className="text-gray-600 mt-4 whitespace-pre-line">{selectedSection.content}</p>
      </section>
    </main>
  );
}
