// src/app/not-found.tsx

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-center px-4">
      <AlertTriangle className="w-16 h-16 text-primary mb-4" />
      <h1 className="text-4xl sm:text-5xl font-bold font-space-grotesk text-slate-900 mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-slate-600 mb-8 max-w-md">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link href="/">
        <button className="bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors duration-300">
          Go back to Homepage
        </button>
      </Link>
    </main>
  );
}