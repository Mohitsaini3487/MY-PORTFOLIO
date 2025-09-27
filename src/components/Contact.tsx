import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import emailjs from "@emailjs/browser";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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
    <section id="contact" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-pink-700 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to work together? Let's create something amazing!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Let's Start a Conversation</h3>
            <div className="space-y-6 mb-8">
              {[
                { icon: Mail, label: "Email", value: "mohitdsaini.2005@gmail.com" },
                { icon: Phone, label: "Phone", value: "+91 7494889287" },
                { icon: MapPin, label: "Location", value: "India" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.label}</h4>
                    <p className="text-gray-300">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {[
                  { icon: Github, href: "https://github.com/Mohitsaini3487", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/mohit-saini-n0/", label: "LinkedIn" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 border border-gray-600 rounded-full shadow-md flex items-center justify-center hover:shadow-xl hover:scale-110 transform transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-8 relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={6}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-none"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-300 ${
                  loading
                    ? "bg-purple-700 scale-95 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105"
                }`}
              >
                <Send className="w-5 h-5" />
                <span>{loading ? "Sending..." : "Send Message"}</span>
              </button>
            </form>

            {/* Animated Success Notification */}
            {success && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-400 to-purple-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce z-50">
                Thanks for reaching out, Mohit! Your request has been sent 🎉
              </div>
            )}

            {/* Animated Error Notification */}
            {error && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce z-50">
                Failed to send email ❌
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
