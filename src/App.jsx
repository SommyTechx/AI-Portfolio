import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Links from "./Pages/Links";
import Home from "./Pages/Home";

const App = () => {
  return (
    <>
      <Navbar />

      <div className="lg:px-10 lg:py-5 sm:px-5 sm:py-2.5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/links" element={<Links />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
