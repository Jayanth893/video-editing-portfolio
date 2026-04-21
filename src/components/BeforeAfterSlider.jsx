import React, { useState } from 'react';
import { Scissors } from 'lucide-react';

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

export default BeforeAfterSlider;
