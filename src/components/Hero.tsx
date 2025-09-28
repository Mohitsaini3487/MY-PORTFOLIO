import React from 'react';
import { ChevronDown, Github, Linkedin, Mail, FileDown } from 'lucide-react';
import resumeFile from '../components/Resume.pdf';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900 text-white">
      {/* Glowing Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-gradient-to-br from-orange-500 via-red-500 to-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6">
              <h1 className="text-5xl lg:text-7xl font-bold mb-4 leading-tight">
                <span className="block text-gray-300">Hello, I'm</span>
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent animate-text-shimmer">
                  Mohit Saini
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-teal-400 font-semibold mb-2">
                Machine Learning Analyst
              </p>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto lg:mx-0 animate-fadeIn">
                Passionate about Machine Learning, AI, and Data Science. Creating innovative solutions using advanced algorithms and modern technologies.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white px-8 py-4 rounded-full font-medium hover:shadow-xl hover:scale-110 transform transition-all duration-500 animate-bounce">
                View My Work
              </button>
              
              <a 
                href={resumeFile} 
                download="Mohit_Saini_Resume.pdf"
                className="flex items-center justify-center gap-2 border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-full font-medium hover:border-purple-500 hover:text-purple-500 hover:shadow-lg transform transition-all duration-500 animate-pulse"
              >
                <FileDown className="w-5 h-5" />
                Download Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-6">
              <a href="https://github.com/Mohitsaini3487" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 rounded-full shadow-md hover:shadow-xl hover:scale-125 transform transition-all duration-500 group">
                <Github className="w-6 h-6 text-gray-400 group-hover:text-purple-500" />
              </a>
              <a href="https://www.linkedin.com/in/mohit-saini-n0/" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 rounded-full shadow-md hover:shadow-xl hover:scale-125 transform transition-all duration-500 group">
                <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-blue-400" />
              </a>
              <a href="mailto:mohitdsaini.2005@gmail.com" className="p-3 bg-gray-800 rounded-full shadow-md hover:shadow-xl hover:scale-125 transform transition-all duration-500 group">
                <Mail className="w-6 h-6 text-gray-400 group-hover:text-teal-400" />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl ring-4 ring-purple-500/40 animate-pulse">
                <img 
                  src="/image.png" 
                  alt="Professional headshot"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Decorative Glows */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-30 animate-ping"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full opacity-30 animate-ping animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
      >
        <ChevronDown className="w-8 h-8 text-gray-400 hover:text-purple-500 transition-colors duration-300" />
      </button>
    </section>
  );
};

export default Hero;
