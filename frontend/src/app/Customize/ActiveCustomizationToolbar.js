import React from 'react';
import { Edit, Trash2, XCircle } from 'lucide-react';

const ActiveCustomizationToolbar = ({ activeType, onRemove, onCancel }) => {
  const typeDisplay = activeType ? activeType.charAt(0).toUpperCase() + activeType.slice(1) : '';

  return (
<div className="w-[300px] p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl flex flex-col space-y-8 items-center border border-gray-100">
      <h3 className="text-3xl font-extrabold text-gray-800 mb-4 text-center tracking-tight">
        {typeDisplay} Options
      </h3>
      {/* Remove Button */}
      <button
        onClick={() => onRemove(activeType)}
        className="flex flex-col items-center justify-center w-32 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
      >
        <Trash2 className="h-8 w-8 mb-2 text-white" strokeWidth={2} /> {/* Reduced icon size slightly */}
        <span className="text-lg font-bold">Remove</span> {/* Reduced text size slightly */}
      </button>

      {/* Cancel Button */}
      <button
        onClick={onCancel}
        className="flex flex-col items-center justify-center w-32 py-4 bg-gray-200 text-gray-700 rounded-xl shadow-md hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
      >
        <XCircle className="h-8 w-8 mb-2 text-gray-600" strokeWidth={2} />
        <span className="text-lg font-bold">Cancel</span>
      </button>
    </div>
  );
};

export default ActiveCustomizationToolbar;