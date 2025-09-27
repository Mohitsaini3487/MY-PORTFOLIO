import React, { useState } from "react";
import { Code, Brain, Database, Cpu } from "lucide-react";

const Skills: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const skillCategories = [
    {
      title: "Full-Stack Development",
      icon: Code,
      skills: ["React", "Node.js", "Git", "SQL"],
      description:
        "Building modern web applications with responsive design and robust backend systems.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Machine Learning & AI",
      icon: Brain,
      skills: ["Python", "Scikit-learn", "Keras", "TensorFlow"],
      description:
        "Developing intelligent systems and predictive models using advanced ML algorithms.",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Data Science",
      icon: Database,
      skills: [
        "Advanced Excel",
        "Data Analysis",
        "Statistical Modeling",
        "Visualization",
      ],
      description:
        "Extracting insights from complex datasets and creating data-driven solutions.",
      color: "from-green-500 to-teal-500",
    },
    {
      title: "DevOps & Tools",
      icon: Cpu,
      skills: ["Docker", "Git", "SQL", "Cloud Platforms"],
      description:
        "Streamlining development workflows and deploying scalable applications.",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Skills Timeline
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Click on a skill category to view its programming languages and
            technologies.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col items-center">
          {/* Vertical line */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-teal-500 z-0"
            style={{ top: 0, bottom: 0 }}
          ></div>

          <div className="w-full max-w-3xl mx-auto z-10">
            {skillCategories.map((category, index) => {
              const isRight =
                category.title === "Machine Learning & AI" ||
                category.title === "DevOps & Tools";

              return (
                <div
                  key={index}
                  className="relative mb-16 flex items-center justify-between w-full"
                >
                  {/* Glowing animated dot */}
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 z-10"
                    style={{ top: "50%", marginTop: "-12px" }}
                  >
                    <span className="block w-6 h-6 rounded-full bg-white shadow-[0_0_15px_4px_rgba(255,255,255,0.8)] animate-pulse border-2 border-white" />
                  </div>

                  {/* Card on left or right */}
                  {isRight ? (
                    <>
                      <div style={{ width: "45%" }}></div>
                      <div
                        className={`bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700 cursor-pointer ml-auto mr-0 transform transition-all duration-300 hover:scale-105 hover:shadow-blue-400/40 ${
                          selectedIndex === index ? "ring-4 ring-blue-400" : ""
                        }`}
                        onClick={() =>
                          setSelectedIndex(selectedIndex === index ? null : index)
                        }
                        tabIndex={0}
                        style={{ width: "45%" }}
                      >
                        {/* Icon inside card */}
                        <div className="flex justify-center mb-4">
                          <category.icon className="w-10 h-10 text-white drop-shadow-lg" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {category.title}
                        </h3>
                        <p className="text-gray-300 mb-4">
                          {category.description}
                        </p>

                        {/* Skills reveal */}
                        <div
                          className={`transition-all duration-500 ease-in-out overflow-hidden ${
                            selectedIndex === index
                              ? "max-h-40 opacity-100 mt-4"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className={`px-4 py-2 bg-gradient-to-r ${category.color} bg-opacity-20 text-white text-sm rounded-full font-medium border border-opacity-30 hover:scale-110 transform transition duration-300`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700 cursor-pointer mr-auto ml-0 transform transition-all duration-300 hover:scale-105 hover:shadow-blue-400/40 ${
                          selectedIndex === index ? "ring-4 ring-blue-400" : ""
                        }`}
                        onClick={() =>
                          setSelectedIndex(selectedIndex === index ? null : index)
                        }
                        tabIndex={0}
                        style={{ width: "45%" }}
                      >
                        {/* Icon inside card */}
                        <div className="flex justify-center mb-4">
                          <category.icon className="w-10 h-10 text-white drop-shadow-lg" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {category.title}
                        </h3>
                        <p className="text-gray-300 mb-4">
                          {category.description}
                        </p>

                        {/* Skills reveal */}
                        <div
                          className={`transition-all duration-500 ease-in-out overflow-hidden ${
                            selectedIndex === index
                              ? "max-h-40 opacity-100 mt-4"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className={`px-4 py-2 bg-gradient-to-r ${category.color} bg-opacity-20 text-white text-sm rounded-full font-medium border border-opacity-30 hover:scale-110 transform transition duration-300`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div style={{ width: "45%" }}></div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
