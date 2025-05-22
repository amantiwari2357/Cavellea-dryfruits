import React from "react";

// SpecItem type removed because type aliases can only be used in TypeScript files.

const specsData = [
  {
    label: "Product Type",
    value: "Premium Dry Fruits",
  },
  {
    label: "Origin",
    value: "California, USA / Iran / India (Varies by product)",
  },
  {
    label: "Shelf Life",
    value: "12 Months",
  },
  {
    label: "Storage Instructions",
    value: "Store in a cool, dry place. Keep in an airtight container.",
  },
  {
    label: "Health Benefits",
    value: "Rich in protein, fiber, and essential vitamins.",
  },
  {
    label: "Allergen Information",
    value: "May contain traces of nuts and seeds.",
  },
];

const ProductDetails = () => {
  return (
    <>
      {specsData.map((item, i) => (
        <div className="grid grid-cols-3" key={i}>
          <div>
            <p className="text-sm py-3 w-full leading-7 lg:py-4 pr-2 text-neutral-500">
              {item.label}
            </p>
          </div>
          <div className="col-span-2 py-3 lg:py-4 border-b">
            <p className="text-sm w-full leading-7 text-neutral-800 font-medium">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductDetails;
