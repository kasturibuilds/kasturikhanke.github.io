import { useState } from 'react';
import { ChartsExampleGallery } from './ProjectExampleGalleries';
import { BarChart, LineChart, PieChart, TerrainChart, themeList } from 'generative-charts';
import 'generative-charts/styles.css';
import { sampleData, terrainData } from './chartBentoData';
import './ChartsBento.css';
import { CaseStudySection as Decision } from './CaseStudyLayout';

// Narrative evidence: Generativecharts/DESIGN.md, CHANGELOG.md and RELEASE_READINESS.md.
// Gallery datasets illustrate rendering; they are not project performance metrics.
const revenueSeries = [{ dataKey: 'revenue', label: 'Revenue' }];
const composition = [
  { name: 'Direct', value: 38 }, { name: 'Search', value: 28 },
  { name: 'Referral', value: 22 }, { name: 'Other', value: 12 },
];
// Monday is an observed zero. Wednesday has no measurement.
const missingData = [
  { day: 'Mon', value: 0 }, { day: 'Tue', value: 40 },
  { day: 'Wed', value: null }, { day: 'Thu', value: 36 }, { day: 'Fri', value: 48 },
];
const base = { figureLabel: '', animate: false, showLegend: false, showTooltip: true };
const money = value => `$${value}k`;

export default function ChartsBento() {
  const [appearance, setAppearance] = useState('light');
  const [missing, setMissing] = useState('gap');
  return <section className="charts-bento" aria-label="Generative Charts design story">
    <Decision id="charts-themes" stacked demoFirst title="Turning the experiments into a library" demo={<>
      <div className="charts-comparison-toolbar">
        <p>The same data in each theme</p>
        <div className="charts-options" role="group" aria-label="Theme comparison appearance">
          {['light', 'dark'].map(mode => <button type="button" key={mode} aria-pressed={appearance === mode} onClick={() => setAppearance(mode)}>{mode === 'light' ? 'Light' : 'Dark'}</button>)}
        </div>
      </div>
      <div className="charts-theme-comparison">
        {themeList.map(theme => <figure key={theme.id}>
          <BarChart {...base} theme={theme.id} appearance={appearance} height={250} data={sampleData} categoryKey="label" series={revenueSeries} ariaLabel={`Monthly revenue in ${theme.name}`} valueFormatter={money} />
          <figcaption><h3>{theme.name}</h3></figcaption>
        </figure>)}
      </div>
    </>}>
      <p>I started by experimenting with how charts could look. When I turned those experiments into React components, the themes began to look too similar. Most of the differences came down to color, rounded corners, and shadows.</p>
      <p>I went back to the original designs and worked on how the charts were drawn, from the outlines of the bars to the depth of the surfaces. I wanted each theme to feel different while keeping the data just as easy to read.</p>
    </Decision>

    <Decision id="charts-mono" title="Working in black and white" demo={<PieChart {...base} theme="mono-editorial" appearance="light" title="Acquisition mix" height={320} data={composition} nameKey="name" valueKey="value" variant="extruded" ariaLabel="Acquisition mix in Mono Editorial" valueFormatter={value => `${value}%`} />}>
      <p>Mono Editorial was one of the harder themes to get right. With no color to separate the data, I had to pay more attention to line weight, patterns, and where the labels sat.</p>
      <p>I also kept finding too many boxes around the charts. The gallery card, preview, and chart each had their own frame. I removed the extra borders and backgrounds so the chart and its labels could stand on their own.</p>
    </Decision>

    <Decision id="charts-system" stacked title="Making the charts easier to use" demo={<div className="charts-figure-pair">
      <LineChart {...base} theme="neon-instruments" appearance="dark" title="Revenue momentum" height={310} data={sampleData} xKey="label" series={[...revenueSeries, { dataKey: 'target', label: 'Target' }]} curve="smooth" showPoints showLegend valueFormatter={money} />
      <TerrainChart {...base} theme="airform" appearance="light" title="Signal terrain" height={310} data={terrainData} xKey="x" zKey="z" valueKey="elevation" showPointCloud showWireframe valueFormatter={value => `${value}m`} />
    </div>}>
      <p>I wanted developers to be able to add their data and get a chart they could use. They should not have to adjust every margin, label, or color first. I built those decisions into the components and kept the options focused on choices like chart type and theme.</p>
      <p>That meant working through the less visible details too: showing related values together in a tooltip, supporting keyboard and touch, and adjusting labels and spacing for smaller screens. You can try the components below.</p>
    </Decision>

    <Decision id="charts-integrity" title="Handling missing data" demo={<div className="charts-integrity-demo">
      <div className="charts-options" role="group" aria-label="Missing measurement handling">
        <button type="button" aria-pressed={missing === 'zero'} onClick={() => setMissing('zero')}>Fill with zero</button>
        <button type="button" aria-pressed={missing === 'gap'} onClick={() => setMissing('gap')}>Preserve the gap</button>
      </div>
      <LineChart {...base} theme="mono-editorial" appearance="light" title="Wednesday has no data" height={235} data={missingData} xKey="day" series={[{ dataKey: 'value', label: 'Measurement' }]} missingValueStrategy={missing} curve="linear" showPoints valueFormatter={String} />
      <p className="charts-demo-caption" role="status">{missing === 'gap' ? 'The gap shows that Wednesday has no measurement.' : 'The line drops to zero even though nothing was measured on Wednesday.'}</p>
    </div>}>
      <p>The first version treated missing measurements as zero. That could make a line drop even when there was no measurement to support it. I changed the default to leave a gap and made filling it with zero an explicit option.</p>
      <p>In this example, Monday was measured as zero, but Wednesday was not measured at all. Try switching between the two options to see how that changes the chart.</p>
    </Decision>

    <Decision id="charts-release" title="What I shipped">
      <p>I designed, built, and launched Generative Charts independently in September 2026. I published the React package along with a gallery where developers can try the charts and documentation for using them in their own projects.</p>
      <p>Launch checks included 302 browser checks, 44 unit tests, and installation checks with React 18 and 19. I also reviewed the charts across themes, light and dark modes, and screen sizes.</p>
    </Decision>
    <ChartsExampleGallery />
  </section>;
}
