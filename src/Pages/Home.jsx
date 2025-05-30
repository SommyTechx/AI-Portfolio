// import React from "react";
// import Hero from "../components/Hero";
// import Animatedskill from "../components/Animatedskill";

// const Home = () => {
//   return (
//     <div className="relative h-screen">
//       <Hero />
//       <div className="absolute top-120">
//         <Animatedskill />
//       </div>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import Hero from "../components/Hero";
import Animatedskill from "../components/Animatedskill";
import ProjectsTimelione from "../components/ProjectsTimelione";

import About from "../components/About";

const Home = () => {
  return (
    <div className="relative">
      <div className=" w-full h-[28rem] sm:h-[30rem] md:h-[30rem] lg:h-[40rem] ">
        <Hero />
      </div>

      <div className=" w-full mb-[5rem] ">
        <Animatedskill />
      </div>
      <ProjectsTimelione />
      <About />
    </div>
  );
};

export default Home;
