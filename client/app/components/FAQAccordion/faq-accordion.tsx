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
  faqs: {
    question: string;
    answer: string;
  }[];
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ faqs }) => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {faqs.map((faq, idx) => (
        <AccordionItem
          key={idx}
          value={`faq-${idx}`}
          className="rounded-2xl border border-border/50 overflow-hidden backdrop-blur-xl bg-background/95 dark:bg-slate-900/95 shadow-lg px-6 data-[state=open]:shadow-xl transition-all"
        >
          <AccordionTrigger className="text-left text-gray-900 hover:no-underline py-5">
            {faq.question}
          </AccordionTrigger>

          <AccordionContent className="pb-5 text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
