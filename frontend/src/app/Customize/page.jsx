"use client";
import React, { useState } from 'react';
import ProgressBar from '../Customize/ProgressBar';
import ColorPicker from '../Customize/ColorPicker';
import CandyPreview from '../Customize/CandyPreview';
import HoverToolbar from '../Customize/HoverToolbar';
import DesignOptions from '../Customize/DesignOptions';
import ActiveCustomizationToolbar from './ActiveCustomizationToolbar'; // Import the new toolbar component
import { toast } from "sonner";

const MAX_COLOR_SELECTIONS = 5;


const Customize = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // State management for design customizations
  const [selectedImage, setSelectedImage] = useState(null); // Can be null or { src, position, zoom, rotation }
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
    setSelectedImage(null); // Reset image
    setSelectedClipart(null); // Reset clipart
    setFirstLine(''); // Reset text
    setSecondLine(''); // Reset text
    setSelectedFontStyle('Bold'); // Reset font style
    setActiveCustomization(null); // Reset active customization too
    toast.info("Customization reset");
  };

  // NEW HANDLERS for toolbar actions
  const handleEditActiveCustomization = (type) => {
    setActiveCustomization(type); // Set which type is active for editing in DesignOptions
    // DesignOptions will use this 'activeCustomization' prop to determine which panel to open.
  };

  const handleRemoveActiveCustomization = (type) => {
    if (type === 'image') {
      setSelectedImage(null);
    } else if (type === 'text') {
      setFirstLine('');
      setSecondLine('');
    } else if (type === 'clipart') {
      setSelectedClipart(null);
    }
    setActiveCustomization(null); // Clear active selection after removal
    toast.info(`${type.charAt(0).toUpperCase() + type.slice(1)} removed.`);
  };

  const handleCancelActiveCustomization = () => {
    setActiveCustomization(null); // Just close the toolbar, no change to customization data
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
                    onImageSelect={setSelectedImage}
                    onTextChange={(first, second) => {
                      setFirstLine(first);
                      setSecondLine(second);
                    }}
                    onFontStyleChange={setSelectedFontStyle}
                    firstLine={firstLine}
                    secondLine={secondLine}
                    selectedFontStyle={selectedFontStyle}
                    selectedImage={selectedImage} // Pass the processed image object
                    onClipartSelect={setSelectedClipart} // Pass the setter for clipart
                    selectedClipart={selectedClipart} // Pass current selected clipart for highlighting
                    onSelectOption={setActiveCustomization} // Pass callback for radio button selection
                    currentSelectedOption={activeCustomization} // Pass current active option for radio button state
                  />
                )}
              </div>

              {/* Preview circles on the right */}
              <div className="flex flex-col space-y-10 items-center justify-center pl-14">
                {/* Image preview circle */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer overflow-hidden
                    ${selectedImage ? 'border-2 border-black' : 'border border-gray-300 border-dashed'}
                    ${activeCustomization === 'image' ? 'ring-4 ring-blue-500' : ''}
                  `}
                  onClick={() => selectedImage && setActiveCustomization('image')} // Make clickable if image exists
                >
                  {selectedImage ? (
                    <img
                      // Use a style to apply transformations within the preview circle
                      src={typeof selectedImage === 'object' ? selectedImage.src : selectedImage}
                      alt="Selected Image"
                      className="object-cover" // Ensure it covers the space within the circle
                      style={{
                        transform: `translate(${selectedImage.position.x}px, ${selectedImage.position.y}px) rotate(${selectedImage.rotation}deg) scale(${selectedImage.zoom / 100})`,
                        width: '100%', // Take full width of parent div
                        height: '100%', // Take full height of parent div
                      }}
                    />
                  ) : null}
                </div>

                {/* Text preview circle */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer
                    ${(firstLine || secondLine) ? 'border-2 border-black' : 'border border-gray-300 border-dashed'}
                    ${activeCustomization === 'text' ? 'ring-4 ring-orange-500' : ''}
                  `}
                  onClick={() => (firstLine || secondLine) && setActiveCustomization('text')} // Make clickable if text exists
                >
                  {(firstLine || secondLine) ? (
                    <div className={`text-xs text-center leading-tight truncate w-10`} style={{ fontFamily: selectedFontStyle }}>
                      {firstLine && <div>{firstLine}</div>}
                      {secondLine && <div>{secondLine}</div>}
                    </div>
                  ) : null}
                </div>

                {/* Clipart preview circle */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer overflow-hidden
                    ${selectedClipart ? 'border-2 border-black' : 'border border-gray-300 border-dashed'}
                    ${activeCustomization === 'clipart' ? 'ring-4 ring-green-500' : ''}
                  `}
                  onClick={() => selectedClipart && setActiveCustomization('clipart')} // Make clickable if clipart exists
                >
                  {selectedClipart ? ( // Only render if selectedClipart is not null
                    <img
                      src={selectedClipart} // Clipart is expected to be just a string URL
                      alt="Selected Clipart"
                      className="w-12 h-12 object-contain"
                    />
                  ) : null}
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