import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// type FaqItem = {
//   question: string;
//   answer: string;
// };

const faqsData = [
  {
    question: "Are your dry fruits organic?",
    answer:
      "Yes, we offer a selection of organic dry fruits that are free from pesticides and artificial additives.",
  },
  {
    question: "How should I store dry fruits?",
    answer:
      "Store them in an airtight container in a cool, dry place. For extended freshness, refrigeration is recommended.",
  },
  {
    question: "What is the shelf life of dry fruits?",
    answer:
      "Our dry fruits typically have a shelf life of 6 to 12 months if stored properly.",
  },
  {
    question: "Do you add any preservatives to the dry fruits?",
    answer:
      "No, our dry fruits are 100% natural and free from preservatives or artificial flavors.",
  },
  {
    question: "Do you offer bulk purchasing or wholesale options?",
    answer:
      "Yes, we provide bulk and wholesale purchasing options. Please contact our support team for more details.",
  },
  {
    question: "What are the health benefits of consuming dry fruits?",
    answer:
      "Dry fruits are rich in essential nutrients, vitamins, and antioxidants that promote heart health, improve digestion, and boost immunity.",
  },
  {
    question: "What are the shipping options and costs?",
    answer:
      "We offer standard and express shipping. The cost depends on your location and order size. Free shipping is available on orders above a certain amount.",
  },
  {
    question: "What is your return and refund policy?",
    answer:
      "If you receive a damaged or incorrect product, you can request a return or replacement within 7 days of delivery.",
  },
];

const FaqContent = () => {
  return (
    <section>
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6">
        Frequently Asked Questions
      </h3>
      <Accordion type="single" collapsible>
        {faqsData.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx + 1}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqContent;
