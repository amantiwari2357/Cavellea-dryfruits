"use client";
import React, { useState } from 'react';
import ProgressBar from '../Customize/ProgressBar';
import ColorPicker from '../Customize/ColorPicker';
import CandyPreview from '../Customize/CandyPreview';
import HoverToolbar from '../Customize/HoverToolbar';
import DesignOptions from '../Customize/DesignOptions';
import { toast } from "sonner";

const MAX_COLOR_SELECTIONS = 5;

const Customize = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // State management for design customizations
  const [selectedImage, setSelectedImage] = useState(null);
  const [firstLine, setFirstLine] = useState('');
  const [secondLine, setSecondLine] = useState('');
  const [selectedFontStyle, setSelectedFontStyle] = useState('Bold');
  const [selectedClipart, setSelectedClipart] = useState(null); // This is correctly separate

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
    setSelectedImage(null); // Reset image
    setSelectedClipart(null); // Reset clipart
    setFirstLine(''); // Reset text
    setSecondLine(''); // Reset text
    setSelectedFontStyle('Bold'); // Reset font style
    toast.info("Customization reset");
  };

  // Render content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 ">
            <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-4xl font-bold mb-4">choose up to three colors</h2>
              <p className="text-gray-600 mb-6">Light colors print best.<br />Click color again to remove it.</p>

              {/* CandyPreview component here */}
              <CandyPreview
                selectedColors={selectedColors}
                selectedImage={selectedImage}
                firstLine={firstLine}
                secondLine={secondLine}
                selectedFontStyle={selectedFontStyle}
                selectedclipart={selectedClipart} // Pass clipart here
              />
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
        return (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-4xl font-bold mb-6">preview your design</h2>
              <p className="text-gray-600 mb-6">See how your customizations will look on the candies.</p>

              {/* CandyPreview component here */}
              <CandyPreview
                selectedColors={selectedColors}
                selectedImage={selectedImage}
                firstLine={firstLine}
                secondLine={secondLine}
                selectedFontStyle={selectedFontStyle}
                selectedclipart={selectedClipart} // Pass clipart here
              />
            </div>

            {/* Design Options and Preview Circles */}
            <div className="lg:col-span-2">
              <div className="flex">
                {/* Design options on the left */}
                <div className="flex-grow">
                  <DesignOptions
                    onImageSelect={setSelectedImage}
                    onTextChange={(first, second) => {
                      setFirstLine(first);
                      setSecondLine(second);
                    }}
                    onFontStyleChange={setSelectedFontStyle}
                    firstLine={firstLine}
                    secondLine={secondLine}
                    selectedFontStyle={selectedFontStyle}
                    selectedImage={selectedImage}
                    onClipartSelect={setSelectedClipart} // Pass the setter for clipart
                  />
                </div>

                {/* Preview circles on the right */}
                <div className="flex flex-col space-y-10 items-center justify-center pl-14">
                  {/* Image preview circle */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${selectedImage ? 'border-2 border-black' : 'border border-gray-300 border-dashed'}`}>
                    {selectedImage ? (
                      <img
                        src={typeof selectedImage === 'object' ? selectedImage.src : selectedImage}
                        alt="Selected Image"
                        className="w-12 h-12 object-contain"
                      />
                    ) : null}
                  </div>

                  {/* Text preview circle */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${(firstLine || secondLine) ? 'border-2 border-black' : 'border border-gray-300 border-dashed'}`}>
                    {(firstLine || secondLine) ? (
                      <div className={`text-xs text-center leading-tight truncate w-10`}>
                        {firstLine && <div>{firstLine}</div>}
                        {secondLine && <div>{secondLine}</div>}
                      </div>
                    ) : null}
                  </div>

                  {/* Clipart preview circle - CORRECTED LOGIC */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    selectedClipart
                      ? 'border-2 border-black'
                      : 'border border-gray-300 border-dashed'
                  }`}>
                    {selectedClipart ? ( // Only render if selectedClipart is not null
                      <img
                        src={typeof selectedClipart === 'object' ? selectedClipart.src : selectedClipart} // Get src if object, else use directly
                        alt="Selected Clipart"
                        className="w-12 h-12 object-contain"
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HoverToolbar onReset={handleReset} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8 relative">
            <ProgressBar currentStep={currentStep} />
          </div>

          {renderStepContent()}

          {/* Single Navigation Button Area */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={handlePrev}
              className={`px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 ${currentStep === 1 ? 'invisible' : ''}`}
            >
              Back
            </button>

            <button
              className={`px-8 py-3 rounded-md font-medium ${
                currentStep === 1 && selectedColors.length === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xl'
              }`}
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