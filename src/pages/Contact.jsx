import React, { useState } from 'react';
import FadeInSection from '../components/FadeInSection';
import { supabase } from '../supabaseClient';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [isSent, setIsSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await supabase.from('contacts').insert([contactForm]);
            const serviceId = 'service_vitkh7w';
            const templateId = 'template_dlyms5c';
            const publicKey = 'gieMCtaEwUo5o2laY';
            await emailjs.send(serviceId, templateId, {
                name: contactForm.name,
                email: contactForm.email,
                message: contactForm.message
            }, publicKey);
            setIsSent(true);
            setContactForm({ name: '', email: '', message: '' });
            setTimeout(() => setIsSent(false), 5000);
        } catch (err) {
            alert("Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" style={{ paddingTop: '120px' }}>
            <FadeInSection><h2 className="section-title">Let's Work Together</h2></FadeInSection>
            <div className="contact-container">
                {isSent ? (
                    <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                        <h3>Message Sent!</h3><p>I'll get back to you shortly.</p>
                    </div>
                ) : (
                    <form className="contact-form" onSubmit={handleContactSubmit}>
                        <input type="text" placeholder="Name" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} required />
                        <input type="email" placeholder="Email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} required />
                        <textarea placeholder="Your message..." value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} required></textarea>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{loading ? 'Sending...' : 'Send Message'}</button>
                    </form>
                )}
            </div>
        </section>
    );
};

export default Contact;
