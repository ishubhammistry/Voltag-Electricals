import Link from "next/link";
// ✅ 1. Import the Home icon
import { ChevronRight, Home } from "lucide-react";

// Define the type for a single breadcrumb item
type BreadcrumbItem = {
  label: string;
  href: string;
};

// Define the props for the Breadcrumbs component
interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Return null if there are no items to display
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 break-words sm:gap-2.5 flex-wrap">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Don't show a separator before the first item */}
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
            )}

            {/* The last item is the current page, so it's not a link */}
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
                {/* ✅ 2. Conditionally add the Home icon for the first item */}
                {index === 0 ? (
                  <span className="flex items-center gap-1.5">
                    <Home className="w-4 h-4" />
                    {item.label}
                  </span>
                ) : (
                  item.label
                )}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
