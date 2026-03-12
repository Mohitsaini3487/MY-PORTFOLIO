import React, { useState, useEffect, useRef } from "react";
import { Mail, Phone, Send, Github, Linkedin } from "lucide-react";
import emailjs from "@emailjs/browser";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance
      gsap.from(hubRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: hubRef.current,
          start: "top 85%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)"
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .send(
        serviceID,
        templateID,
        {
          from_name: formData.name,
          email: formData.email,
          title: formData.subject,
          message: formData.message,
        },
        publicKey
      )
      .then(() => {
        setLoading(false);
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSuccess(false), 4000);
      })
      .catch((err) => {
        console.error("Email sending error:", err);
        setLoading(false);
        setError(true);
        setTimeout(() => setError(false), 4000);
      });
  };

  return (
    <section id="contact" className="py-32 bg-dark-BASE relative overflow-hidden" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div ref={hubRef} className="max-w-5xl mx-auto rounded-[3.5rem] bg-dark-SURFACE/40 border border-white/5 backdrop-blur-3xl p-8 lg:p-20 shadow-3xl overflow-hidden relative">
          
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Info Side */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
                  Ready to <span className="text-gray-500 italic">Chat?</span>
                </h2>
                <p className="text-gray-500 font-light leading-relaxed">
                  Drop me a line or follow my work across the web. I'm always open to discussing new projects and technical innovations.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-400 p-4 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                  <Mail size={18} className="text-brand-primary" />
                  <span className="text-sm font-medium">mohitdsaini.2005@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400 p-4 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                  <Phone size={18} className="text-brand-secondary" />
                  <span className="text-sm font-medium">+91 7494889287</span>
                </div>
              </div>

              <div className="pt-8">
                <h4 className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] mb-6">Social Nexus</h4>
                <div className="flex gap-4">
                  {[
                    { icon: Github, href: "https://github.com/Mohitsaini3487" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/mohit-saini-n0/" },
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      onMouseMove={handleMagneticMove}
                      onMouseLeave={handleMagneticLeave}
                      className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-brand-primary/50 transition-all duration-300"
                    >
                      <social.icon size={22} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-8 py-5 bg-white/5 border border-white/5 text-white rounded-2xl focus:border-brand-primary/50 outline-none transition-all placeholder:text-gray-700"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full px-8 py-5 bg-white/5 border border-white/5 text-white rounded-2xl focus:border-brand-primary/50 outline-none transition-all placeholder:text-gray-700"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full px-8 py-5 bg-white/5 border border-white/5 text-white rounded-2xl focus:border-brand-primary/50 outline-none transition-all placeholder:text-gray-700"
                  required
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your vision..."
                  rows={4}
                  className="w-full px-8 py-5 bg-white/5 border border-white/5 text-white rounded-2xl focus:border-brand-primary/50 outline-none transition-all placeholder:text-gray-700 resize-none"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full py-6 rounded-3xl font-display font-bold text-lg flex items-center justify-center gap-3 transition-all bg-white text-black hover:bg-brand-primary hover:text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] overflow-hidden relative"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-gray-500 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span className="relative z-10">Initialize Transmission</span>
                      <Send size={20} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      <div className="absolute inset-0 bg-brand-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </>
                  )}
                </button>
              </form>

              {/* Status Notifications */}
              <div className="absolute top-4 inset-x-0 flex justify-center pointer-events-none">
                {success && (
                  <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-xl animate-in fade-in zoom-in slide-in-from-top-4 duration-500">
                    Message sent successfully! 🚀
                  </div>
                )}
                {error && (
                  <div className="bg-rose-500 text-white px-6 py-3 rounded-2xl shadow-xl animate-in fade-in zoom-in slide-in-from-top-4 duration-500">
                    Something went wrong. Please try again.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Glow accents */}
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
