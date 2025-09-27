import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'AI Career Coach',
      description: `An intelligent career companion that helps you craft ATS-optimized resumes & cover letters, prepare with 1000+ mock interview questions, get real-time AI feedback & performance insights, and track progress with detailed analytics. Designed to empower professionals across 50+ industries.`,
      technologies: ['Node.js', 'React', 'Prism', 'Inngest', 'Nona', 'Clerk Auth', 'ShadCN AI', 'Gemini API'],
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: 'https://github.com/Mohitsaini3487/AI-CAREER-COACH',
      live: 'https://ai-career-coach-zeta-rouge.vercel.app/'
    },
    {
      title: 'Fake News Detection',
      description: `A smart platform to detect fake news with features like 24/7 AI chatbot support, detailed fake news report summaries, and analytics. Helps users verify news and stay informed with reliable information.`,
      technologies: ['Python', 'React', 'AI Chatbot', 'NLP', 'Machine Learning'],
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
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
              className="group bg-gray-800 rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transform hover:scale-105 transition-all duration-500 border border-gray-700"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a
                    href={project.github}
                    className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-300"
                  >
                    <Github className="w-4 h-4 text-gray-700" />
                  </a>
                  <a
                    href={project.live}
                    className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-300"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-700" />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3 hover:text-teal-400 transition-colors duration-500 hover:scale-105 transform">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs rounded-full font-medium border border-purple-700 transition-transform duration-300 hover:scale-110 hover:rotate-3"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:scale-105 transform"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm">Code</span>
                  </a>
                  <a
                    href={project.live}
                    className="flex items-center space-x-2 text-gray-400 hover:text-teal-400 transition-colors duration-300 hover:scale-105 transform"
                  >
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
