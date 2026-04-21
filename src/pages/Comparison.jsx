import React from 'react';
import FadeInSection from '../components/FadeInSection';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const Comparison = () => {
  return (
    <section id="comparison" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <FadeInSection variant="fade-up"><h2 className="section-title">The Transformation</h2></FadeInSection>
      <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto', position: 'relative' }}>
        <BeforeAfterSlider 
          before="https://images.unsplash.com/photo-1514933651103-005eec06c04b" 
          after="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df" 
        />
      </div>
    </section>
  );
};

export default Comparison;
