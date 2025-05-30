import React from "react";
import AboutAI from "./AboutAI";
import botIcon from "../assets/bot.png"; // replace with your bot icon
const About = () => {
  return (
    <div>
      <div className="flex items-center justify-center ">
        <div className="bg-[#0F172A] text-white dark:text-[#0F172A] p-2 rounded-full">
          <img src={botIcon} alt="" className="w-[3rem]" />
        </div>

        <span className="text-xl flex items-center sm:text-4xl font-bold text-center mb-2 sm:mb-2 font-heading">
          Ask Me Anything
        </span>
      </div>
      <AboutAI />
    </div>
  );
};

export default About;
