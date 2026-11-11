import { useReducedMotion } from 'framer-motion';
import { LoaderPreview } from './AnimatedProjectPreviews';
import line from './generated/mono-line.html?raw';
import bar from './generated/mono-bar.html?raw';
import donut from './generated/mono-donut.html?raw';
import './generated/chart-preview.css';
import './GenerativeBentos.css';

const loaders = ['Matrix', 'Orbit', 'Ripple', 'Signal', 'Glyph', 'Spark'];

export default function GenerativeBentos() {
  const reducedMotion = useReducedMotion();

  return <div className="generative-studies" id="things">
    <section className="study-section" aria-labelledby="loaders-heading" data-motion-paused={reducedMotion}>
      <header className="study-heading">
        <div><h2 id="loaders-heading"><a href="https://generativeloaders.com" target="_blank" rel="noopener noreferrer">Generative Loaders</a></h2></div>
      </header>
      <div className="loader-bento">
        {loaders.map((name) => <figure className={`loader-tile loader-tile-${name.toLowerCase()}`} key={name}>
          <div className="loader-stage" aria-hidden="true">
            {name === 'Matrix' ? <LoaderPreview /> : <span className={`study-loader study-${name.toLowerCase()}`}>
              {Array.from({ length: name === 'Glyph' ? 9 : name === 'Signal' ? 5 : 3 }, (_, i) => <i key={i} style={{ '--i': i }} />)}
              {name === 'Orbit' || name === 'Ripple' ? <b /> : null}
            </span>}
          </div>
          <figcaption className="gallery-sr-only">{name}</figcaption>
        </figure>)}
      </div>
    </section>

    <section className="study-section chart-study" aria-labelledby="charts-heading" data-motion-paused={reducedMotion}>
      <header className="study-heading">
        <div><h2 id="charts-heading"><a href="https://generativecharts.com" target="_blank" rel="noopener noreferrer">Generative Charts</a></h2></div>
      </header>
      <div className="chart-bento">
        {[{ name: 'Line', markup: line }, { name: 'Bar', markup: bar }, { name: 'Donut', markup: donut }].map(({ name, markup }) => <figure className={`chart-tile chart-tile-${name.toLowerCase()}`} key={name}>
          <figcaption className="gallery-sr-only">{name} chart</figcaption>
          <div className="study-chart" dangerouslySetInnerHTML={{ __html: markup }} />
        </figure>)}
      </div>
    </section>
  </div>;
}
