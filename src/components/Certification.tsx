import React from "react";

const Certifications: React.FC = () => {
  const certificates = [
    {
      title: "Software Engineering Job Simulation",
      issuer: "JPMORGAN CHASE & CO",
      image: "/src/components/certificate1.jpg", // Replace with your actual file
    },
    {
      title: "OCI 2025 Certified Generative AI Professional",
      issuer: "Oracle Certification Professional",
      image: "/src/components/certificate2.jpg",
    },
    {
      title: "Privacy and Security in Online Social Media",
      issuer: "Nptel Online Certification",
      image: "/src/components/certificate3.jpg",
    },
  ];

  return (
    <section id="certifications" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Certifications
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Some of the certifications I’ve earned to strengthen my technical expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="group relative bg-gray-800 rounded-2xl shadow-xl 
                         hover:shadow-2xl transition-all duration-500 
                         overflow-hidden border border-gray-700
                         hover-tilt animate-float 
                         group-hover:animate-blink-border hover-shimmer"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-60 object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-white mb-2">
                  {cert.title}
                </h3>
                <p className="text-gray-400 text-sm">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
