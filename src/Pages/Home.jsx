import React from "react";
import Hero from "../components/Hero";
import Animatedskill from "../components/Animatedskill";

const Home = () => {
  return (
    <div className="relative">
      <Hero />
      <div className="absolute top-120">
        <Animatedskill />
      </div>
    </div>
  );
};

export default Home;
