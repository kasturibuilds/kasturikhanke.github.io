/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { BarChart, LineChart, createTheme } from 'generative-charts';
import { InlineLoader, TextLoader } from 'generative-loaders';
import 'generative-loaders/styles.css';
import './GenerativeUseCases.css';
import ImageCompletion from './ImageCompletion';
import CaseStudyFeature from './CaseStudyFeature';
import { FiPause, FiPlay, FiRotateCcw } from 'react-icons/fi';

// Fictional subscription business; never presented as customer results.
const reports = {
  q1: {
    dates: 'Jan 1 – Mar 31, 2026',
    weeks: ['Jan 5', 'Jan 12', 'Jan 19', 'Jan 26', 'Feb 2', 'Feb 9', 'Feb 16', 'Feb 23', 'Mar 2', 'Mar 9', 'Mar 16', 'Mar 23', 'Mar 30'],
    revenue: [3850, 4210, 3980, 4620, 4350, 4180, 4890, 4520, 5100, 4760, 5240, 4980, 5370],
    channels: [{channel: 'Organic', customers: 94}, {channel: 'Referral', customers: 68}, {channel: 'Direct', customers: 51}, {channel: 'Paid ads', customers: 37}],
  },
  q2: {
    dates: 'Apr 1 – Jun 30, 2026',
    weeks: ['Apr 6', 'Apr 13', 'Apr 20', 'Apr 27', 'May 4', 'May 11', 'May 18', 'May 25', 'Jun 1', 'Jun 8', 'Jun 15', 'Jun 22', 'Jun 29'],
    revenue: [5120, 5480, 5290, 5840, 5610, 5220, 4980, 5560, 6040, 5780, 6320, 6090, 6510],
    channels: [{channel: 'Organic', customers: 112}, {channel: 'Referral', customers: 87}, {channel: 'Direct', customers: 58}, {channel: 'Paid ads', customers: 34}],
  },
};
const reportTheme = createTheme('airform', {
  id: 'subscription-report',
  light: {background: '#ffffff', border: 'transparent', shadow: 'none', radius: 0,
    palette: ['#5369b8'], text: '#20242d', textMuted: '#626975', grid: '#e9ebef',
    pointHalo: 'transparent', lineUnderlay: 'transparent', fontFamily: 'inherit'},
});
const dollars = value => new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0}).format(value);
const compactDollars = value => `$${(value / 1000).toLocaleString('en-US', {maximumFractionDigits: 1})}k`;

export function ChartsUseCase() {
  const [period, setPeriod] = useState('q2');
  const report = reports[period];
  const rows = report.weeks.map((week, index) => ({week, revenue: report.revenue[index]}));
  const total = report.revenue.reduce((sum, value) => sum + value, 0);
  const customers = report.channels.reduce((sum, row) => sum + row.customers, 0);
  return <section id="in-use" className="py-10 md:py-14 scroll-mt-28" aria-labelledby="charts-use-title">
    <h2 id="charts-use-title" className="text-xl md:text-2xl font-medium mb-4">In use: subscription analytics</h2>
    <p className="text-base md:text-lg leading-relaxed text-gray-600 max-w-3xl mb-8">Track subscription payments and the channels bringing in paying customers. Switch quarters to explore the report.</p>
    <div className="subscription-report">
      <header className="report-toolbar">
        <div><h3>Subscriptions</h3><p>{report.dates}</p></div>
        <div className="report-periods" role="group" aria-label="Report quarter">
          {[['q1', 'Q1 2026'], ['q2', 'Q2 2026']].map(([value, label]) => <button key={value} type="button" aria-pressed={period === value} onClick={() => setPeriod(value)}>{label}</button>)}
        </div>
      </header>
      <dl className="report-metrics" aria-live="polite" aria-atomic="true">
        <div><dt>Collected revenue</dt><dd>{dollars(total)}</dd></div>
        <div><dt>New paying customers</dt><dd>{customers}</dd></div>
        <div><dt>Top acquisition channel</dt><dd>Organic <span>{Math.round(report.channels[0].customers / customers * 100)}%</span></dd></div>
      </dl>
      <div className="report-charts">
        <LineChart theme={reportTheme} appearance="light" title="Revenue collected" figureLabel="" description="Weekly subscription payments · USD" data={rows} xKey="week" series={[{dataKey:'revenue',label:'Revenue'}]} height={280} curve="linear" showPoints showLegend={false} showTooltip animate={false} valueFormatter={compactDollars} getDatumLabel={(row, label, value) => `${row.week}: ${dollars(value)}`} />
        <BarChart theme={reportTheme} appearance="light" title="New customers by channel" figureLabel="" description="First paid subscription · attributed to first visit" data={report.channels} variant="horizontal" categoryKey="channel" series={[{dataKey:'customers',label:'Customers'}]} height={280} showLegend={false} showTooltip animate={false} />
      </div>
    </div>
  </section>;
}

