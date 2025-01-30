import React from "react";

const FootBar = () => {



  return (
    <footer className="bg-transparent text-white py-10 px-6 md:px-16 shadow-xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Community Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Community</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-yellow-400">
                Tutorials
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Forum
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Open Source
              </a>
            </li>
          </ul>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-yellow-400">
                Odoo.sh Hosting
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Upgrade
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Custom Developments
              </a>
            </li>
          </ul>
        </div>

        {/* About Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-yellow-400">
                Our Company
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Brand Assets
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Jobs
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal & Privacy</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-yellow-400">
                Security
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Privacy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-10 border-t border-gray-700 pt-6">
        <p className="text-sm text-gray-400">
          Odoo is a suite of open-source business apps that cover all your
          company needs.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Odoo's unique value proposition is to be at the same time very easy to
          use and fully integrated.
        </p>
      </div>
    </footer>
  );
};

export default FootBar;
