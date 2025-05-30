import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "./firebase"; // adjust path
import { collection, query, orderBy, getDocs } from "firebase/firestore";

const ProjectTimeline = () => {
  const [projects, setProjects] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCol = collection(db, "projects");
        const q = query(projectsCol, orderBy("order", "asc"));
        const querySnapshot = await getDocs(q);
        const projectsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsList);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // No offset on small screens, offset 100px on larger screens
  const xOffset = windowWidth < 640 ? 0 : 100;

  return (
    <section id="projects" className="text-white py-12 px-4 sm:py-16 sm:px-6">
      <span className="text-2xl flex justify-center items-center sm:text-4xl font-bold text-center mb-12 sm:mb-16 font-heading">
        Project Timeline
      </span>

      <div className="relative max-w-5xl mx-auto px-2 sm:px-0">
        {/* Vertical line only on sm+ */}
        <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-accent-light" />

        <div className="flex flex-col gap-16 sm:gap-20">
          {projects.map((project, index) => {
            const isLeft = index % 2 === 0;
            const imgSrc = `/projectimages/project-${project.order}.jpg`;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: isLeft ? -xOffset : xOffset }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.8 }}
                className={`relative flex flex-col sm:flex-row items-center
                  ${
                    // On mobile all full width and centered:
                    windowWidth < 640
                      ? "justify-center"
                      : isLeft
                      ? "justify-start"
                      : "justify-end"
                  }`}
              >
                {/* Timeline dot and arrow */}
                <div
                  className={`absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 top-0  flex-col items-center
                    hidden sm:flex`}
                >
                  <div className="w-4 h-4 bg-accent-light rounded-full z-10 shadow-md" />
                  <div
                    className={`hidden sm:block w-3 h-3 border-accent-light border-t-4 border-r-4 mt-2 ${
                      isLeft ? "ml-2 rotate-45" : "mr-2 -rotate-135"
                    }`}
                  />
                </div>

                <div
                  className={`bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg w-full sm:w-[45%] z-10 text-center sm:text-left
                    ${
                      // On mobile no margin auto to avoid pushing right side out of view
                      windowWidth < 640
                        ? ""
                        : isLeft
                        ? "sm:ml-auto"
                        : "sm:mr-auto"
                    }`}
                >
                  <img
                    src={imgSrc}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                    onError={(e) => {
                      e.target.src = "/images/default.jpg";
                    }}
                  />
                  <h3 className="text-lg sm:text-xl font-bold">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-slate-300 text-sm sm:text-base">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectTimeline;
