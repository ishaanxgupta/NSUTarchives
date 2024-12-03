import React from 'react'
import { Link } from 'react-router-dom'
import Like_Button from './Like_Button'

function Footer() {
  return (
    <div>
    <footer className="bg-black text-white py-10">
      {/* <Like_Button /> */}
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16">
    {/* About Section */}
    <div>
      <h3 className="text-lg font-semibold mb-4">About Us</h3>
      <p className="text-gray-400 text-sm">
        We provide a platform to explore exciting features like company archives, collaborative coding, and problem-solving tools.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-2">
        <li>
          <Link to="/intern" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
            Intern
          </Link>
        </li>
        <li>
          <Link to="/fte" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
            FTE
          </Link>
        </li>
        <li>
          <Link to="/codecast" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
            Codecast
          </Link>
        </li>
        <li>
          <Link to="/upsolve" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
            Upsolve
          </Link>
        </li>
      </ul>
    </div>

    {/* Social Media Icons */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
      <div className="flex space-x-4">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <i className="bi bi-facebook text-gray-400 hover:text-teal-400 transition-colors duration-300 text-2xl"></i>
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <i className="bi bi-twitter text-gray-400 hover:text-teal-400 transition-colors duration-300 text-2xl"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <i className="bi bi-instagram text-gray-400 hover:text-teal-400 transition-colors duration-300 text-2xl"></i>
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i className="bi bi-linkedin text-gray-400 hover:text-teal-400 transition-colors duration-300 text-2xl"></i>
        </a>
      </div>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
    © {new Date().getFullYear()} Your Website. All rights reserved.
  </div>
</footer>

    </div>
  )
}

export default Footer
