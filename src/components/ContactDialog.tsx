// // src/components/ContactDialog.tsx

// import React from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from '@/components/ui/dialog';
// import { Button } from './ui/button';
// import { Phone, Mail } from 'lucide-react';

// interface ContactDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// // Replace with your actual contact information
// const CONTACT_PHONE = "+91 98765 43210";
// const CONTACT_EMAIL = "sales@voltag.in";

// const ContactDialog: React.FC<ContactDialogProps> = ({ isOpen, onClose }) => {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold text-slate-900">Contact Us</DialogTitle>
//           <DialogDescription className="text-slate-500">
//             We're here to help. Reach out to us directly for pricing and details.
//           </DialogDescription>
//         </DialogHeader>
        
//         <div className="py-4 space-y-4">
//           {/* Phone Number Button */}
//           <Button size="lg" variant="outline" asChild className="w-full justify-start h-auto py-3">
//             <a href={`tel:${CONTACT_PHONE}`}>
//               <Phone className="w-5 h-5 mr-4 text-primary" />
//               <div className="text-left">
//                 <p className="text-sm text-slate-500">Call Us</p>
//                 <p className="font-semibold text-slate-800">{CONTACT_PHONE}</p>
//               </div>
//             </a>
//           </Button>

//           {/* Email Button */}
//           <Button size="lg" variant="outline" asChild className="w-full justify-start h-auto py-3">
//             <a href={`mailto:${CONTACT_EMAIL}`}>
//               <Mail className="w-5 h-5 mr-4 text-primary" />
//               <div className="text-left">
//                 <p className="text-sm text-slate-500">Email Us</p>
//                 <p className="font-semibold text-slate-800">{CONTACT_EMAIL}</p>
//               </div>
//             </a>
//           </Button>
//         </div>

//         <DialogFooter>
//           <Button variant="ghost" onClick={onClose}>Close</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ContactDialog;