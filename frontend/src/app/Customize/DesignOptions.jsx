"use client";
import { useRef, useEffect, useState } from "react";
import {
  MoveHorizontal,
  ZoomIn,
  ZoomOut,
  RotateCw,
  PictureInPicture,
  Type,
  Brush,
  Move,
} from "lucide-react";
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
  selectedImage: parentSelectedImage,
  onClipartSelect,
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

  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageZoom, setImageZoom] = useState(100);
  const [imageRotation, setImageRotation] = useState(0);
  const [selectedOption, setSelectedOption] = useState("none");
  const imageUploadRef = useRef(null);
  const [showMore, setShowMore] = useState(false);
  const editorRef = useRef(null);

  const [firstUploadedImage, setFirstUploadedImage] = useState(
    parentFirstUploadedImage
  );
  const [secondUploadedImage, setSecondUploadedImage] = useState(
    parentSecondUploadedImage
  );
  const [currentlyEditingImageSlot, setCurrentlyEditingImageSlot] =
    useState(null);

  // Preview circle drag states
  const [isDraggingPreview, setIsDraggingPreview] = useState(false);
  const [draggingImageSlot, setDraggingImageSlot] = useState(null);
  const [previewDragOffset, setPreviewDragOffset] = useState({ x: 0, y: 0 });
  const [hoveredImageSlot, setHoveredImageSlot] = useState(null);

  const [selectedType, setSelectedType] = useState("");

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

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
  ];

  // Mock clipart data since import is missing
  const allCliparts = [
    { src: "/images/cliparts1.avif", alt: "Sample clipart 1", category: "All" },
    { src: "/images/cliparts2.avif", alt: "Sample clipart 2", category: "Birthday" },
    { src: "/images/cliparts3.avif", alt: "Sample clipart 3", category: "Graduation" },
    { src: "/images/cliparts4.avif", alt: "Sample clipart 4", category: "Holiday" },
    { src: "/images/cliparts5.avif", alt: "Sample clipart 5", category: "Wedding" },
    { src: "/images/cliparts6.avif", alt: "Sample clipart 6", category: "All" },
    { src: "/images/cliparts7.avif", alt: "Sample clipart 7", category: "Birthday" },
    { src: "/images/cliparts8.avif", alt: "Sample clipart 8", category: "Graduation" },
    { src: "/images/cliparts9.avif", alt: "Sample clipart 9", category: "Holiday" },
    { src: "/images/cliparts10.avif", alt: "Sample clipart 10", category: "Wedding" },
    { src: "/images/cliparts11.avif", alt: "Sample clipart 11", category: "All" },
    { src: "/images/cliparts12.avif", alt: "Sample clipart 12", category: "Birthday" },
    { src: "/images/cliparts13.avif", alt: "Sample clipart 13", category: "Graduation" },
    { src: "/images/cliparts14.avif", alt: "Sample clipart 14", category: "Holiday" },
  ];

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

        if (!currentlyEditingImageSlot) {
          if (!firstUploadedImage) {
            setCurrentlyEditingImageSlot("first");
          } else if (!secondUploadedImage) {
            setCurrentlyEditingImageSlot("second");
          } else {
            setCurrentlyEditingImageSlot("first");
            toast.info("Both image slots are full. Editing the first image.");
          }
        }

        setShowImageEditor(true);
        setShowImageUpload(false);
        setImagePosition({ x: 0, y: 0 });
        setImageZoom(100);
        setImageRotation(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = (slot) => {
    if (agreeTerms && fileInputRef.current) {
      setCurrentlyEditingImageSlot(slot);
      fileInputRef.current.click();
      fileInputRef.current.value = null;
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
    if (selectedOption === value) {
      if (value === "image") {
        setShowImageUpload(true);
        setShowImageEditor(false);
      }
      return;
    }

    setSelectedOption(value);
    setShowTextFields(false);
    setShowImageUpload(false);
    setShowClipartPanel(false);
    setShowImageEditor(false);
    setCurrentlyEditingImageSlot(null);

    if (value === "image") {
      setShowImageUpload(true);
    } else if (value === "text") {
      setShowTextFields(true);
    } else if (value === "clipart") {
      setShowClipartPanel(true);
    }
  };

  // Mouse event handlers for image dragging in editor
  const handleMouseDown = (e) => {
    e.preventDefault();
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - containerRect.left - imagePosition.x;
    const offsetY = e.clientY - containerRect.top - imagePosition.y;
    
    setDragOffset({ x: offsetX, y: offsetY });
    setIsDragging(true);
    
    console.log('Mouse down - starting drag');
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    
    e.preventDefault();
    const containerRect = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - dragOffset.x;
    const newY = e.clientY - containerRect.top - dragOffset.y;
    
    setImagePosition({ x: newX, y: newY });
    console.log('Moving image to:', { x: newX, y: newY });
  };

  const handleMouseUp = (e) => {
    if (isDragging) {
      e.preventDefault();
      setIsDragging(false);
      console.log('Mouse up - ending drag');
    }
  };

  // New handlers for cursor movement in editor
  const handleEditorMouseMove = (e) => {
    if (!containerRef.current || isDragging) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;
    
    setCursorPosition({ x, y });
    setShowCursor(true);
  };

  const handleEditorMouseLeave = () => {
    setShowCursor(false);
  };

  const handleEditorClick = (e) => {
    if (!containerRef.current || isDragging) return;
    
    e.preventDefault();
    const containerRect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - containerRect.left;
    const clickY = e.clientY - containerRect.top;
    
    // Move image to clicked position (center the image on click point)
    const newX = clickX - (containerRect.width / 2);
    const newY = clickY - (containerRect.height / 2);
    
    setImagePosition({ x: newX, y: newY });
    console.log('Moving image to clicked position:', { x: newX, y: newY });
  };

  // Preview circle drag handlers
  const handlePreviewMouseDown = (e, slot) => {
    e.preventDefault();
    e.stopPropagation();
    
    const imageElement = e.currentTarget.querySelector('img');
    if (!imageElement) return;
    
    const rect = imageElement.getBoundingClientRect();
    const currentImage = slot === "first" ? firstUploadedImage : secondUploadedImage;
    const currentPos = currentImage?.position || { x: 0, y: 0 };
    
    const offsetX = e.clientX - rect.left - currentPos.x;
    const offsetY = e.clientY - rect.top - currentPos.y;
    
    setPreviewDragOffset({ x: offsetX, y: offsetY });
    setIsDraggingPreview(true);
    setDraggingImageSlot(slot);
  };

  const handlePreviewMouseMove = (e) => {
    if (!isDraggingPreview || !draggingImageSlot) return;
    
    e.preventDefault();
    
    const containerElement = document.querySelector(`[data-preview-container="${draggingImageSlot}"]`);
    if (!containerElement) return;
    
    const containerRect = containerElement.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - previewDragOffset.x;
    const newY = e.clientY - containerRect.top - previewDragOffset.y;
    
    const currentImage = draggingImageSlot === "first" ? firstUploadedImage : secondUploadedImage;
    const updatedImage = {
      ...currentImage,
      position: { x: newX, y: newY }
    };
    
    if (draggingImageSlot === "first") {
      setFirstUploadedImage(updatedImage);
      onImageSelect({ first: updatedImage, second: secondUploadedImage });
    } else {
      setSecondUploadedImage(updatedImage);
      onImageSelect({ first: firstUploadedImage, second: updatedImage });
    }
  };

  const handlePreviewMouseUp = () => {
    setIsDraggingPreview(false);
    setDraggingImageSlot(null);
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
  }, [isDragging, dragOffset, imagePosition]);

  // Add preview drag event listeners
  useEffect(() => {
    if (isDraggingPreview) {
      document.addEventListener("mousemove", handlePreviewMouseMove);
      document.addEventListener("mouseup", handlePreviewMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handlePreviewMouseMove);
      document.removeEventListener("mouseup", handlePreviewMouseUp);
    };
  }, [isDraggingPreview, draggingImageSlot, previewDragOffset, firstUploadedImage, secondUploadedImage]);

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
      setFirstUploadedImage(imageData);
    } else if (currentlyEditingImageSlot === "second") {
      updatedSecondImage = imageData;
      setSecondUploadedImage(imageData);
    }

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

    onImageSelect({ first: updatedFirstImage, second: updatedSecondImage });

    setEditingImageSrc(null);
    setShowImageUpload(false);
    setShowImageEditor(false);
    setCurrentlyEditingImageSlot(null);
    toast.info(`Image ${slotToClear === "first" ? "1" : "2"} cleared.`);
  };

  const handleClearAllImages = () => {
    setFirstUploadedImage(null);
    setSecondUploadedImage(null);
    onImageSelect({ first: null, second: null });
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

        <a href="#upload-image">
          <div
            ref={imageUploadRef}
            className={`flex items-center space-x-4 p-3 rounded-lg mb-0 ${
              selectedOption === "image"
                ? "bg-blue-50 border border-blue-200"
                : "hover:bg-gray-50"
            }`}
          >
            <RadioGroupItem value="image" />
            {/* <a href="#select-image"></a> */}
            <div
              className="flex items-center space-x-3 cursor-pointer mb-0"
              onClick={() => handleOptionSelect("image")}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <PictureInPicture className="h-5 w-5 text-blue-600" />
              </div>
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
        </a>

        {/* Text Option */}
        <div
          className={`flex items-center space-x-3 p-3 rounded-lg ${
            selectedOption === "text"
              ? "bg-orange-50 border border-orange-200"
              : "hover:bg-gray-50"
          }`}
        >
          <RadioGroupItem value="text" />
          <a href="#select-text">
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
          </a>
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
          <a href="#select-clipart">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => handleOptionSelect("clipart")}
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Brush className="h-5 w-5 text-green-600" />
              </div>

              <div>
                <label
                  htmlFor="option-clipart"
                  className="text-lg font-semibold cursor-pointer"
                >
                  Clipart
                </label>
                <div className="w-16 h-1 bg-yellow-500 rounded mt-1"></div>
              </div>
            </div>
          </a>
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
          <div id="upload-image" className="flex flex-row items-center justify-center gap-4"></div>

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

          {/* Image preview section with draggable images */}
          {(firstUploadedImage || secondUploadedImage) && (
            <div className="mb-4 text-center w-full flex justify-center gap-4">
              {firstUploadedImage && (
                <div
                  data-preview-container="first"
                  className="rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center relative transition-all duration-200 hover:border-blue-400 hover:shadow-lg"
                  style={{ 
                    height: "80px", 
                    width: "80px", 
                    overflow: "hidden",
                    cursor: isDraggingPreview && draggingImageSlot === "first" ? "grabbing" : "grab"
                  }}
                  onMouseDown={(e) => handlePreviewMouseDown(e, "first")}
                  onMouseEnter={() => setHoveredImageSlot("first")}
                  onMouseLeave={() => setHoveredImageSlot(null)}
                >
                  <img
                    src={firstUploadedImage.src}
                    alt="First Uploaded"
                    className="absolute select-none"
                    style={{
                      borderRadius: "50%",
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      zIndex: 1,
                      transform: `translate(${
                        firstUploadedImage.position?.x || 0
                      }px, ${firstUploadedImage.position?.y || 0}px) rotate(${
                        firstUploadedImage.rotation || 0
                      }deg) scale(${firstUploadedImage.zoom / 100 || 1})`,
                      filter: "grayscale(100%)",
                      pointerEvents: "none",
                    }}
                    draggable="false"
                  />
                  {/* Attractive move cursor symbol */}
                  <div 
                    className="absolute pointer-events-none transition-all duration-200"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                      opacity: (hoveredImageSlot === "first" || (isDraggingPreview && draggingImageSlot === "first")) ? 1 : 0,
                    }}
                  >
                    <div className="bg-blue-500 rounded-full p-2 shadow-lg">
                      <Move className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              )}

              {secondUploadedImage && (
                <div
                  data-preview-container="second"
                  className="rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center relative transition-all duration-200 hover:border-blue-400 hover:shadow-lg"
                  style={{ 
                    height: "80px", 
                    width: "80px", 
                    overflow: "hidden",
                    cursor: isDraggingPreview && draggingImageSlot === "second" ? "grabbing" : "grab"
                  }}
                  onMouseDown={(e) => handlePreviewMouseDown(e, "second")}
                  onMouseEnter={() => setHoveredImageSlot("second")}
                  onMouseLeave={() => setHoveredImageSlot(null)}
                >
                  <img
                    src={secondUploadedImage.src}
                    alt="Second Uploaded"
                    className="absolute select-none"
                    style={{
                      borderRadius: "50%",
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      zIndex: 2,
                      transform: `translate(${
                        secondUploadedImage.position?.x || 0
                      }px, ${secondUploadedImage.position?.y || 0}px) rotate(${
                        secondUploadedImage.rotation || 0
                      }deg) scale(${secondUploadedImage.zoom / 100 || 1})`,
                      filter: "grayscale(100%)",
                      pointerEvents: "none",
                    }}
                    draggable="false"
                  />
                  {/* Attractive move cursor symbol */}
                  <div 
                    className="absolute pointer-events-none transition-all duration-200"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                      opacity: (hoveredImageSlot === "second" || (isDraggingPreview && draggingImageSlot === "second")) ? 1 : 0,
                    }}
                  >
                    <div className="bg-blue-500 rounded-full p-2 shadow-lg">
                      <Move className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

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
          {!firstUploadedImage && (
            <div className="flex justify-center mt-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <button id="image"
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
          {firstUploadedImage && !secondUploadedImage && (
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
              className="flex flex-col items-center"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div
                ref={containerRef}
                className="bg-gray-700 w-64 h-64 rounded-full flex items-center justify-center overflow-hidden relative border-4 border-white shadow-md cursor-crosshair"
                onMouseMove={handleEditorMouseMove}
                onMouseLeave={handleEditorMouseLeave}
                onClick={handleEditorClick}
              >
                {editingImageSrc && (
                  <img
                    ref={imageRef}
                    src={editingImageSrc}
                    alt="Editing"
                    className="absolute object-cover select-none pointer-events-none"
                    style={{
                      transform: `translate(${imagePosition.x}px, ${
                        imagePosition.y
                      }px) rotate(${imageRotation}deg) scale(${
                        imageZoom / 100
                      })`,
                      filter: "grayscale(100%)",
                      transition: isDragging ? "none" : "transform 0.2s ease",
                      minWidth: "100%",
                      minHeight: "100%",
                    }}
                    onMouseDown={handleMouseDown}
                    draggable={false}
                  />
                )}
                
                {/* Cursor crosshair symbol */}
                {showCursor && !isDragging && (
                  <div 
                    className="absolute pointer-events-none z-10"
                    style={{
                      left: cursorPosition.x,
                      top: cursorPosition.y,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="w-6 h-6 relative">
                      {/* Vertical line */}
                      <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-white shadow-lg transform -translate-x-1/2"></div>
                      {/* Horizontal line */}
                      <div className="absolute top-1/2 left-0 w-6 h-0.5 bg-white shadow-lg transform -translate-y-1/2"></div>
                      {/* Center dot */}
                      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <MoveHorizontal className="h-5 w-5 text-gray-500" />
            <p className="text-center">Click anywhere to position image or drag to move</p>
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
                  max={200}
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
                <RotateCw className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
          <br />
          <p className="text-gray-600 text-sm text-center">
            Since Cavellea are round, it doesn't matter if your
            <br />
            image is upside down or sideways!
          </p>
          <br />
          <button
            onClick={handleResetImageEdits}
            className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 text-center"
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
          <br />
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
      )}
    </div>
  );
};

export default DesignOptions;
