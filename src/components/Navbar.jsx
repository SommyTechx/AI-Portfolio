import React, { useEffect, useRef, useState } from "react";
import { scroller } from "react-scroll";
import bot from "../assets/bot.png";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";
import { useAI } from "../context/AIContext";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Get setter from AI context
  const { setSelectedAIQuery } = useAI();

  const suggestions = [
    { label: "About Her", targetId: "about" },
    { label: "Her Skills", targetId: "skills" },
    { label: "Her Experience", targetId: "experience" },
    { label: "Her Education", targetId: "education" },
    { label: "Her Achievements", targetId: "achievements" },
    { label: "Her Projects", targetId: "projects" },
    { label: "Contact", targetId: "contact" },
  ];

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowDropdown(true);
  };

  const handleSuggestionClick = (id, label) => {
    setQuery(label);
    setShowDropdown(false);
    setSelectedAIQuery(label); // <-- Update AI context here
    scroller.scrollTo(id, {
      duration: 700,
      smooth: "easeInOutQuint",
      offset: -60,
    });
  };

  const toggleSearch = () => setShowSearch(!showSearch);

  const filteredSuggestions = suggestions.filter((s) =>
    s.label.toLowerCase().includes(query.toLowerCase())
  );

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderSearchBar = (
    <div className="relative w-full sm:w-[20rem] md:w-[30rem] lg:w-[35rem]">
      <div className="flex items-center bg-[#F1F5F9] border border-accent-light rounded-full overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          placeholder="Know about her"
          className="text-[#0F172A] w-full outline-none text-sm px-4 py-2 font-heading"
        />
        <button className="flex items-center justify-center bg-[#0F172A] p-2 rounded-r-full hover:bg-accent">
          <img src={bot} alt="bot" className="w-5 md:w-6 object-contain" />
        </button>
      </div>

      {/* Dropdown Suggestions */}
      {showDropdown && (
        <div
          ref={searchRef}
          className="absolute top-full left-0 right-0 mt-1 bg-accent-light text-primary rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
        >
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(item.targetId, item.label)}
                className="px-4 py-2 hover:bg-accent cursor-pointer font-heading"
              >
                {item.label}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="navbar">
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1 className=" text-base sm:text-lg md:text-xl lg:text-2xl text-[#F1F5F9] font-heading">
            SommyTech
          </h1>
        </Link>

        <ThemeToggle />

        {/* Mobile Toggle Button */}
        <button
          onClick={toggleSearch}
          className="sm:hidden p-2 rounded-full dark:bg-primary"
        >
          <img src={bot} alt="menu" className="w-7 " />
        </button>

        {/* Desktop Search Bar */}
        <div className="hidden sm:block">{renderSearchBar}</div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && <div className="mt-4 sm:hidden">{renderSearchBar}</div>}
    </div>
  );
};

export default Navbar;
