import React, { useState } from 'react';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import ColorPicker from '../components/ColorPicker';
import CandyPreview from '../components/CandyPreview';
import HoverToolbar from '../components/HoverToolbar';
import DesignOptions from '../components/DesignOptions';
import { toast } from "sonner";
// import StepNavigation from '../components/StepNavigation';

const MAX_COLOR_SELECTIONS = 3;

const Customize = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleColorSelection = (colors) => {
    setSelectedColors(colors);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Submit or finalize order
      toast.success("Thank you for your order! Proceeding to checkout...");
    }
  };
  
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleReset = () => {
    setSelectedColors([]);
    toast.info("Color selection reset");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-4xl font-bold mb-4">choose up to three colors</h2>
              <p className="text-gray-600 mb-6">Light colors print best. Dark colors identified with '*' cannot be customized.<br />Click color again to remove it.</p>
              <CandyPreview selectedColors={selectedColors} />
            </div>
            <div className="lg:col-span-2">
              <ColorPicker 
                selectedColors={selectedColors} 
                onSelectColor={handleColorSelection} 
                maxSelections={MAX_COLOR_SELECTIONS} 
              />
            </div>
          </div>
        );
      case 2:
        return <DesignOptions />;
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HoverToolbar onReset={handleReset} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 relative">
            <ProgressBar currentStep={currentStep} />
          </div>
          
          {renderStepContent()}
          
          <div className="mt-8 flex justify-between">
            <button
              onClick={handlePrev}
              className={`px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 ${currentStep === 1 ? 'invisible' : ''}`}
            >
              Back
            </button>
            <button 
              className={`px-8 py-3 rounded-md font-medium ${currentStep === 1 && selectedColors.length === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xl'}`}
              disabled={currentStep === 1 && selectedColors.length === 0}
              onClick={handleNext}
            >
              {currentStep === totalSteps ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Customize;
