import React from "react";
import { motion } from "framer-motion";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Tailwind",
  "Figma",
  "Node.js",
  "TypeScript",
  "GitHub",
  "Firebase",

  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Tailwind",
  "Figma",
  "Node.js",
  "TypeScript",
  "GitHub",
  "Firebase",
];

const Animatedskill = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap  text-white py-4 border border-r-0 border-l-0 border-accent-light">
      <motion.div
        className="flex gap-8 text-xl font-semibold animate-marquee"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {/* First set */}
        <div className="flex gap-8">
          {skills.map((skill, index) => (
            <span key={`1-${index}`}>{skill}</span>
          ))}
        </div>
        {/* Second set for seamless loop */}
        <div className="flex gap-8">
          {skills.map((skill, index) => (
            <span key={`2-${index}`}>{skill}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Animatedskill;
