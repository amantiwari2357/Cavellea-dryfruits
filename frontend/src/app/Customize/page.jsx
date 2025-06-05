"use client";
import React, { useState, useEffect } from 'react'; // Import useEffect
import ProgressBar from '../Customize/ProgressBar';
import ColorPicker from '../Customize/ColorPicker';
import CandyPreview from '../Customize/CandyPreview';
import HoverToolbar from '../Customize/HoverToolbar';
import DesignOptions from '../Customize/DesignOptions';
import ActiveCustomizationToolbar from './ActiveCustomizationToolbar';
import PackagingOptions from './PackagingOptions';
import { toast } from "sonner";

const MAX_COLOR_SELECTIONS = 3;

const Customize = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3; // Total steps including the new Packaging step

  // State management for design customizations
  const [selectedImage, setSelectedImage] = useState(null); // Stores the first image object
  const [secondSelectedImage, setSecondSelectedImage] = useState(null); // Stores the second image object
  const [firstLine, setFirstLine] = useState('');
  const [secondLine, setSecondLine] = useState('');
  const [selectedFontStyle, setSelectedFontStyle] = useState('Bold');
  const [selectedClipart, setSelectedClipart] = useState(null);

  // To track which customization is active for toolbar display
  const [activeCustomization, setActiveCustomization] = useState(null); // Can be 'image', 'text', 'clipart', or null

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
    setSelectedImage(null);
    setSecondSelectedImage(null); // Reset the second image as well
    setSelectedClipart(null);
    setFirstLine('');
    setSecondLine('');
    setSelectedFontStyle('Bold');
    setActiveCustomization(null);
    toast.info("Customization reset");
  };

  // NEW HANDLERS for toolbar actions
  const handleEditActiveCustomization = (type) => {
    setActiveCustomization(type);
  };

 const handleRemoveActiveCustomization = (type) => {
  if (type === 'first') {
    setSelectedImage(null);
    toast.info(`First image removed.`);
  } else if (type === 'second') {
    setSecondSelectedImage(null);
    toast.info(`Second image removed.`);
  } else if (type === 'text') {
    setFirstLine('');
    setSecondLine('');
    toast.info(`Text removed.`);
  } else if (type === 'clipart') {
    setSelectedClipart(null);
    toast.info(`Clipart removed.`);
  }

  setActiveCustomization(null);
};


  const handleCancelActiveCustomization = () => {
    setActiveCustomization(null);
  };

  // Render content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 ">
            <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-600 mb-6 text-center">Light colors print best Click color again to remove it.</p>

              {/* CandyPreview component here */}
              <CandyPreview
                selectedColors={selectedColors}
                selectedImage={selectedImage}
                secondSelectedImage={secondSelectedImage}
                firstLine={firstLine}
                secondLine={secondLine}
                selectedFontStyle={selectedFontStyle}
                selectedclipart={selectedClipart}
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
              <p className="text-gray-600 mb-6 text-center">See how your customizations will look on the candies.</p>

              {/* CandyPreview component here */}
              <CandyPreview
                selectedColors={selectedColors}
                selectedImage={selectedImage}
                secondSelectedImage={secondSelectedImage}
                firstLine={firstLine}
                secondLine={secondLine}
                selectedFontStyle={selectedFontStyle}
                selectedclipart={selectedClipart}
              />
            </div>

            {/* Design Options and Preview Circles */}
            <div className="lg:col-span-2 flex">
              <div className="flex-grow">
                {activeCustomization ? (
                  <ActiveCustomizationToolbar
                    activeType={activeCustomization}
                    onEdit={handleEditActiveCustomization}
                    onRemove={handleRemoveActiveCustomization}
                    onCancel={handleCancelActiveCustomization}
                  />
                ) : (
                  <DesignOptions
                    onImageSelect={({ first, second }) => {
                        setSelectedImage(first);
                        setSecondSelectedImage(second);
                    }}
                    onTextChange={(first, second) => {
                      setFirstLine(first);
                      setSecondLine(second);
                    }}
                    onFontStyleChange={setSelectedFontStyle}
                    firstLine={firstLine}
                    secondLine={secondLine}
                    selectedFontStyle={selectedFontStyle}
                    // Pass the current image states to DesignOptions so it can manage them internally
                    firstUploadedImage={selectedImage}
                    secondUploadedImage={secondSelectedImage}
                    onClipartSelect={setSelectedClipart}
                    selectedClipart={selectedClipart}
                    onSelectOption={setActiveCustomization}
                    currentSelectedOption={activeCustomization}
                  />
                )}
              </div>

             {/* Right side: Fixed Preview Panel */}
  <div className="w-24 flex-shrink-0">
    <h4 className="text-2xl font-bold text-gray-700 mb-4 text-center ml-[-190px]">Preview</h4>
    <div className="flex flex-col space-y-6 items-center ml-[-190px]">