const answer = 'A slower kind of weekend. Escape to Mallorca for two days of good food, quiet mornings, and time outside. Our new retreat brings a small group together in a stone house among olive trees, with space to do as much or as little as you like. Come settle in. Your weekend can wait.';
const words = answer.split(' ');
const prompts = {
  writing: 'Write a short launch email for a weekend retreat in Mallorca. Keep it warm and understated.',
  image: 'Create a photo for the retreat: a quiet stone house in Mallorca, an olive tree beside a pool, soft morning light. No text.',
};

function useDemoActivity() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    let visible = false;
    const update = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(ref.current);
    document.addEventListener('visibilitychange', update);
    return () => {observer.disconnect();document.removeEventListener('visibilitychange', update);};
  }, []);
  return [ref, active];
}

// Preset requests and results demonstrate the library; no AI request is made.
export function LoadersUseCase({ embedded = false }) {
  const [host, active] = useDemoActivity();
  const reduced = useReducedMotion();
  const [mode, setMode] = useState('writing');
  const [phase, setPhase] = useState('idle');
  const [count, setCount] = useState(0);
  const imageTurn = useRef(null);
  const [imageReady, setImageReady] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const busy = phase === 'thinking' || phase === 'streaming';
  const shownText = words.slice(0, count).join(' ');

  useEffect(() => {
    if (!active || !busy) return;
    if (mode === 'image' && (!imageReady || imageFailed)) return;
    const timer = setTimeout(() => {
      if (reduced || mode === 'image') {setCount(words.length);setPhase('done');}
      else if (phase === 'thinking') setPhase('streaming');
      else if (count < words.length) setCount(count + 1);
      else setPhase('done');
    }, reduced ? 0 : mode === 'image' ? 3000 : phase === 'thinking' ? 1000 : 55);
    return () => clearTimeout(timer);
  }, [active, reduced, phase, count, busy, mode, imageReady, imageFailed]);

  const start = () => {setCount(0);setPhase('thinking');};
  const sendImagePrompt = () => {setMode('image');setPhase(imageFailed ? 'stopped' : 'thinking');};
  const replay = () => {setMode('writing');setCount(0);setPhase('idle');};
  useEffect(() => {
    if (mode === 'image' && imageTurn.current) {
      const thread = imageTurn.current.parentElement;
      thread.scrollTop = thread.scrollHeight;
    }
  }, [mode]);
  const status = phase === 'done' ? (mode === 'writing' ? `Response ready. ${answer}` : 'Image ready.') : phase === 'stopped' ? 'Generation stopped.' : phase === 'thinking' ? (mode === 'image' ? 'Creating image.' : 'Drafting the email.') : phase === 'streaming' ? 'Writing the response.' : '';

  return <section ref={host} id="in-use" className={embedded ? "min-w-0 scroll-mt-28 loader-chat-embedded" : "py-10 md:py-14 scroll-mt-28"} aria-labelledby="loaders-use-title">
    <h2 id="loaders-use-title" className={embedded ? "sr-only" : "text-xl md:text-2xl font-medium mb-4"}>In use: a conversation with AI</h2>
    <p className={embedded ? "sr-only" : "text-base md:text-lg leading-relaxed text-gray-600 max-w-3xl mb-8"}>A prompt, a moment of waiting, then a response in the same conversation. Write an email, then create an image to see how the loaders fit into a chat workflow.</p>
    <div className="loader-chat">
      <header className="loader-chat-toolbar">
        <span>Weekend in Mallorca</span>
      </header>
      <div className="loader-chat-thread" aria-label="Example conversation">
        {phase === 'idle' ? <div className="loader-chat-empty"><h3>Draft a launch email</h3><p>Send the example prompt to try it.</p></div> : <>
          <p className="loader-chat-user">{prompts.writing}</p>
          <div className="loader-chat-assistant">
            {mode === 'writing' && phase === 'thinking' && <div className="loader-chat-status"><InlineLoader variant="orbit" size={20} color="#6b7280" paused={!active || !!reduced} /><span>Drafting your email</span></div>}
            {mode === 'writing' && phase === 'streaming' && <div aria-hidden="true"><TextLoader text={shownText} variant="cascade" paused={!active || !!reduced} color="#111827" /></div>}
            {(mode === 'image' || phase === 'done') && <p>{answer}</p>}
            {mode === 'writing' && phase === 'stopped' && <p>{shownText || 'Response stopped.'}</p>}
          </div>
          {mode === 'image' && <div ref={imageTurn} className="loader-chat-image-turn">
            <p className="loader-chat-user">{prompts.image}</p>
            <div className="loader-chat-assistant">
              <p className="loader-chat-status">{imageFailed ? 'The example image could not load.' : phase === 'done' ? 'Image created' : phase === 'stopped' ? 'Image creation stopped' : 'Creating image'}</p>
              {!imageFailed && phase !== 'stopped' && <div className="loader-chat-image">
                <ImageCompletion variant="tiles" complete={phase === 'done'} paused={!active} label="Creating the retreat image" />
              </div>}
            </div>
          </div>}
        </>}
      </div>
      <div className="loader-chat-composer">
        {phase === 'idle' && <p>{prompts.writing}</p>}
        {mode === 'writing' && phase === 'done' && <p>{prompts.image}</p>}
        <div className="loader-chat-compose-actions">
          {busy ? <button type="button" onClick={()=>setPhase('stopped')}>Stop generating</button>
            : mode === 'writing' && phase === 'done' ? <button type="button" onClick={sendImagePrompt}>Send image prompt</button>
            : <button type="button" onClick={phase === 'idle' ? start : replay}>{phase === 'idle' ? 'Send prompt' : 'Replay'}</button>}
        </div>
      </div>
      <p className="sr-only" role="status">{status}</p>
      <img className="hidden" src="/project-captures/loaders-result.png" alt="" onLoad={()=>setImageReady(true)} onError={()=>{setImageFailed(true);if(mode === 'image') setPhase('stopped');}} />
    </div>
    <p className="use-case-note">Live Generative Loaders components with preset responses.</p>
  </section>;
}

