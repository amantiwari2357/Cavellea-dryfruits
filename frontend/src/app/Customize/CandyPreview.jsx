"use client";
import React, { useEffect, useState } from 'react';
import { toast } from "sonner";

const CandyPreview = ({ selectedColors, selectedImage, secondSelectedImage, selectedclipart, firstLine, secondLine, selectedFontStyle }) => {
  const [candies, setCandies] = useState([]);

  // Color collection function
  const getColorValue = (colorKey) => {
    const colorOptions = [
      { name: 'Dark Blue', value: '#000080', key: 'darkBlue' },
      { name: 'Black', value: '#000000', key: 'black' },
      { name: 'Purple', value: '#800080', key: 'purple' },
      { name: 'Maroon', value: '#800000', key: 'maroon' },
      { name: 'Brown', value: '#8B4513', key: 'brown' },
      { name: 'White', value: '#FFFFFF', key: 'white' },
      { name: 'Blue', value: '#0074BC', key: 'blue' },
      { name: 'Red', value: '#BC0034', key: 'red' },
      { name: 'Yellow', value: '#F9D71C', key: 'yellow' },
      { name: 'Pearl', value: '#F5F5F5', key: 'pearl' },
      { name: 'Pink', value: '#F5A3C7', key: 'pink' },
      { name: 'Light Blue', value: '#A3E0F5', key: 'lightBlue' },
      { name: 'Dark Green', value: '#007C36', key: 'darkGreen' },
      { name: 'Platinum', value: '#E5E4E2', key: 'platinum' },
      { name: 'Light Purple', value: '#C1A7E2', key: 'lightPurple' },
      { name: 'Dark Pink', value: '#D6218F', key: 'darkPink' },
      { name: 'Dark Yellow', value: '#EFAA22', key: 'darkYellow' },
    ];

    const foundColor = colorOptions.find(c => c.key === colorKey);
    return foundColor ? foundColor.value : '#00008B';
  };

  const generateCandies = () => {
    if (selectedColors.length === 0) return [];

    const newCandies = [];
    const count = 60;
    const candySize = 45; // Approximate size of each candy for layout calculation
    const padding = 10; // Padding between candies
    const containerWidth = 400; // Width of the preview container
    const containerHeight = 400; // Height of the preview container

    let currentX = padding;
    let currentY = padding;

    // Determine what customization options we have
    const hasText = firstLine || secondLine;
    const hasImage1 = selectedImage !== null;
    const hasImage2 = secondSelectedImage !== null;
    const hasClipart = selectedclipart !== null;

    const customizationOptions = [];
    if (hasText) customizationOptions.push('text');
    if (hasImage1) customizationOptions.push('image1'); // Differentiate first image
    if (hasImage2) customizationOptions.push('image2'); // Differentiate second image
    if (hasClipart) customizationOptions.push('clipart');

    const hasCustomization = customizationOptions.length > 0;

    for (let i = 0; i < count; i++) {
      // Choose a random color from selected colors
      const colorKey = selectedColors[Math.floor(Math.random() * selectedColors.length)];

      // Calculate position for row-wise layout
      const x = (currentX / containerWidth) * 100;
      const y = (currentY / containerHeight) * 100;

      // Consistent size for all candies (50-55px)
      const size = 50 + Math.random() * 5;

      // Random z-index for layering
      const zIndex = Math.floor(Math.random() * 10);

      // Random rotation
      const rotation = Math.random() * 360;

      // Determine what content to show on this candy
      let contentType = 'default';
      let contentData = null; // To store which image object to use

      if (hasCustomization) {
        // If there are customization options, pick one randomly
        contentType = customizationOptions[Math.floor(Math.random() * customizationOptions.length)];
        
        // Assign the specific image object based on contentType
        if (contentType === 'image1') {
          contentData = selectedImage;
        } else if (contentType === 'image2') {
          contentData = secondSelectedImage;
        } else if (contentType === 'clipart') {
          contentData = selectedclipart;
        }
      }

      newCandies.push({
        id: i,
        colorKey,
        x,
        y,
        size,
        zIndex,
        rotation,
        contentType,
        contentData, // Store the specific image/clipart object for rendering
      });

      // Move to the next position for row-wise layout
      currentX += (candySize + padding);
      if (currentX + candySize + padding > containerWidth) {
        currentX = padding;
        currentY += (candySize + padding);
      }
    }

    return newCandies;
  };

  useEffect(() => {
    setCandies(generateCandies());
  }, [
    selectedColors, 
    firstLine, 
    secondLine, 
    // Track image 1 internal props
    selectedImage?.src,
    selectedImage?.position?.x,
    selectedImage?.position?.y,
    selectedImage?.rotation,
    selectedImage?.zoom,
    // Track image 2 internal props
    secondSelectedImage?.src,
    secondSelectedImage?.position?.x,
    secondSelectedImage?.position?.y,
    secondSelectedImage?.rotation,
    secondSelectedImage?.zoom,
    // Track clipart internal props
    selectedclipart?.src,
    selectedclipart?.zoom,
    selectedclipart?.rotation,
  ]);

  const handleRefreshCandies = () => {
    setCandies(prevCandies => {
      const updatedCandies = [];
      const candySize = 45;
      const padding = 10;
      const containerWidth = 400;
      const containerHeight = 400;

      let currentX = padding;
      let currentY = padding;

      // Determine what customization options we have for re-generation
      const hasText = firstLine || secondLine;
      const hasImage1 = selectedImage !== null;
      const hasImage2 = secondSelectedImage !== null;
      const hasClipart = selectedclipart !== null;

      const customizationOptions = [];
      if (hasText) customizationOptions.push('text');
      if (hasImage1) customizationOptions.push('image1');
      if (hasImage2) customizationOptions.push('image2');
      if (hasClipart) customizationOptions.push('clipart');

      const hasCustomization = customizationOptions.length > 0;

      for (let i = 0; i < prevCandies.length; i++) {
        const x = (currentX / containerWidth) * 100;
        const y = (currentY / containerHeight) * 100;

        let newContentType = 'default';
        let newContentData = null;

        if (hasCustomization) {
          newContentType = customizationOptions[Math.floor(Math.random() * customizationOptions.length)];
          if (newContentType === 'image1') {
            newContentData = selectedImage;
          } else if (newContentType === 'image2') {
            newContentData = secondSelectedImage;
          } else if (newContentType === 'clipart') {
            newContentData = selectedclipart;
          }
        }

        updatedCandies.push({
          ...prevCandies[i],
          x,
          y,
          rotation: Math.random() * 360, // Keep rotation random for variety
          contentType: newContentType,
          contentData: newContentData,
        });

        currentX += (candySize + padding);
        if (currentX + candySize + padding > containerWidth) {
          currentX = padding;
          currentY += (candySize + padding);
        }
      }
      return updatedCandies;
    });

    toast.success("Preview refreshed!");
  };

  // Set font family based on selected style
  const getFontFamily = (style) => {
    switch (style) {
      case 'Bold': return 'font-bold';
      case 'Regular': return '';
      case 'Light': return 'font-light';
      case 'Script': return 'font-serif italic';
      case 'Italic': return 'italic';
      case 'Monospace': return 'font-mono';
      default: return '';
    }
  };

  const fontClass = getFontFamily(selectedFontStyle);

  // Get image source from image object or direct string
  const getImageSource = (imageObject) => {
    if (!imageObject) return null;
    return typeof imageObject === 'object' ? imageObject.src : imageObject;
  };

  // Get clipart source from clipart object or direct string
  const getClipartSource = (clipartObject) => {
    if (!clipartObject) return null;
    return typeof clipartObject === 'object' ? clipartObject.src : clipartObject;
  };

  const getMediaStyle = (mediaObject) => {
    if (!mediaObject) return {};

    const baseStyle = {
      maxWidth: '70%',
      maxHeight: '70%',
    };

    if (typeof mediaObject === 'object' && mediaObject.zoom) {
      const scale = 1 + ((mediaObject.zoom - 100) / 200); // Less dramatic zoom
      const rotation = mediaObject.rotation || 0;
      return {
        ...baseStyle,
        transform: `scale(${scale}) rotate(${rotation / 2}deg)`,
      };
    }

    return baseStyle;
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative w-[800px] h-[400px] rounded-lg overflow-hidden border border-gray-200">
        {selectedColors.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">Choose a color to view the candy mix preview.</p>
          </div>
        ) : (
          <>
            {candies.map((candy) => {
              const colorValue = getColorValue(candy.colorKey);
              const isDark = !['#FFFFFF', '#F5F5F5', '#E5E4E2', '#A3E0F5'].includes(colorValue);

              return (
                <div
                  key={candy.id}
                  className="absolute rounded-full flex items-center justify-center p-1 transition-all duration-300"
                  style={{
                    backgroundColor: colorValue,
                    width: `${candy.size}px`,
                    height: `${candy.size}px`,
                    left: `${candy.x}%`,
                    top: `${candy.y}%`,
                    zIndex: candy.zIndex,
                    transform: `rotate(${candy.rotation}deg)`,
                    boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.3), inset 0px -3px 6px rgba(0, 0, 0, 0.2), inset 0px 3px 6px rgba(255, 255, 255, 0.5)`,
                    position: 'absolute',
                    overflow: 'hidden'
                  }}
                >
                  {/* Default 'C' if no customization is applied to this candy */}
                  {candy.contentType === 'default' && (
                    <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-700'}`}>𝓒</span>
                  )}

                  {/* Render Text */}
                  {candy.contentType === 'text' && (firstLine || secondLine) && (
                    <div className={`flex flex-col items-center justify-center ${fontClass} text-${isDark ? 'white' : 'gray-700'} text-[6px] leading-tight text-center`}>
                      {firstLine && <div>{firstLine}</div>}
                      {secondLine && <div>{secondLine}</div>}
                    </div>
                  )}

                  {/* Render Image 1 */}
                  {candy.contentType === 'image1' && candy.contentData && (
                    <img
                      src={getImageSource(candy.contentData)}
                      alt="Customized Image 1"
                      className="w-full h-full rounded-full object-cover"
                      style={{
                        transform: candy.contentData.position ? `translate(${candy.contentData.position.x}px, ${candy.contentData.position.y}px) rotate(${candy.contentData.rotation}deg) scale(${candy.contentData.zoom / 100})` : 'none',
                        filter: "grayscale(100%)",
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  )}

                  {/* Render Image 2 */}
                  {candy.contentType === 'image2' && candy.contentData && (
                    <img
                      src={getImageSource(candy.contentData)}
                      alt="Customized Image 2"
                      className="w-full h-full rounded-full object-cover"
                      style={{
                        transform: candy.contentData.position ? `translate(${candy.contentData.position.x}px, ${candy.contentData.position.y}px) rotate(${candy.contentData.rotation}deg) scale(${candy.contentData.zoom / 100})` : 'none',
                        filter: "grayscale(100%)",
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  )}

                  {/* Render Clipart */}
                  {candy.contentType === 'clipart' && candy.contentData && (
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={getClipartSource(candy.contentData)}
                        alt="Customized Clipart"
                        className="object-contain"
                        style={getMediaStyle(candy.contentData)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={handleRefreshCandies}
                className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all"
                aria-label="Refresh Preview"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CandyPreview;
// Note: Ensure that the selectedImage, secondSelectedImage, and selectedclipart props are passed as objects with the necessary properties (src, position, rotation, zoom) for this component to work correctly.