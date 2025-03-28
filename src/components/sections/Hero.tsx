import React from 'react';
import { useTheme } from '../theme/ThemeProvider';
import { FaArrowRight, FaCamera, FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
              {/* AI Badge */}
              <div className="absolute top-6 left-6 bg-cherry-red text-white px-4 py-2 rounded-full font-medium flex items-center gap-2">
                <FaUtensils /> AI Powered
              </div>
            </div>
          </div>
          {/* Right Content */}
          <div className="lg:w-1/2 space-y-8">
            <div>
              <h1 className={`font-grandstander text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                Meet Kelly,
                <span className="text-cherry-red block">Your Food AI</span>
              </h1>
              <p className={`font-figtree text-xl mt-6 ${
                isDark ? 'text-gray-200' : 'text-gray-600'
              } max-w-xl`}>
                Snap a photo of your meal and get instant nutritional insights. Make healthier food choices with personalized recommendations.
              </p>
            </div>
            {/* Food Analysis Feature */}
            <div className={`rounded-[32px] p-6 ${
              isDark ? 'bg-gray-800/50' : 'bg-light-peach'
            } backdrop-blur-sm transition-colors duration-300`}>
              <div className="flex items-center gap-4">
                <div className={`rounded-full p-3 ${
                  isDark ? 'bg-cherry-red/20' : 'bg-cherry-red'
                } transition-colors duration-300`}>
                  <FaCamera className={`text-xl ${
                    isDark ? 'text-cherry-red' : 'text-white'
                  }`} />
                </div>
                <span className={`font-grandstander font-semibold text-lg ${
                  isDark ? 'text-white' : 'text-black'
                }`}>
                  Instant Food Analysis
                </span>
              </div>
              <p className={`font-figtree mt-4 mb-6 ${
                isDark ? 'text-gray-200' : 'text-gray-600'
              }`}>
                Take a photo of your food and let Kelly analyze its nutritional content, ingredients, and health benefits in seconds.
              </p>
              <Link 
                to="/analysis"
                className="group inline-flex items-center gap-2 text-cherry-red hover:text-peach transition-colors duration-300 font-medium"
              >
                Try it now
                <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;