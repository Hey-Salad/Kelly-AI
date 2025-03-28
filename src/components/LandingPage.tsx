import React from 'react';


import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import Steps from '../components/sections/Steps';
import Sponsors from '../components/sections/Sponsors';
import FAQ from '../components/sections/FAQ';
import Newsletter from '../components/sections/Newsletter';
import Footer from '../components/layout/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header>
        <Navbar />
      </header>
      
      {/* Main Content */}
      <main>
        <Hero />
        <Sponsors />
        <Steps />
        <FAQ />
        <Newsletter />
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>

      {/* Drawer Side */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          <li><a href="#features">Features</a></li>
          <li><a href="#steps">How it works</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#newsletter">Newsletter</a></li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;