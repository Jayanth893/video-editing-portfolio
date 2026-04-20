import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import emailjs from '@emailjs/browser';
import Lenis from 'lenis';
import { useInView } from 'react-intersection-observer';
import { Play, Clapperboard, Scissors, Film, MonitorPlay, Sparkles, ChevronRight, Mail, X } from 'lucide-react';

// Custom Cinematic Icons
const Instagram = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Youtube = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C12.55 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
  </svg>
);

const Linkedin = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const personalDetails = {
  name: "Jayanth Kolli",
  brandName: "JAI CUTS",
  role: "Video Editor & Graphic Designer",
  specialties: "CapCut | Canva | Storytelling",
  bio: "I turn raw footage into stories that capture attention. As a video editor, I specialize in creating dynamic and engaging content using CapCut, focusing on smooth transitions, timing, and visual storytelling. I also design eye-catching thumbnails and posters with Canva to ensure every piece of content stands out before it’s even played. My goal is simple — make content that people don’t scroll past.",
  skills: [
    { name: 'CapCut Editing', level: 95 },
    { name: 'Canva Graphic Design', level: 90 },
    { name: 'Visual Storytelling', level: 95 },
    { name: 'Transitions & Timing', level: 90 }
  ],
  email: "jayanth@jaicuts.dev",
  socials: {
    instagram: "#",
    youtube: "#",
    linkedin: "#"
  }
};

const initialPortfolioData = [
  { id: 1, title: 'Neon Nights Campaign', category: 'Ads', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 2, title: 'Automotive Cinematic', category: 'YouTube', img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=600', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 3, title: 'Summer Vibes', category: 'Reels', img: 'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&q=80&w=600', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 4, title: 'Tech Product Launch', category: 'Ads', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 5, title: 'Travel Mini VLOG', category: 'Reels', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 6, title: 'Brand Storytelling', category: 'YouTube', img: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=600', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
];

const FadeInSection = ({ children, delay = 0, variant = 'fade-in' }) => {
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: '-50px 0px' });
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`${variant} ${inView ? 'visible' : ''}`}>
      {children}
    </div>
  );
};

