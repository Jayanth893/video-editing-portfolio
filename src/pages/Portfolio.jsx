import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import FadeInSection from '../components/FadeInSection';
import { initialPortfolioData } from '../data';
import { Play, X } from 'lucide-react';

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const [activeVideo, setActiveVideo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', category: 'Reels', img: '', video: '' });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setProjects(data && data.length > 0 ? data : initialPortfolioData);
      } catch (err) {
        setProjects(initialPortfolioData);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
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

  const filteredPortfolio = projects.filter(item => filter === 'All' || item.category === filter);

  return (
    <section id="portfolio" style={{ paddingTop: '120px' }}>
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
    </section>
  );
};

export default Portfolio;
