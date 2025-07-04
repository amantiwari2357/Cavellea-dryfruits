"use client";
import React from 'react';

const PackagingOptions = ({
  selectedImage,
  secondSelectedImage,
  firstLine,
  secondLine,
  selectedFontStyle,
  selectedClipart,
  selectedColors,
}) => {
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

  const getMediaSource = (media) => {
    if (!media) return null;
    return typeof media === 'object' ? media.src : media;
  };

  const getMediaStyle = (media) => {
    if (!media || typeof media !== 'object' || !media.zoom) return {};
    const scale = 1 + ((media.zoom - 100) / 200);
    return {
      transform: `scale(${scale}) rotate(${media.rotation / 2}deg)`
    };
  };

  const getColorValue = (colorKey) => {
    const colorOptions = [
      { name: "Dark Blue", value: "#000080", key: "darkBlue" },
      { name: "Black", value: "#000000", key: "black" },
      { name: "Purple", value: "#800080", key: "purple" },
      { name: "Maroon", value: "#800000", key: "maroon" },
      { name: "Brown", value: "#8B4513", key: "brown" },
      { name: "White", value: "#FFFFFF", key: "white" },
      { name: "Blue", value: "#0074BC", key: "blue" },
      { name: "Red", value: "#BC0034", key: "red" },
      { name: "Yellow", value: "#F9D71C", key: "yellow" },
      { name: "Pearl", value: "#F5F5F5", key: "pearl" },
      { name: "Pink", value: "#F5A3C7", key: "pink" },
      { name: "Light Blue", value: "#A3E0F5", key: "lightBlue" },
      { name: "Dark Green", value: "#007C36", key: "darkGreen" },
      { name: "Platinum", value: "#E5E4E2", key: "platinum" },
      { name: "Light Purple", value: "#C1A7E2", key: "lightPurple" },
      { name: "Dark Pink", value: "#D6218F", key: "darkPink" },
      { name: "Dark Yellow", value: "#EFAA22", key: "darkYellow" },
    ];
    const foundColor = colorOptions.find(c => c.key === colorKey);
    return foundColor ? foundColor.value : '#E0E0E0';
  };

  // Modified renderPreviewCircle to accept the specific media object and a label
  const renderPreviewCircle = (mediaObject, type, label) => { // Added 'label' parameter
    let content = null;
    let hasContent = false;
    let altText = '';

    if (type === 'image' && mediaObject && getMediaSource(mediaObject)) { // Check for actual source
      hasContent = true;
      altText = label || 'Image'; // Use label for alt text
      content = (
        <img
          src={getMediaSource(mediaObject)}
          alt={altText}
          className="w-full h-full rounded-full object-cover"
          // Apply transformations directly from the mediaObject
          style={{
            transform: mediaObject.position ? `translate(${mediaObject.position.x}px, ${mediaObject.position.y}px) rotate(${mediaObject.rotation}deg) scale(${mediaObject.zoom / 100})` : 'none',
            filter: "grayscale(100%)",

            width: '100%',
            height: '100%',
            borderRadius: '50%',
          }}
        />
      );
    } else if (type === 'text' && (firstLine || secondLine)) {
      hasContent = true;
      altText = label || 'Text';
      content = (
        <div className={`text-xs text-center leading-tight truncate w-full ${fontClass}`}>
          {firstLine && <div>{firstLine}</div>}
          {secondLine && <div>{secondLine}</div>}
        </div>
      );
    } else if (type === 'clipart' && mediaObject && getMediaSource(mediaObject)) { // Check for actual source
      hasContent = true;
      altText = label || 'Clipart';
      content = (
        <img
          src={getMediaSource(mediaObject)}
          alt={altText}
          className="w-full h-full object-contain rounded-full"
          style={getMediaStyle(mediaObject)}
        />
      );
    }

    const randomColor = selectedColors.length > 0
      ? selectedColors[Math.floor(Math.random() * selectedColors.length)]
      : '#E0E0E0';

    const bgColor = getColorValue(randomColor);
    const isDark = bgColor !== '#FFFFFF' && bgColor !== '#F5F5F5' && bgColor !== '#E5E4E2' && bgColor !== '#A3E0F5';
    const textColor = isDark ? 'text-white' : 'text-gray-800';

    return (
      <div className="flex flex-col items-center"> {/* Added wrapper div for label */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center p-1 shadow-md overflow-hidden"
          style={{ backgroundColor: bgColor }}
        >
          {hasContent ? content : <span className={`text-xl font-bold ${textColor}`}>?</span>}
        </div>
        {label && <p className="text-xs text-gray-600 mt-1">{label}</p>} {/* Display label */}
      </div>
    );
  };

  const packagingOptions = [
    {
      title: 'Bulk Candy',
      price: '$59.99',
      image: '/images/pack1.avif',
      rating: 4,
      reviews: 2797
    },
    {
      title: 'Party Favor Packs',
      price: '$2.75 each',
      image: '/images/pack2.png',
      rating: 5,
      reviews: 1006
    },
    {
      title: 'Silver Favor Tins',
      price: '$4.25 each',
      image: '/images/pack3.png',
      rating: 5,
      reviews: 659
    },
    {
      title: 'Gift Boxes',
      price: '$7.99 each',
      image: '/images/pack4.avif',
      rating: 5,
      reviews: 342
    },
  ];

  return (
    <div className="p-12 bg-white rounded-lg shadow-md w-full max-w-10x2 mx-auto">
      <h2
        className="text-4xl font-bold mb-6 text-center"
        style={{
          color: 'rgb(90, 31, 6)',
          fontFamily: 'var(--font-alltogether-serif), "Times New Roman", Times, serif',
          fontWeight: 700,
        }}
      >
        Pick Your Packaging
      </h2>

      {/* Preview Circles - Now includes both images */}
      <div className="flex justify-center items-center mb-8 space-x-4">
        {selectedImage && renderPreviewCircle(selectedImage, 'image', 'Image 1')}
        {secondSelectedImage && renderPreviewCircle(secondSelectedImage, 'image', 'Image 2')}
        {(firstLine || secondLine) && renderPreviewCircle(null, 'text', 'Text')}
        {selectedClipart && renderPreviewCircle(selectedClipart, 'clipart', 'Clipart')}
      </div>

      {/* Navbar with 4 Categories */}
      <nav className="mt-8 border-t pt-6 px-6">
        <ul className="flex justify-center space-x-10 text-lg font-medium text-gray-700">
          <li className="hover:text-orange-800 hover:shadow-lg hover:-translate-y-1 transform transition duration-200 cursor-pointer px-4 py-2 rounded">
            Birthday
          </li>
          <li className="hover:text-orange-800 hover:shadow-lg hover:-translate-y-1 transform transition duration-200 cursor-pointer px-4 py-2 rounded">
            Wedding
          </li>
          <li className="hover:text-orange-800 hover:shadow-lg hover:-translate-y-1 transform transition duration-200 cursor-pointer px-4 py-2 rounded">
            Festivals
          </li>
          <li className="hover:text-orange-800 hover:shadow-lg hover:-translate-y-1 transform transition duration-200 cursor-pointer px-4 py-2 rounded">
            Custom
          </li>
        </ul>
      </nav>

      {/* Packaging Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {packagingOptions.map((option, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col items-center text-center">
            <img src={option.image} alt={option.title} className="mb-4 rounded-lg" />
            <h4 className="font-semibold text-lg">{option.title}</h4>
            <p className="text-gray-700">{option.price}</p>
            <div className="flex mt-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < option.rating ? 'text-yellow-500' : 'text-gray-300'}>⭐</span>
              ))}
            </div>
            <p className="text-sm text-gray-500">({option.reviews})</p>
            <button className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors">
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackagingOptions;
