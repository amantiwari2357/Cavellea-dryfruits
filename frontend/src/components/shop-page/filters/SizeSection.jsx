"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const DryFruitsSection = () => {
  const [selected, setSelected] = useState("");

  const dryFruits = [
    "Almonds",
    "Cashews",
    "Walnuts",
    "Pistachios",
    "Raisins",
    "Dates",
    "Figs",
    "Hazelnuts",
    "Apricots",
  ];

  return (
    <Accordion type="single" collapsible defaultValue="filter-dryfruits">
      <AccordionItem value="filter-dryfruits" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Dry Fruits
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex items-center flex-wrap">
            {dryFruits.map((fruit, index) => (
              <button
                key={index}
                type="button"
                className={cn([
                  "bg-[#F0F0F0] m-1 flex items-center justify-center px-5 py-2.5 text-sm rounded-full max-h-[39px]",
                  selected === fruit && "bg-black font-medium text-white",
                ])}
                onClick={() => setSelected(fruit)}
              >
                {fruit}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DryFruitsSection;