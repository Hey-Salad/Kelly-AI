import { FC } from 'react';
import { useTheme } from '../theme/ThemeProvider';

const Steps: FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const steps = [
    {
      number: 1,
      image: '/HeySalad_BrandImage1.jpg',
      title: 'Take a pic of your ingredients',
      description: 'Snap a photo of what you have in your kitchen'
    },
    {
      number: 2,
      image: '/HeySalad_BrandImage2.jpg',
      title: 'We match your ingredients with our range of recipes',
      description: 'Our app suggests personalized recipes based on your available ingredients'
    },
    {
      number: 3,
      image: '/HeySalad_BrandImage3.jpg',
      title: 'Enjoy cooking your favourite dishes',
      description: 'Create delicious meals with step-by-step guidance'
    }
  ];

  return (
    <section className={`py-16 px-4 transition-colors duration-300 ${
      isDark ? 'bg-black' : 'bg-white'
    }`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-12 font-grandstander ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          it's as easy as 1, 2, 3
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div 
              key={step.number} 
              className={`relative rounded-3xl shadow-lg p-6 transition-colors duration-300 ${
                isDark ? 'bg-[#1a1a1a]' : 'bg-[#ed4c4c]/10'
              }`}
            >
              <div className="aspect-w-16 aspect-h-12 mb-6">
                <img
                  src={step.image}
                  alt={step.title}
                  className="rounded-2xl object-cover w-full h-full"
                />
                <div className="absolute -top-4 -right-4">
                  <div className="bg-[#ed4c4c] text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">
                    {step.number}
                  </div>
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-3 font-grandstander ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                {step.title}
              </h3>
              <p className={`font-figtree ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;