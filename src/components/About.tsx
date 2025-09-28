import React from 'react'; 
import { Code, Coffee, Lightbulb, Users } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code following best practices'
    },
    {
      icon: Lightbulb,
      title: 'Problem Solver',
      description: 'Approaching complex challenges with creative and innovative solutions'
    },
    {
      icon: Users,
      title: 'Team Player',
      description: 'Collaborating effectively with cross-functional teams to deliver results'
    },
    {
      icon: Coffee,
      title: 'Continuous Learner',
      description: 'Always exploring new technologies and improving my craft'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 drop-shadow-md mb-4 animate-fade-in">
            About Me
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up">
            Passionate developer with a love for creating digital solutions that make a real impact
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 animate-slide-in-left">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Building the Future with Code and Intelligence
            </h3>
            <p className="text-gray-300 leading-relaxed">
              As an aspiring Full-Stack Developer with expertise in Machine Learning and Data Science, 
              I specialize in creating intelligent applications that solve real-world problems. 
              My journey combines traditional web development with cutting-edge AI technologies.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Hands-on experience with Python (Scikit-learn, Keras), modern web stacks 
              (React, Node.js), and data analysis tools. Focused on building scalable AI-driven applications.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Currently building my portfolio with 2 innovative projects in 
              full-stack development, ML, and data science — always eager to learn and grow.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-extrabold text-blue-400 animate-bounce">4</div>
                <div className="text-gray-400 text-sm">Projects</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-extrabold text-teal-400 animate-pulse">5+</div>
                <div className="text-gray-400 text-sm">Technologies</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-extrabold text-purple-400 animate-bounce">4</div>
                <div className="text-gray-400 text-sm">Team Members</div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-slide-in-right">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="relative p-6 rounded-2xl shadow-lg bg-gradient-to-br from-gray-700 to-gray-600 border border-gray-700 group hover:from-blue-700 hover:to-teal-600 hover:scale-105 transition-all duration-500"
              >
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>
                
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:rotate-6 transition-transform duration-500">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-teal-200 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
