import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useActiveSection from './hooks/useActiveSection';
import Certification from './components/Certification';
import TechMarquee from './components/TechMarquee';
import Journey from './components/Journey';
import Training from './components/Training';
import LanguageWave from './components/LanguageWave';
import CodingStats from './components/CodingStats';

function App() {
  const activeSection = useActiveSection();

  return (
    <div className="font-sans">
      <Header activeSection={activeSection} />
      <Hero />
      <TechMarquee />
      <About />
      <Education />
      <Skills />
      <Journey />
      <Training />
      <LanguageWave />
      <CodingStats />
      <Projects />
      <Certification /> 
      <Contact />
      <Footer />
    </div>
  );
}

export default App;