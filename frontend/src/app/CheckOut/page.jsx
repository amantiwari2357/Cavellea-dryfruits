"use client";
import React, { useState } from "react";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    paymentMethod: "Credit Card",
  });

  const cart = [
    { id: 1, name: "Almonds", price: 500, quantity: 2 },
    { id: 2, name: "Cashews", price: 700, quantity: 1 },
  ];
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const adjustedTotalPrice = totalPrice * 0.9; // Example: 10% discount

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("Cart:", cart);
    console.log("Total Price:", totalPrice);
    console.log("Adjusted Total Price:", adjustedTotalPrice);
    console.log("Payment Method:", formData.paymentMethod);
    console.log("Shipping Address:", formData.address);

    alert(`Order Placed Successfully with ${formData.paymentMethod}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Checkout</h2>
      <form onSubmit={onSubmitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side - Payment & Cart Total */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
          <label className="block text-sm font-medium mb-2">Payment Method:</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={onChangeHandler}
            required
            className="w-full p-2 border rounded-md mb-4"
          >
            <option value="Credit Card">Credit Card</option>
            <option value="UPI">UPI</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>

          <h3 className="text-lg font-semibold mt-6">Cart Total</h3>
          <p className="text-gray-600">
            Total Price: <span className="font-semibold">₹{totalPrice}</span>
          </p>
          <p className="text-gray-600">
            Discounted Price: <span className="font-semibold">₹{adjustedTotalPrice}</span>
          </p>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
          >
            Place Order
          </button>
        </div>

        {/* Right Side - Delivery Information */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Delivery Information</h3>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={onChangeHandler}
            required
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={onChangeHandler}
            required
            className="w-full p-2 border rounded-md mb-4"
          />
          <textarea
            name="address"
            placeholder="Enter your shipping address"
            value={formData.address}
            onChange={onChangeHandler}
            required
            className="w-full p-2 border rounded-md mb-4"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={onChangeHandler}
            required
            className="w-full p-2 border rounded-md mb-4"
          />
        </div>
      </form>
    </div>
  );
};

export default Checkout;
