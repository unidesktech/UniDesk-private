"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ faqs }) => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {faqs.map((faq, idx) => (
        <AccordionItem
          key={idx}
          value={`faq-${idx}`}
          className="bg-white border border-gray-200 rounded-xl px-6 overflow-hidden"
        >
          <AccordionTrigger className="text-left text-gray-900 hover:no-underline py-5">
            {faq.question}
          </AccordionTrigger>

          <AccordionContent className="text-gray-600 pb-5">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
