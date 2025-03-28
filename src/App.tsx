import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Steps from './components/sections/Steps';
import Sponsors from './components/sections/Sponsors';
import FAQ from './components/sections/FAQ';
import Newsletter from './components/sections/Newsletter';
import Footer from './components/layout/Footer';

const App: React.FC = () => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">
          <Hero />
          <Steps />
          <Sponsors />
          <FAQ />
          <Newsletter />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;