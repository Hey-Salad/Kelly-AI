import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import LandingPage from './components/LandingPage';
import FoodAnalysisPage from './pages/FoodAnalysisPage';
import Footer from './components/layout/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Main Content with Routes */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/analysis" element={<FoodAnalysisPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>

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
    </Router>
  );
};

export default App;