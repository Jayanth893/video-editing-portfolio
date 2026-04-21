import React from 'react';
import { useNavigate } from 'react-router-dom';
import FadeInSection from '../components/FadeInSection';
import { personalDetails } from '../data';
import { ChevronRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="hero">
      <video autoPlay muted loop playsInline className="hero-video" poster="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4">
        <source src="https://assets.mixkit.co/videos/preview/mixkit-working-with-a-computer-and-editing-video-41132-large.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>
      <div className="hero-flare"></div>
      <div className="hero-content">
        <FadeInSection variant="blur-in">
          <h1 className="glitch-hover" style={{ animation: 'cinematic-blur-in 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
            I Turn Ideas Into <br/><span className="gradient-text">Cinematic Stories</span>
          </h1>
        </FadeInSection>
        <FadeInSection delay={300} variant="blur-in">
          <p style={{ animation: 'reveal-text-cinematic 1.5s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
            {personalDetails.role} | {personalDetails.specialties}
          </p>
        </FadeInSection>
        <FadeInSection delay={600}>
          <div className="hero-buttons">
            <button className="btn btn-primary float" onClick={() => navigate('/portfolio')}>
              View My Work <ChevronRight style={{ display: 'inline', verticalAlign: 'middle' }} size={20}/>
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/contact')}>
              Hire Me
            </button>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Home;
