// app/not-found.tsx

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] bg-gradient-to-br from-primary/5 to-white py-12 text-center px-4">
      <AlertTriangle className="h-20 w-20 text-primary mb-6 animate-pulse" />
      <h1 className="text-6xl md:text-8xl font-bold font-space-grotesk text-slate-800">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-slate-700 mt-2 mb-4">
        Page Not Found
      </h2>
    <p className="text-slate-500 max-w-md mx-auto mb-8">
  Sorry, the page you are looking for might have been moved or doesn&#39;t exist.
</p>
      <Button asChild size="lg" className="rounded-xl">
        <Link href="/">Return to Homepage</Link>
      </Button>
    </div>
  );
}