"""Render a 20-second original motion promo. Requires Pillow and FFmpeg.
Loader motions adapted from generative-loaders (MIT); see docs/generative-loaders-LICENSE.txt.
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import math, subprocess

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/previews'
OUT.mkdir(parents=True, exist_ok=True)
S = 1.5
W, H, FPS, DURATION = 1920, 1080, 30, 20
INK, PAPER = (25, 25, 25), (244, 243, 239)
FONT = '/System/Library/Fonts/HelveticaNeue.ttc'
MONO = '/System/Library/Fonts/SFNSMono.ttf'
fonts = {}
def font(size, mono=False):
    key = (size, mono)
    if key not in fonts: fonts[key] = ImageFont.truetype(MONO if mono else FONT, round(size*S))
    return fonts[key]
def mix(a,b,t): return tuple(round(x+(y-x)*max(0,min(t,1))) for x,y in zip(a,b))
def ease(t): return 1-(1-max(0,min(t,1)))**3
def rect(d, box, fill, radius=0, outline=None, width=1):
    d.rounded_rectangle(tuple(round(x*S) for x in box), radius=round(radius*S), fill=fill, outline=outline, width=round(width*S))
def text(d, xy, value, size=24, fill=INK, mono=False, anchor='la'):
    d.text(tuple(round(x*S) for x in xy), value, font=font(size,mono), fill=fill, anchor=anchor)
def circle(d,x,y,r,color,outline=False,width=2):
    bounds=((x-r)*S,(y-r)*S,(x+r)*S,(y+r)*S)
    d.ellipse(bounds, fill=None if outline else color, outline=color if outline else None,width=round(width*S))
def line(d,xy,fill,width=1): d.line(tuple(v*S for v in xy), fill=fill,width=max(1,round(width*S)))
def matrix(d,x,y,size,t,fg,bg):
    step=size/5
    for i in range(25):
        distance=abs(i%5-2)+abs(i//5-2)
        wave=(1-math.cos((t/1.6+distance*.13+i*.008)*math.tau))/2
        r=step*(.72-distance*.07)*(.48+.52*wave)/2
        circle(d,x+(i%5-2)*step,y+(i//5-2)*step,r,mix(bg,fg,.22+.78*wave))
def orbit(d,x,y,size,t,fg,bg):
    circle(d,x,y,size*.2,fg,True,size*.04)
    for i,alpha in enumerate([1,.58,.28]):
        a=t*math.tau/2.6+i*math.tau/3-math.pi/2
        circle(d,x+math.cos(a)*size*.4,y+math.sin(a)*size*.4,size*.085,mix(bg,fg,alpha))
def ripple(d,x,y,size,t,fg,bg):
    for i in range(3):
        p=(t/2.4+i/3)%1
        circle(d,x,y,size*(.036+.43*p),mix(bg,fg,(1-p)*.32))
    circle(d,x,y,size*.065,fg)
def signal(d,x,y,size,t,fg,bg):
    for i in range(5):
        p=(1-math.cos((t/1.5-i*.16)*math.tau))/2
        h=size*(.25+.75*p)
        xx=x+(i-2)*size*.21
        rect(d,(xx-size*.055,y-h/2,xx+size*.055,y+h/2),mix(bg,fg,.28+.72*p),size*.055)

def frame(scene,u):
    dark=scene in (0,2,4)
    bg,fg=(INK,PAPER) if dark else (PAPER,INK)
    im=Image.new('RGB',(W,H),bg);d=ImageDraw.Draw(im)
    muted=mix(bg,fg,.5)
    matrix(d,74,57,30,u,fg,bg)
    text(d,(102,45),'Generative Loaders',18,fg)
    text(d,(1214,48),['DESIGNED FOR THE IN-BETWEEN','01 / TEXT','02 / INLINE','03 / IMAGE','READY FOR YOUR NEXT IDEA'][scene],10,muted,True,'ra')
    line(d,(64,651,1216,651),mix(bg,fg,.15))
    text(d,(64,674),'REACT LOADERS FOR GENERATIVE UI',10,muted,True)
    text(d,(1216,674),'generativeloaders.com',12,fg,True,'ra')
    rise=18*(1-ease(u/.6))
    if scene==0:
        text(d,(64,158+rise),'Make waiting',86,fg)
        text(d,(64,253+rise),'worth watching.',86,fg)
        text(d,(68,430+rise),'Small moments. Thoughtfully made.',24,muted)
        matrix(d,1030,310,245,u,fg,bg)
        text(d,(68,565),'TEXT  /  INLINE  /  IMAGE',12,muted,True)
    elif scene==1:
        text(d,(64,117+rise),'Every word, an entrance.',52,fg)
        for x in [64,654]: rect(d,(x,238,x+562,575),(254,253,250),18, (218,217,213))
        text(d,(90,264),'DECODE',11,muted,True);text(d,(680,264),'TYPEWRITER',11,muted,True)
        lines=['Ideas arrive quietly,','then become something.']
        full=''.join(lines);n=max(0,int((u-.35)*20))
        glyphs='01/<>:_#'
        for j,phrase in enumerate(lines):
            offset=sum(len(v) for v in lines[:j])
            visible=max(0,min(len(phrase),n-offset))
            decoded=''.join(ch if k+offset<n else (' ' if ch==' ' else glyphs[(int(u*16)+k*3)%len(glyphs)]) for k,ch in enumerate(phrase))
            text(d,(90,361+j*49),decoded,25,fg,True)
            text(d,(680,361+j*49),phrase[:visible],32,fg)
        if n<len(full):
            row=0 if n<len(lines[0]) else 1
            chars=lines[row][:n if row==0 else n-len(lines[0])]
            cx=680+d.textlength(chars,font=font(32))/S
            line(d,(cx+3,365+row*49,cx+3,398+row*49),fg,2)
        text(d,(90,527),'Meaning, revealed.',14,muted);text(d,(680,527),'One character at a time.',14,muted)
    elif scene==2:
        text(d,(64,117+rise),'A little signal. A lot of character.',48,fg)
        for i,(name,fn) in enumerate([('MATRIX',matrix),('ORBIT',orbit),('RIPPLE',ripple),('SIGNAL',signal)]):
            x=64+i*294
            rect(d,(x,248,x+270,562),(34,34,34),16,(57,57,57))
            fn(d,x+135,389,118,u,fg,(34,34,34))
            text(d,(x+24,522),name,11,muted,True)
        text(d,(64,595),'Loading states with a point of view.',18,muted)
    elif scene==3:
        text(d,(64,126+rise),'Before the image,',56,fg)
        text(d,(64,191+rise),'a sense of progress.',56,fg)
        text(d,(66,335),'Make the in-between feel intentional.',20,muted)
        for col,name in enumerate(['BANDS','TILES']):
            x=690+col*264
            rect(d,(x,194,x+242,513),(223,222,218),18)
            if col==0:
                for i in range(10):
                    pulse=(1+math.sin(u*3-i*.5))/2
                    shade=mix((215,214,210),(249,248,245),pulse)
                    rect(d,(x+14,208+i*29,x+228,231+i*29),shade,4)
            else:
                for i in range(24):
                    pulse=(1+math.sin(u*2.5-i*.38))/2
                    xx=x+14+(i%4)*55;yy=208+(i//4)*49
                    rect(d,(xx,yy,xx+49,yy+43),mix((205,204,200),(250,249,246),pulse),5)
            text(d,(x,542),name,11,muted,True)
    else:
        matrix(d,640,202,96,u,fg,bg)
        text(d,(640,305+rise),'Generative Loaders',70,fg,anchor='ma')
        text(d,(640,408+rise),'Give your next idea a better loading state.',24,muted,anchor='ma')
        rect(d,(300,493,980,561),(40,40,40),12,(68,68,68))
        text(d,(640,512),'npm install generative-loaders',23,fg,True,'ma')
    return im

# Crossfades between compositions, with a loop back into the opening.
starts=[0,3,7,11,15,20]
cmd=['ffmpeg','-hide_banner','-loglevel','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',str(OUT/'loaders-promo.mp4')]
proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
for n in range(FPS*DURATION):
    t=n/FPS;scene=next(i for i in range(5) if starts[i]<=t<starts[i+1]);u=t-starts[scene]
    im=frame(scene,u)
    if scene>0 and u<.3:
        previous=frame(scene-1,starts[scene]-starts[scene-1]+u)
        im=Image.blend(previous,im,ease(u/.3))
    if t>19.65: im=Image.blend(im,frame(0,0),ease((t-19.65)/.35))
    if n==17*FPS: im.save(OUT/'loaders-promo.jpg',quality=95)
    if n in [45,150,270,390,510]: im.save(Path('/private/tmp')/f'loaders-promo-{scene}.jpg',quality=90)
    proc.stdin.write(im.tobytes())
proc.stdin.close()
if proc.wait()!=0: raise SystemExit('Encoding failed')
print(OUT/'loaders-promo.mp4')
