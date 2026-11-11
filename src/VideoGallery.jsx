import { useState } from 'react';
import CaseStudyVideo from './CaseStudyVideo';
import feature from './openai-feature.json';
import './VideoGallery.css';

export default function VideoGallery() {
  const [unavailable, setUnavailable] = useState(false);

  return <section className="video-gallery" aria-labelledby="video-gallery-heading">
    <header className="video-gallery-heading">
      <h2 id="video-gallery-heading">With OpenAI Developers</h2>
      <span>01 / Film</span>
    </header>
    <figure className="featured-film">
      <div className="featured-film-screen">
        <span className="film-credit">OpenAI Developers</span>
        {unavailable ? <a className="featured-film-fallback" href={feature.post} target="_blank" rel="noopener noreferrer">Watch on LinkedIn</a> : <CaseStudyVideo
          src={feature.src}
          muted
          playsInline
          crossOrigin="anonymous"
          poster={feature.poster}
          captions={feature.captions}
          aria-label="Kasturi Khanke on building Generative Loaders with Codex, featured by OpenAI Developers"
          onError={() => setUnavailable(true)}
        />}
      </div>
      <figcaption><p>Building Generative Loaders with Codex.</p><a href={feature.post} target="_blank" rel="noopener noreferrer">Watch on LinkedIn</a></figcaption>
    </figure>
  </section>;
}
