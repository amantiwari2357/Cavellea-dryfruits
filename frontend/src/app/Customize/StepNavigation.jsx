export const StepNavigation = ({ currentStep, totalSteps, onNext, onPrev }) => {
  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={onPrev}
        className="bg-gray-500 text-white py-2 px-4 rounded"
        disabled={currentStep === 1}
      >
        Previous
      </button>
      <div className="text-center text-lg">
        Step {currentStep} of {totalSteps}
      </div>
      <button
        onClick={onNext}
        className="bg-candy-orange text-white py-2 px-4 rounded"
        disabled={currentStep === totalSteps}
      >
        Next
      </button>
    </div>
  );
};
