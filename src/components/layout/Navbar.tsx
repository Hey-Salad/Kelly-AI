import React, { useState } from 'react';
import { FaRobot, FaSun, FaMoon, FaBars, FaTimes, FaApple, FaGooglePlay } from 'react-icons/fa';
import { useTheme } from '../theme/ThemeProvider';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`navbar fixed top-0 w-full z-50 transition-colors duration-300 border-b ${
      theme === 'dark' ? 'bg-black text-white border-gray-800' : 'bg-white text-gray-800 border-gray-100'
    }`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex justify-between h-[4.6rem] items-center">
          {/* Logo with ® */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <img 
                src={theme === 'dark' ? "/HeySalad Logo White.png" : "/HeySalad Logo Black.png"}
                alt="HeySalad" 
                className="h-[2.1rem] lg:h-[2.625rem]"
              />
              <sup className="text-xs ml-1">®</sup>
            </div>
          </div>

          {/* Rest of the navbar code stays the same */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#features" className="text-inherit hover:text-cherry-red font-medium">Features</a>
            <a href="#steps" className="text-inherit hover:text-cherry-red font-medium">How it works</a>
            <a href="#faq" className="text-inherit hover:text-cherry-red font-medium">FAQ</a>
            <a href="#newsletter" className="text-inherit hover:text-cherry-red font-medium">Newsletter</a>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <a 
              href="https://chat.heysalad.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle hover:bg-opacity-20 text-inherit"
            >
              <FaRobot className="text-xl" />
            </a>

            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle hover:bg-opacity-20 text-inherit"
            >
              {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>

            <div className="flex items-center space-x-2">
              <a 
                href="https://apps.apple.com/us/app/heysalad/id6677057350" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm hover:text-cherry-red"
              >
                App Store
              </a>
              <span className="text-gray-300">|</span>
              <a 
                href="https://play.google.com/store/apps/details?id=com.saladhrtechnologyltd.heysaladr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm hover:text-cherry-red"
              >
                Google Play
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-ghost btn-circle hover:bg-opacity-20 text-inherit"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className={`lg:hidden absolute top-[4.6rem] w-full border-t ${
          theme === 'dark' ? 'bg-black text-white border-gray-800' : 'bg-white text-gray-800 border-gray-100'
        }`}>
          <ul className="menu p-4 space-y-2">
            <li>
              <a href="#features" className="text-inherit hover:text-cherry-red font-medium">Features</a>
            </li>
            <li>
              <a href="#steps" className="text-inherit hover:text-cherry-red font-medium">How it works</a>
            </li>
            <li>
              <a href="#faq" className="text-inherit hover:text-cherry-red font-medium">FAQ</a>
            </li>
            <li>
              <a href="#newsletter" className="text-inherit hover:text-cherry-red font-medium">Newsletter</a>
            </li>
            <li>
              <a 
                href="https://apps.apple.com/us/app/heysalad/id6677057350" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-inherit hover:text-cherry-red gap-2"
              >
                <FaApple className="text-xl" />
                App Store
              </a>
            </li>
            <li>
              <a 
                href="https://play.google.com/store/apps/details?id=com.saladhrtechnologyltd.heysaladr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-inherit hover:text-cherry-red gap-2"
              >
                <FaGooglePlay className="text-xl" />
                Google Play
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;