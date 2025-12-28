"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { StyleConfig } from "@/app/models/resusable.model";

export interface FaqItem {
  question: string;
  answer: string;
  bullets?: string[];
}

export interface FaqStyleProps {
  questionStyle?: StyleConfig;
  answerStyle?: StyleConfig;
  bulletStyle?: StyleConfig;
  bulletWrapperStyle?: StyleConfig;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  styles?: FaqStyleProps;
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ faqs, styles }) => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {faqs.map((faq, idx) => (
        <AccordionItem
          key={idx}
          value={`faq-${idx}`}
          className="rounded-2xl border border-border/50 overflow-hidden backdrop-blur-xl bg-background/95 dark:bg-slate-900/95 shadow-lg px-6 data-[state=open]:shadow-xl transition-all"
        >
          <AccordionTrigger
            className={`text-left text-gray-900 hover:no-underline py-5 cursor-pointer ${
              styles?.questionStyle?.className ?? ""
            }`}
            style={styles?.questionStyle?.inlineStyles}
          >
            {faq.question}
          </AccordionTrigger>

          <AccordionContent
            className={`pb-5 text-muted-foreground ${
              styles?.answerStyle?.className ?? ""
            }`}
            style={styles?.answerStyle?.inlineStyles}
          >
            <p>{faq.answer}</p>

            {faq.bullets && faq.bullets.length > 0 && (
              <ul
                className={`space-y-2 mt-4 ${
                  styles?.bulletWrapperStyle?.className ?? ""
                }`}
                style={styles?.bulletWrapperStyle?.inlineStyles}
              >
                {faq.bullets.map((bullet, index) => (
                  <li
                    key={index}
                    className={`flex items-start gap-3 text-gray-700 dark:text-gray-300 ${
                      styles?.bulletStyle?.className ?? ""
                    }`}
                    style={styles?.bulletStyle?.inlineStyles}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-teal-400 mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;