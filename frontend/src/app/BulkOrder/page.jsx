"use client";
import { useState } from "react";

export default function BulkOrderPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    quantity: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bulk Order Request Submitted:", formData);
    alert("Your bulk order request has been submitted!");
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-blue-600">Bulk Order Guide</h1>
      <p className="text-center text-gray-600 mt-2">
        Order large quantities with special pricing and faster delivery.
      </p>

      {/* Step-by-Step Guide */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800">How to Place a Bulk Order</h2>
        <ul className="mt-4 space-y-4">
          <li className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <span className="font-bold">Step 1:</span> Fill out the bulk order inquiry form below.
          </li>
          <li className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <span className="font-bold">Step 2:</span> Our team will contact you within 24-48 hours.
          </li>
          <li className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <span className="font-bold">Step 3:</span> Discuss pricing, shipping, and delivery details.
          </li>
          <li className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <span className="font-bold">Step 4:</span> Confirm your order and make the payment.
          </li>
          <li className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <span className="font-bold">Step 5:</span> Receive your bulk order on time.
          </li>
        </ul>
      </section>

      {/* Bulk Order Inquiry Form */}
      <section className="mt-10 bg-white shadow-md p-6 rounded-lg border">
        <h2 className="text-2xl font-semibold text-gray-800">Bulk Order Inquiry Form</h2>
        <p className="text-gray-600">Fill in the details and we will get back to you.</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 border rounded-md"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-md"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name (Optional)"
            className="w-full p-3 border rounded-md"
            value={formData.company}
            onChange={handleChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity Required"
            className="w-full p-3 border rounded-md"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Additional Message"
            className="w-full p-3 border rounded-md"
            rows={4}
            value={formData.message}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Submit Inquiry
          </button>
        </form>
      </section>

      {/* FAQ Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-4">
          <details className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <summary className="font-semibold cursor-pointer">Is there a minimum order quantity?</summary>
            <p className="mt-2 text-gray-700">Yes, the minimum quantity depends on the product type. Contact us for details.</p>
          </details>
          <details className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <summary className="font-semibold cursor-pointer">Do you offer bulk discounts?</summary>
            <p className="mt-2 text-gray-700">Yes! The discount depends on the quantity and type of product.</p>
          </details>
          <details className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <summary className="font-semibold cursor-pointer">Can I request a sample before ordering in bulk?</summary>
            <p className="mt-2 text-gray-700">Yes, we provide samples for select products. Reach out to us for more details.</p>
          </details>
        </div>
      </section>
    </main>
  );
}
