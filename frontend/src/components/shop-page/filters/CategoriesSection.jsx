import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

/**
 * @typedef {Object} Category
 * @property {string} title
 * @property {string} slug
 */

const categoriesData = [
  {
    title: "Almonds",
    slug: "/shop?category=almonds",
  },
  {
    title: "Cashews",
    slug: "/shop?category=cashews",
  },
  {
    title: "Walnuts",
    slug: "/shop?category=walnuts",
  },
  {
    title: "Pistachios",
    slug: "/shop?category=pistachios",
  },
  {
    title: "Raisins",
    slug: "/shop?category=raisins",
  },
];

const CategoriesSection = () => {
  return (
    <div className="flex flex-col space-y-0.5 text-black/60">
      {categoriesData.map((category, idx) => (
        <Link
          key={idx}
          href={category.slug}
          className="flex items-center justify-between py-2"
        >
          {category.title} <MdKeyboardArrowRight />
        </Link>
      ))}
    </div>
  );
};

export default CategoriesSection;