const BeforeAfterSlider = ({ before, after }) => {
  const [sliderPos, setSliderPos] = useState(50);
  return (
    <div className="ba-container">
      <div className="ba-after" style={{ backgroundImage: `url(${after})` }}></div>
      <div className="ba-before" style={{ backgroundImage: `url(${before})`, width: `${sliderPos}%` }}></div>
      <input type="range" min="0" max="100" value={sliderPos} onChange={(e) => setSliderPos(e.target.value)} className="ba-slider" />
      <div className="ba-handle" style={{ left: `${sliderPos}%` }}>
        <div className="ba-handle-line"></div>
        <div className="ba-handle-circle"><Scissors size={16} /></div>
      </div>
      <div className="ba-label ba-label-before">Original</div>
      <div className="ba-label ba-label-after">Edited</div>
    </div>
  );
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState('All');
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorOutlinePos, setCursorOutlinePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const [projects, setProjects] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', category: 'Reels', img: '', video: '' });
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  
  const mouseRef = React.useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Elite Smooth Scroll (Lenis)
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

    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setProjects(data && data.length > 0 ? data : initialPortfolioData);
      } catch (err) {
        setProjects(initialPortfolioData);
      }
    };
    fetchProjects();

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / (totalH || 1)) * 100);
      
      const heroVideo = document.querySelector('.hero-video');
      if (heroVideo) {
        heroVideo.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.4}px))`;
      }
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
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
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

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title) return;
    setLoading(true);
    let imageUrl = newProject.img;
    let videoUrl = newProject.video;
    try {
      const imageFile = document.getElementById('imageUpload').files[0];
      if (imageFile) {
        const fileName = `${Date.now()}_${imageFile.name}`;
        await supabase.storage.from('project-files').upload(`images/${fileName}`, imageFile);
        imageUrl = supabase.storage.from('project-files').getPublicUrl(`images/${fileName}`).data.publicUrl;
      }
      const videoFile = document.getElementById('videoUpload').files[0];
      if (videoFile) {
        const fileName = `${Date.now()}_${videoFile.name}`;
        await supabase.storage.from('project-files').upload(`videos/${fileName}`, videoFile);
        videoUrl = supabase.storage.from('project-files').getPublicUrl(`videos/${fileName}`).data.publicUrl;
      }
      const { data, error } = await supabase.from('projects').insert([{ title: newProject.title, category: newProject.category, img: imageUrl, video: videoUrl }]).select();
      if (error) throw error;
      setProjects(prev => [data[0], ...prev]);
      setShowAddForm(false);
      setNewProject({ title: '', category: 'Reels', img: '', video: '' });
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    setProjects(prev => prev.filter(p => p.id !== id));
    try { await supabase.from('projects').delete().eq('id', id); } catch (err) { console.error(err); }
  };

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

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const filteredPortfolio = projects.filter(item => filter === 'All' || item.category === filter);

  return (
    <div className={`app-container ${isHovering ? 'cursor-hover' : ''}`}>
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

      {loading && (
        <div className="preloader">
          <div className="preloader-content">
            <div className="logo gradient-text preloader-logo">{personalDetails.brandName}</div>
            <div className="loader-bar-container"><div className="loader-bar"></div></div>
          </div>
        </div>
      )}

      <nav style={{ background: scrolled ? 'rgba(7, 7, 10, 0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none', transition: 'all 0.3s' }}>
        <div className="logo gradient-text">{personalDetails.brandName}</div>
        <div className="nav-links">
          {['home', 'about', 'portfolio', 'comparison', 'services', 'contact'].map(id => (
            <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollToSection(id); }}>{id.charAt(0).toUpperCase() + id.slice(1).replace('-', ' ')}</a>
          ))}
        </div>
      </nav>

      <section id="home" className="hero">
        <video autoPlay muted loop playsInline className="hero-video" poster="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-working-with-a-computer-and-editing-video-41132-large.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-flare"></div>
        <div className="hero-content">
          <FadeInSection variant="blur-in">
            <h1 style={{ animation: 'cinematic-blur-in 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
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
              <button className="btn btn-primary float" onClick={() => scrollToSection('portfolio')}>
                View My Work <ChevronRight style={{ display: 'inline', verticalAlign: 'middle' }} size={20}/>
              </button>
              <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>
                Hire Me
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>

      <section id="about">
        <FadeInSection variant="slide-left"><h2 className="section-title">About Me</h2></FadeInSection>
        <div className="about-content">
          <FadeInSection delay={200} variant="zoom-in"><div className="about-image"><img src="https://images.unsplash.com/photo-1581333100576-b73bbe92c19a" alt={personalDetails.name} /></div></FadeInSection>
          <FadeInSection delay={400} variant="fade-up">
            <div className="about-text">
              <h3 className="line-reveal" style={{ animationDelay: '0.2s' }}>{personalDetails.bio}</h3>
              <div className="skills-container">
                {personalDetails.skills.map((skill, i) => (
                  <div key={i} className="skill-item">
                    <div className="skill-info"><span>{skill.name}</span><span>{skill.level}%</span></div>
                    <div className="skill-bar"><div className="skill-progress" style={{ '--target-width': `${skill.level}%` }}></div></div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      <section id="comparison" style={{ background: 'transparent', minHeight: 'auto', padding: '80px 5%' }}>
        <FadeInSection variant="fade-up"><h2 className="section-title">The Transformation</h2></FadeInSection>
        <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto', position: 'relative' }}>
          <BeforeAfterSlider 
            before="https://images.unsplash.com/photo-1514933651103-005eec06c04b" 
            after="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df" 
          />
        </div>
      </section>

      <section id="portfolio">
        <FadeInSection variant="slide-left"><h2 className="section-title">Featured Work</h2></FadeInSection>
        <div className="filter-container">
          {['All', 'Reels', 'Ads', 'YouTube'].map(cat => (
            <button key={cat} className={`filter-btn ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)}>{cat}</button>
          ))}
        </div>
        <div className="portfolio-grid">
          {filteredPortfolio.map((item, i) => (
            <FadeInSection key={item.id} delay={i * 100} variant="zoom-in">
              <div className="portfolio-item-container">
                <div className="portfolio-item reveal-mask" onClick={() => setActiveVideo(item.video)}>
                  <img src={item.img} alt={item.title} />
                  <div className="portfolio-overlay">
                    <h3>{item.title}</h3>
                    <span>{item.category}</span>
                    <Play className="icon-play" fill="currentColor" />
                  </div>
                </div>
                {showAddForm && <button className="delete-btn" onClick={(e) => { e.stopPropagation(); deleteProject(item.id); }}><X size={16} /></button>}
              </div>
            </FadeInSection>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <FadeInSection variant="fade-up">
            <button className="btn btn-secondary" style={{ borderStyle: 'dashed' }} onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? 'Cancel Edit' : '+ Add New Project'}
            </button>
          </FadeInSection>
        </div>
        {showAddForm && (
          <FadeInSection variant="zoom-in">
            <div className="admin-form-container glass-card" style={{ maxWidth: '600px', margin: '40px auto', padding: '40px', borderRadius: '20px' }}>
              <form onSubmit={handleAddProject} className="contact-form">
                <input type="text" placeholder="Project Title" value={newProject.title} onChange={(e) => setNewProject({...newProject, title: e.target.value})} required />
                <select value={newProject.category} onChange={(e) => setNewProject({...newProject, category: e.target.value})} className="contact-form-select">
                  <option value="Reels">Reels</option><option value="Ads">Ads</option><option value="YouTube">YouTube</option>
                </select>
                <label>Thumbnail (Upload or provide URL)</label>
                <input type="file" id="imageUpload" accept="image/*" />
                <input type="url" placeholder="...or Image URL" value={newProject.img} onChange={(e) => setNewProject({...newProject, img: e.target.value})} />
                <label>Video File (Upload or provide URL)</label>
                <input type="file" id="videoUpload" accept="video/*" />
                <input type="url" placeholder="...or Video Embed URL" value={newProject.video} onChange={(e) => setNewProject({...newProject, video: e.target.value})} />
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{loading ? 'Processing...' : 'Add Project'}</button>
              </form>
            </div>
          </FadeInSection>
        )}
      </section>

      <section id="services">
        <FadeInSection variant="slide-left"><h2 className="section-title">My Services</h2></FadeInSection>
        <div className="services-grid">
          <FadeInSection variant="fade-up" delay={100}><div className="service-card kinetic-glow-card"><div className="card-content"><Youtube size={48} /><h3>YouTube Editing</h3><p>Engagement-focused storytelling.</p></div></div></FadeInSection>
          <FadeInSection variant="fade-up" delay={200}><div className="service-card kinetic-glow-card"><div className="card-content"><Instagram size={48} /><h3>Short-form Ready</h3><p>Viral hooks and fast-paced cuts.</p></div></div></FadeInSection>
          <FadeInSection variant="fade-up" delay={300}><div className="service-card kinetic-glow-card"><div className="card-content"><MonitorPlay size={48} /><h3>Graphic Design</h3><p>Eye-catching thumbnails.</p></div></div></FadeInSection>
          <FadeInSection variant="fade-up" delay={400}><div className="service-card kinetic-glow-card"><div className="card-content"><Sparkles size={48} /><h3>Visual Magic</h3><p>Cinematic transitions.</p></div></div></FadeInSection>
        </div>
      </section>

      <section id="contact">
        <FadeInSection><h2 className="section-title">Let's Work Together</h2></FadeInSection>
        <div className="contact-container">
          {isSent ? (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
              <h3>Message Sent!</h3><p>I'll get back to you shortly.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <input type="text" placeholder="Name" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} required />
              <input type="email" placeholder="Email" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} required />
              <textarea placeholder="Your message..." value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} required></textarea>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{loading ? 'Sending...' : 'Send Message'}</button>
            </form>
          )}
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-col"><div className="logo gradient-text">{personalDetails.brandName}</div></div>
          <div className="footer-col"><h4>Socials</h4><div className="social-links" style={{ display: 'flex', gap: '20px' }}>
            <a href={personalDetails.socials.instagram} aria-label="Instagram"><Instagram size={20}/></a>
            <a href={personalDetails.socials.youtube} aria-label="YouTube"><Youtube size={20}/></a>
            <a href={personalDetails.socials.linkedin} aria-label="LinkedIn"><Linkedin size={20}/></a>
          </div></div>
        </div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} {personalDetails.brandName}.</p></div>
      </footer>

      {activeVideo && (
        <div className="modal" onClick={() => setActiveVideo(null)}>
          <button className="modal-close"><X size={32} /></button>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {activeVideo.includes('youtube.com') || activeVideo.includes('vimeo.com') ? (
              <iframe src={activeVideo} title="Video" frameBorder="0" allowFullScreen></iframe>
            ) : (
              <video src={activeVideo} controls autoPlay className="modal-video"></video>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
