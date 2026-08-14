import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Does submitting the application make me a NationsWorld member?",
    answer: "No. Submission begins the membership review process. Membership is confirmed only after NationsWorld approval."
  },
  {
    question: "When will I receive my Member ID?",
    answer: "Your official Member ID is issued after your application has been approved and final registration has been completed."
  },
  {
    question: "What is my Application Reference?",
    answer: "It is the unique reference generated for your application. Example: NWA-20260814-X7K4."
  },
  {
    question: "How do I submit my PDF?",
    answer: "Download the generated PDF, tap Submit via WhatsApp, attach the PDF in the WhatsApp conversation and send it to the official NationsWorld membership number."
  },
  {
    question: "Can I choose more than one team?",
    answer: "You may select one primary team and one optional secondary area of interest. NationsWorld may also involve members in cross-team projects."
  },
  {
    question: "Are NASDI members part of Research & Innovation?",
    answer: "Yes. Under the current NationsWorld structure, NASDI members are automatically part of the Research & Innovation Team."
  }
];

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-nw-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-nw-green">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-nw-dark mt-1">
            Membership FAQ
          </h2>
          <p className="text-sm text-nw-muted mt-2">
            Clear guidance regarding the Stage 1 membership application process.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.question}
                className="border border-nw-border rounded-xl bg-gray-50/50 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-nw-dark flex items-center justify-between gap-3 hover:bg-nw-soft/50 transition"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-nw-green shrink-0" />
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-nw-green shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-nw-muted shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-nw-muted leading-relaxed border-t border-nw-border/50 bg-white pt-3 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
