import { FC, useState } from 'react';
import { useTheme } from '../theme/ThemeProvider';
import { FaEnvelope } from 'react-icons/fa';

const Newsletter: FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // TODO: Implement your newsletter signup logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className={`py-16 px-4 transition-colors duration-300 ${
      isDark ? 'bg-black' : 'bg-white'
    }`}>
      <div className="container mx-auto max-w-3xl">
        <div className={`rounded-2xl p-8 transition-colors duration-300 ${
          isDark ? 'bg-[#1a1a1a]' : 'bg-[#ed4c4c]/10'
        }`}>
          <h2 className={`text-4xl font-bold text-center mb-4 font-grandstander ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            Try HeySalad
          </h2>
          
          <p className={`text-center mb-8 font-figtree ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Get more information about new features and our launch date
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
            <div className="flex-1 relative">
              <FaEnvelope className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-colors ${
                  isDark 
                    ? 'bg-black text-white placeholder-gray-400 border border-gray-800 focus:border-gray-600' 
                    : 'bg-white text-black placeholder-gray-500 border border-gray-200 focus:border-[#ed4c4c]'
                }`}
                required
              />
            </div>
            <button
              type="submit"
              className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                isDark
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-[#ed4c4c] text-white hover:bg-[#d43c3c]'
              } ${status === 'loading' ? 'opacity-75 cursor-wait' : ''}`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Joining...' : 'Join us'}
            </button>
          </form>

          {status === 'success' && (
            <div className={`text-center p-4 rounded-xl mb-6 ${
              isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700'
            }`}>
              Thanks for subscribing! We'll keep you updated.
            </div>
          )}
          
          {status === 'error' && (
            <div className={`text-center p-4 rounded-xl mb-6 ${
              isDark ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-700'
            }`}>
              Oops! Something went wrong. Please try again.
            </div>
          )}

          <div className={`flex items-center justify-center gap-4 mt-8 font-figtree ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <a 
              href="https://apps.apple.com/us/app/heysalad/id6677057350" 
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded-xl border transition-colors ${
                isDark 
                  ? 'border-gray-700 hover:border-gray-500' 
                  : 'border-gray-200 hover:border-[#ed4c4c]'
              }`}
            >
              Download iOS App
            </a>
            <a 
              href="https://play.google.com/store/apps/details?id=com.saladhrtechnologyltd.heysaladr" 
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded-xl border transition-colors ${
                isDark 
                  ? 'border-gray-700 hover:border-gray-500' 
                  : 'border-gray-200 hover:border-[#ed4c4c]'
              }`}
            >
              Get it on Android
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;