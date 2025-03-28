import { FC } from 'react';
import { useTheme } from '../theme/ThemeProvider';

const Sponsors: FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const sponsors = [
    {
      name: 'Google for Startups',
      image: '/Google_for_Startups_logo.png',
      height: 'h-8'
    },
    {
      name: 'NVIDIA Inception',
      image: '/nvidia_inception_program.png',
      height: 'h-16'
    },
    {
      name: 'Seeedstudio',
      image: isDark 
        ? '/Seeedstudio_White Logo.png' 
        : '/SeeedStudio_Black Logo.png',
      height: 'h-10'
    },
    {
      name: 'Block Dojo',
      image: '/blockdojo-i.svg',
      height: 'h-8'
    }
  ];

  return (
    <section className={`py-16 transition-colors duration-300 ${
      isDark ? 'bg-black' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-figtree text-center">
          Backed By
        </div>

        {/* Sponsors Grid */}
        <div className="flex flex-wrap gap-12 items-center justify-center max-w-4xl mx-auto">
          {sponsors.map((sponsor, index) => (
            <div 
              key={index}
              className="transition-all duration-300"
            >
              <img 
                src={sponsor.image} 
                alt={sponsor.name} 
                className={`${sponsor.height} ${
                  sponsor.name !== 'Seeedstudio' ? 'grayscale hover:grayscale-0' : ''
                } transition-all duration-300`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;