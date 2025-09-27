import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Mohit Saini</h3>
            <p className="text-gray-400">Machine Learning Analyst</p>
          </div>
          <div className="mt-4 text-gray-400 text-sm">
            © {new Date().getFullYear()} Mohit Saini. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;