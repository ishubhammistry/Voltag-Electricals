// src/components/Providers.tsx

"use client"; // This file is a Client Component

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Create the QueryClient instance here, inside the client component
  const [queryClient] = useState(() => new QueryClient());

  return (
    // Wrap children with all necessary client-side providers
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>{children}</TooltipProvider>
    </QueryClientProvider>
  );
}