import React from 'react';
import { useInView } from 'react-intersection-observer';

const FadeInSection = ({ children, delay = 0, variant = 'fade-in' }) => {
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: '-50px 0px' });
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`${variant} ${inView ? 'visible' : ''}`}>
      {children}
    </div>
  );
};

export default FadeInSection;
