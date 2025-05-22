"use client";
import React, { useState } from "react";

const OrderPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviews, setReviews] = useState({});
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);

  const orders = [
    {
      id: "#DRYFRUITS1023",
      date: "10th March 2025",
      product: "Premium Almonds",
      brand: "NutriDelight",
      size: "500g",
      quantity: 2,
      price: "$20",
      status: "Ready for Delivery",
      expectedDelivery: "15th March 2025",
      timeline: [
        { label: "Order Confirmed", date: "Nov 05, 2023" },
        { label: "Delivered", date: "Nov 09, 2023" },
      ],
    },
    {
      id: "#DRYFRUITS1024",
      date: "11th March 2025",
      product: "Dates",
      brand: "California Dates",
      size: "100g",
      quantity: 1,
      price: "$20",
      status: "Ready for Delivery",
      expectedDelivery: "18th March 2025",
      timeline: [
        { label: "Order Confirmed", date: "Nov 05, 2024" },
        { label: "Delivered", date: "March 19, 2025" },
      ],
    },
  ];

  const handleAddReview = (orderId) => {
    if (!newReview.trim()) return;

    setReviews((prevReviews) => ({
      ...prevReviews,
      [orderId]: [...(prevReviews[orderId] || []), { text: newReview, rating, image }],
    }));

    setNewReview("");
    setRating(0);
    setImage(null);
  };

  const handleDeleteReview = (orderId, index) => {
    setReviews((prevReviews) => {
      if (!prevReviews[orderId]) return prevReviews;

      const updatedReviews = [...prevReviews[orderId]];
      updatedReviews.splice(index, 1);

      return { ...prevReviews, [orderId]: updatedReviews };
    });
  };

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-6">Order Summary</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-xl p-6 cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-xl mb-2">{order.product}</h3>
            <p className="text-gray-500">Order ID: {order.id}</p>
            <button
              className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              onClick={() => setSelectedOrder(order.id)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div className="mt-10 border border-gray-300 rounded-xl p-6 relative">
          <button
            className="absolute top-4 right-4 bg-gray-300 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-400"
            onClick={() => setSelectedOrder(null)}
          >
            ✖ Close
          </button>
          <h3 className="text-2xl font-bold mb-4">Order Details</h3>
          {orders.map(
            (order) =>
              order.id === selectedOrder && (
                <div key={order.id}>
                  <p className="text-lg">Product: {order.product}</p>
                  <p className="text-lg">Status: {order.status}</p>
                  <p className="text-lg">
                    Expected Delivery: {order.expectedDelivery}
                  </p>
                  <h4 className="text-xl font-semibold mt-4">Order Timeline</h4>
                  <ul className="border-l-2 border-gray-300 pl-4">
                    {order.timeline.map((event, i) => (
                      <li key={i} className="mb-4 relative">
                        <span className="absolute -left-4 top-1 w-3 h-3 bg-blue-500 rounded-full"></span>
                        <p className="text-lg font-medium">{event.label}</p>
                        <p className="text-gray-500">{event.date}</p>
                      </li>
                    ))}
                  </ul>
                  <button className="mt-4 py-2 px-4 bg-red-600 text-white rounded-full hover:bg-red-700">
                    Cancel Order
                  </button>

                  {/* Reviews Section */}
                  <h4 className="text-xl font-semibold mt-6">Reviews & Ratings</h4>
                  {reviews[order.id]?.map((review, index) => (
                    <div key={index} className="p-4 border rounded-lg mt-2 relative">
                      <p className="font-semibold">Rating: {review.rating}⭐</p>
                      <p>{review.text}</p>
                      {review.image && (
                        <img
                          src={URL.createObjectURL(review.image)}
                          alt="Review"
                          className="mt-2 w-20 h-20 object-cover"
                        />
                      )}
                      <button
                        className="absolute top-2 right-2 text-red-500"
                        onClick={() => handleDeleteReview(order.id, index)}
                      >
                        ❌
                      </button>
                    </div>
                  ))}

                  <textarea
                    className="border rounded w-full p-2 mt-4"
                    placeholder="Write a review..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                  />
                  <input
                    type="number"
                    min="1"
                    max="5"
                    className="border rounded w-full p-2 mt-2"
                    placeholder="Give rating (1-5)"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  />
                  <input
                    type="file"
                    className="mt-2"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                  />
                  <button
                    className="mt-4 py-2 px-4 bg-green-600 text-white rounded-full hover:bg-green-700"
                    onClick={() => handleAddReview(order.id)}
                  >
                    Submit Review
                  </button>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
