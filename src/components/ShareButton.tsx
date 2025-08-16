// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Share2, Check } from 'lucide-react';
// import { toast } from 'sonner'; // Import from sonner

// export default function ShareButton({ url }: { url: string }) {
//   const [isCopied, setIsCopied] = useState(false);

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(url);
//       setIsCopied(true);

//       // Show a success toast
//       toast.success('Link Copied!', {
//         description: 'You can now share the link to this product.',
//         duration: 3000,
//       });

//       setTimeout(() => setIsCopied(false), 3000);
//     } catch (err) {
//       console.error('Failed to copy: ', err);
//       // Show an error toast
//       toast.error('Failed to copy link', {
//         description: 'Please try again.',
//       });
//     }
//   };

//   return (
//     <Button variant="outline" onClick={handleCopy} className="flex items-center gap-2">
//       {isCopied ? (
//         <>
//           <Check className="w-4 h-4 text-green-500" />
//           <span>Copied</span>
//         </>
//       ) : (
//         <>
//           <Share2 className="w-4 h-4" />
//           <span>Share</span>
//         </>
//       )}
//     </Button>
//   );
// }