const streamSample = 'Ideas arrive quietly, then become something worth sharing.';
const streamWords = streamSample.split(' ');
const streamEffects = [
  ['decode', 'Decode'], ['typewriter', 'Typewriter'], ['cascade', 'Cascade'],
  ['focus', 'Focus'], ['wipe', 'Wipe'], ['flip', 'Flip'],
];

const activityEffects = [['chomp', 'Chomp'], ['snake', 'Snake'], ['orbit', 'Orbit'], ['matrix', 'Matrix'], ['ripple', 'Ripple'], ['fold', 'Fold']];
const imageEffects = [['tiles', 'Tiles'], ['bands', 'Bands'], ['scan', 'Scan'], ['pixel-grid', 'Pixel grid'], ['resolution', 'Resolution'], ['shutter', 'Shutter']];

export function LoaderExamples({ kind = 'text', id, title, children }) {
  const [host, active] = useDemoActivity();
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [count, setCount] = useState(1);
  const [replay, setReplay] = useState(0);
  const [complete, setComplete] = useState(false);
  const effects = kind === 'text' ? streamEffects : kind === 'activity' ? activityEffects : imageEffects;
  const name = kind === 'text' ? 'streams' : kind === 'activity' ? 'loaders' : 'images';
  const playing = active && !paused && !reduced;
  useEffect(() => {
    if (!playing || kind !== 'text') return;
    const timer = setTimeout(() => setCount(value => value >= streamWords.length ? 1 : value + 1), count >= streamWords.length ? 2600 : 340);
    return () => clearTimeout(timer);
  }, [playing, count, replay, kind]);
  const text = reduced ? streamSample : streamWords.slice(0, count).join(' ');
  const iconButtonClass = 'inline-flex h-11 w-11 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900';
  const controls = <div className="flex flex-wrap items-center gap-2" role="group" aria-label={`${title} playback`}>
    <button type="button" className={iconButtonClass} aria-label={`Replay ${name}`} title={`Replay ${name}`} onClick={() => {setCount(1); setReplay(value => value + 1); setPaused(false); setComplete(false);}}><FiRotateCcw size={20} aria-hidden="true" /></button>
    {!reduced && <button type="button" className={iconButtonClass} aria-label={`${paused ? 'Resume' : 'Pause'} ${name}`} title={`${paused ? 'Resume' : 'Pause'} ${name}`} onClick={() => setPaused(value => !value)}>{paused ? <FiPlay size={20} aria-hidden="true" /> : <FiPause size={20} aria-hidden="true" />}</button>}
    {kind === 'image' && <button type="button" className="px-2 py-3 text-sm underline underline-offset-4" onClick={() => setComplete(value => !value)}>{complete ? 'Show loading' : 'Show completed images'}</button>}
  </div>;
  const media = <div ref={host} className="min-w-0" role="group" aria-label={`Six ${kind === 'text' ? 'streaming text' : kind === 'activity' ? 'inline activity' : 'image loading'} effects`}>
    {kind === 'text' && <p className="sr-only">Each effect streams the same sample: {streamSample}</p>}
    <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-3">
      {effects.map(([variant, label]) => <figure key={variant} className="min-w-0 rounded-xl border border-gray-200 bg-gray-50 p-4">
        <figcaption className="text-xs font-medium text-gray-500 mb-4">{label}</figcaption>
        {kind === 'text' ? <div className="min-h-[184px] sm:min-h-[144px] text-base leading-relaxed text-gray-900" aria-hidden="true">
          <TextLoader key={replay} variant={variant} text={text} color="#111827" paused={!playing} />
        </div> : kind === 'activity' ? <div className="flex min-h-[112px] flex-col items-center justify-center gap-4">
          <InlineLoader key={replay} variant={variant} size={32} color="#111827" paused={!playing} />
          <span className="text-sm text-gray-600">Thinking</span>
        </div> : <ImageCompletion key={replay} variant={variant} complete={complete} paused={!active || paused} label={`${label}: creating image`} />}
      </figure>)}
    </div>
  </div>;
  return <CaseStudyFeature id={id} title={title} media={media}>{children}{controls}</CaseStudyFeature>;
}
