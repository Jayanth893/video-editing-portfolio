import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { personalDetails } from '../data';
import { Instagram, Youtube, Linkedin } from './Icons';
import Lenis from 'lenis';

import { Menu, X } from 'lucide-react';

const Navbar = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Comparison', path: '/comparison' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <nav style={{ 
        background: scrolled ? 'rgba(7, 7, 10, 0.95)' : 'transparent', 
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none', 
        transition: 'all 0.3s' 
      }}>
        <Link to="/" className="logo gradient-text">{personalDetails.brandName}</Link>
        <div className="nav-links">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={location.pathname === item.path ? 'active' : ''}
              style={{ color: location.pathname === item.path ? 'var(--accent-purple)' : '' }}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <button className="mobile-menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </nav>

      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              onClick={() => setIsOpen(false)}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

const Footer = () => (
  <footer>
    <div className="footer-content">
      <div className="footer-col"><div className="logo gradient-text">{personalDetails.brandName}</div></div>
      <div className="footer-col">
        <h4>Socials</h4>
        <div className="social-links" style={{ display: 'flex', gap: '20px' }}>
          <a href={personalDetails.socials.instagram} aria-label="Instagram"><Instagram size={20}/></a>
          <a href={personalDetails.socials.youtube} aria-label="YouTube"><Youtube size={20}/></a>
          <a href={personalDetails.socials.linkedin} aria-label="Linkedin"><Linkedin size={20}/></a>
        </div>
      </div>
    </div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} {personalDetails.brandName}.</p></div>
  </footer>
);

const Layout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorOutlinePos, setCursorOutlinePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / (totalH || 1)) * 100);
    };

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const target = e.target;
      if (target.closest('a') || target.closest('button') || target.closest('.portfolio-item') || target.closest('.filter-btn')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    let rafId;
    const followCursor = () => {
      setCursorOutlinePos(prev => ({
        x: prev.x + (mouseRef.current.x - prev.x) * 0.1,
        y: prev.y + (mouseRef.current.y - prev.y) * 0.1
      }));
      rafId = requestAnimationFrame(followCursor);
    };
    rafId = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    setIsTransitioning(true);
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsTransitioning(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className={`app-container ${isHovering ? 'cursor-hover' : ''}`}>
      <div className={`page-transition-overlay ${isTransitioning ? 'active' : ''}`}></div>
      <div className="noise-overlay"></div>
      <div className="scanline-overlay"></div>
      
      <div className="viewfinder-corner corner-tl"></div>
      <div className="viewfinder-corner corner-tr"></div>
      <div className="viewfinder-corner corner-bl"></div>
      <div className="viewfinder-corner corner-br"></div>

      <div className="aura-container">
        <div className="aura-blob aura-1"></div>
        <div className="aura-blob aura-2"></div>
        <div className="aura-blob aura-3"></div>
      </div>
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 15}s`, width: `${Math.random() * 3}px`, height: `${Math.random() * 3}px` }}></div>
        ))}
      </div>
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      <div className="custom-cursor" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}></div>
      <div className="custom-cursor-outline" style={{ left: `${cursorOutlinePos.x}px`, top: `${cursorOutlinePos.y}px` }}></div>
      
      <Navbar scrolled={scrolled} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
