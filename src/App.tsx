import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useActiveSection from './hooks/useActiveSection';
import Certification from './components/Certification';

function App() {
  const activeSection = useActiveSection();

  return (
    <div className="font-sans">
      <Header activeSection={activeSection} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certification /> 
      <Contact />
      <Footer />
    </div>
  );
}

export default App;