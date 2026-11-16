import ProjectNavigation from './ProjectNavigation';
import SiteHeader from './SiteHeader';
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BarChart, LineChart } from 'generative-charts';
import 'generative-charts/styles.css';
import SiteFooter from './SiteFooter';
import CaseStudyFeature from './CaseStudyFeature';
import PortfolioVideo from './PortfolioVideo';
import { ChartsUseCase, LoadersUseCase, LoaderExamples } from './GenerativeUseCases';
import { generativeStories } from './generativeStories';

const bodyClass = 'text-base md:text-lg leading-relaxed text-gray-600';
const linkClass = 'underline underline-offset-4 hover:text-indigo-600';
const sample = [{ day: 'Mon', value: 0 }, { day: 'Tue', value: 40 }, { day: 'Wed', value: null }, { day: 'Thu', value: 36 }, { day: 'Fri', value: 48 }];

function MissingDataDemo() {
  const [strategy, setStrategy] = useState('gap');
  return <div className="min-w-0">
    <div className="flex flex-wrap gap-3 mb-6" role="group" aria-label="Missing data treatment">
      {[['gap', 'Preserve the gap'], ['zero', 'Fill with zero']].map(([value, label]) => <button key={value} type="button" aria-pressed={strategy === value} onClick={() => setStrategy(value)} className={`rounded-full border px-4 py-3 text-sm ${strategy === value ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-700'}`}>{label}</button>)}
    </div>
    <LineChart data={sample} xKey="day" series={[{dataKey:'value',label:'Measurement'}]} theme="mono-editorial" appearance="light" height={280} curve="linear" showPoints showLegend={false} animate={false} missingValueStrategy={strategy} title="Wednesday has no measurement" ariaLabel="Illustrative measurements: Monday zero, Tuesday 40, Wednesday missing, Thursday 36, Friday 48" />
    <p className="text-sm text-gray-500 mt-4" role="status">{strategy === 'gap' ? 'Monday is a measured zero. Wednesday is a gap because no measurement exists.' : 'Filling the gap draws a drop to zero on Wednesday, even though no value was measured.'}</p>
  </div>;
}

function ThemeComparison({themes}) {
  const data = [{month:'Jan', value:24}, {month:'Feb', value:38}, {month:'Mar', value:31}, {month:'Apr', value:52}];
  return <div className="mt-10">
    <p className="text-sm text-gray-500 mb-6">The same sample data, expressed through three identities.</p>
    <div className="grid lg:grid-cols-3 gap-8">
      {themes.map(theme => <figure key={theme.id} className="min-w-0">
        <BarChart theme={theme.id} appearance="light" data={data} categoryKey="month" series={[{dataKey:'value',label:'Sample value'}]} height={280} animate={false} showLegend={false} showTooltip figureLabel="" ariaLabel={`Sample values in ${theme.name}: January 24, February 38, March 31, April 52`} />
        <figcaption className="mt-5"><h3 className="text-lg font-medium mb-2">{theme.name}</h3><p className="text-base leading-relaxed text-gray-600">{theme.description}</p></figcaption>
      </figure>)}
    </div>
  </div>;
}

function StoryVideo({video, poster, alt, caption, videoWidth, videoHeight}) {
  return <figure className="w-full min-w-0 space-y-4">
    <PortfolioVideo src={video} poster={poster} width={videoWidth} height={videoHeight} aria-label={alt} autoPlay controls={false} loop muted playsInline className="block w-full h-auto object-contain rounded-lg" />
    {caption && <figcaption className="w-full text-center text-sm leading-relaxed text-gray-500">{caption}</figcaption>}
  </figure>;
}

export default function GenerativeCaseStudy({project}) {
  const story = generativeStories[project];
  const { hash } = useLocation();
  useEffect(() => {
    document.title = `${story.title} — Kasturi Khanke`;
    let id = '';
    try { id = decodeURIComponent(hash.slice(1)); } catch { /* Ignore malformed fragments. */ }
    if (id) document.getElementById(id)?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [story.title, hash]);

  return <div className="min-h-screen bg-white text-gray-900 font-sans">
    <a href="#case-story" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-white focus:p-4">Skip to case study</a>
      <SiteHeader />
    <main id="case-story" className="case-study-main container mx-auto px-8 sm:px-6 max-w-4xl" tabIndex={-1}>
      <section className="case-study-intro mb-12 md:mb-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight text-gray-900 mb-3 md:mb-4">{story.title}</h1>
        <p className="max-w-4xl text-base sm:text-lg md:text-xl leading-relaxed mb-6 md:mb-8 text-gray-600">{story.intro}</p>
        <dl className="grid max-w-4xl grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-sm mb-8">
          {story.details.map(([label, value]) => <div key={label}><dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">{label}</dt><dd>{value}</dd></div>)}
        </dl>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm mb-10">
          <a className={linkClass} href={story.website} target="_blank" rel="noopener noreferrer">Explore {story.title}</a>
          <a className={linkClass} href={`${story.website}/docs`} target="_blank" rel="noopener noreferrer">Documentation</a>
          <a className={linkClass} href={story.repo} target="_blank" rel="noopener noreferrer">Source on GitHub</a>
        </div>
        <PortfolioVideo key={project} src={story.video} poster={story.poster} className="block w-full aspect-video object-contain" aria-label={`${story.title} product walkthrough`} autoPlay controls={false} loop muted playsInline />
      </section>
      <CaseStudyFeature id="outcome" title="Impact">
        {story.metrics && <dl className="grid grid-cols-2 gap-6 mb-8">{story.metrics.map(([value,label]) => <div key={label}><dt className="text-sm text-gray-500 mb-2">{label}</dt><dd className="text-3xl sm:text-4xl font-medium">{value}</dd></div>)}</dl>}
        <p className={bodyClass}>{story.outcome}</p>
        {story.feature && <a className={`${linkClass} inline-block mt-6`} href={story.feature.href} target="_blank" rel="noopener noreferrer">{story.feature.label}</a>}
      </CaseStudyFeature>
      <CaseStudyFeature id="context" title="Context">
        <p className={`${bodyClass} max-w-3xl`}>{story.context}</p>
      </CaseStudyFeature>
      {story.sections.map(section => section.loaderDemo && section.loaderDemo !== 'chat' ? <LoaderExamples key={section.id} id={section.id} title={section.title} kind={section.loaderDemo}>
        {section.paragraphs.map(p => <p className={bodyClass} key={p}>{p}</p>)}
      </LoaderExamples> : <CaseStudyFeature
        key={section.id}
        id={section.id}
        title={section.title}
        media={section.loaderDemo === 'chat' ? <LoadersUseCase embedded /> : section.video ? <StoryVideo {...section} /> : section.missingData ? <MissingDataDemo /> : null}
        after={section.themes && <ThemeComparison themes={section.themes} />}
      >
        {section.paragraphs.map(p => <p className={bodyClass} key={p}>{p}</p>)}
      </CaseStudyFeature>)}
      {project === 'charts' && <ChartsUseCase />}
      <ProjectNavigation currentPath={`/generative-${project}`} />
    </main>
    <SiteFooter />
  </div>;
}
