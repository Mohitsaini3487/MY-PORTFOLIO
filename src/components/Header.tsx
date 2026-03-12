import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.5 }
    );
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'journey', label: 'Journey' },
    { id: 'training', label: 'Training' },
    { id: 'stats', label: 'Stats' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
          ? 'py-4 bg-dark-BASE/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'py-6 bg-transparent'
        }`}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div
            onClick={() => scrollToSection('home')}
            className="text-2xl font-display font-bold cursor-pointer group flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              <span className="text-white text-sm">M</span>
            </div>
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:to-brand-primary transition-all">
              Mohit Saini
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group overflow-hidden ${activeSection === item.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                <span className="relative z-10">{item.label}</span>
                {activeSection === item.id && (
                  <div
                    className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                  />
                )}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-primary group-hover:w-1/2 transition-all duration-300"></div>
              </button>
            ))}
          </div>

          {/* CTA Header Button */}
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden md:block px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-brand-primary hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Hire Me
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-dark-BASE/95 backdrop-blur-2xl border-b border-white/10 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-[500px] py-6 opacity-100' : 'max-h-0 py-0 opacity-0'
          }`}>
          <div className="flex flex-col space-y-2 px-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-6 py-4 text-left rounded-2xl transition-all ${activeSection === item.id
                    ? 'bg-brand-primary/20 text-brand-primary border border-brand-primary/30'
                    : 'text-gray-400 hover:bg-white/5 active:bg-white/10'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;