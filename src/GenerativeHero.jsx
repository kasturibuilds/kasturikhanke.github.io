import SoftLiftText from './SoftLiftText';
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { seedLife, stepLife } from './gameOfLife';
import './GenerativeHero.css';

export default function GenerativeHero({ reducedMotion, visible, children, headingId = 'hero-title', headingRef }) {
  const host = useRef(null);
  const canvas = useRef(null);
  const board = useRef({ cells: new Uint16Array(0), columns: 0, rows: 0, generation: 0 });
  const clear = useRef(() => {});
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const element = canvas.current;
    const section = host.current;
    const context = element.getContext('2d');
    if (!context) return;
    let width = 0, height = 0, cellSize = 8, next = new Uint16Array(0);
    let interval = 0, dwell = 0, last = null, inView = false, keyCount = 0;
    const draw = () => {
      context.clearRect(0, 0, width, height);
      const { cells, columns } = board.current;
      let population = 0;
      for (let index = 0; index < cells.length; index++) {
        if (!cells[index]) continue;
        context.fillStyle = `rgba(238, 238, 229, ${cells[index] < 3 ? .22 : .14})`;
        context.beginPath();
        context.arc((index % columns + .5) * cellSize, (Math.floor(index / columns) + .5) * cellSize, 1.6, 0, Math.PI * 2);
        context.fill();
        population++;
      }
      element.dataset.generation = String(board.current.generation);
      element.dataset.population = String(population);
      element.dataset.cellSize = String(cellSize);
    };
    const stop = () => { clearInterval(interval); interval = 0; };
    const sync = () => {
      stop();
      if (!visible || !inView || document.hidden || reducedMotion || !board.current.cells.length) return;
      interval = window.setInterval(() => {
        const state = board.current;
        stepLife(state.cells, next, state.columns, state.rows);
        const previous = state.cells;
        state.cells = next;
        next = previous;
        state.generation++;
        draw();
      }, 140);
    };
    const plant = (x, y, generous = false) => {
      if (!visible || !inView || !board.current.cells.length) return;
      const state = board.current;
      seedLife(state.cells, state.columns, state.rows, x, y, generous);
      draw();
    };
    const leave = () => { clearTimeout(dwell); last = null; };
    const move = event => {
      if (event.target.closest('a, button') || (event.pointerType === 'touch' && !event.buttons)) { leave(); return; }
      const bounds = element.getBoundingClientRect();
      const x = Math.floor((event.clientX - bounds.left) / cellSize);
      const y = Math.floor((event.clientY - bounds.top) / cellSize);
      if (last && Math.hypot(x - last.x, y - last.y) < 6) return;
      clearTimeout(dwell);
      // Keep colonies spaced out even when the pointer moves quickly.
      const distance = last ? Math.max(Math.abs(x - last.x), Math.abs(y - last.y)) : 0;
      const steps = Math.min(4, Math.floor(distance / 10));
      if (last) for (let i = 1; i <= steps; i++) plant(Math.round(last.x + (x - last.x) * i / (steps + 1)), Math.round(last.y + (y - last.y) * i / (steps + 1)));
      plant(x, y);
      last = { x, y };
      dwell = window.setTimeout(() => { plant(x, y, true); }, 1000);
    };
    const up = event => { if (event.pointerType !== 'mouse') leave(); };
    const key = event => {
      if (!['Enter', ' '].includes(event.key)) return;
      event.preventDefault();
      if (event.repeat) return;
      const { columns, rows } = board.current;
      plant(Math.floor(columns * (width < 600 ? .5 : .7) + (keyCount % 3 - 1) * 6), Math.floor(rows * (width < 600 ? .76 : .5)), true);
      keyCount++;
      setAnnouncement(`Colony ${keyCount} planted.${reducedMotion ? ' Animation is off for reduced motion.' : ''}`);
    };
    const resize = () => {
      const bounds = element.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      leave();
      width = bounds.width; height = bounds.height;
      cellSize = width < 600 ? 7 : 8;
      const columns = Math.ceil(width / cellSize), rows = Math.ceil(height / cellSize);
      const state = board.current;
      if (columns !== state.columns || rows !== state.rows) {
        const resized = new Uint16Array(columns * rows);
        for (let y = 0; y < state.rows; y++) for (let x = 0; x < state.columns; x++) {
          if (state.cells[y * state.columns + x]) {
            const nx = Math.min(columns - 1, Math.floor(x / state.columns * columns));
            const ny = Math.min(rows - 1, Math.floor(y / state.rows * rows));
            resized[ny * columns + nx] = state.cells[y * state.columns + x];
          }
        }
        state.cells = resized; state.columns = columns; state.rows = rows;
      }
      next = new Uint16Array(state.cells.length);
      const ratio = Math.min(devicePixelRatio || 1, 2);
      element.width = Math.round(width * ratio); element.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(); sync();
    };
    clear.current = () => {
      leave(); board.current.cells.fill(0); next.fill(0); board.current.generation = 0;
      draw(); setAnnouncement('Canvas cleared. Move your pointer to plant new dots.');
    };
    const sizing = new ResizeObserver(resize);
    sizing.observe(element);
    const visibility = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; if (!inView) leave(); sync(); });
    visibility.observe(section);
    const onVisibility = () => { if (document.hidden) leave(); sync(); };
    section.addEventListener('pointermove', move);
    section.addEventListener('pointerdown', move);
    section.addEventListener('pointerup', up);
    section.addEventListener('pointercancel', leave);
    section.addEventListener('pointerleave', leave);
    element.addEventListener('keydown', key);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop(); leave(); sizing.disconnect(); visibility.disconnect();
      section.removeEventListener('pointermove', move);
      section.removeEventListener('pointerdown', move);
      section.removeEventListener('pointerup', up);
      section.removeEventListener('pointercancel', leave);
      section.removeEventListener('pointerleave', leave);
      element.removeEventListener('keydown', key);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reducedMotion, visible]);

  return <section ref={host} className="generative-hero" hidden={!visible} aria-labelledby={headingId}>
    <div className="hero-dot-pattern" aria-hidden="true" />
    <canvas ref={canvas} role="button" tabIndex={0} aria-label="Interactive Game of Life. Move your pointer or drag to plant dots. Hold still to grow a colony. Press Enter or Space to plant with the keyboard." />
    <div className="generative-hero-copy">
      <p className="hero-kicker">Kasturi Khanke · Product designer &amp; builder</p>
      <h2 id={headingId} ref={headingRef} tabIndex={headingRef ? -1 : undefined}>From product strategy<br />to products that work.</h2>
      <p className="hero-description">I shape, design, and build products. My work spans mobile experiences at Adobe and my own tools, Generative Charts and Generative Loaders.</p>
      {children || <Link className="hero-contact" to="/?view=contact"><SoftLiftText>Let’s work together</SoftLiftText></Link>}
    </div>
    <div className="hero-canvas-controls">
      <button onClick={() => clear.current()}><SoftLiftText>Clear</SoftLiftText></button>
    </div>
    <span className="hero-sr" role="status">{announcement}</span>
  </section>;
}
