import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

// Removed TypeScript type alias as this is a JavaScript file

const dryFruitsData = [
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

const DryFruitSection = () => {
  return (
    <Accordion type="single" collapsible defaultValue="filter-dryfruits">
      <AccordionItem value="filter-dryfruits" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Dry Fruits
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex flex-col text-black/60 space-y-0.5">
            {dryFruitsData.map((fruit, idx) => (
              <Link
                key={idx}
                href={fruit.slug}
                className="flex items-center justify-between py-2"
              >
                {fruit.title} <MdKeyboardArrowRight />
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DryFruitSection;
