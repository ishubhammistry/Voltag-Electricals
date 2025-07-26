// app/terms-of-service/page.tsx

import { FileText, Scale, AlertTriangle, HandHeart } from "lucide-react";

export default function TermsOfServicePage() {
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
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">
              Legal Terms
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-space-grotesk text-slate-800 mb-4 sm:mb-6 leading-tight">
            Terms of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
              Service
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none prose-headings:font-space-grotesk prose-a:text-primary space-y-6 sm:space-y-8">
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-200/50">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <HandHeart className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                Acceptance of Terms
              </h2>
            </div>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                By accessing and using Voltag Electricals website and
                services, you accept and agree to be bound by the terms and
                provision of this agreement.
              </p>
              <p>
                If you do not agree to abide by the above, please do not use
                this service.
              </p>
            </div>
          </section>

          {/* Other sections from your original file go here... */}
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-200/50">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                Services
              </h2>
            </div>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                Voltag Electricals provides industrial automation and electrical
                control solutions including:
              </p>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                <li>Electrical components and equipment sales</li>
                <li>Industrial automation consulting</li>
                <li>Technical support and maintenance</li>
                <li>Custom electrical solutions</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-200/50">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                User Responsibilities
              </h2>
            </div>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>Users are responsible for:</p>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                <li>Providing accurate and complete information</li>
                <li>Maintaining the confidentiality of account credentials</li>
                <li>Using services in compliance with applicable laws</li>
                <li>Proper installation and use of electrical products</li>
                <li>Following safety guidelines and industry standards</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-200/50">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
              Product Warranties
            </h2>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                All products sold by Voltag Electricals come with manufacturer
                warranties. Warranty terms vary by product and manufacturer.
              </p>
              <p>
                We provide support for warranty claims and will work with
                customers to resolve any product issues according to the
                applicable warranty terms.
              </p>
            </div>
          </section>

          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-200/50">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
              Limitation of Liability
            </h2>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                Voltag Electricals shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages,
                including without limitation, loss of profits, data, use,
                goodwill, or other intangible losses.
              </p>
              <p>
                Our total liability shall not exceed the amount paid by you for
                the specific service or product that gave rise to the claim.
              </p>
            </div>
          </section>

          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-200/50">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
              Modifications to Terms
            </h2>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                We reserve the right to modify these terms at any time. We will
                notify users of any material changes via email or through our
                website.
              </p>
              <p>
                Continued use of our services after such modifications
                constitutes acceptance of the updated terms.
              </p>
            </div>
          </section>

          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-200/50">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
              Contact Information
            </h2>
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                For questions about these Terms of Service, please contact us:
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
