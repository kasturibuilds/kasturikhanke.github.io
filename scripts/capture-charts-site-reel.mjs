/** Silent 15-second reel captured directly from the actual Generative Charts site.
 * node scripts/capture-charts-site-reel.mjs [--stills]
 * Requires Playwright Chromium, FFmpeg, and access to generativecharts.com.
 * Native React components, CSS, text, images, and layouts are left intact.
 */
import { chromium } from 'playwright';
import { spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';
import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
const out=resolve(root,'docs/media/charts-site-reel');
const web=resolve(root,'public/previews');
const stills=process.argv.includes('--stills');
const FPS=60;
await mkdir(out,{recursive:true});await mkdir(web,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--run-all-compositor-stages-before-draw']});
const page=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:3});
page.setDefaultTimeout(20000);
const pageErrors=[];page.on('pageerror',e=>pageErrors.push(e.message));
const manifest={source:'https://generativecharts.com/',capturedAt:new Date().toISOString(),theme:'dark',width:3840,height:2160,fps:FPS,duration:15,audio:false,shots:[]};
let encoder,encoded;
const run=args=>{
  const r=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y',...args],{stdio:'inherit'});
  if(r.status!==0)throw new Error('FFmpeg failed');
};
try{
  await page.goto(manifest.source,{waitUntil:'domcontentloaded'});
  // Exercise an actual control to ensure React has hydrated before recording.
  await page.getByRole('tab',{name:'Line',exact:true}).click();
  await page.getByRole('tab',{name:'Bar',exact:true}).click();
  if(await page.getByRole('button',{name:'Switch to dark mode',exact:true}).count())
    await page.getByRole('button',{name:'Switch to dark mode',exact:true}).click();
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(600);
  await page.mouse.move(0,0);
  const client=await page.context().newCDPSession(page);
  await client.send('Emulation.setVirtualTimePolicy',{policy:'pause'});
  // Pause and seek the site's own native animation objects. This keeps CSS/WAAPI
  // motion on the same 60 fps timeline as React timers during lossless capture.
  // Keyframes and easing come from the actual website and are never recreated.
  await page.evaluate(()=>{
    window.__reelTime=0;
    window.__reelAnimations=new WeakMap();
    window.__syncReelAnimations=(time,initial=false)=>{
      window.__reelTime=time;
      for(const animation of document.getAnimations()){
        if(animation.playState==='finished'||animation.playState==='idle')continue;
        let entry=window.__reelAnimations.get(animation);
        if(!entry){
          entry={start:time,offset:initial?Number(animation.currentTime)||0:0};
          window.__reelAnimations.set(animation,entry);
        }
        animation.pause();
        const current=entry.offset+time-entry.start;
        const end=animation.effect?.getComputedTiming().endTime;
        animation.currentTime=current;
        if(Number.isFinite(end)&&current>=end){try{animation.finish();}catch{/* Removed effect. */}}
      }
    };
    window.__syncReelAnimations(0,true);
  });
  let time=0;
  async function advance(ms=1000/FPS){
    await page.evaluate(t=>window.__syncReelAnimations(t),time);
    const elapsed=new Promise(r=>client.once('Emulation.virtualTimeBudgetExpired',r));
    await client.send('Emulation.setVirtualTimePolicy',{policy:'advance',budget:ms,maxVirtualTimeTaskStarvationCount:100});
    await elapsed;time+=ms;
    await page.evaluate(t=>window.__syncReelAnimations(t),time);
  }
  async function settle(ms){for(let n=0;n<Math.round(ms/(1000/FPS));n++)await advance();}
  async function click(role,name){await page.getByRole(role,{name,exact:typeof name==='string'}).evaluate(e=>e.click());await advance();}
  async function scroll(y){await page.evaluate(top=>window.scrollTo({top,behavior:'instant'}),y);await advance();}
  async function select(family,themeName){
    await click('button',themeName);
    await click('tab',family);
    const y=await page.locator('.gallery-toolbar').evaluate(e=>e.getBoundingClientRect().top+scrollY-20);
    await scroll(y);
    await settle(50);
  }
  const shots=[
    {name:'01-site',frames:60,setup:async()=>{await scroll(0);await click('button','Mono Editorial');await settle(150);}},
    {name:'02-bars',frames:90,setup:async()=>{await select('Bar','Mono Editorial');}},
    {name:'03-lines',frames:105,setup:async()=>{await select('Line','Neon Instruments');}},
    {name:'04-areas',frames:90,setup:async()=>{await select('Area','Airform');}},
    {name:'05-pie',frames:105,setup:async()=>{await select('Pie','Neon Instruments');}},
    {name:'06-heatmaps',frames:90,setup:async()=>{await select('Heatmap','Neon Instruments');}},
    {name:'07-terrain',frames:105,setup:async()=>{await select('3D terrain','Airform');}},
    {name:'08-radial',frames:75,setup:async()=>{await select('Radial','Neon Instruments');}},
    {name:'09-radar',frames:90,setup:async()=>{await select('Radar','Mono Editorial');}},
    {name:'10-sankey',frames:90,setup:async()=>{await select('Sankey','Airform');}},
  ];
  const master=resolve(out,'generative-charts-site-15s.mp4');
  if(!stills){
    encoder=spawn('ffmpeg',['-hide_banner','-loglevel','error','-y','-f','image2pipe','-vcodec','png','-framerate',String(FPS),'-i','pipe:0','-an','-c:v','libx264','-preset','fast','-crf','15','-pix_fmt','yuv420p','-movflags','+faststart',master],{stdio:['pipe','inherit','inherit']});
    encoded=once(encoder,'close');
    encoder.stdin.on('error',e=>{throw e;});
  }
  let total=0;
  for(const shot of shots){
    console.log(`Capturing ${shot.name} (${shot.frames/FPS}s)`);
    await shot.setup();
    const details={name:shot.name,start:total/FPS,duration:shot.frames/FPS,frames:shot.frames,samples:[]};
    const sampleFrames=new Set([Math.floor(shot.frames*.15),Math.floor(shot.frames*.55),shot.frames-1]);
    for(let frame=0;frame<shot.frames;frame++){
      if(shot.during)await shot.during(frame);
      await advance();
      if(!stills||sampleFrames.has(frame)){
        const png=await page.screenshot({type:'png',animations:'allow'});
        if(!stills&&!encoder.stdin.write(png))await once(encoder.stdin,'drain');
        if(sampleFrames.has(frame)){
          const name=`${shot.name}-${String(frame).padStart(3,'0')}.png`;
          await writeFile(resolve(out,name),png);
          details.samples.push({frame,file:name,state:await page.evaluate(()=>({
            mode:document.documentElement.dataset.siteTheme,
            chartTheme:document.querySelector('main')?.dataset.chartTheme,
            family:document.querySelector('[role="tab"][aria-selected="true"]')?.textContent,
            chartCount:document.querySelectorAll('.variation-example').length,
            chartTitles:[...document.querySelectorAll('.ck-title')].map(e=>e.textContent),
            scrollY,
          }))});
        }
      }
    }
    total+=shot.frames;manifest.shots.push(details);
  }
  if(total!==900)throw new Error(`Expected 900 frames; got ${total}`);
  if(manifest.shots.some(shot=>shot.samples.some(sample=>sample.state.mode!=='dark')))
    throw new Error('Every captured scene must remain in dark mode.');
  manifest.pageErrors=pageErrors;
  await writeFile(resolve(out,'capture-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
  if(!stills){
    encoder.stdin.end();if((await encoded)[0]!==0)throw new Error('Capture encoding failed');
    run(['-i',master,'-vf','scale=2560:1440:flags=lanczos','-an','-c:v','libx264','-preset','slow','-crf','15','-pix_fmt','yuv420p','-movflags','+faststart',resolve(web,'charts-film.mp4')]);
    run(['-ss','6.7','-i',master,'-frames:v','1','-q:v','1',resolve(web,'charts-film.jpg')]);
    // Keep the existing compact preview URL aligned with the full reel.
    await copyFile(resolve(web,'charts-film.mp4'),resolve(web,'charts-preview.mp4'));
    await copyFile(resolve(web,'charts-film.jpg'),resolve(web,'charts-preview.jpg'));
    console.log(`Complete: ${master}`);
  }
}finally{
  if(encoder&&!encoder.stdin.closed)encoder.stdin.end();
  await browser.close();
}
