// Static specimens from the actual libraries; no iframe or runtime dependency.
// node scripts/export-project-stills.mjs /path/to/Chartkit
import { build } from 'esbuild';
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
const root = resolve(process.argv[2]);
const temp = await mkdtemp(join(tmpdir(), 'project-stills-'));
try {
  const bundle = join(temp, 'render.cjs');
  await build({ stdin: { resolveDir: root, loader: 'tsx', contents: `
    import React from 'react';
    import { renderToStaticMarkup as render } from 'react-dom/server';
    import { LineChart, BarChart, PieChart, RadarChart, HeatmapChart, TerrainChart } from './packages/chartkit/src/index.ts';
    const common = { animate: false, height: 400, showLegend: false, figureLabel: '', appearance: 'light', theme: 'mono-editorial' };
    const data = [42,58,51,74,62,88,79,102].map((value,i)=>({month:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'][i],value}));
    const series=[{dataKey:'value',label:'Revenue'}];
    const chart=(component, props)=>render(React.createElement(component,{...common,...props}));
    export const charts={
      line:chart(LineChart,{data,series,xKey:'month'}),
      donut:chart(PieChart,{variant:'donut',data:[{name:'Direct',value:48},{name:'Search',value:32},{name:'Referral',value:20}],nameKey:'name',valueKey:'value'}),
      bar:chart(BarChart,{data:data.slice(0,6),series,categoryKey:'month'}),
      radar:chart(RadarChart,{data:['Clarity','Speed','Craft','Reach','Trust','Ease'].map((name,i)=>({name,value:[85,65,92,70,80,95][i]})),series,categoryKey:'name'}),
      heatmap:chart(HeatmapChart,{theme:'airform',data:Array.from({length:35},(_,i)=>({x:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i%7],y:['01','02','03','04','05'][Math.floor(i/7)],value:(i*17+13)%100})),xKey:'x',yKey:'y',valueKey:'value'}),
      terrain:chart(TerrainChart,{theme:'airform',appearance:'dark',data:Array.from({length:81},(_,i)=>({x:i%9,z:Math.floor(i/9),value:12+40*Math.exp(-((i%9-4)**2+(Math.floor(i/9)-4)**2)/12)})),xKey:'x',zKey:'z',valueKey:'value',showWireframe:true,showPointCloud:true})
    };` }, outfile: bundle, bundle:true, platform:'node', format:'cjs', jsx:'automatic', define:{'process.env.NODE_ENV':'"production"'},logLevel:'silent'});
  const {charts}=createRequire(import.meta.url)(bundle);
  const specimens={};
  for(const [name,markup] of Object.entries(charts)) {
    const opening=markup.match(/<figure[^>]*>/)[0].replace('<figure','<div');
    const svg=markup.match(/<svg[\s\S]*?<\/svg>/)[0].replaceAll('_R_0_',`specimen-${name}`).replace(/ tabindex="[^"]*"/g,'').replace(/ role="button"/g,'');
    specimens[name]=opening+svg+'</div>';
  }
  await writeFile('src/generated/project-chart-stills.json',JSON.stringify(specimens));
  await writeFile('src/generated/project-chart-stills.css',await readFile(join(root,'packages/chartkit/src/styles.css'),'utf8'));
  await build({stdin:{resolveDir:process.cwd(),loader:'tsx',contents:`
    import React from 'react';
    import { renderToStaticMarkup as render } from 'react-dom/server';
    import { InlineLoader } from 'generative-loaders';
    export const loaders=Object.fromEntries(['matrix','orbit','ripple','signal','glyph','spark'].map(variant=>[variant,render(React.createElement(InlineLoader,{variant,size:72,paused:true,color:'currentColor'}))]));
  `},outfile:join(temp,'loaders.cjs'),bundle:true,platform:'node',format:'cjs',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},logLevel:'silent'});
  const require=createRequire(import.meta.url); delete require.cache[bundle];
  await writeFile('src/generated/project-loader-stills.json',JSON.stringify(require(join(temp,'loaders.cjs')).loaders));
  await writeFile('src/generated/project-loader-stills.css',await readFile('node_modules/generative-loaders/dist/styles.css','utf8'));
} finally { await rm(temp,{recursive:true,force:true}); }
