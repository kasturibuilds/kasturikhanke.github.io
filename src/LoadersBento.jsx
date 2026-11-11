import SoftLiftText from './SoftLiftText';
import { LoadersExampleGallery } from './ProjectExampleGalleries';
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { TextLoader, InlineLoader, ImageLoader } from 'generative-loaders';
import 'generative-loaders/styles.css';
import './LoadersBento.css';
import { CaseStudySection as Decision } from './CaseStudyLayout';
import feature from './openai-feature.json';

// Original gallery copy, displayed by the installed library itself.
const sample = 'Ideas arrive quietly, then become something clear.';
const words = sample.split(' ');
const textVariants = ['typewriter', 'decode', 'cascade', 'wave'];
const inlineExamples = [
  ['glyph', 'Finding the right shape…'],
  ['matrix', 'Mapping the response…'],
  ['orbit', 'Gathering context…'],
  ['ripple', 'Thinking this through…'],
  ['signal', 'Reading the details…'],
  ['spark', 'Composing an answer…'],
];
const title = value => value.charAt(0).toUpperCase() + value.slice(1);

// Image asset and tile reveal adapted from progress-narrative/app/page.tsx and app/globals.css.
function ImageHandoff({ stopped, reducedMotion }) {
  const stage = useRef(null);
  const [inView, setInView] = useState(false);
  const [phase, setPhase] = useState('loading');
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);
  const paused = stopped || !inView;
  const shownPhase = reducedMotion ? 'loaded' : phase;
  return <section className="loader-demo loader-demo-completion" aria-label="Image loading to completion">
    <header><h3>Image generation</h3><span role="status">{title(shownPhase)}</span></header>
    <div ref={stage} className="loader-completion-stage" data-paused={paused}>
      {shownPhase === 'loading' && <ImageLoader variant="tiles" size="100%" radius={0} color="#20201e" paused={paused} label="Image generation preview" />}
      {shownPhase === 'resolving' && <div className="loader-completion-tiles" aria-hidden="true" onAnimationEnd={event => { if (event.target.dataset.last === 'true') setPhase('loaded'); }}>
        {Array.from({ length: 16 }, (_, index) => {
          const x = index % 4, y = Math.floor(index / 4);
          const ring = Math.abs(x - 1.5) + Math.abs(y - 1.5) - 1;
          return <i key={index} data-last={index === 0} style={{ backgroundPosition: `${x * 100 / 3}% ${y * 100 / 3}%`, animationDelay: `${ring * .168}s` }} />;
        })}
      </div>}
      <img src="/project-captures/loaders-result.png" alt={shownPhase === 'loaded' ? 'Completed gallery image of an olive tree beside a stone house and pool' : ''} style={{ visibility: shownPhase === 'loaded' ? 'visible' : 'hidden' }} />
    </div>
    <footer><button type="button" disabled={stopped} aria-disabled={shownPhase === 'resolving'} onClick={() => { if (shownPhase !== 'resolving') setPhase(phase === 'loaded' ? 'loading' : 'resolving'); }}>{shownPhase === 'loaded' ? 'Replay loading' : 'Reveal image'}</button></footer>
  </section>;
}

export default function LoadersBento({ paused: pagePaused = false }) {
  const reducedMotion = useReducedMotion();
  const host = useRef(null);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState('typewriter');
  const [received, setReceived] = useState(0);
  const [replay, setReplay] = useState(0);
  const stopped = pagePaused || !!reducedMotion || !visible;
  const restart = () => { setReceived(0); setReplay(value => value + 1); };
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .05 });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (stopped || received >= words.length) return;
    const timer = setTimeout(() => setReceived(value => value + 1), 380);
    return () => clearTimeout(timer);
  }, [stopped, received, replay]);
  const text = reducedMotion ? sample : words.slice(0, received).join(' ');
  return <section ref={host} className="loaders-bento" aria-label="Live Generative Loaders examples">
      <Decision id="loaders-streaming" title="Experimenting with streaming text" demo={<section className="loader-demo loader-demo-text" aria-labelledby="text-demo-title">
        <header><h3 id="text-demo-title">Text streaming</h3></header>
        <div className="loader-text-stage" aria-hidden="true"><TextLoader key={`${variant}-${replay}`} text={text} variant={variant} paused={stopped} color="#20201e" /></div>
        <p className="loader-accessible-sample">{sample}</p>
        <footer><div className="loader-variant-control" role="group" aria-label="Text effect">{textVariants.map(value => <button type="button" key={value} aria-pressed={variant === value} onClick={() => { setVariant(value); restart(); }}>{title(value)}</button>)}</div><button type="button" onClick={restart} disabled={stopped}>Replay <span aria-hidden="true">↻</span></button></footer>
      </section>}>
        <p>I started with a prototype called Progress Narrative that showed what an agent was doing, like searching or drafting a response. As I worked on it, I moved toward smaller components that developers could use for text, activity indicators, and images.</p>
        <p>With text, I wanted to try different ways for the words to appear without making the response harder to read. I kept the text already on screen still and animated only the new words. You can replay the same sentence here to compare the effects.</p>
      </Decision>
      <Decision id="loaders-activity" title="Showing that something is happening" demo={<section className="loader-demo loader-demo-inline" aria-labelledby="inline-demo-title">
        <header><h3 id="inline-demo-title">Inline activity</h3></header>
        <ul>{inlineExamples.map(([name, label]) => <li key={name}><InlineLoader variant={name} size={22} paused={stopped} /><span>{label}</span><small>{title(name)}</small></li>)}</ul>
      </section>}>
        <p>Sometimes there is nothing to show yet. I made smaller loaders for that part of the wait, so they could sit beside a message or inside a button.</p>
        <p>The message explains what is happening, and the animation shows that work is still going on. I kept these separate from the text effects, but gave developers the same basic controls for speed, color, and pausing.</p>
      </Decision>
      <Decision id="loaders-images" title="Going from a loader to an image" demo={<ImageHandoff stopped={stopped} reducedMotion={reducedMotion} />}>
        <p>Image loaders were especially fun to explore. At first, the demos just looped while you waited. I wanted to see the whole interaction, including what happened when the image was ready.</p>
        <p>I added a reveal for each loader and kept adjusting the timing and movement. For Shutter, that meant lining up the moving panels with the finished image. Try “Reveal image” here to see how the tiles come together. This demo simulates the image being ready.</p>
      </Decision>
      <Decision id="loaders-release" title="Shipping my first npm library">
        <p>I had never built an npm library before. I designed, built, and shipped Generative Loaders independently with Codex, then added documentation and code examples so other developers could use it.</p>
        <p>The gallery has two views: one for browsing the loaders and another for trying them in examples like chat. I also worked through reduced-motion support, screen reader labels, and server rendering so the components would work beyond the demo.</p>
        <a href={feature.post} target="_blank" rel="noopener noreferrer"><SoftLiftText>Watch the OpenAI Developers feature</SoftLiftText></a>
      </Decision>
      <LoadersExampleGallery paused={pagePaused} />
  </section>;
}
