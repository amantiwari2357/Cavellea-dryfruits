"use client";
import React from "react";

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { id: 1, name: "Colors", symbol: "🎨" },
    { id: 2, name: "Design", symbol: "🖌️" },
    { id: 3, name: "Packaging", symbol: "📦" },
  ];

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full py-10 relative">
      {/* Background bar */}
      <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
        {/* Striped and animated fill */}
        <div
          className="h-3 rounded-full overflow-hidden transition-all duration-700 ease-in-out progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between absolute top-1/2 left-0 right-0 -translate-y-1/2 px-2">
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center w-1/3">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg font-medium transition-all duration-300 ease-in-out
                  ${
                    isCompleted
                      ? "bg-emerald-500 text-white border-emerald-600 shadow-lg"
                      : isActive
                      ? "bg-white text-emerald-600 border-emerald-500 shadow-sm scale-105"
                      : "bg-white text-slate-400 border-slate-300"
                  }`}
              >
                {isCompleted ? "✓" : step.symbol}
              </div>
              <div
                className={`mt-3 text-sm font-semibold ${
                  isCompleted
                    ? "text-emerald-700"
                    : isActive
                    ? "text-emerald-600"
                    : "text-slate-400"
                }`}
              >
                {step.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stripe animation style */}
      <style jsx>{`
        .progress-fill {
          background-image: repeating-linear-gradient(
            45deg,
            #10b981,
            #10b981 10px,
            #059669 10px,
            #059669 20px
          );
          animation: progressMove 1s linear infinite;
        }

        @keyframes progressMove {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 40px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;
