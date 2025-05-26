// // components/SkillsTicker.jsx
// import React from "react";
// import { motion } from "framer-motion";

// const skills = [
//   "JavaScript",
//   "React",
//   "Tailwind CSS",
//   "Framer Motion",
//   "GitHub",
//   "HTML",
//   "CSS",
//   "OpenAI",
//   "Vite",
//   "Responsive Design",
// ];

// const SkillsTicker = () => {
//   return (
//     <div className="overflow-hidden whitespace-nowrap bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-3">
//       <motion.div
//         className="inline-block whitespace-nowrap animate-marquee"
//         initial={{ x: "100%" }}
//         animate={{ x: "-100%" }}
//         transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
//       >
//         {skills.map((skill, index) => (
//           <span
//             key={index}
//             className="text-white text-lg font-semibold mx-6 inline-block"
//           >
//             {skill}
//           </span>
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default SkillsTicker;
