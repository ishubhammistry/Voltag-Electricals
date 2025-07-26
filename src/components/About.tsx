
// import React from 'react';
// import { Card } from '@/components/ui/card';
// import { Target, Eye, Award, Users, Clock, CheckCircle } from 'lucide-react';

// const About = () => {
//   const milestones = [
//     { year: '2010', title: 'Company Founded', description: 'Started with a vision to revolutionize industrial automation', icon: <Target className="w-5 h-5" /> },
//     { year: '2015', title: 'Major Expansion', description: 'Expanded operations across Gujarat with 50+ successful projects', icon: <Users className="w-5 h-5" /> },
//     { year: '2018', title: 'Technology Innovation', description: 'Introduced cutting-edge IoT and smart automation solutions', icon: <Award className="w-5 h-5" /> },
//     { year: '2020', title: 'Industry Recognition', description: 'Became the leading automation provider in Western India', icon: <CheckCircle className="w-5 h-5" /> },
//     { year: '2024', title: 'Future Forward', description: 'Pioneering next-gen industrial automation and AI integration', icon: <Clock className="w-5 h-5" /> }
//   ];

//   const stats = [
//     { number: '500+', label: 'Projects Completed', icon: '🏭', color: 'bg-blue-500' },
//     { number: '100+', label: 'Happy Clients', icon: '😊', color: 'bg-green-500' },
//     { number: '15+', label: 'Years Experience', icon: '⚡', color: 'bg-orange-500' },
//     { number: '24/7', label: 'Support Available', icon: '🛠️', color: 'bg-purple-500' }
//   ];

//   return (
//     <section id="about" className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
//       <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
//         {/* Section Header */}
//         <div className="text-center mb-20">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
//             <Eye className="w-4 h-4 text-primary" />
//             <span className="text-sm font-medium text-primary">About Voltag</span>
//           </div>
          
//           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-space-grotesk text-slate-800 mb-6 leading-tight">
//             Our <span className="text-gradient">Story</span>
//           </h2>
          
//           <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
//             With over a decade of excellence, we've been at the forefront of industrial automation, 
//             transforming businesses across Gujarat with innovative electrical solutions and unwavering commitment to quality.
//           </p>
//         </div>

//         {/* Mission & Vision Cards */}
//         <div className="grid lg:grid-cols-2 gap-8 mb-20">
//           <Card className="p-8 lg:p-10 glass-effect hover-lift group">
//             <div className="flex items-center gap-4 mb-6">
//               <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
//                 <Target className="w-8 h-8 text-primary" />
//               </div>
//               <h3 className="text-2xl lg:text-3xl font-bold text-slate-800">Our Mission</h3>
//             </div>
//             <p className="text-slate-600 leading-relaxed text-base lg:text-lg">
//               To empower industries with intelligent automation solutions that enhance productivity, 
//               efficiency, and sustainability while maintaining the highest standards of quality, reliability, 
//               and customer satisfaction in every project we undertake.
//             </p>
//           </Card>
          
//           <Card className="p-8 lg:p-10 glass-effect hover-lift group">
//             <div className="flex items-center gap-4 mb-6">
//               <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
//                 <Eye className="w-8 h-8 text-primary" />
//               </div>
//               <h3 className="text-2xl lg:text-3xl font-bold text-slate-800">Our Vision</h3>
//             </div>
//             <p className="text-slate-600 leading-relaxed text-base lg:text-lg">
//               To be the most trusted partner in industrial transformation, leading the way in 
//               smart automation technologies and sustainable electrical solutions across India, 
//               setting new benchmarks for innovation and excellence.
//             </p>
//           </Card>
//         </div>

//         {/* Timeline Section */}
//         <div className="mb-20">
//           <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 text-center mb-12">Our Journey</h3>
          
//           <div className="relative max-w-4xl mx-auto">
//             {/* Timeline Line */}
//             <div className="absolute left-8 lg:left-1/2 lg:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary-light to-primary"></div>
            
//             <div className="space-y-12">
//               {milestones.map((milestone, index) => (
//                 <div 
//                   key={milestone.year}
//                   className={`flex items-start gap-6 lg:gap-8 animate-slide-in-right ${
//                     index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
//                   }`}
//                   style={{ animationDelay: `${index * 0.2}s` }}
//                 >
//                   {/* Timeline Node */}
//                   <div className="flex-shrink-0 relative">
//                     <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white border-4 border-primary rounded-full flex items-center justify-center text-primary font-bold text-lg lg:text-xl shadow-lg">
//                       {milestone.year.slice(-2)}
//                     </div>
//                     <div className="absolute inset-0 w-16 h-16 lg:w-20 lg:h-20 bg-primary/20 rounded-full animate-ping"></div>
//                   </div>
                  
//                   {/* Content */}
//                   <Card className={`flex-1 p-6 lg:p-8 glass-effect hover-lift max-w-md lg:max-w-lg ${
//                     index % 2 === 0 ? 'lg:ml-8' : 'lg:mr-8'
//                   }`}>
//                     <div className="flex items-center gap-3 mb-4">
//                       <div className="p-2 bg-primary/10 rounded-lg text-primary">
//                         {milestone.icon}
//                       </div>
//                       <h4 className="text-xl lg:text-2xl font-bold text-slate-800">{milestone.title}</h4>
//                     </div>
//                     <p className="text-slate-600 leading-relaxed">{milestone.description}</p>
//                   </Card>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
//           {stats.map((stat, index) => (
//             <Card 
//               key={stat.label} 
//               className="p-6 lg:p-8 text-center glass-effect hover-lift animate-fade-in-up group"
//               style={{ animationDelay: `${index * 0.1}s` }}
//             >
//               <div className="text-4xl lg:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
//                 {stat.icon}
//               </div>
//               <div className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors duration-300">
//                 {stat.number}
//               </div>
//               <div className="text-sm lg:text-base text-slate-600">{stat.label}</div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;
