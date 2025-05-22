'use client';

import { useState } from 'react';

const coupons = [
  { id: 1, title: 'Extra ₹100 Off', description: 'Valid till 31 Mar, 2025', status: 'current' },
  { id: 2, title: 'Liquidation offer of 20% on FS', description: 'Valid till 13 Mar, 2025', status: 'current' },
  { id: 3, title: 'LFA_PD Offer_25%', description: 'Valid till 31 Mar, 2025', status: 'current' },
  { id: 4, title: 'Upcoming Deal - Summer Sale', description: 'Starts from 1 Apr, 2025', status: 'upcoming' },
  { id: 5, title: 'Diwali Festive Offer', description: 'Starts from 10 Oct, 2025', status: 'upcoming' },
  { id: 6, title: 'Winter Clearance Sale', description: 'Expired on 15 Jan, 2025', status: 'expired' },
];

const CouponPage = () => {
  const [filter, setFilter] = useState('current');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Available Coupons</h1>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {['current', 'upcoming', 'expired'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
              filter === tab ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Coupons
          </button>
        ))}
      </div>

      {/* Coupon List */}
      <div className="bg-white shadow-md rounded-lg p-4">
        {coupons.filter(coupon => coupon.status === filter).map(coupon => (
          <div key={coupon.id} className="border-b py-3 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-green-700">{coupon.title}</h2>
              <p className="text-gray-600 text-sm">{coupon.description}</p>
            </div>
            <a href="#" className="text-indigo-600 text-sm font-medium">View T&C</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponPage;
