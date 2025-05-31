"use client";
import { useRef, useEffect, useState } from "react";
import {
  CheckCircle2, 
  Palette,
  MoveHorizontal,
  ZoomIn,
  ZoomOut,
  RotateCw,
  PictureInPicture,
  Type,
  Brush,
} from "lucide-react";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import clipartdata from "../../app/data/clipartdata";
import Link from "next/link";

const DesignOptions = ({
  onImageSelect, // This prop will now receive an object { first: image1Data, second: image2Data }
  onTextChange,
  onFontStyleChange,
  firstLine,
  secondLine,
  selectedFontStyle,
  selectedImage: parentSelectedImage, // This is still the primary image from parent, used for initial setup
  onClipartSelect,
  // New props to receive the current state of both images from the parent
  firstUploadedImage: parentFirstUploadedImage,
  secondUploadedImage: parentSecondUploadedImage,
}) => {
  const [showTextFields, setShowTextFields] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showClipartPanel, setShowClipartPanel] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const [tempFirstLine, setTempFirstLine] = useState(firstLine);
  const [tempSecondLine, setTempSecondLine] = useState(secondLine);
  const [tempFontStyle, setTempFontStyle] = useState(selectedFontStyle);

  const [showImageEditor, setShowImageEditor] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [editingImageSrc, setEditingImageSrc] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageZoom, setImageZoom] = useState(100);
  const [imageRotation, setImageRotation] = useState(0);

  const [selectedOption, setSelectedOption] = useState("none");

  const imageUploadRef = useRef(null);

  const [showMore, setShowMore] = useState(false);

  const editorRef = useRef(null);

  // Internal states for the two images, initialized from parent props
  const [firstUploadedImage, setFirstUploadedImage] = useState(parentFirstUploadedImage);
  const [secondUploadedImage, setSecondUploadedImage] = useState(parentSecondUploadedImage);
  const [currentlyEditingImageSlot, setCurrentlyEditingImageSlot] = useState(null);


   const [selectedType, setSelectedType] = useState("");
    const options = [
    {
      label: "if you used color gems it will come black & white",
      value: "black-and-white",
      image: "/images/convert2.jpg",
    },
    {
      label: "for good picture colour we will use white gems",
      value: "color",
      image: "/images/convert1.jpg",
    },
  ];

   useEffect(() => {
    const storedType = localStorage.getItem("printType");
    if (storedType) {
      setSelectedType(storedType);
    }
  }, []);

   const handleSelect = (value) => {
    setSelectedType(value);
    localStorage.setItem("printType", value);
  };


  // Keep internal states in sync with parent props
  useEffect(() => {
    setFirstUploadedImage(parentFirstUploadedImage);
  }, [parentFirstUploadedImage]);

  useEffect(() => {
    setSecondUploadedImage(parentSecondUploadedImage);
  }, [parentSecondUploadedImage]);


  const fontStyles = [
    "Bold",
    "Regular",
    "Light",
    "Script",
    "Italic",
    // "Monospace",
  ];

  const allCliparts = clipartdata;

  const filteredCliparts = allCliparts.filter(
    (clipart) =>
      (selectedCategory === "All" || clipart.category === selectedCategory) &&
      clipart.alt &&
      clipart.alt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setEditingImageSrc(imageUrl);

        // If no slot is explicitly set (e.g., first time clicking upload),
        // determine which slot to use. If first is empty, use first. Else, use second.
        // If both are full, default to editing the first one, or prompt user.
        if (!currentlyEditingImageSlot) {
            if (!firstUploadedImage) {
                setCurrentlyEditingImageSlot("first");
            } else if (!secondUploadedImage) {
                setCurrentlyEditingImageSlot("second");
            } else {
                setCurrentlyEditingImageSlot("first"); // Default to first if both are full
                toast.info("Both image slots are full. Editing the first image.");
            }
        }
        
        setShowImageEditor(true);
        setShowImageUpload(false);
        // Reset editor settings to default for a new image upload
        setImagePosition({ x: 0, y: 0 });
        setImageZoom(100);
        setImageRotation(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = (slot) => {
    if (agreeTerms && fileInputRef.current) {
      setCurrentlyEditingImageSlot(slot); // Set which slot we are going to upload/edit
      fileInputRef.current.click();
      fileInputRef.current.value = null; // Clear input to allow re-uploading the same file
    } else {
      toast.error(
        "Please agree to the terms and conditions to upload an image."
      );
    }
  };

  const handleTextConfirm = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    onTextChange(tempFirstLine, tempSecondLine);
    onFontStyleChange(tempFontStyle);
    setShowTextFields(false);
  };

  const handleClipartSelect = (src) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    onClipartSelect(src);
    setShowClipartPanel(false);
  };

  const handleOptionSelect = (value) => {
    // If the same option is selected again, allow re-upload if it's image
    if (selectedOption === value) {
      if (value === "image") {
        setShowImageUpload(true); // Show upload panel again
        setShowImageEditor(false); // Hide editor if it was open
      }
      return; // Skip the rest if the same option is selected again
    }

    // Reset states for a new option selection
    setSelectedOption(value);
    setShowTextFields(false);
    setShowImageUpload(false);
    setShowClipartPanel(false);
    setShowImageEditor(false);
    setCurrentlyEditingImageSlot(null); // Reset currently editing slot when changing option

    // Show panels based on the newly selected option
    if (value === "image") {
      setShowImageUpload(true); // Always show upload for image selection initially
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
        y: e.clientY - imagePosition.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const container = containerRef.current;
    if (!container || !imageRef.current) return;

    const containerRect = container.getBoundingClientRect();
    const imageRect = imageRef.current.getBoundingClientRect();

    let newX = e.clientX - dragStart.x;
    let newY = e.clientY - dragStart.y;

    // Clamp the image position within the container bounds
    const maxX = (containerRect.width - imageRect.width) / 2;
    const maxY = (containerRect.height - imageRect.height) / 2;

    newX = Math.max(-maxX, Math.min(newX, maxX));
    newY = Math.max(-maxY, Math.min(newY, maxY));

    setImagePosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add mouse event listeners when dragging is active
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    dragStart,
    imagePosition,
    imageZoom,
    imageRotation,
    editingImageSrc,
  ]);

  const handleImageConfirm = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const imageData = {
      src: editingImageSrc,
      position: imagePosition,
      zoom: imageZoom,
      rotation: imageRotation,
      isCircular: true,
    };

    let updatedFirstImage = firstUploadedImage;
    let updatedSecondImage = secondUploadedImage;

    if (currentlyEditingImageSlot === "first") {
      updatedFirstImage = imageData;
      setFirstUploadedImage(imageData); // Update internal state
    } else if (currentlyEditingImageSlot === "second") {
      updatedSecondImage = imageData;
      setSecondUploadedImage(imageData); // Update internal state
    }

    // Pass both images up to the parent component
    onImageSelect({ first: updatedFirstImage, second: updatedSecondImage });

    setShowImageEditor(false);
    toast.success("Image has been added to your candy design!");
  };

  const handleResetImageEdits = () => {
    setImagePosition({ x: 0, y: 0 });
    setImageZoom(100);
    setImageRotation(0);
  };

  const handleClearImage = (slotToClear) => {
    let updatedFirstImage = firstUploadedImage;
    let updatedSecondImage = secondUploadedImage;

    if (slotToClear === "first") {
      updatedFirstImage = null;
      setFirstUploadedImage(null);
    } else if (slotToClear === "second") {
      updatedSecondImage = null;
      setSecondUploadedImage(null);
    }

    // Pass both images up to the parent component
    onImageSelect({ first: updatedFirstImage, second: updatedSecondImage });

    setEditingImageSrc(null); // Clear editor source
    setShowImageUpload(false); // Hide upload panel
    setShowImageEditor(false); // Hide editor
    setCurrentlyEditingImageSlot(null); // Clear which slot is being edited
    toast.info(`Image ${slotToClear === 'first' ? '1' : '2'} cleared.`);
  };

  const handleClearAllImages = () => {
    setFirstUploadedImage(null);
    setSecondUploadedImage(null);
    onImageSelect({ first: null, second: null }); // Clear both in parent
    setEditingImageSrc(null);
    setShowImageUpload(false);
    setShowImageEditor(false);
    setSelectedOption("none");
    setCurrentlyEditingImageSlot(null);
    toast.info("All images cleared.");
  };


  return (
    <div className="p-0 bg-white w-64 h-full rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Design Your Candy</h2>
      <p className="text-gray-600 text-center mb-4">
        Choose your design option below
      </p>
      <RadioGroup
        value={selectedOption}
        onValueChange={handleOptionSelect}
        className="flex flex-col space-y-6"
      >
        {/* Image Option */}
        <Link href={"#upload-image"}>
          <div
            ref={imageUploadRef}
            className={`flex items-center space-x-4 p-3 rounded-lg mb-0 ${
              selectedOption === "image"
                ? "bg-blue-50 border border-blue-200"
                : "hover:bg-gray-50"
            }`}
          >
            <RadioGroupItem value="image" id="option-image" />
            <div
              className="flex items-center space-x-3 cursor-pointer mb-0"
              onClick={() => handleOptionSelect("image")}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <PictureInPicture className="h-5 w-5 text-blue-600" />                             </div>
              <div>
                <label
                  htmlFor="option-image"
                  className="text-lg font-semibold cursor-pointer"
                >
                  Image
                </label>
                <div className="w-16 h-1 bg-yellow-500 rounded mt-1"></div>
                {(firstUploadedImage || secondUploadedImage) && (
                  <p className="text-xs text-gray-500 mt-1">Images selected</p>
                )}
              </div>
            </div>
          </div>
        </Link>

        {/* Text Option */}
        <div
          className={`flex items-center space-x-3 p-3 rounded-lg ${
            selectedOption === "text"
              ? "bg-orange-50 border border-orange-200"
              : "hover:bg-gray-50"
          }`}
        >
          <RadioGroupItem value="text" />
          <Link href={"#select-text"}>
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => handleOptionSelect("text")}
            >
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Type className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <label
                  htmlFor="option-text"
                  className="text-lg font-semibold cursor-pointer"
                >
                  Text
                </label>
                <div className="w-16 h-1 bg-yellow-500 rounded mt-1"></div>
                {(firstLine || secondLine) && (
                  <p className="text-xs text-gray-500 mt-1">Text added</p>
                )}
              </div>
            </div>
          </Link>
        </div>

        {/* Clipart Option */}
        <div
          className={`flex items-center space-x-3 p-3 rounded-lg mb-0 ${
            selectedOption === "clipart"
              ? "bg-green-50 border border-green-200"
              : "hover:bg-gray-50"
          }`}
        >
          <RadioGroupItem value="clipart" />
          <Link href={"#select-clipart"}>
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => handleOptionSelect("clipart")}
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Brush className="h-5 w-5 text-green-600" />              </div>

              <div>
                <label
                  htmlFor="option-clipart"
                  className="text-lg font-semibold cursor-pointer"
                >
                  Clipart
                </label>
                <div className="w-16 h-1 bg-yellow-500 rounded mt-1"></div>
                {onClipartSelect && (
                  <p className="text-xs text-gray-500 mt-1"></p>
                )}
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-2 text-center"></div>
      </RadioGroup>

      {/* Text Fields Panel */}
      {showTextFields && (
        <div id="select-text" className="mt-6 p-4 border rounded-md shadow-md">
          <h4 className="text-lg font-bold mb-4">Add Your Text</h4>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="firstLine"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Line
              </label>
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
              <label
                htmlFor="secondLine"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Second Line
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Style
              </label>
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

    {showImageUpload && (
  <div
    ref={imageUploadRef}
    className="mt-6 p-6 border rounded-md shadow-md bg-white space-y-4 mb-0"
  >
    <h4 id="upload-image" className="text-lg font-bold">
      Plase Select a Print Type
    </h4>
    {/* <p className="text-sm text-gray-700">• First image upload is FREE.</p> */}

    <div className="flex flex-col items-center mt-6 space-x-2">
      {options.map((option) => (
        <label
          key={option.value}
          className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
            selectedType === option.value
              ? "border-blue-500"
              : "border-transparent"
          }`}
        >
          <input
            type="checkbox"
            className="absolute opacity-0 h-0 w-0"
            checked={selectedType === option.value}
            onChange={() => handleSelect(option.value)}
          />
          <img
            src={option.image}
            alt={option.label}
            className="w-72 h-auto object-cover rounded-lg"
          />
          {selectedType === option.value && (
            <div className="absolute top-2 right-2 text-green-500 bg-white rounded-full p-1 shadow-md">
              <CheckCircle2 size={24} />
            </div>
          )}
          <div className="text-center mt-2 text-gray-800 font-medium">
            {option.label}
          </div>
        </label>
      ))}
    </div>
 
    {/* Optional: Display selected value */}
    {/* <p className="text-sm text-gray-600 text-center mt-2">
      Selected: <span className="font-semibold">{printType === 'color' ? 'Color Print' : 'Black & White Print'}</span>
    </p>
  </div>
)} */}

          {/* <h4 className="text-md font-semibold mt-6 mb-2">For Best Results</h4> */}
          <div className="flex flex-row items-center justify-center gap-4">
            {/* Best Result Example 1 */}
            {/* <div className="flex flex-col items-center">
              <img
                src="/images/print.png"
                alt="Best Result Example 1"
                className="max-h-20 object-contain rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1 text-center">
                1-2 faces
              </p>
            </div> */}
            {/* Example 2 */}
            {/* <div className="flex flex-col items-center">
              <img
                src="/images/print1.png"
                alt="Best Result Example 2"
                className="max-h-20 object-contain rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1 text-center">
                face forward
              </p>
            </div> */}
            {/* Example 3 */}
            {/* <div className="flex flex-col items-center">
              <img
                src="/images/print2.png"
                alt="Best Result Example 3"
                className="max-h-20 object-contain rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1 text-center">
                crop to show face only
              </p>
            </div> */}
          </div>

          <div className="mt-6">
            <h4 className="text-md font-semibold mb-2">Image Requirements</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Upload a clear .jpg, .jpeg, or .png (max 15MB).</li>
              {showMore && (
                <>
                  <li>Only 1–2 close faces allowed. No arms or full body.</li>
                  <li>No copyrighted/logos unless with written permission.</li>
                  <li>Backgrounds will be removed; image prints in black. </li>
                </>
              )}
            </ul>
          </div>
          <div className="mt-2">
            <button
              onClick={() => setShowMore(!showMore)}
              className="relative inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition duration-300 ease-in-out hover:text-blue-800 group"
            >
              <span>{showMore ? "View Less" : "View More"}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 transform ${
                  showMore ? "rotate-180" : ""
                } group-hover:translate-x-1`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <hr className="mt-4 border-gray-300" />


{/* Ye section me jo image preview aarha hai oo display ho rha hai*/}
         
          {(firstUploadedImage || secondUploadedImage) && (
  <div className="mb-4 text-center w-full flex justify-center gap-4">
    {firstUploadedImage && (
      <div className="rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center relative" style={{ height: "80px", width: "80px", overflow: "hidden" }}>
        <img
          src={firstUploadedImage.src}
          alt="First Uploaded"
          className="absolute"
          style={{
            borderRadius: "50%",
            height: "100%",
            width: "100%",
            objectFit: "cover",
            zIndex: 1,
            transform: `translate(${firstUploadedImage.position?.x || 0}px, ${firstUploadedImage.position?.y || 0}px) rotate(${firstUploadedImage.rotation || 0}deg) scale(${firstUploadedImage.zoom / 100 || 1})`,
          }}
        />
      </div>
    )}

    {secondUploadedImage && (
      <div className="rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center relative" style={{ height: "80px", width: "80px", overflow: "hidden" }}>
        <img
          src={secondUploadedImage.src}
          alt="Second Uploaded"
          className="absolute"
          style={{
            borderRadius: "50%",
            height: "100%",
            width: "100%",
            objectFit: "cover",
            zIndex: 2,
            transform: `translate(${secondUploadedImage.position?.x || 0}px, ${secondUploadedImage.position?.y || 0}px) rotate(${secondUploadedImage.rotation || 0}deg) scale(${secondUploadedImage.zoom / 100 || 1})`,
          }}
        />
      </div>
    )}
  </div>
)}
<p className="text-xs text-gray-500 text-center mt-2">Images currently on candy</p>


          {/* Checkbox moved here after all requirements */}
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">
                I agree to the terms and conditions
              </span>
            </label>
          </div>

          {/* Upload First Image Button */}
          {!firstUploadedImage && ( // Only show if first image is not uploaded
            <div className="flex justify-center mt-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => handleUploadClick("first")}
                disabled={!agreeTerms}
                className={`px-4 py-2 rounded-md ${
                  agreeTerms
                    ? "bg-yellow-400 text-black hover:bg-yellow-500"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } transition-colors`}
              >
                Upload First Image
              </button>
            </div>
          )}

          {/* Upload Next Image Button */}
          {firstUploadedImage && !secondUploadedImage && ( // Only show if first image is uploaded, but second is not
            <div className="flex justify-center mt-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => handleUploadClick("second")}
                disabled={!agreeTerms}
                className={`px-4 py-2 rounded-md ${
                  agreeTerms
                    ? "bg-yellow-400 text-black hover:bg-yellow-500"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } transition-colors`}
              >
                Upload Second Image
              </button>
            </div>
          )}

          {/* Edit/Clear Buttons for Each Image */}
         {firstUploadedImage && (
  <div className="flex justify-center mt-2 space-x-4">
    <button
      onClick={() => {
        setEditingImageSrc(firstUploadedImage.src);
        setImagePosition(firstUploadedImage.position);
        setImageZoom(firstUploadedImage.zoom);
        setImageRotation(firstUploadedImage.rotation);
        setCurrentlyEditingImageSlot("first");
        setShowImageEditor(true);
        setShowImageUpload(false);
      }}
      className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-200"
    >
    Edit First Image
    </button>
    <button
      onClick={() => handleClearImage("first")}
      className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 hover:shadow-lg transition duration-200"
    >
      🗑️ Clear First
    </button>
  </div>
)}

{secondUploadedImage && (
  <div className="flex justify-center mt-2 space-x-4">
    <button
      onClick={() => {
        setEditingImageSrc(secondUploadedImage.src);
        setImagePosition(secondUploadedImage.position);
        setImageZoom(secondUploadedImage.zoom);
        setImageRotation(secondUploadedImage.rotation);
        setCurrentlyEditingImageSlot("second");
        setShowImageEditor(true);
        setShowImageUpload(false);
      }}
      className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-200"
    >
    Edit Second Image
    </button>
    <button
      onClick={() => handleClearImage("second")}
      className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 hover:shadow-lg transition duration-200"
    >
      🗑️ Clear Second
    </button>
  </div>
)}


          {/* Overall Clear All Images button */}
          {(firstUploadedImage || secondUploadedImage) && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleClearAllImages}
                className="py-2 px-4 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition-colors"
              >
                Clear All Images
              </button>
            </div>
          )}
        </div>
      )}

      {/* Clipart Panel */}
      {showClipartPanel && (
        <div
          id="select-clipart"
          className="mt-6 p-4 border rounded-md shadow-md"
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-bold">Choose Clipart</h4>
            <button
              onClick={() => {
                setShowClipartPanel(false);
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
          {/* ye categories dynamic aaayange*/}
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
                  parentSelectedImage &&
                  typeof parentSelectedImage === "string" &&
                  parentSelectedImage === clipart.src
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
        <div ref={editorRef} className="mt-6 p-4 border rounded-md shadow-md">
          <h4 className="text-lg font-bold mb-4">
            Edit{" "}
            {currentlyEditingImageSlot === "first"
              ? "First"
              : currentlyEditingImageSlot === "second"
              ? "Second"
              : ""}{" "}
            Image
          </h4>

          <div className="flex flex-col items-center space-y-6 py-4">
            <div
              ref={containerRef}
              className="bg-gray-700 w-64 h-64 rounded-full flex items-center justify-center overflow-hidden relative"
            >
              {editingImageSrc && (
                <img
                  ref={imageRef}
                  src={editingImageSrc}
                  alt="Editing"
                  className="object-cover cursor-move w-full h-full"
                  style={{
                    transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) rotate(${imageRotation}deg) scale(${imageZoom / 100})`,
                    transition: isDragging ? "none" : "transform 0.2s ease",
                    cursor: isDragging ? "grabbing" : "grab",
                    minWidth: `${imageZoom}%`,
                    minHeight: `${imageZoom}%`,
                    maxWidth: `${imageZoom}%`,
                    maxHeight: `${imageZoom}%`,
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
                    max={200} // Increased max zoom for more flexibility
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
                  <RotateCw className="h-4 w-4 text-gray-500" />{" "}
                  {/* Changed icon to match left side */}
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm text-center">
              Since Cavellea are round, it doesn't matter if your
              <br />
              image is upside down or sideways!
            </p>

            <button
              onClick={handleResetImageEdits}
              className="flex items-center space-x-2 text-gray-800 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M10.146 8.146a.5.5 0 01.708 0L12 9.293l1.146-1.147a.5.5 0 11.708.708L12.707 10l1.147 1.146a.5.5 0 01-.708.708L12 10.707l-1.146 1.147a.5.5 0 010-.708z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Reset position</span>
            </button>

            <div className="flex w-full justify-between space-x-4">
              <button
                onClick={() => {
                  setShowImageEditor(false);
                  setShowImageUpload(true);
                }}
                className="w-full border-2 border-brown-800 text-brown-800 font-bold py-3 px-6 rounded-full"
              >
                Back
              </button>
              <button
                id="up"
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


























// "use client";
// import { useState } from "react";
// import { ImageIcon, Palette } from "lucide-react";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import ImageEditorPanel from "./ImageEditorPanel";
// import TextEditorPanel from "./TextEditorPanel";
// import ClipartPanel from "./ClipartPanel";

// const DesignOptionsMain = ({
//   onImageSelect,
//   onTextChange,
//   onFontStyleChange,
//   firstLine,
//   secondLine,
//   selectedFontStyle,
//   selectedImage,
//   onClipartSelect,
//   firstUploadedImage,
//   secondUploadedImage,
// }) => {
//   const [selectedOption, setSelectedOption] = useState("none");

//   const handleOptionSelect = (value) => {
//     if (selectedOption === value) {
//       if (value === "image") {
//         setShowImageUpload(true);
//         setShowImageEditor(false);
//       }
//       return;
//     }
//     setSelectedOption(value);
//   };

//   return (
//     <div className="p-0 bg-white w-64 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Design Your Candy</h2>
//       <p className="text-gray-600 text-center mb-6">
//         Choose your design option below
//       </p>
      
//       <RadioGroup
//         value={selectedOption}
//         onValueChange={handleOptionSelect}
//         className="flex flex-col space-y-6"
//       >
//         {/* Image Option */}
//         <div className={`flex items-center space-x-4 p-3 rounded-lg mb-0 ${
//           selectedOption === "image" ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
//         }`}>
//           <RadioGroupItem value="image" id="option-image" />
//           <div className="flex items-center space-x-3 cursor-pointer mb-0">
//             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//               <ImageIcon className="h-5 w-5 text-blue-600" />
//             </div>
//             <div>
//               <label htmlFor="option-image" className="text-lg font-semibold cursor-pointer">
//                 Image
//               </label>
//               <div className="w-16 h-1 bg-yellow-500 rounded mt-1"></div>
//               {(firstUploadedImage || secondUploadedImage) && (
//                 <p className="text-xs text-gray-500 mt-1">Images selected</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Text Option */}
//         <div className={`flex items-center space-x-3 p-3 rounded-lg ${
//           selectedOption === "text" ? "bg-orange-50 border border-orange-200" : "hover:bg-gray-50"
//         }`}>
//           <RadioGroupItem value="text" />
//           <div className="flex items-center space-x-3 cursor-pointer">
//             <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
//               <span className="text-2xl font-bold text-orange-500">Aa</span>
//             </div>
//             <div>
//               <label htmlFor="option-text" className="text-lg font-semibold cursor-pointer">
//                 Text
//               </label>
//               <div className="w-16 h-1 bg-yellow-500 rounded mt-1"></div>
//               {(firstLine || secondLine) && (
//                 <p className="text-xs text-gray-500 mt-1">Text added</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Clipart Option */}
//         <div className={`flex items-center space-x-3 p-3 rounded-lg mb-0 ${
//           selectedOption === "clipart" ? "bg-green-50 border border-green-200" : "hover:bg-gray-50"
//         }`}>
//           <RadioGroupItem value="clipart" />
//           <div className="flex items-center space-x-3 cursor-pointer">
//             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//               <Palette className="h-5 w-5 text-green-600" />
//             </div>
//             <div>
//               <label htmlFor="option-clipart" className="text-lg font-semibold cursor-pointer">
//                 Clipart
//               </label>
//               <div className="w-16 h-1 bg-yellow-500 rounded mt-1"></div>
//             </div>
//           </div>
//         </div>
//       </RadioGroup>

//       {selectedOption === "image" && (
//         <ImageEditorPanel
//           onImageSelect={onImageSelect}
//           firstUploadedImage={firstUploadedImage}
//           secondUploadedImage={secondUploadedImage}
//         />
//       )}

//       {selectedOption === "text" && (
//         <TextEditorPanel
//           onTextChange={onTextChange}
//           onFontStyleChange={onFontStyleChange}
//           firstLine={firstLine}
//           secondLine={secondLine}
//           selectedFontStyle={selectedFontStyle}
//         />
//       )}

//       {selectedOption === "clipart" && (
//         <ClipartPanel 
//           onClipartSelect={onClipartSelect}
//           selectedImage={selectedImage}
//         />
//       )}
//     </div>
//   );
// };

// export default DesignOptionsMain;