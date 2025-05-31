import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion, AnimatePresence } from "framer-motion";
import botIcon from "../assets/bot.png";
import { useAI } from "../context/AIContext"; // ✅ import context

const suggestions = [
  "Why should I hire you?",
  "Tell me about your experience.",
  "What tech stack do you use?",
  "What makes you unique?",
  "How many projects have you built?",
  "What’s your biggest achievement?",
  "Can you speak your response out loud?",
];

const aiResponses = {
  "Why should I hire you?":
    "Great question! You should hire me because I'm a highly dedicated frontend developer with a passion for building user-friendly, accessible, and futuristic web experiences. I combine technical skill with creativity and a strong sense of design. I don’t just write code — I bring ideas to life.",
  "Tell me about your experience.":
    "I've spent the last two years immersed in frontend development, building projects using React, Vite, Tailwind CSS, and Framer Motion. I’ve also collaborated on full-stack apps and open-source projects that improved my real-world problem-solving skills.",
  "What tech stack do you use?":
    "I specialize in React, Tailwind CSS, Vite, Framer Motion, and also have experience using Firebase, Supabase, and WordPress. I also build with Figma for UI/UX and plan to master backend technologies like Node.js and Express.",
  "What makes you unique?":
    "My portfolio is AI-powered — just like this! I blend cutting-edge tech with human-centered design. I’m not only a developer; I’m also a creative, a vlogger, and a podcast host, which helps me tell powerful stories through tech.",
  "How many projects have you built?":
    "So far, I’ve built over 10+ practical projects — ranging from personal dashboards, portfolio sites, to complete task managers. I’m currently focused on building 5 large-scale, high-impact apps to master full-stack development.",
  "What’s your biggest achievement?":
    "One of my proudest moments was launching 'Tutorial Escape' — an educational platform that helps developers escape tutorial hell. It blends curated playlists, coding challenges, and mentorship. It’s my way of giving back to the tech community.",
  "Can you speak your response out loud?":
    "Yes I can! I'm using your browser's speech synthesis feature to speak this response out loud. Pretty cool, right?",
};

const AboutAI = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isVoiceOn, setIsVoiceOn] = useState(true);

  const { selectedAIQuery } = useAI(); // ✅ get selected query from context

  const speak = (text) => {
    if (!isVoiceOn) return;
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (synth.speaking) synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    synth.speak(utterance);
  };

  const handleSelect = (q) => {
    setQuery(q);
    setSelected(q);
    triggerTyping(q);
  };

  const handleSubmit = () => {
    setSelected(query);
    triggerTyping(query);
  };

  const triggerTyping = (question) => {
    setShowAnswer(false);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setShowAnswer(true);
      const response =
        aiResponses[question] ||
        "Sorry, I don’t understand that yet. Try asking something from the suggestions above!";
      speak(response);
    }, 2000);
  };

  // ✅ Automatically respond when Navbar triggers a new AI query
  useEffect(() => {
    if (selectedAIQuery) {
      setQuery(selectedAIQuery);
      setSelected(selectedAIQuery);
      triggerTyping(selectedAIQuery);
    }
  }, [selectedAIQuery]);

  return (
    <section
      id="about"
      className="flex flex-col items-center text-[#0F172A] dark:text-white py-12 px-4 md:px-20 font-heading"
    >
      {/* Typing Indicator */}
      <AnimatePresence>
        {isTyping && (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-base italic text-gray-600 dark:text-gray-300"
          >
            <div className="flex gap-1">AI is typing</div>
            <span className="dot-animation">...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Response */}
      <AnimatePresence>
        {showAnswer && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mt-6 bg-gray-100 dark:bg-white/5 p-4 rounded-lg shadow-md max-w-3xl"
          >
            <p className="text-base leading-relaxed">
              <Typewriter
                words={[
                  aiResponses[selected] ||
                    "Sorry, I don’t understand that yet. Try asking something from the suggestions above!",
                ]}
                typeSpeed={30}
                cursor
              />
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Field */}
      <div className="relative w-full max-w-3xl mt-6">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-white/10 text-sm text-[#0F172A]"
        />
        <button
          onClick={handleSubmit}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#0F172A] text-white dark:text-[#0F172A] p-2 rounded-r-full hover:bg-accent"
        >
          <img src={botIcon} alt="Send" className="w-5" />
        </button>

        {/* Dropdown Suggestions */}
        {isFocused && (
          <div className="absolute z-10 mt-2 w-full bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
            {suggestions.map((sug, i) => (
              <div
                key={i}
                onClick={() => handleSelect(sug)}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer text-sm text-[#0F172A] dark:text-white"
              >
                {sug}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Voice Toggle */}
      <div className="mt-4">
        <button
          onClick={() => setIsVoiceOn(!isVoiceOn)}
          className="px-4 py-2 text-sm rounded text-white bg-primary border hover:bg-accent"
        >
          {isVoiceOn ? "🔊 Voice On" : "🔇 Voice Off"}
        </button>
      </div>

      {/* Dots animation style */}
      <style>{`
        .dot-animation::after {
          content: '';
          animation: dots 1.2s steps(3, end) infinite;
        }
        @keyframes dots {
          0% { content: ''; }
          33% { content: '.'; }
          66% { content: '..'; }
          100% { content: '...'; }
        }
      `}</style>
    </section>
  );
};

export default AboutAI;
