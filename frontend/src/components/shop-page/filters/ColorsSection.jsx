"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoMdCheckmark } from "react-icons/io";
import { cn } from "@/lib/utils";

const DryFruitsSection = () => {
  const [selectedDryFruit, setSelectedDryFruit] = useState("");

  const dryFruits = [
    "Almonds",
    "Cashews",
    "Walnuts",
    "Pistachios",
    "Raisins",
    "Dates",
    "Figs",
    "Hazelnuts",
    "Brazil Nuts",
    "Pine Nuts",
  ];

  return (
    <Accordion type="single" collapsible defaultValue="filter-dryfruits">
      <AccordionItem value="filter-dryfruits" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Dry Fruits
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex flex-wrap gap-2.5">
            {dryFruits.map((fruit, index) => (
              <button
                key={index}
                type="button"
                className={cn([
                  "border border-black/20 rounded-lg px-4 py-2",
                  selectedDryFruit === fruit ? "bg-gray-300" : "bg-white",
                ])}
                onClick={() => setSelectedDryFruit(fruit)}
              >
                {fruit} {selectedDryFruit === fruit && <IoMdCheckmark className="text-base text-black" />}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DryFruitsSection;