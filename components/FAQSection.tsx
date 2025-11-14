/**
 * FAQ Section Component
 * Reusable FAQ accordion with Schema.org FAQPage structured data
 * 
 * Features:
 * - Accordion-style collapsible questions
 * - Automatic Schema.org markup for SEO
 * - Dark mode support
 * - Fully accessible with ARIA attributes
 * - Mobile responsive
 * 
 * Usage:
 * import FAQSection from '@/components/FAQSection'
 * import { homepageFAQs } from '@/lib/faq-data'
 * 
 * <FAQSection faqs={homepageFAQs} showSchema={true} />
 */

import { useState } from 'react'
import Head from 'next/head'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQItem[]
  title?: string
  showSchema?: boolean
}

export default function FAQSection({ 
  faqs, 
  title = "Frequently Asked Questions",
  showSchema = true 
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Generate Schema.org FAQPage structured data for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      {/* Schema.org structured data for Google rich results */}
      {showSchema && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqSchema)
            }}
          />
        </Head>
      )}

      <section className="py-12 px-4 bg-gray-50 dark:bg-transparent">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {title}
          </h2>
          
          {/* FAQ List */}
          <dl className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-slate-700"
              >
                {/* Question - Click to toggle */}
                <dt>
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="font-semibold text-gray-900 dark:text-white pr-4">
                      {faq.question}
                    </span>
                    
                    {/* Chevron icon - rotates when open */}
                    <svg
                      className={`w-5 h-5 text-gray-500 flex-shrink-0 transform transition-transform duration-200 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 9l-7 7-7-7" 
                      />
                    </svg>
                  </button>
                </dt>
                
                {/* Answer - Shows when expanded */}
                {openIndex === index && (
                  <dd 
                    id={`faq-answer-${index}`}
                    className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed"
                  >
                    {faq.answer}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}
