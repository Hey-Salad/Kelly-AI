import React from 'react';
import { useTheme } from '../theme/ThemeProvider';
import { FaArrowRight, FaRobot } from 'react-icons/fa';

const Hero: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`min-h-[90vh] ${isDark ? 'bg-black' : 'bg-white'} transition-colors duration-300`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 min-h-[90vh] py-16">
          {/* Left Image */}
          <div className="lg:w-1/2">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
              <img 
                src="/HeySalad_KitchenSceen.jpg" 
                alt="Cooking Scene" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
          {/* Right Content */}
          <div className="lg:w-1/2 space-y-8">
            <div>
              <h1 className={`font-grandstander text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                Fall in love with
                <span className="text-[#ed4c4c] block">cooking again</span>
              </h1>
              <p className={`font-figtree text-xl mt-6 ${
                isDark ? 'text-gray-200' : 'text-gray-600'
              } max-w-xl`}>
                Match your ingredients with recipes you love. Discover new dishes and make cooking fun again.
              </p>
            </div>
            {/* Chat UI Announcement */}
            <div className={`rounded-[32px] p-6 ${
              isDark ? 'bg-gray-800/50' : 'bg-[#ed4c4c]/5'
            } backdrop-blur-sm transition-colors duration-300`}>
              <div className="flex items-center gap-4">
                <div className={`rounded-full p-3 ${
                  isDark ? 'bg-[#ed4c4c]/20' : 'bg-[#ed4c4c]'
                } transition-colors duration-300`}>
                  <FaRobot className={`text-xl ${
                    isDark ? 'text-[#ed4c4c]' : 'text-white'
                  }`} />
                </div>
                <span className={`font-grandstander font-semibold text-lg ${
                  isDark ? 'text-white' : 'text-black'
                }`}>
                  Just Launched! Try Our AI Chat
                </span>
              </div>
              <p className={`font-figtree mt-4 mb-6 ${
                isDark ? 'text-gray-200' : 'text-gray-600'
              }`}>
                Experience our new AI-powered chat interface with DeepSeek technology.
              </p>
              <a 
                href="https://chat.heysalad.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[#ed4c4c] hover:text-[#d43c3c] transition-colors duration-300 font-medium"
              >
                Try it now
                <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;