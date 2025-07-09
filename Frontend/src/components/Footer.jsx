import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      
        <div>
          <h3 className="text-2xl font-bold mb-2">CloudIDE</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            The future of collaborative coding — secure, fast, and built for the AI era.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-3">Product</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {['Features', 'Integrations', 'Pricing', 'Changelog'].map((item, idx) => (
              <li key={idx}>
                <a href="#" className="hover:text-white transition-colors duration-200">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {['Documentation', 'Blog', 'Support', 'Security'].map((item, idx) => (
              <li key={idx}>
                <a href="#" className="hover:text-white transition-colors duration-200">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="mailto:hello@cloudide.dev" className="hover:text-white transition-colors duration-200">
                hello@cloudide.dev
              </a>
            </li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Twitter</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CloudIDE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
