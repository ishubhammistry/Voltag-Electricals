// app/contact/ContactForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real application, you would send the form data to a server endpoint here.
    // For now, we'll just simulate a success response.
    setStatus("success");
    setMessage("Thank you! Your message has been sent successfully.");

    // To reset the form after success:
    // (event.target as HTMLFormElement).reset();
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
          disabled={status === "submitting"}
        >
          {status === "submitting" && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          {status === "success" ? "Message Sent!" : "Send Message"}
        </Button>
      </div>
      {status === "success" && (
        <div className="flex items-center text-green-600">
          <CheckCircle className="w-5 h-5 mr-2" />
          <p>{message}</p>
        </div>
      )}
      {status === "error" && <p className="text-red-600">{message}</p>}
    </form>
  );
}