{/* flex flex-col space-y-6 items-center ml-[-120px]
esse ham right side preview circle ko ham manage krenge */}

    {/* Image 1 Preview */}
<div
  className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-200
    ${selectedImage ? 'border-2 border-blue-500' : 'border border-gray-300 border-dashed'}
    ${activeCustomization === 'image' && selectedImage ? 'ring-4 ring-blue-500' : ''}
  `}
  onClick={() => selectedImage && setActiveCustomization('image')}
>
  {selectedImage ? (
    <img
      src={selectedImage.src}
      alt="Image 1"
      className="object-cover w-full h-full select-none pointer-events-none transition-transform duration-300"
      style={{
        transform: `translate(${selectedImage.position?.x || 0}px, ${selectedImage.position?.y || 0}px) rotate(${selectedImage.rotation || 0}deg) scale(${selectedImage.zoom ? selectedImage.zoom / 100 : 1})`,
        filter: "grayscale(100%)",
      }}
      draggable={false}
    />
  ) : (
    <span className="text-gray-400 text-xs">Image 1</span>
  )}
</div>

{/* Image 2 Preview */}
<div
  className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-200
    ${secondSelectedImage ? 'border-2 border-blue-500' : 'border border-gray-300 border-dashed'}
    ${activeCustomization === 'secondImage' && secondSelectedImage ? 'ring-4 ring-blue-500' : ''}
  `}
  onClick={() => secondSelectedImage && setActiveCustomization('secondImage')}
>
  {secondSelectedImage ? (
    <img
      src={secondSelectedImage.src}
      alt="Image 2"
      className="object-cover w-full h-full select-none pointer-events-none transition-transform duration-300"
      style={{
        transform: `translate(${secondSelectedImage.position?.x || 0}px, ${secondSelectedImage.position?.y || 0}px) rotate(${secondSelectedImage.rotation || 0}deg) scale(${secondSelectedImage.zoom ? secondSelectedImage.zoom / 100 : 1})`,
        filter: "grayscale(100%)",
      }}
      draggable={false}
    />
  ) : (
    <span className="text-gray-400 text-xs">Image 2</span>
  )}
</div>

      {/* Text Preview */}
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer
          ${(firstLine || secondLine) ? 'border-2 border-blue-500' : 'border border-gray-300 border-dashed'}
          ${activeCustomization === 'text' ? 'ring-4 ring-orange-500' : ''}
        `}
        onClick={() => (firstLine || secondLine) && setActiveCustomization('text')}
      >
        {(firstLine || secondLine) ? (
          <div className="text-xs text-center leading-tight truncate w-10" style={{ fontFamily: selectedFontStyle }}>
            {firstLine && <div>{firstLine}</div>}
            {secondLine && <div>{secondLine}</div>}
          </div>
        ) : (
          <span className="text-gray-400 text-xs">Text</span>
        )}
      </div>

      {/* Clipart Preview */}
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer overflow-hidden
          ${selectedClipart ? 'border-2 border-blue-500' : 'border border-gray-300 border-dashed'}
          ${activeCustomization === 'clipart' ? 'ring-4 ring-green-500' : ''}
        `}
        onClick={() => selectedClipart && setActiveCustomization('clipart')}
      >
        {selectedClipart ? (
          <img src={selectedClipart} alt="Clipart" className="w-12 h-12 object-contain" />
        ) : <span className="text-gray-400 text-xs">Clipart</span>}
      </div>

    </div>
  </div>
</div>

            </div>
            );

      case 3:
        return (
          <PackagingOptions
            selectedImage={selectedImage}
             secondSelectedImage={secondSelectedImage}
            firstLine={firstLine}
            secondLine={secondLine}
            selectedFontStyle={selectedFontStyle}
            selectedClipart={selectedClipart}
            selectedColors={selectedColors}
          />
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
