"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({ type: '', text: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedbackMessage({ type: '', text: '' });

    try {
      // ✅ Send data to your Next.js API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit message.');
      }

      setFeedbackMessage({ type: 'success', text: 'Thank you! Your message has been sent.' });
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      console.error("Failed to submit contact form:", error);
      setFeedbackMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-space-grotesk text-gray-800 mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Ready to transform your industrial operations? Let&apos;s discuss your automation needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
          <Card className="p-4 sm:p-6 lg:p-8 glass-effect h-full">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-3" />
              Send Us a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name" 
                  className="border-gray-300 focus:border-primary focus:ring-primary h-10 sm:h-12"
                  required
                />
                <Input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email" 
                  className="border-gray-300 focus:border-primary focus:ring-primary h-10 sm:h-12"
                  required
                />
              </div>
              
              <Input 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject" 
                className="border-gray-300 focus:border-primary focus:ring-primary h-10 sm:h-12"
                required
              />
              
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Your Message"
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm sm:text-base resize-none"
                required
              ></textarea>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 sm:py-4 rounded-lg transition-all duration-300 hover:shadow-lg text-sm sm:text-base"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
              
              {feedbackMessage.text && (
                <p className={`text-sm mt-4 ${feedbackMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {feedbackMessage.text}
                </p>
              )}
            </form>
          </Card>

           <Card className="p-4 sm:p-6 lg:p-8 glass-effect h-full">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-3" />
              Visit Our Office
            </h3>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Address</h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  Shop No. 9, Near Chhani Bus Stand,<br />
                  Vadodara, Gujarat, India - 391740
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Phone</h4>
                <p className="text-gray-600 text-sm sm:text-base">+91 74900 98328</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Email</h4>
                <p className="text-gray-600 text-sm sm:text-base">voltagelectricals@gmail.com</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Business Hours</h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  Mon-Fri | 08:00 AM - 05:00 PM
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;