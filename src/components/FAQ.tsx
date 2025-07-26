
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

const FAQ = () => {
  const faqs = [
    {
      question: "What types of electrical products do you supply?",
      answer: "We supply a comprehensive range of industrial electrical products including circuit protection devices, control systems, lighting solutions, motors, transformers, switchgear, and automation components from top brands like Siemens, ABB, Schneider Electric, and more."
    },
    {
      question: "Do you provide installation and maintenance services?",
      answer: "Yes, we offer complete installation, commissioning, and maintenance services for all our electrical products. Our certified technicians ensure proper installation and provide ongoing support to keep your systems running efficiently."
    },
    {
      question: "What is your delivery time for electrical products?",
      answer: "Delivery times vary based on product availability and location. Standard items are typically delivered within 2-5 business days in Gujarat. For special orders or bulk quantities, we'll provide a specific timeline during order confirmation."
    },
    {
      question: "Do you offer technical support and consultation?",
      answer: "Absolutely! Our experienced engineers provide technical consultation, system design assistance, and product selection guidance. We help you choose the right electrical solutions for your specific industrial requirements."
    },
    {
      question: "What are your payment terms and warranty policies?",
      answer: "We offer flexible payment terms including cash, bank transfer, and credit facilities for established customers. All products come with manufacturer warranties, and we provide additional service warranties on our installation work."
    },
    {
      question: "Can you handle bulk orders for industrial projects?",
      answer: "Yes, we specialize in bulk orders for industrial projects. We offer competitive pricing for large quantities, project-specific packaging, and dedicated project management support to ensure timely delivery."
    },
    {
      question: "Do you provide training on electrical systems?",
      answer: "We offer training programs on various electrical systems including PLC programming, SCADA operations, motor control, and safety protocols. Training can be conducted at our facility or your location."
    },
    {
      question: "What geographic areas do you serve?",
      answer: "We primarily serve Gujarat and surrounding regions, with our main operations based in Vadodara. For special projects, we can extend our services to other parts of India with advance planning."
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-space-grotesk text-gray-800 mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Get answers to common questions about our electrical products and services.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 glass-effect">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-200">
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-gray-800 hover:text-primary py-4 sm:py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-gray-600 pb-4 sm:pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </section>
  );
};

export default FAQ;