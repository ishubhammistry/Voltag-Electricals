// src/components/Breadcrumbs.tsx

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  href: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 break-words sm:gap-2.5 flex-wrap">
        {/* ✅ 1. Always add the Home icon link as the first item */}
        <li>
          <Link
            href="/"
            className="text-slate-500 hover:text-primary transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span> {/* For screen readers */}
          </Link>
        </li>

        {/* ✅ 2. Map over the rest of the items */}
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Always show a separator now */}
            <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
            
            {/* Logic for last item vs. a regular link remains the same */}
            {index === items.length - 1 ? (
              <span
                className="text-sm font-semibold text-slate-800"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-sm font-medium text-slate-500 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}