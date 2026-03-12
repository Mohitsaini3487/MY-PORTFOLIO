import React, { useState } from 'react';
import { Github, Linkedin, Mail, ArrowUp, X } from 'lucide-react';

const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
    <div
      className="relative z-10 max-w-2xl w-full max-h-[80vh] overflow-y-auto bg-[#0d0d0d] border border-white/10 rounded-[2rem] p-8 shadow-[0_40px_120px_rgba(0,0,0,1)]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-display font-bold text-white tracking-tight">{title}</h2>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all"
        >
          <X size={18} />
        </button>
      </div>
      <div className="text-gray-400 text-sm leading-relaxed space-y-4">
        {children}
      </div>
      <p className="mt-8 text-[11px] text-gray-600 uppercase tracking-widest">Last updated: March 2026</p>
    </div>
  </div>
);

const Footer: React.FC = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {showPrivacy && (
        <Modal title="Privacy Policy" onClose={() => setShowPrivacy(false)}>
          <p>This portfolio website (<strong className="text-white">mohitsaini.dev</strong>) is built to showcase the professional work and skills of Mohit Saini. We are committed to being transparent about how this site works.</p>
          <p><strong className="text-white">Information Collected:</strong> This website does not collect any personal information from visitors. No cookies, tracking scripts, or analytics tools are used beyond what is provided by the hosting platform (Vercel).</p>
          <p><strong className="text-white">Contact Forms:</strong> If you submit a message via the Contact section, your name and email are used solely to respond to your inquiry and are not stored in any database or shared with third parties.</p>
          <p><strong className="text-white">Third-Party Links:</strong> This site links to third-party platforms (GitHub, LinkedIn, Vercel). These have their own privacy policies which we encourage you to review.</p>
          <p><strong className="text-white">Changes:</strong> This policy may be updated occasionally. Continued use of the site constitutes acceptance of the updated policy.</p>
          <p>For any questions, contact <span className="text-brand-primary">mohitdsaini.2005@gmail.com</span></p>
        </Modal>
      )}

      {showTerms && (
        <Modal title="Terms of Service" onClose={() => setShowTerms(false)}>
          <p>By accessing this portfolio website, you agree to the following terms of use.</p>
          <p><strong className="text-white">Intellectual Property:</strong> All content on this site — including UI design, code snippets, project descriptions, and written material — is the intellectual property of Mohit Saini. Reproduction or distribution without explicit permission is prohibited.</p>
          <p><strong className="text-white">Permitted Use:</strong> You may view and share links to this portfolio for professional, educational, or hiring purposes. Scraping, cloning, or commercially repurposing the site content is not permitted.</p>
          <p><strong className="text-white">Accuracy:</strong> Information presented is accurate to the best of our knowledge. Project details and statistics may evolve as work progresses.</p>
          <p><strong className="text-white">Disclaimer:</strong> This site is provided "as is" without warranties of any kind. Mohit Saini is not liable for any damages arising from the use of this website.</p>
          <p>For licensing inquiries, contact <span className="text-brand-primary">mohitdsaini.2005@gmail.com</span></p>
        </Modal>
      )}

      <footer className="bg-dark-BASE border-t border-white/5 py-20 relative overflow-hidden">
        {/* Decorative Blur */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Brand Info */}
            <div className="text-center md:text-left space-y-4">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  <span className="text-white font-bold">M</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">Mohit Saini</h3>
              </div>
              <p className="text-gray-500 max-w-xs leading-relaxed">
                Pioneering the intersection of Machine Learning and high-end web experiences.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              {[
                { icon: Github, href: "https://github.com/Mohitsaini3487", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/mohit-saini-n0/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:mohitdsaini.2005@gmail.com", label: "Email" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:-translate-y-1 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="group flex flex-col items-center gap-3 text-gray-500 hover:text-white transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">
                <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Top</span>
            </button>
          </div>

          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-bold uppercase tracking-widest text-gray-600">
            <p>© {new Date().getFullYear()} Mohit Saini. All Rights Reserved.</p>
            <div className="flex gap-8">
              <button
                onClick={() => setShowPrivacy(true)}
                className="hover:text-brand-primary cursor-pointer transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setShowTerms(true)}
                className="hover:text-brand-primary cursor-pointer transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
