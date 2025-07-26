// app/contact/page.tsx

import { MapPin, Phone, Mail, User } from 'lucide-react';
import ContactForm from './ContactForm'; // We will create this component next

export default function ContactPage() {
  const shopAddress = "Shop No. 9, Near Chhani Bus Stand, Vadodara, Gujarat, India - 391740";
  const ownerName = "Mr. Hitesh Socha";
  const phoneNumber = "+91 74900 98328";
  const emailAddress = "voltagelectricals@gmail.com";

  // Google Maps embed URL - replace with your actual business location
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14767.234567890123!2d73.1932!3d22.2845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5a555555555%3A0x8f2c04e4b8a48b3a!2sMakarpura%20GIDC%2C%20Vadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1678886543210!5m2!1sen!2sin";

  return (
    <div className="bg-gradient-to-br from-primary/5 via-white to-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-space-grotesk text-slate-800 mb-4 animate-fade-in-up">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
              Touch
            </span>
          </h1>
          <p
            className="text-lg text-slate-600 max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            We are here to help with all your electrical and automation needs. Reach out to us for inquiries, support, or quotes.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Info & Map */}
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {/* Contact Details Card */}
            <div className="bg-white/60 backdrop-blur-sm border border-slate-200/50 p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold font-space-grotesk text-slate-800 mb-6">Contact Information</h2>
              <div className="space-y-4 text-slate-600">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-4 mt-1 text-primary" />
                  <span>{shopAddress}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-4 text-primary" />
                  <a href={`tel:${phoneNumber}`} className="hover:text-primary">{phoneNumber}</a>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-4 text-primary" />
                  <a href={`mailto:${emailAddress}`} className="hover:text-primary">{emailAddress}</a>
                </div>
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-4 text-primary" />
                  <span>Proprietor: {ownerName}</span>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200/50">
              <iframe
                src={mapSrc}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <div className="bg-white/60 backdrop-blur-sm border border-slate-200/50 p-8 rounded-2xl shadow-lg h-full">
              <h2 className="text-2xl font-bold font-space-grotesk text-slate-800 mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
