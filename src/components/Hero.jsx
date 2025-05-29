import React from "react";

import AnimatedBanner from "./AnimatedBanner";
import verified from "../assets/verified.png";
import caseicon from "../assets/suitcase.png";
import cakeicon from "../assets/Birthday Cake.png";
import links from "../assets/Link.png";
import { Link } from "react-router-dom";
import Animatedskill from "./Animatedskill";

const Hero = () => {
  return (
    <>
      <div className="relative flex flex-col item-center justify-center ">
        <section className="">
          <AnimatedBanner />
        </section>

        <div
          className="
      absolute 
      top-55 left-11
       sm:top-55 sm:left-35 
      lg:top-92 lg:left-60 "
        >
          <section className="flex items-center gap-1">
            <h1 className=" text-[0.9rem] textbase sm:text-l md:text-xl lg:text-2xl font-heading">
              Aningwu Chisom
            </h1>
            <img
              src={verified}
              alt="verified logo"
              className=" w-[1.2rem] lg:w-[1.8rem] sm:w-[1.2rem] "
            />
          </section>
          <span className=" text-[0.7rem] textbase sm:text-[0.7rem] md:text-[1rem] lg:text-[0.9rem] font-body mb-8 ">
            Codes Like a Designer, Think Like a Developer
          </span>
          <p
            className="w-[19.5rem] sm:w-[22rem] 
        md:w-[25rem] lg:w-[33rem]  text-[0.9rem] textbase sm:text-[0.9rem] md:text-[1rem] lg:text-[1.25rem]"
          >
            A frontend developer passionate about design and harnessing the full
            potential of modern technology
          </p>
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-4 lg:gap-2 ">
            <div className="flex items-center  mt-4 gap-1">
              <img
                src={caseicon}
                alt="suitcase"
                className="w-[1rem] sm:w-[1.25rem]"
              />
              <span className="opacity-80 text-[0.9rem] textbase sm:text-[0.8rem] md:text-[1rem] lg:text-[0.9rem]">
                Avaliable
              </span>
            </div>
            <div className="flex items-center  mt-4 gap-1">
              <img
                src={links}
                alt="suitcase"
                className="w-[1rem] sm:w-[1.25rem]"
              />
              <Link to="/links">
                <span
                  className=" text-[0.9rem] textbase sm:text-[0.8rem] md:text-[1rem] lg:text-[0.9rem]
              underline decoration-1 decoration-accent hover:decoration-blue-700 cursor-pointer"
                >
                  Links
                </span>
              </Link>
            </div>

            <div className="flex items-center  mt-4 gap-1">
              <img
                src={cakeicon}
                alt="suitcase"
                className="w-[1rem] sm:w-[1.25rem]"
              />
              <span className=" text-[0.9rem] textbase sm:text-[0.8rem] md:text-[1rem] lg:text-[0.9rem]">
                4th March
              </span>
            </div>

            <div className="flex items-center  mt-4 gap-1">
              <button
                className=" bg-accent absolute 
       text-secondary font-body
      text-[0.8rem]
      textbase sm:text-l md:text-l lg:text-xl
       px-4 py-1 sm:px-4 sm:py-1 md:px-5 lg:px-6
       hover:border-2 hover:border-secondary
       dark:hover:bg-primary "
              >
                Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
