/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { TextLoader, InlineLoader, ImageLoader } from 'generative-loaders';
import { AreaChart, ScatterChart, RadarChart, HeatmapChart, FunnelChart, PieChart } from 'generative-charts';
import { CaseStudySection } from './CaseStudyLayout';
import { sampleData, heatData } from './chartBentoData';
import './ProjectExampleGalleries.css';

function Gallery({ id, children }) {
  return <CaseStudySection id={id} title="More examples" stacked demo={<div className="example-gallery">{children}</div>} />;
}

const textVariants = ['focus', 'flip', 'redact', 'terminal', 'slice', 'fragments'];
const inlineVariants = ['rotor', 'pixel-drift', 'chomp', 'fold', 'gravity', 'domino'];
const imageVariants = ['bands', 'scan', 'pixel-grid', 'resolution', 'focus', 'shutter'];
const label = value => value.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
const exampleText = 'Finding a new way to say it.';

function LoaderExample({ kind, variant, paused, reducedMotion }) {
  const host = useRef(null);
  const [visible, setVisible] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  const stopped = paused || !visible;
  useEffect(() => {
    if (kind !== 'image' || !imageReady || complete) return;
    if (reducedMotion) { setComplete(true); return; }
    if (stopped) return;
    const timer = setTimeout(() => setComplete(true), 2000);
    return () => clearTimeout(timer);
  }, [kind, imageReady, complete, reducedMotion, stopped]);
  return <figure ref={host} className={`example-loader example-loader-${kind}`}>
    <div className="example-loader-stage" aria-hidden={kind !== 'image' ? true : undefined}>
      {kind === 'text' && <TextLoader text={exampleText} variant={variant} paused={stopped} color="#262626" />}
      {kind === 'inline' && <InlineLoader variant={variant} size={40} paused={stopped} color="#262626" />}
      {kind === 'image' && <div className="example-image-preview">
        <img src="/project-captures/loaders-result.png" alt={complete ? 'Olive tree beside a stone house and pool' : ''} loading="lazy" onLoad={() => setImageReady(true)} onError={() => setImageFailed(true)} style={{ visibility: complete ? 'visible' : 'hidden' }} />
        {!complete && !imageFailed && <div aria-hidden="true"><ImageLoader variant={variant} size="100%" radius={8} paused={stopped} color="#262626" /></div>}
        {imageFailed && <p role="status">Image unavailable.</p>}
      </div>}
    </div>
    <figcaption><span>{label(variant)}</span>{kind === 'image' && <button type="button" aria-label={`Replay ${label(variant)} image loading`} disabled={!complete || reducedMotion} onClick={() => setComplete(false)}>Replay</button>}</figcaption>
  </figure>;
}

export function LoadersExampleGallery({ paused: pagePaused = false }) {
  const reducedMotion = useReducedMotion();
  const [pageHidden, setPageHidden] = useState(document.hidden);
  useEffect(() => {
    const updateVisibility = () => setPageHidden(document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);
  const stopped = pagePaused || pageHidden || !!reducedMotion;
  return <Gallery id="loaders-gallery">
    {[['text', 'Text', textVariants], ['inline', 'Inline', inlineVariants], ['image', 'Images', imageVariants]].map(([kind, heading, variants]) => <section className="example-gallery-group" key={kind} aria-labelledby={`gallery-${kind}-title`}>
      <h3 id={`gallery-${kind}-title`}>{heading}</h3>
      {kind === 'text' && <p className="loader-accessible-sample">Each text example reads: {exampleText}</p>}
      <div className="example-gallery-grid example-gallery-loaders">{variants.map(variant => <LoaderExample key={variant} kind={kind} variant={variant} paused={stopped} reducedMotion={!!reducedMotion} />)}</div>
    </section>)}
  </Gallery>;
}

// Illustrative datasets from the original Generative Charts gallery.
const radarData = [{ metric: 'Speed', current: 84, previous: 65 }, { metric: 'Clarity', current: 74, previous: 79 }, { metric: 'Trust', current: 92, previous: 70 }, { metric: 'Reach', current: 67, previous: 58 }, { metric: 'Value', current: 88, previous: 76 }];
const funnelData = [{ stage: 'Visited', value: 1180 }, { stage: 'Signed up', value: 790 }, { stage: 'Activated', value: 460 }, { stage: 'Paid', value: 250 }];
const composition = [{ name: 'Assistly', value: 14 }, { name: 'Atlas AI', value: 15 }, { name: 'Nova Chat', value: 16 }, { name: 'Draft Lab', value: 12 }, { name: 'Signal OS', value: 21 }, { name: 'Other', value: 22 }];
const chartProps = { figureLabel: '', height: 280, animate: false, showLegend: false, showTooltip: true };

export function ChartsExampleGallery() {
  return <Gallery id="charts-gallery">
    <div className="example-gallery-actions"><p>Sample data from the chart gallery</p><a href="https://generativecharts.com" target="_blank" rel="noopener noreferrer">View all charts</a></div>
    <div className="example-gallery-grid example-gallery-charts">
      <AreaChart {...chartProps} title="Area" theme="airform" data={sampleData} xKey="label" series={[{ dataKey: 'revenue', label: 'Revenue' }]} valueFormatter={value => `$${value}k`} />
      <PieChart {...chartProps} title="Donut" theme="neon-instruments" appearance="dark" data={composition} nameKey="name" valueKey="value" variant="donut" centerLabel="100%" valueFormatter={value => `${value}%`} />
      <RadarChart {...chartProps} showLegend title="Radar" theme="mono-editorial" data={radarData} categoryKey="metric" series={[{ dataKey: 'current', label: 'Current' }, { dataKey: 'previous', label: 'Previous' }]} />
      <HeatmapChart {...chartProps} title="Heatmap" theme="neon-instruments" data={heatData} xKey="time" yKey="day" valueKey="value" />
      <ScatterChart {...chartProps} title="Scatter" theme="airform" appearance="dark" data={sampleData} xKey="users" sizeKey="size" series={[{ dataKey: 'revenue', label: 'Revenue' }]} />
      <FunnelChart {...chartProps} title="Funnel" theme="mono-editorial" data={funnelData} stageKey="stage" valueKey="value" />
    </div>
  </Gallery>;
}
