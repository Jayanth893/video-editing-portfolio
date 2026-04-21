import React from 'react';
import FadeInSection from '../components/FadeInSection';
import { personalDetails } from '../data';

const About = () => {
  return (
    <section id="about" style={{ paddingTop: '120px' }}>
      <FadeInSection variant="slide-left"><h2 className="section-title glitch-hover">About Me</h2></FadeInSection>
      
      <div className="about-content">
        <FadeInSection delay={200} variant="zoom-in">
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1581333100576-b73bbe92c19a" 
              alt={personalDetails.name} 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </FadeInSection>

        <div className="about-text-container">
          <FadeInSection delay={400} variant="fade-up">
            <div className="about-text">
              <h3 className="gradient-text" style={{ marginBottom: '15px' }}>My Story</h3>
              <p className="line-reveal" style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
                {personalDetails.bio}
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={500} variant="fade-up">
            <div className="about-vision" style={{ marginTop: '40px' }}>
              <h3 className="gradient-text" style={{ marginBottom: '15px' }}>Creative Vision</h3>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--text-light)', opacity: 0.8 }}>
                "{personalDetails.vision}"
              </p>
            </div>
          </FadeInSection>
        </div>
      </div>

      <div className="stats-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        width: '100%', 
        maxWidth: '1200px', 
        marginTop: '80px' 
      }}>
        {personalDetails.stats.map((stat, i) => (
          <FadeInSection key={i} delay={i * 100} variant="zoom-in">
            <div className="glass-card stat-card" style={{ 
              padding: '30px', 
              textAlign: 'center', 
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(255,255,255,0.02)'
            }}>
              <h4 style={{ fontSize: '2.5rem', color: 'var(--accent-cyan)', marginBottom: '10px', fontWeight: '800' }}>{stat.value}</h4>
              <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)' }}>{stat.label}</p>
            </div>
          </FadeInSection>
        ))}
      </div>

      <div className="skills-section" style={{ width: '100%', maxWidth: '1200px', marginTop: '100px' }}>
        <FadeInSection variant="fade-up"><h3 className="section-title" style={{ fontSize: '2rem', marginBottom: '40px' }}>Expertise</h3></FadeInSection>
        <div className="skills-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
          {personalDetails.skills.map((skill, i) => (
            <FadeInSection key={i} delay={i * 100} variant="fade-up">
              <div className="skill-item">
                <div className="skill-info"><span>{skill.name}</span><span>{skill.level}%</span></div>
                <div className="skill-bar"><div className="skill-progress" style={{ '--target-width': `${skill.level}%` }}></div></div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
