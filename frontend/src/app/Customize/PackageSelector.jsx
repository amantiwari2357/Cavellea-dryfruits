
import React from 'react';

const PackageSelector = ({ selectedPackage, onSelectPackage }) => {
  const packages = [
    { id: 'bag', name: 'Party Bag', image: '/placeholder.svg', price: '$9.99' },
    { id: 'box', name: 'Gift Box', image: '/placeholder.svg', price: '$14.99' },
    { id: 'tin', name: 'Fancy Tin', image: '/placeholder.svg', price: '$19.99' },
    { id: 'bulk', name: 'Bulk Pack', image: '/placeholder.svg', price: '$29.99' }
  ];

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">pick your packaging</h2>
      <p className="text-gray-600 mb-6">choose how you want your custom candies delivered</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {packages.map((pkg) => (
          <div 
            key={pkg.id}
            onClick={() => onSelectPackage(pkg.id)}
            className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
              selectedPackage === pkg.id 
                ? 'ring-4 ring-candy-yellow scale-105' 
                : 'hover:shadow-lg'
            }`}
          >
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              <img 
                src={pkg.image} 
                alt={pkg.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 bg-white text-center">
              <h3 className="font-bold">{pkg.name}</h3>
              <p className="text-gray-600">{pkg.price}</p>
            </div>
            {selectedPackage === pkg.id && (
              <div className="absolute top-2 right-2 bg-candy-green text-white p-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageSelector;
