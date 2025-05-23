"use client";
import React, { useState, useRef, useEffect } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ImageIcon, TypeIcon, Palette, MoveHorizontal, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const DesignOptions = ({
  onImageSelect,
  onTextChange,
  onFontStyleChange,
  firstLine,
  secondLine,
  selectedFontStyle,
  selectedImage, // This is the processed image from CandyPreview
  onClipartSelect // <-- NEW PROP: Function to update selectedClipart in parent
}) => {
  const [showTextFields, setShowTextFields] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showClipartPanel, setShowClipartPanel] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const [tempFirstLine, setTempFirstLine] = useState(firstLine);
  const [tempSecondLine, setTempSecondLine] = useState(secondLine);
  const [tempFontStyle, setTempFontStyle] = useState(selectedFontStyle);

  // Image editing state
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [editingImage, setEditingImage] = useState(null); // This holds the raw uploaded image dataURL for editing
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageZoom, setImageZoom] = useState(100); // Range 50-150
  const [imageRotation, setImageRotation] = useState(0); // Range 0-360

  // Selected design option (radio button)
  const [selectedOption, setSelectedOption] = useState("none"); // none, image, text, clipart

  const fontStyles = [
    "Bold",
    "Regular",
    "Light",
    "Script",
    "Italic",
    "Monospace",
  ];

  // Sample cliparts
  const allCliparts = [
    { src: '/images/cliparts1.avif', alt: 'Graduation Cap', category: 'Graduation' },
    { src: '/images/cliparts2.avif', alt: 'Class of 2024', category: 'Graduation' },
    { src: '/images/cliparts3.avif', alt: 'Star', category: 'Birthday' },
    { src: '/images/cliparts4.avif', alt: 'Heart', category: 'Wedding' },
    { src: '/images/cliparts5.avif', alt: 'Tree', category: 'Holiday' },
    { src: '/images/cliparts6.avif', alt: 'Cake', category: 'Birthday' },
    { src: '/images/cliparts7.avif', alt: 'Wedding Ring', category: 'Wedding' },
    { src: '/images/cliparts8.avif', alt: 'Gift Box', category: 'Holiday' },
    { src: '/images/cliparts9.avif', alt: 'Graduation Cap', category: 'Graduation' },
    { src: '/images/cliparts10.avif', alt: 'Graduation Cap', category: 'Graduation' },
    { src: '/images/cliparts11.avif', alt: 'Graduation Cap', category: 'Graduation' },
    { src: '/images/cliparts12.avif', alt: 'Graduation Cap', category: 'Graduation' },
    { src: '/images/cliparts13.avif', alt: 'Graduation Cap', category: 'Graduation' },
    { src: '/images/cliparts14.avif', alt: 'Graduation Cap', category: 'Graduation' },
  ];

  const filteredCliparts = allCliparts.filter(
    clipart =>
      (selectedCategory === 'All' || clipart.category === selectedCategory) &&
      clipart.alt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setEditingImage(imageUrl); // Set the image for the editor
        setShowImageEditor(true); // Show the editor
        setShowImageUpload(false); // Hide the upload panel
        // Reset image transformation values for new image
        setImagePosition({ x: 0, y: 0 });
        setImageZoom(100);
        setImageRotation(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    if (agreeTerms) {
      fileInputRef.current.click();
    }
  };

  const handleTextConfirm = () => {
    onTextChange(tempFirstLine, tempSecondLine);
    onFontStyleChange(tempFontStyle);
    setShowTextFields(false);
    // No need to change selectedOption here, as text can coexist with image/clipart
  };

  const handleClipartSelect = (src) => {
    // Pass the selected clipart URL up to the parent
    onClipartSelect(src); // <-- CORRECTED: Use onClipartSelect
    setShowClipartPanel(false);
    // Don't set selectedOption to "clipart" here if you want multiple active selections.
    // The radio button merely *opens* the clipart panel, not dictates its exclusivity.
  };

  // Handle option selection for panel display
  const handleOptionSelect = (value) => {
    // Only update selectedOption if it's not "none"
    setSelectedOption(value);

    // Reset all panels (hide all before showing the selected one)
    setShowTextFields(false);
    setShowImageUpload(false);
    setShowClipartPanel(false);
    setShowImageEditor(false); // Ensure editor also closes

    // Open the corresponding panel
    if (value === "image") {
      setShowImageUpload(true);
      // If an image is already selected and processed, potentially show editor
      // This is a design choice: re-edit or re-upload?
      // For now, it re-opens upload panel. If you want to re-edit, you'd need to
      // check if 'selectedImage' has data and jump to editor.
      if (selectedImage) { // If there's an already selected image from parent state
        setEditingImage(selectedImage.src); // Load it into editor
        setImagePosition(selectedImage.position || { x: 0, y: 0 });
        setImageZoom(selectedImage.zoom || 100);
        setImageRotation(selectedImage.rotation || 0);
        setShowImageEditor(true);
        setShowImageUpload(false); // Hide upload panel if editor is shown
      }
    } else if (value === "text") {
      setShowTextFields(true);
    } else if (value === "clipart") {
      setShowClipartPanel(true);
    }
  };

  // Mouse event handlers for image dragging
  const handleMouseDown = (e) => {
    if (imageRef.current) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const container = containerRef.current;
    if (!container || !imageRef.current) return;

    const containerRect = container.getBoundingClientRect();

    // Get the image's transformed size (considering zoom)
    const originalImage = new Image();
    originalImage.src = editingImage; // Use the raw image for actual dimensions
    const currentImageWidth = originalImage.width * (imageZoom / 100);
    const currentImageHeight = originalImage.height * (imageZoom / 100);


    // Calculate new position relative to the container
    let newX = e.clientX - dragStart.x;
    let newY = e.clientY - dragStart.y;

    // Limit the drag area to the container boundaries, considering current image size
    // Note: This calculation needs to be more robust if the image can be larger than the container after zoom
    // For simplicity, let's assume the image is scaled to fit initially, or we adjust boundaries.
    // The current clamp might not be perfect for highly zoomed images.
    const imageDisplayWidth = imageRef.current.clientWidth;
    const imageDisplayHeight = imageRef.current.clientHeight;

    const limitX = (containerRect.width - imageDisplayWidth) / 2;
    const limitY = (containerRect.height - imageDisplayHeight) / 2;

    newX = Math.max(-limitX, Math.min(newX, limitX));
    newY = Math.max(-limitY, Math.min(newY, limitY));

    setImagePosition({ x: newX, y: newY });
  };


  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add mouse event listeners when dragging is active
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, imagePosition, imageZoom, imageRotation, editingImage]); // Added dependencies

  const handleImageConfirm = () => {
    // Pass the edited image with transformation data
    onImageSelect({
      src: editingImage, // The base image URL
      position: imagePosition,
      zoom: imageZoom,
      rotation: imageRotation
    });
    setShowImageEditor(false);
    toast.success("Image has been added to your candy design!");
    // Do NOT change selectedOption to "image" here if you want multiple active selections.
    // The radio button merely *opened* the image editor, it doesn't dictate its exclusivity.
  };

  const handleResetImageEdits = () => {
    setImagePosition({ x: 0, y: 0 });
    setImageZoom(100);
    setImageRotation(0);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Design Your Candy</h2>
      <p className="text-gray-600 mb-8 text-center">Choose your design option below</p>

      {/* Design options as radio group */}
      {/* The radio group here is primarily for *showing/hiding the panels*,
          not for making the selected customization type exclusive.
          The parent component (`Customize`) manages which types are active. */}
      <RadioGroup value={selectedOption} onValueChange={handleOptionSelect} className="flex flex-col space-y-5">
        {/* Image Option */}
        <div className={`flex items-center space-x-3 p-3 rounded-lg ${selectedOption === "image" ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"}`}>
          <RadioGroupItem value="image" id="option-image" />
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleOptionSelect("image")}>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <ImageIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <label htmlFor="option-image" className="text-lg font-semibold cursor-pointer">Image</label>
              <div className="w-16 h-1 bg-yellow-500 rounded mt-1"></div>
              {selectedImage && <p className="text-xs text-gray-500 mt-1">Image selected</p>}
            </div>
          </div>
        </div>

        {/* Text Option */}
        <div className={`flex items-center space-x-3 p-3 rounded-lg ${selectedOption === "text" ? "bg-orange-50 border border-orange-200" : "hover:bg-gray-50"}`}>
          <RadioGroupItem value="text" id="option-text" />
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleOptionSelect("text")}>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-orange-500">Aa</span>
            </div>
            <div>
              <label htmlFor="option-text" className="text-lg font-semibold cursor-pointer">Text</label>
              <div className="w-16 h-1 bg-yellow-500 rounded mt-1"></div>
              {(firstLine || secondLine) && <p className="text-xs text-gray-500 mt-1">Text added</p>}
            </div>
          </div>
        </div>

        {/* Clipart Option */}
        <div className={`flex items-center space-x-3 p-3 rounded-lg ${selectedOption === "clipart" ? "bg-green-50 border border-green-200" : "hover:bg-gray-50"}`}>
          <RadioGroupItem value="clipart" id="option-clipart" />
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleOptionSelect("clipart")}>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Palette className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <label htmlFor="option-clipart" className="text-lg font-semibold cursor-pointer">Clipart</label>
              <div className="w-16 h-1 bg-yellow-500 rounded mt-1"></div>
              {/* Add a check for selectedClipart if you want a similar indicator */}
              {/* Assuming selectedClipart is passed down as a prop */}
              {onClipartSelect && <p className="text-xs text-gray-500 mt-1">Clipart selected</p>}
            </div>
          </div>
        </div>

        {/* Option for additional image - shown as an example from the reference */}
        <div className="mt-2 text-center">
          <span className="text-gray-500 text-sm">+$4.99 for another image</span>
        </div>
      </RadioGroup>

      {/* /* Text Fields Panel */ }
      {showTextFields && (
        <div className="mt-6 p-4 border rounded-md shadow-md">
          <h4 className="text-lg font-bold mb-4">Add Your Text</h4>
          <div className="space-y-4">
            <div>
              <label htmlFor="firstLine" className="block text-sm font-medium text-gray-700 mb-1">First Line</label>
              <input
                type="text"
                id="firstLine"
                value={tempFirstLine}
                onChange={(e) => setTempFirstLine(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Type first line"
              />
            </div>

            <div>
              <label htmlFor="secondLine" className="block text-sm font-medium text-gray-700 mb-1">Second Line</label>
              <input
                type="text"
                id="secondLine"
                value={tempSecondLine}
                onChange={(e) => setTempSecondLine(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Type second line"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Font Style</label>
              <div className="grid grid-cols-3 gap-2">
                {fontStyles.map((style) => (
                  <button
                    key={style}
                    onClick={() => setTempFontStyle(style)}
                    className={`px-3 py-2 text-sm ${
                      tempFontStyle === style
                        ? "bg-yellow-100 border-yellow-500 border-2"
                        : "bg-gray-100"
                    } rounded-md transition-colors`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleTextConfirm}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
              >
                Apply Text
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Upload Panel */}
      {showImageUpload && (
        <div className="mt-6 p-6 border rounded-md shadow-md bg-white space-y-4">
          <h4 className="text-lg font-bold">Choose an Image</h4>
          <p className="text-sm text-gray-700">• First image upload is <strong>FREE</strong>.</p>
          <p className="text-sm text-gray-700">• Add a second image for <strong>$4.99</strong>.</p>

      <div className="flex flex-col items-center mt-4">
            <img
              src="/images/convert.jpeg"
              alt="Selected"
              className="max-h-20 object-contain"
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Your image will be printed in black.
            </p>
          </div>

          {/* Best Friend: Three Images in a Row */}
          <h4 className="text-md font-semibold mt-6 mb-2">For Best Results</h4>
          <div className="flex flex-row items-center justify-center gap-4">
            <div className="flex flex-col items-center">
              <img
                src="/images/print.png"
                alt="Best Friend 1"
                className="max-h-20 object-contain rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1 text-center">1-2 faces</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/images/print1.png"
                alt="Best Friend 2"
                className="max-h-20 object-contain rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1 text-center">face forward</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/images/print2.png"
                alt="Best Friend 3"
                className="max-h-20 object-contain rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1 text-center">crop to show face only</p>
            </div>
          </div>

      
          <div className="mt-6">
            <h4 className="text-md font-semibold mb-2">Image Requirements</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Upload a high-quality <code>.jpg</code>, <code>.jpeg</code>, or <code>.png</code> file (15MB max).</li>
              <li>Backgrounds will be removed, and the photo will be printed in black.</li>
              <li>Only 1–2 faces cheek-to-cheek are allowed. Close cropping to faces gives the best results. Arms, legs, or full body can't be included.</li>
              <li>
                We can’t reproduce copyrighted or trademarked images/logos unless legal permission is provided.
                For logo printing inquiries, please contact our Business Consultants directly.
              </li>
              <li>First image upload is <strong>FREE</strong>. Add a second image for <strong>$4.99</strong>.</li>
            </ul>
          </div>

          <hr className="mt-4 border-gray-300" />

          {/* This preview should show the currently selected image, not the one being edited */}
          {selectedImage && !showImageEditor && ( // Only show if an image is already selected AND editor is not active
            <div className="mb-4">
              <img
                src={typeof selectedImage === 'object' ? selectedImage.src : selectedImage}
                alt="Previously Selected"
                className="max-h-40 mx-auto object-contain"
              />
              <p className="text-xs text-gray-500 text-center mt-2">Currently selected image</p>
            </div>
          )}

          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">I agree to the terms and conditions</span>
            </label>
          </div>

          <div className="flex justify-between gap-x-4">
  <button
    onClick={() => {
      onImageSelect(null); // Clear selected image
      setEditingImage(null); // Clear image in editor
      setShowImageUpload(false);
      setSelectedOption("none"); // Set to none if image is cancelled
    }}
    className="w-40 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
  >
    Clear Image
  </button>

  <input
    type="file"
    ref={fileInputRef}
    onChange={handleFileChange}
    accept="image/*"
    className="hidden"
  />

  <button
    onClick={handleUploadClick}
    disabled={!agreeTerms}
    className={`w-40 px-4 py-2 rounded-md ${
      agreeTerms
        ? "bg-yellow-400 text-black hover:bg-yellow-500"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    } transition-colors`}
  >
    Upload New Image
  </button>
</div>

        </div>
      )}

      {/* Clipart Panel */}
      {showClipartPanel && (
        <div className="mt-6 p-4 border rounded-md shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-bold">Choose Clipart</h4>
            <button
              onClick={() => {
                setShowClipartPanel(false);
                // Optionally set selectedOption to "none" if no clipart is selected yet
                // if (!onClipartSelect) setSelectedOption("none"); // This logic depends on desired UX
              }}
              className="text-gray-500 hover:text-black"
            >
              &times;
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search cliparts..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="All">All Categories</option>
              <option value="Graduation">Graduation</option>
              <option value="Birthday">Birthday</option>
              <option value="Wedding">Wedding</option>
              <option value="Holiday">Holiday</option>
            </select>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4">
            {filteredCliparts.map((clipart, index) => (
              <div
                key={index}
                onClick={() => handleClipartSelect(clipart.src)}
                className={`cursor-pointer p-1 rounded-md ${
                  // Corrected: Check against selectedClipart (passed from parent)
                  selectedImage && typeof selectedImage === 'string' && selectedImage === clipart.src // Assuming selectedImage (which could be clipart.src now) is a string
                    ? "ring-2 ring-yellow-500"
                    : ""
                }`}
              >
                <img
                  src={clipart.src}
                  alt={clipart.alt}
                  className="w-full aspect-square object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inline Image Editor */}
      {showImageEditor && (
        <div className="mt-6 p-4 border rounded-md shadow-md">
          <h4 className="text-lg font-bold mb-4">Edit Your Image</h4>

          <div className="flex flex-col items-center space-y-6 py-4">
            <div
              ref={containerRef}
              className="bg-gray-700 w-64 h-64 rounded-full flex items-center justify-center overflow-hidden relative"
            >
              {editingImage && (
                <img
                  ref={imageRef}
                  src={editingImage}
                  alt="Editing"
                  className="object-cover cursor-move"
                  style={{
                    transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) rotate(${imageRotation}deg) scale(${imageZoom / 100})`,
                    transition: isDragging ? 'none' : 'transform 0.2s ease',
                    cursor: isDragging ? 'grabbing' : 'grab',
                  }}
                  onMouseDown={handleMouseDown}
                />
              )}
            </div>

            <div className="flex items-center space-x-2">
              <MoveHorizontal className="h-5 w-5 text-gray-500" />
              <p className="text-center">Drag image to reposition photo</p>
            </div>

            <div className="w-full space-y-4">
              {/* Zoom control */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Zoom</label>
                  <span className="text-sm">{imageZoom}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ZoomOut className="h-4 w-4 text-gray-500" />
                  <Slider
                    value={[imageZoom]}
                    min={50}
                    max={150}
                    step={1}
                    onValueChange={(value) => setImageZoom(value[0])}
                    className="flex-1"
                  />
                  <ZoomIn className="h-4 w-4 text-gray-500" />
                </div>
              </div>

              {/* Rotation control */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Rotation</label>
                  <span className="text-sm">{imageRotation}°</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCw className="h-4 w-4 text-gray-500" />
                  <Slider
                    value={[imageRotation]}
                    min={0}
                    max={360}
                    step={5}
                    onValueChange={(value) => setImageRotation(value[0])}
                    className="flex-1"
                  />
                  <RotateCw className="h-4 w-4 text-gray-500" /> {/* Changed icon to match left side */}
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm text-center">
              Since Cavellea are round, it doesn't matter if your<br />
              image is upside down or sideways!
            </p>

            <button
              onClick={handleResetImageEdits}
              className="flex items-center space-x-2 text-gray-800 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10.146 8.146a.5.5 0 01.708 0L12 9.293l1.146-1.147a.5.5 0 11.708.708L12.707 10l1.147 1.146a.5.5 0 01-.708.708L12 10.707l-1.146 1.147a.5.5 0 010-.708z" clipRule="evenodd" />
              </svg>
              <span>Reset position</span>
            </button>

            <div className="flex w-full justify-between space-x-4">
              <button
                onClick={() => {
                  setShowImageEditor(false);
                  setShowImageUpload(true); // Go back to upload panel
                }}
                className="w-full border-2 border-brown-800 text-brown-800 font-bold py-3 px-6 rounded-full"
              >
                Back
              </button>
              <button
                onClick={handleImageConfirm}
                className="w-full bg-yellow-400 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignOptions;