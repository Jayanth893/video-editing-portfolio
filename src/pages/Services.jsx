import React from 'react';
import FadeInSection from '../components/FadeInSection';
import { MonitorPlay, Sparkles } from 'lucide-react';
import { Youtube, Instagram } from '../components/Icons';

const Services = () => {
    const services = [
        { icon: <Youtube size={48} />, title: "YouTube Editing", text: "Engagement-focused storytelling." },
        { icon: <Instagram size={48} />, title: "Short-form Ready", text: "Viral hooks and fast-paced cuts." },
        { icon: <MonitorPlay size={48} />, title: "Graphic Design", text: "Eye-catching thumbnails." },
        { icon: <Sparkles size={48} />, title: "Visual Magic", text: "Cinematic transitions." }
    ];

    return (
        <section id="services" style={{ paddingTop: '120px' }}>
            <FadeInSection variant="slide-left"><h2 className="section-title">My Services</h2></FadeInSection>
            <div className="services-grid">
                {services.map((service, i) => (
                    <FadeInSection key={i} variant="fade-up" delay={i * 100}>
                        <div className="service-card kinetic-glow-card">
                            <div className="card-content">
                                {service.icon}
                                <h3>{service.title}</h3>
                                <p>{service.text}</p>
                            </div>
                        </div>
                    </FadeInSection>
                ))}
            </div>
        </section>
    );
};

export default Services;
