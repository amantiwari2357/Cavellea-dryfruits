"use client";
import React from 'react';

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Colors' },
    { id: 2, name: 'Design' },
    { id: 3, name: 'Packaging' }
  ];

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full py-6 relative">
      {/* Background bar */}
      <div className="relative h-2 bg-gradient-to-r to-indigo-500 rounded-full overflow-hidden shadow-lg">
        {/* Snake-like blue progress bar */}
        <div
          className="h-1 bg-blue-500 transition-all duration-700 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between absolute top-1/2 left-0 right-0 -translate-y-1/2 px-1">
        {steps.map((step) => {
          const isCompleted = step.name < currentStep;
          const isActive = step.name === currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center w-1/3">
              <div className={`w-8 h-8 rounded-full border-2 text-sm flex items-center justify-center transition-all duration-300 ease-in-out 
                ${isCompleted ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-600 scale-110 shadow-lg' :
                 isActive ? 'bg-white border-blue-500 text-blue-600 scale-105 hover:bg-blue-100 hover:border-blue-500' :
                 'bg-white border-gray-300 text-gray-400 hover:bg-gray-100'}`}>
  {isCompleted ? '✓' : isActive ? step.id : step.id}
</div>

              <div className="mt-2 text-base text-center text-red-600 font-semibold tracking-wide drop-shadow-sm">
                {step.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
