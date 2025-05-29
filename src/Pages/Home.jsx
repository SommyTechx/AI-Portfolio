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

const Home = () => {
  return (
    <div className="relative">
      <div className=" w-full h-[28rem] sm:h-[30rem] md:h-[30rem] lg:h-[40rem] ">
        <Hero />
      </div>

      <div className=" w-full  ">
        <Animatedskill />
      </div>
    </div>
  );
};

export default Home;
