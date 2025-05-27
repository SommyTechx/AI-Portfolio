import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const App = () => {
  return (
    <div className=" lg:px-10 lg:py-5 sm:px-5 sm:py-2.5">
      <Navbar />
      <Hero />
    </div>
  );
};

export default App;
