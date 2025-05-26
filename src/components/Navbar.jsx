import React, { useState } from "react";
import bot from "../assets/bot.png";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const suggestions = [
    { label: "About Her", targetId: "about" },
    { label: "Her Skills", targetId: "skills" },
    { label: "Her Experience", targetId: "experience" },
    { label: "Her Education", targetId: "education" },
    { label: "Her Achievements", targetId: "achievements" },
  ];
  const toggleSearch = () => setShowSearch(!showSearch);

  return (
    <div className="p-4 bg-[#0F172A] text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#F1F5F9] font-heading">
          SommyTech
        </h1>

        {/* Bot icon - visible only on mobile */}
        <button onClick={toggleSearch} className="sm:hidden p-2 rounded-full">
          <img src={bot} alt="menu" className="w-5 h-5" />
        </button>

        {/* Search bar - visible only on sm and up */}
        <div className="hidden sm:flex items-center bg-[#F1F5F9] border border-accent-light rounded-full w-[15rem] md:w-[23rem] lg:w-[35rem] overflow-hidden">
          <input
            type="text"
            placeholder="Know about her"
            className="text-[#0F172A] w-full outline-none text-sm px-4 py-1 font-heading"
          />
          <button className="flex items-center justify-center bg-[#0F172A] p-2 rounded-r-full">
            <img src={bot} alt="bot" className="w-5 md:w-6 object-contain" />
          </button>
        </div>
      </div>

      {/* Mobile search bar - toggle visibility */}
      {showSearch && (
        <div className="sm:hidden mt-4 flex items-center bg-[#F1F5F9] border border-accent-light rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Know about her"
            className="text-[#0F172A] w-full outline-none text-sm px-4 py-1 font-heading"
          />
          <button className="flex items-center justify-center bg-[#0F172A] p-2 rounded-r-full">
            <img src={bot} alt="bot" className="w-5 object-contain" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
