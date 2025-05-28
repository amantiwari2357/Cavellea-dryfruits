"use client";
import React, { useState } from 'react';
import ProgressBar from '../Customize/ProgressBar';
import ColorPicker from '../Customize/ColorPicker';
import CandyPreview from '../Customize/CandyPreview';
import HoverToolbar from '../Customize/HoverToolbar';
import DesignOptions from '../Customize/DesignOptions';
import ActiveCustomizationToolbar from './ActiveCustomizationToolbar'; // Assuming this is in the same directory
import PackagingOptions from './PackagingOptions'; // Make sure you have this component created
import { toast } from "sonner";

const MAX_COLOR_SELECTIONS = 5;

const Customize = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3; // Total steps including the new Packaging step

  // State management for design customizations
  const [selectedImage, setSelectedImage] = useState(null); // Can be null or { src, position, zoom, rotation }
  // NEW STATE: For the second image
  const [secondSelectedImage, setSecondSelectedImage] = useState(null);
  const [firstLine, setFirstLine] = useState('');
  const [secondLine, setSecondLine] = useState('');
  const [selectedFontStyle, setSelectedFontStyle] = useState('Bold');
  const [selectedClipart, setSelectedClipart] = useState(null); // This is correctly separate

  // NEW STATE: To track which customization is active for toolbar display
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
    if (type === 'image') {
      // If removing the main image, also clear the second image, or shift it up
      // For simplicity, let's clear both if 'image' (main) is removed
      setSelectedImage(null);
      setSecondSelectedImage(null);
    } else if (type === 'text') {
      setFirstLine('');
      setSecondLine('');
    } else if (type === 'clipart') {
      setSelectedClipart(null);
    }
    setActiveCustomization(null);
    toast.info(`${type.charAt(0).toUpperCase() + type.slice(1)} removed.`);
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
              <p className="text-gray-600 mb-6 text-center">See how your customizations will look on the candies.</p>

              {/* CandyPreview component here */}
              <CandyPreview
                selectedColors={selectedColors}
                selectedImage={selectedImage}
                secondSelectedImage={secondSelectedImage} 
                firstLine={firstLine}
                secondLine={secondLine}
                selectedFontStyle={selectedFontStyle}
                selectedclipart={selectedClipart} // Pass clipart here
              />
            </div>

            {/* Design Options and Preview Circles */}
            <div className="lg:col-span-2 flex"> {/* Changed to flex to align sidebar and circles */}
              {/* Design options or Active Customization Toolbar */}
              <div className="flex-grow"> {/* Allows this div to take available space */}
                {activeCustomization ? (
                  <ActiveCustomizationToolbar
                    activeType={activeCustomization}
                    onEdit={handleEditActiveCustomization}
                    onRemove={handleRemoveActiveCustomization}
                    onCancel={handleCancelActiveCustomization}
                  />
                ) : (
                  <DesignOptions
                    onImageSelect={setSelectedImage} // This handles the main image
                    // You'll need a way for DesignOptions to set the second image.
                    // For now, I'm assuming DesignOptions might internally manage multiple images
                    // or you'll extend it to have an `onSecondImageSelect` prop.
                    // For a simpler approach, you might have separate upload buttons in DesignOptions
                    // for 'Image 1' and 'Image 2', each calling a different state setter.
                    // If DesignOptions handles the 'next image' logic, it should update secondSelectedImage.
                    onTextChange={(first, second) => {
                      setFirstLine(first);
                      setSecondLine(second);
                    }}
                    onFontStyleChange={setSelectedFontStyle}
                    firstLine={firstLine}
                    secondLine={secondLine}
                    selectedFontStyle={selectedFontStyle}
                    selectedImage={selectedImage}
                    onClipartSelect={setSelectedClipart}
                    selectedClipart={selectedClipart}
                    onSelectOption={setActiveCustomization}
                    currentSelectedOption={activeCustomization}
                    // Pass the second image state setter if DesignOptions will handle it
                    // Example: onSecondImageSelect={setSecondSelectedImage}
                    // Or pass the current second image for internal display logic in DesignOptions
                    secondSelectedImage={secondSelectedImage}
                    setSecondSelectedImage={setSecondSelectedImage}
                  />
                )}
              </div>

              {/* Preview circles on the right */}
              <div className="flex flex-col space-y-10 items-start justify-center pl-4">

                {/* First Image preview circle */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer overflow-hidden
                    ${selectedImage ? 'border-2 border-blue-500' : 'border border-gray-300 border-dashed'}
                    ${activeCustomization === 'image' && selectedImage ? 'ring-4 ring-blue-500' : ''}
                  `}
                  onClick={() => selectedImage && setActiveCustomization('image')}
                >
                  {selectedImage ? (
                    <img
                      src={typeof selectedImage === 'object' ? selectedImage.src : selectedImage}
                      alt="Selected Image 1"
                      className="object-cover"
                      style={{
                        transform: selectedImage.position ? `translate(${selectedImage.position.x}px, ${selectedImage.position.y}px) rotate(${selectedImage.rotation}deg) scale(${selectedImage.zoom / 100})` : 'none',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">Image 1</span> // Placeholder if no image
                  )}
                </div>

                {/* Second Image preview circle */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer overflow-hidden
                    ${secondSelectedImage ? 'border-2 border-blue-500' : 'border border-gray-300 border-dashed'}
                    ${activeCustomization === 'secondImage' && secondSelectedImage ? 'ring-4 ring-blue-500' : ''}
                  `}
                  // You'll need to define what 'secondImage' means for activeCustomization
                  // For now, let's assume a new type 'secondImage' for this.
                  onClick={() => secondSelectedImage && setActiveCustomization('secondImage')}
                >
                  {secondSelectedImage ? (
                    <img
                      src={typeof secondSelectedImage === 'object' ? secondSelectedImage.src : secondSelectedImage}
                      alt="Selected Image 2"
                      className="object-cover"
                      style={{
                        // Apply transformations if secondSelectedImage also stores position, zoom, rotation
                        transform: secondSelectedImage.position ? `translate(${secondSelectedImage.position.x}px, ${secondSelectedImage.position.y}px) rotate(${secondSelectedImage.rotation}deg) scale(${secondSelectedImage.zoom / 100})` : 'none',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">Image 2</span> // Placeholder if no second image
                  )}
                </div>


                {/* Text preview circle */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer
                    ${(firstLine || secondLine) ? 'border-2 border-blue-500' : 'border border-gray-300 border-dashed'}
                    ${activeCustomization === 'text' ? 'ring-4 ring-orange-500' : ''}
                  `}
                  onClick={() => (firstLine || secondLine) && setActiveCustomization('text')}
                >
                  {(firstLine || secondLine) ? (
                    <div className={`text-xs text-center leading-tight truncate w-10`} style={{ fontFamily: selectedFontStyle }}>
                      {firstLine && <div>{firstLine}</div>}
                      {secondLine && <div>{secondLine}</div>}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">Text</span> // Placeholder for text
                  )}
                </div>

                {/* Clipart preview circle */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer overflow-hidden
                    ${selectedClipart ? 'border-2 border-blue-500' : 'border border-gray-300 border-dashed'}
                    ${activeCustomization === 'clipart' ? 'ring-4 ring-green-500' : ''}
                  `}
                  onClick={() => selectedClipart && setActiveCustomization('clipart')}
                >
                  {selectedClipart ? (
                    <img
                      src={typeof selectedClipart === 'object' ? selectedClipart.src : selectedClipart}
                      alt="Selected Clipart"
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">Clipart</span> // Placeholder for clipart
                  )}
                </div>
              </div>
            </div>

          </div>

        );

      case 3:
        return (
          <PackagingOptions
            selectedImage={selectedImage}
            firstLine={firstLine}
            secondLine={secondLine}
            selectedFontStyle={selectedFontStyle}
            selectedClipart={selectedClipart}
            selectedColors={selectedColors} // Pass selected colors for random candy background
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
                currentStep === 1 && selectedColors.length === 0 // Condition for step 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xl'
              }`}
              disabled={currentStep === 1 && selectedColors.length === 0} // Disable if no colors selected on step 1
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