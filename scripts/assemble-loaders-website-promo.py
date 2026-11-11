"""Assemble real website recordings into the portfolio promo (FFmpeg required).
Pass --capture-root /private/tmp/loaders-promo-capture to encode raw browser captures.
The small source recordings are retained under docs/media/loaders-promo for re-editing.
"""
from pathlib import Path
import argparse, json, subprocess
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[1]
MEDIA=ROOT/'docs/media/loaders-promo'
OUT=ROOT/'public/previews'
WORK=Path('/private/tmp/loaders-promo-edit')
WORK.mkdir(exist_ok=True); MEDIA.mkdir(parents=True,exist_ok=True)
p=argparse.ArgumentParser();p.add_argument('--capture-root',type=Path);args=p.parse_args()
def run(*a):subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y',*map(str,a)],check=True)
if args.capture_root:
    manifest=json.loads((args.capture_root/'manifest.json').read_text())
    (MEDIA/'capture-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
    for c in manifest:
        run('-framerate',c['frames']/c['seconds'],'-c:v','mjpeg','-i',args.capture_root/c['name']/'%05d.png','-vf','fps=30','-an','-c:v','libx264','-crf','16','-pix_fmt','yuv420p',MEDIA/(c['name']+'.mp4'))
FONT='/System/Library/Fonts/HelveticaNeue.ttc'
MONO='/System/Library/Fonts/SFNSMono.ttf'
def label(txt,x,y,size,color='0xf2f0eb',mono=False):
    return (txt,x,y,size,color,mono)
def title_layer(labels,path,background=(0,0,0,0)):
    im=Image.new('RGBA',(1920,1080),background);d=ImageDraw.Draw(im)
    for txt,x,y,size,color,mono in labels:
        d.text((round(x*1.5),round(y*1.5)),txt,font=ImageFont.truetype(MONO if mono else FONT,round(size*1.5)),fill='#'+color[2:],anchor='lt')
    im.save(path)
# crop bounds are measured from the live site's rendered cards, not reconstructed UI.
shots=[
 ('hero',3,(0,0,1280,684),'Generative Loaders','46 loading states. One React library.',1040),
 ('text-a-fixed',4,(24,68,1232,560),'Every word, an entrance.','16 TEXT LOADERS   /   01–08',1184),
 ('text-b',2.5,(24,102,1232,284),'From a whisper to a wave.','16 TEXT LOADERS   /   09–12',1184),
 ('text-c',2.5,(24,102,1232,284),'Let the idea take shape.','16 TEXT LOADERS   /   13–16',1184),
 ('inline-a',4,(24,68,1232,615),'Small signals. Real character.','18 INLINE LOADERS   /   01–09',1080),
 ('inline-mid',2.5,(24,178,1232,208),'Follow the thread.','18 INLINE LOADERS   /   10–12',1184),
 ('inline-b',3,(24,24,1232,412),'Keep things moving.','18 INLINE LOADERS   /   13–18',1184),
 ('image-a-fixed',5.5,(24,68,1232,560),'Before the image arrives.','12 IMAGE LOADERS   /   01–08',1184),
 ('image-b',3.5,(24,102,1232,284),'A little anticipation.','12 IMAGE LOADERS   /   09–12',1184),
]
parts=[]
for i,(name,duration,(x,y,w,h),title,kicker,sw) in enumerate(shots):
    sh=round(h*sw/w)//2*2
    # All scenes hold still; motion comes from the actual running loaders.
    px=(1280-sw)//2;py=140+(520-sh)//2
    if name=='hero':py=126
    overlay=WORK/f'overlay-{i}.png'
    title_layer([label(kicker,48,26,12,'0xaaa9a4',True),label(title,46,54,38),
        label('generativeloaders.com',48,691,12,'0xdddcd6',True),label('74K npm downloads',1040,691,12,'0xdddcd6',True)],overlay)
    vf=f'[0:v]crop={w}:{h}:{x}:{y},scale={sw}:{sh}:flags=lanczos,pad=1280:720:{px}:{py}:color=0x111111,scale=1920:1080:flags=lanczos,setsar=1[base];[base][1:v]overlay=0:0'
    part=WORK/f'{i:02d}.mp4'
    run('-i',MEDIA/(name+'.mp4'),'-i',overlay,'-t',duration,'-filter_complex',vf,'-an','-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p',part)
    parts.append((part,duration))
end=WORK/'end.mp4'
vf=[label('GENERATIVE LOADERS',72,55,16,'0xaaa9a4',True),label('74K',61,115,188),label('npm downloads',73,332,38),
    label('46 ways to make waiting worth watching.',74,424,34),label('16 text  /  18 inline  /  12 image',74,487,20,'0xaaa9a4',True),
    label('npm install generative-loaders',74,610,20,mono=True),label('generativeloaders.com',890,657,17,mono=True),
    label('Download figure displayed on the website · Sep 24, 2026',74,682,11,'0x898883',True)]
title_layer(vf,WORK/'end.png',(17,17,17,255))
run('-loop','1','-i',WORK/'end.png','-t','4','-r','30','-an','-c:v','libx264','-crf','19','-pix_fmt','yuv420p',end)
parts.append((end,4))
# Short dissolves keep the emphasis on the examples, without camera zooms.
inputs=[]
for part,_ in parts:inputs+=['-i',str(part)]
filters=[];elapsed=parts[0][1];last='0:v'
for i,(_,duration) in enumerate(parts[1:],1):
    tag=f'v{i}';filters.append(f'[{last}][{i}:v]xfade=transition=fade:duration=0.2:offset={elapsed-.2:.3f}[{tag}]');elapsed+=duration-.2;last=tag
run(*inputs,'-filter_complex_threads','1','-filter_complex',';'.join(filters),'-map',f'[{last}]','-an','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',OUT/'loaders-promo.mp4')
run('-ss','30','-i',OUT/'loaders-promo.mp4','-frames:v','1',OUT/'loaders-promo.jpg')
print(f'Rendered {elapsed:.1f} seconds: {OUT / "loaders-promo.mp4"}')
