import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import Project1 from '../components/Project1.jpg';
import Project2 from '../components/Project2.jpg';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'AI Career Coach',
      description: `An intelligent career companion ...`,
      technologies: ['Node.js', 'React', 'Prism', 'Inngest', 'Nona', 'Clerk Auth', 'ShadCN AI', 'Gemini API'],
      image: Project1,
      github: 'https://github.com/Mohitsaini3487/AI-CAREER-COACH',
      live: 'https://ai-career-coach-zeta-rouge.vercel.app/'
    },
    {
      title: 'Fake News Detection',
      description: `A smart platform to detect fake news ...`,
      technologies: ['Python', 'React', 'AI Chatbot', 'NLP', 'Machine Learning'],
      image: Project2,
      github: 'https://github.com/Mohitsaini3487/deepLearning',
      live: 'https://deep-learning-beta.vercel.app/'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 animate-fadeIn">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fadeIn delay-200">
            A showcase of my recent work and the technologies I love working with
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-gray-800 rounded-2xl shadow-2xl overflow-hidden 
                         border border-gray-700
                         transform transition-all duration-700 
                         hover:scale-105 hover:-translate-y-2 hover:rotate-1
                         hover:shadow-3xl hover:border-gradient 
                         relative"
            >
              {/* Glowing animated border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent 
                              group-hover:border-pink-500/60 animate-pulse pointer-events-none"></div>

              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover transition-transform duration-700 
                             group-hover:scale-110 group-hover:rotate-3"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a href={project.github} className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-300">
                    <Github className="w-4 h-4 text-gray-700" />
                  </a>
                  <a href={project.live} className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-300">
                    <ExternalLink className="w-4 h-4 text-gray-700" />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3 
                               hover:text-teal-400 transition-colors duration-500 hover:scale-105 transform">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-500 
                                 text-white text-xs rounded-full font-medium border border-purple-700 
                                 transition-transform duration-300 
                                 hover:scale-110 hover:rotate-3 hover:shadow-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-4">
                  <a href={project.github} className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:scale-105 transform">
                    <Github className="w-4 h-4" />
                    <span className="text-sm">Code</span>
                  </a>
                  <a href={project.live} className="flex items-center space-x-2 text-gray-400 hover:text-teal-400 transition-colors duration-300 hover:scale-105 transform">
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
