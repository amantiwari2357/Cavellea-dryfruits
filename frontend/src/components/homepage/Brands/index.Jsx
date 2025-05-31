  import React from "react";

  const brandsData = [
    {
      id: "almonds",
      name: "Almond Delight",
    },
    {
      id: "cashews",
      name: "Cashew Kingdom",
    },
    {
      id: "walnuts",
      name: "Walnut Wonders",
    },
    {
      id: "pistachios",
      name: "Pistachio Treats",
    },
    {
      id: "raisins",
      name: "Golden Raisins",
    },
  ];

  const index = () => {
    return (
      <div className="bg-black">
        <div className="max-w-frame mx-auto flex flex-wrap items-center justify-center md:justify-between py-5 md:py-0 sm:px-4 xl:px-0 space-x-7">
          {/* {brandsData.map((brand) => (
            <span
              key={brand.id}
              className="text-white text-lg font-semibold uppercase my-5 md:my-11"
            >
              {brand.name}
            </span>
          ))} */}
        </div>
      </div>
    );
  };

  export default index;
