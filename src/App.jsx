import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Comparison from './pages/Comparison';
import Services from './pages/Services';
import Contact from './pages/Contact';
import { personalDetails } from './data';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading && (
        <div className="preloader">
          <div className="preloader-content">
            <div className="logo gradient-text preloader-logo">{personalDetails.brandName}</div>
            <div className="loader-bar-container"><div className="loader-bar"></div></div>
          </div>
        </div>
      )}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
