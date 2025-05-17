import React from "react";
import { Link } from "react-router-dom";
import Contact_link from "./Contact_link";

function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6 md:px-16">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your gateway to smarter problem-solving. Explore company archives, collaborate on code, and solve challenges like a pro.
          </p>
          <p className="mt-4 italic text-teal-400">
            "Turning your curiosity into solutions – one click at a time!"
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/home"
                className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/patakaro"
                className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
              >
                PataKaro
              </Link>
            </li>
            <li>
              <Link
                to="/intellicode"
                className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
              >
                Intellicode
              </Link>
            </li>
            <li>
              <Link
                to="/fte"
                className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
              >
                FTE
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <p className="text-gray-400 mb-4">
            Stay connected and inspired – follow us on social media!
          </p>
          <Contact_link/>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-6">
        <p className="mb-2">
          "You Can if you think you Can!"
        </p>
        <p>
          © {new Date().getFullYear()} All rights reserved. Built with 💡 and
          💻.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
