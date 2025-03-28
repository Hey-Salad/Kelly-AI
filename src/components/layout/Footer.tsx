import React from 'react';
import { FaLinkedin, FaGithub, FaDiscord, FaTiktok, FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { useTheme } from '../theme/ThemeProvider';

const socialLinks = [
  {
    icon: FaLinkedin,
    url: 'https://www.linkedin.com/company/103339028/admin/dashboard/',
    label: 'LinkedIn'
  },
  {
    icon: FaXTwitter,
    url: 'https://x.com/heysaladApp',
    label: 'Twitter'
  },
  {
    icon: FaInstagram,
    url: 'https://www.instagram.com/heysalad.app',
    label: 'Instagram'
  },
  {
    icon: FaFacebook,
    url: 'https://www.facebook.com/share/1AqBha9gcK/',
    label: 'Facebook'
  },
  {
    icon: FaGithub,
    url: 'https://github.com/Hey-Salad/',
    label: 'GitHub'
  },
  {
    icon: FaDiscord,
    url: 'https://discord.gg/h2V79Tc9Ht',
    label: 'Discord'
  },
  {
    icon: FaTiktok,
    url: 'https://www.tiktok.com/@heysalad.app',
    label: 'TikTok'
  }
];

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={`transition-colors duration-300 ${
      isDark ? 'bg-black' : 'bg-white'
    }`}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Social Links */}
          <div className="col-span-1 md:col-span-2">
            <img 
              src={isDark ? "/HeySalad Logo White.png" : "/HeySalad Logo Black.png"} 
              alt="HeySalad" 
              className="h-8 mb-4"
            />
            <p className={`mb-4 font-figtree ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Match your ingredients with recipes you love. Discover new dishes and fall in love with cooking again.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className={`transition-colors ${
                      isDark 
                        ? 'text-gray-300 hover:text-[#ed4c4c]' 
                        : 'text-gray-600 hover:text-[#ed4c4c]'
                    }`}
                  >
                    <Icon className="text-2xl" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-semibold text-lg mb-4 font-grandstander ${
              isDark ? 'text-white' : 'text-black'
            }`}>Quick Links</h3>
            <div className="flex flex-col space-y-2 font-figtree">
              <a href="/terms" className={`transition-colors ${
                isDark 
                  ? 'text-gray-300 hover:text-[#ed4c4c]' 
                  : 'text-gray-600 hover:text-[#ed4c4c]'
              }`}>Terms</a>
              <a href="/privacy" className={`transition-colors ${
                isDark 
                  ? 'text-gray-300 hover:text-[#ed4c4c]' 
                  : 'text-gray-600 hover:text-[#ed4c4c]'
              }`}>Privacy</a>
              <a href="/cookies" className={`transition-colors ${
                isDark 
                  ? 'text-gray-300 hover:text-[#ed4c4c]' 
                  : 'text-gray-600 hover:text-[#ed4c4c]'
              }`}>Cookies</a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={`font-semibold text-lg mb-4 font-grandstander ${
              isDark ? 'text-white' : 'text-black'
            }`}>Contact</h3>
            <address className={`font-figtree not-italic ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Plexal, Here East<br />
              Queen Elizabeth Olympic Park<br />
              London, England<br />
              E20 3BS
            </address>
          </div>
        </div>

        {/* Legal Information */}
        <div className={`border-t transition-colors ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        } pt-8`}>
          <div className={`text-sm space-y-4 font-figtree ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <p>
              <strong>HeySalad®</strong> (UK Trademark Registration No. <strong>UK00004063403</strong>) is a registered 
              trademark of <strong>SALADHR TECHNOLOGY LTD</strong>, headquartered at Plexal, Here East, Queen Elizabeth 
              Olympic Park, London, England, E20 3BS (Company Number: 14979493).
            </p>
            
            <div className="text-xs">
              <h4 className="font-semibold mb-2">Legal Disclaimer</h4>
              <p>
                The information provided above is for general informational purposes only and does not constitute legal 
                or professional advice. Any use of the HeySalad® name, trademark, or related branding without the express 
                written permission of SALADHR TECHNOLOGY LTD is strictly prohibited. SALADHR TECHNOLOGY LTD disclaims all 
                liability for any losses or damages arising from reliance on or use of the information provided herein.
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-2 mt-6">
              <p className="text-center">
                © {new Date().getFullYear()} SALADHR TECHNOLOGY LTD. All rights reserved.
              </p>
              <p className={`text-sm font-figtree ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Made with{' '}
                <span className="text-[#ed4c4c] animate-pulse">❤️</span>{' '}
                from London, United Kingdom 🇬🇧
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;