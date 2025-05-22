
  import React, { useEffect, useState } from 'react';
  import { toast } from "sonner";

  const CandyPreview = ({ selectedColors, selectedImage, selectedclipart, firstLine, secondLine, selectedFontStyle }) => {
    const [candies, setCandies] = useState([]);
    
    // ye clor collection ka function hai
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
        { name: 'Orange', value: '#FF5C00', key: 'orange' },
        { name: 'Light Purple', value: '#C1A7E2', key: 'lightPurple' },
        { name: 'Dark Pink', value: '#D6218F', key: 'darkPink' },
        { name: 'Dark Yellow', value: '#EFAA22', key: 'darkYellow' },
      ];
      
      const foundColor = colorOptions.find(c => c.key === colorKey);
      return foundColor ? foundColor.value : '#00008B';
    };
    
    useEffect(() => {
      // Create a random arrangement of candies based on selected colors
      const generateCandies = () => {
        if (selectedColors.length === 0) return [];
        
        const newCandies = [];  
        const count = 70; 
        // yaha se const count = 100;  ham jitna chahe utna candy bana sakte hai
        
        // Determine what customization options we have
        const hasText = firstLine || secondLine;
        const hasImage = selectedImage !== null;
        const hasCustomization = hasText || hasImage;
        const hasClipart = selectedclipart !== null;
        
        for (let i = 0; i < count; i++) {
          // Choose a random color from selected colors
          const colorKey = selectedColors[Math.floor(Math.random() * selectedColors.length)];
          
          // Random position within the container
          const x = 10 + Math.random() * 110; // 5-95% of width
          const y = 10 + Math.random() * 110; // 5-95% of height
          
          // Consistent size for all candies (36-40px)
          const size = 50 + Math.random() * 5;
          
          // Random z-index for layering
          const zIndex = Math.floor(Math.random() * 10);
          
          // Random rotation
          const rotation = Math.random() * 360;

          // Determine what content to show on this candy
          let contentType = 'default'; // 'default', 'text', 'image', 'clipart'
          
          if (hasCustomization) {
            // Distribute different content types across candies
            const randomValue = Math.random();
            
            // If we have both text and image, mix the content types
            if (hasText && hasImage) {
              if (randomValue < 0.6) {
                contentType = 'text';
              } else {
                contentType = 'image';
              }
            } else if (hasText) {
              // If we only have text, show it on all candies
              contentType = 'text';
            } else if (hasImage) {
              // If we only have image, show it on all candies
              contentType = 'image';
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
          });
        }
        
        return newCandies;
      };
      
      setCandies(generateCandies());
    }, [selectedColors, firstLine, secondLine, selectedImage, selectedclipart]);

    const handleRefreshCandies = () => {
      const refreshPreview = () => {
  setCandies(prev => {
    const newCandies = [];
    const spacing = 100; 
    const usedPositions = [];

    for (let i = 0; i < prev.length; i++) {
      let x, y;
      let safe = false;
      let attempts = 0;

      while (!safe && attempts < 100) {
        x = 5 + Math.random() * 80;
        y = 5 + Math.random() * 80;
        safe = true;

        for (const pos of usedPositions) {
          const dx = pos.x - x;
          const dy = pos.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < spacing) {
            safe = false;
            break;
          }
        }

        attempts++;
      }

      usedPositions.push({ x, y });

      newCandies.push({
        ...prev[i],
        x,
        y,
        rotation: Math.random() * 360,
      });
    }

    return newCandies;
  });

  toast.success("Preview refreshed with spacing!");
};

refreshPreview();
    };
    
    // Determine which custom content to show (text, image or clipart)
    const hasText = firstLine || secondLine;
    const hasImage = selectedImage !== null;
    const hasCustomization = hasText || null;
    // const hasClipart = selectedclipart !== null;
    
    // Set font family based on selected style
    const getFontFamily = (style) => {
      switch(style) {
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
    const getImageSource = () => {
      if (!selectedImage) return null;
      return typeof selectedImage === 'object' ? selectedImage.src : selectedImage;
    };

    // Get image style transformations
    const getImageStyle = (isDark) => {
      if (!selectedImage) return {};
      
      const baseStyle = {
        //filter: isDark ? 'brightness(0) invert(1)' : 'brightness(0)',
        maxWidth: '70%',
        maxHeight: '70%',
      };

      // Add transform style if the image has transformation data
      if (typeof selectedImage === 'object' && selectedImage.zoom) {
        // For candies, we just apply a more subtle version of the transformations
        const scale = 1 + ((selectedImage.zoom - 100) / 200); // Less dramatic zoom
        return {
          ...baseStyle,
          transform: `scale(${scale}) rotate(${selectedImage.rotation / 2}deg)`
        };
      }

      return baseStyle;
    };

    return (
      <div className="flex flex-col space-y-4">
        <div className="relative w-400 h-[400px] rounded-lg overflow-hidden border border-gray-200">
          {/* esse ham pura  preview ke box ko manage kr sakte hai 🔝 */}
          {selectedColors.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-lg">Select colors to see your candy mix preview</p>
            </div>
          ) : (
            <>
              {candies.map((candy) => {
                const colorValue = getColorValue(candy.colorKey);
                const isDark = colorValue !== '#FFFFFF' && colorValue !== '#F5F5F5' && colorValue !== '#E5E4E2' && colorValue !== '#A3E0F5';
                
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
  {!hasCustomization && (
    <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-700'}`}>𝓒</span>
  )}
{/* </div> */}

                    
                    {candy.contentType === 'text' && hasText && (
                      <div className={`flex flex-col items-center justify-center ${fontClass} text-${isDark ? 'white' : 'gray-700'} text-[6px] leading-tight text-center transform`}>
                        {firstLine && <div>{firstLine}</div>}
                        {secondLine && <div>{secondLine}</div>}
                      </div>
                    )}

                    {candy.contentType === 'image' && hasImage && (
                      <div className="w-full h-full flex items-center justify-center">
                        <img 
                          src={getImageSource()} 
                          alt="Customized" 
                          className="object-contain"
                          style={getImageStyle(isDark)}
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