// app/privacy-policy/page.tsx

import { Shield, Eye, Database, Lock } from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <main className="pt-20 sm:pt-24 lg:pt-28 bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full mb-4 sm:mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">
              Privacy & Security
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-space-grotesk text-slate-800 mb-4 sm:mb-6 leading-tight">
            Privacy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
              Policy
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none space-y-6 sm:space-y-8">
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-200/50">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                Information We Collect
              </h2>
            </div>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                We collect information you provide directly to us, such as when
                you create an account, make a purchase, or contact us for
                support.
              </p>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                <li>
                  Personal information (name, email address, phone number)
                </li>
                <li>
                  Business information (company name, industry, requirements)
                </li>
                <li>
                  Payment information (processed securely through third-party
                  providers)
                </li>
                <li>Communication preferences and history</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-200/50">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Database className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                How We Use Your Information
              </h2>
            </div>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Provide customer support and technical assistance</li>
                <li>
                  Send you important updates about your orders and our services
                </li>
                <li>Improve our products and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-200/50">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                Information Security
              </h2>
            </div>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p>
                However, no method of transmission over the internet or
                electronic storage is 100% secure, so we cannot guarantee
                absolute security.
              </p>
            </div>
          </section>

          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-200/50">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                Your Rights
              </h2>
            </div>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Data portability</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-200/50">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
              Contact Us
            </h2>
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Email:</strong> voltagelectricals@gmail.com
                </p>
                <p>
                  <strong>Phone:</strong> +91 74900 98328

                </p>
                <p>
                  <strong>Address:</strong> Shop No. 9, Near Chhani Bus Stand, Vadodara,
Gujarat, India - 391740
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
