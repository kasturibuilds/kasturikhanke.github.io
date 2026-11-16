/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ImageLoader } from 'generative-loaders';
import './ImageCompletion.css';

const source = '/project-captures/loaders-result.png';
const description = 'Olive tree beside a stone house and pool in soft daylight';

// Keep loading and completion on the same surface; reveal matching image pieces.
export default function ImageCompletion({ variant = 'tiles', complete, paused, label = 'Creating image' }) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const revealing = complete && ready;
  const columns = variant === 'resolution' ? 6 : variant === 'shutter' ? 2 : ['tiles', 'pixel-grid'].includes(variant) ? 4 : 1;
  const rows = variant === 'bands' ? 3 : ['tiles', 'pixel-grid', 'resolution'].includes(variant) ? columns : 1;
  return <div className="image-completion" data-variant={variant} data-complete={revealing} data-paused={paused}>
    {failed ? <p className="text-sm text-gray-600">Example image unavailable.</p> : <>
      <img className="image-completion-source" src={source} alt={revealing ? description : ''} onLoad={() => setReady(true)} onError={() => setFailed(true)} />
      <div className="image-completion-loading" aria-hidden={revealing}>
        <ImageLoader variant={variant} size="100%" radius={8} color="#737373" paused={paused || revealing} label={label} />
      </div>
      {revealing && <div className="image-completion-pieces" aria-hidden="true">
        {Array.from({ length: columns * rows }, (_, index) => {
          const x = index % columns;
          const y = Math.floor(index / columns);
          const delay = variant === 'resolution' ? (Math.abs(x - 2.5) + Math.abs(y - 2.5)) * 70 : (x + y) * 85;
          return <span key={index} className="image-completion-piece" style={{
            left: `${x * 100 / columns}%`, top: `${y * 100 / rows}%`,
            width: `${100 / columns}%`, height: `${100 / rows}%`,
            backgroundImage: `url("${source}")`, backgroundSize: `${columns * 100}% ${rows * 100}%`,
            backgroundPosition: `${columns === 1 ? 0 : x * 100 / (columns - 1)}% ${rows === 1 ? 0 : y * 100 / (rows - 1)}%`,
            '--reveal-delay': `${delay}ms`, '--reveal-edge': x === 0 ? '100% 0 0' : '0 0 100%',
          }} />;
        })}
      </div>}
    </>}
  </div>;
}
