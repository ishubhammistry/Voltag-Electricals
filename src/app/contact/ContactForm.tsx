// src/components/ContactForm.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // This sends the data to your API route from Step 1
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      toast.success("Message Sent!", {
        description: "Thank you! We've received your message.",
      });
      (event.target as HTMLFormElement).reset();

    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Submission Failed", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
        <Input id="name" name="name" type="text" required placeholder="John Doe" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
        <Input id="email" name="email" type="email" required placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
        <Input id="subject" name="subject" type="text" required placeholder="Product Inquiry" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
        <Textarea id="message" name="message" required placeholder="Your message..." rows={5} />
      </div>
      <div>
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white text-lg py-3 rounded-xl transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </div>
    </form>
  );
}