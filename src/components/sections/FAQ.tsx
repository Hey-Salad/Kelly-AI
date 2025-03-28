import { FC, useState } from 'react';
import { useTheme } from '../theme/ThemeProvider';
import { FaChevronDown } from 'react-icons/fa';

const FAQ: FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does HeySalad work?",
      answer: "Simply take a photo of the ingredients you have in your kitchen, and our app will suggest personalized recipes based on what's available. We'll provide step-by-step guidance to help you create delicious meals."
    },
    {
      question: "Is HeySalad free to use?",
      answer: "Yes, HeySalad is free to download and use. Get started by downloading our app from the App Store or Google Play Store."
    },
    {
      question: "Can I save my favorite recipes?",
      answer: "Absolutely! You can bookmark your favorite recipes and access them anytime, even offline. Create your personal collection of go-to meals."
    },
    {
      question: "Does HeySalad work with dietary restrictions?",
      answer: "Yes, you can set your dietary preferences in the app, and we'll only show you recipes that match your requirements, whether you're vegetarian, vegan, gluten-free, or have other dietary needs."
    },
    {
      question: "How accurate is the ingredient recognition?",
      answer: "Our AI-powered ingredient recognition is highly accurate and continuously improving. If you ever encounter any issues, you can manually adjust the ingredients list."
    }
  ];

  return (
    <section className={`py-16 px-4 transition-colors duration-300 ${
      isDark ? 'bg-black' : 'bg-white'
    }`}>
      <div className="container mx-auto max-w-3xl">
        <h2 className={`text-4xl font-bold text-center mb-12 font-grandstander ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl transition-colors duration-300 ${
                isDark ? 'bg-[#1a1a1a]' : 'bg-[#ed4c4c]/10'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full text-left px-6 py-4 flex items-center justify-between ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                <span className="font-grandstander font-semibold">{faq.question}</span>
                <FaChevronDown
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  } ${
                    isDark ? 'text-white' : 'text-black'
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className={`font-figtree ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;