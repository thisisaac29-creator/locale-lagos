from pathlib import Path
import json,hashlib,subprocess
rows=json.load(open('audit/brand/inventory.json'));issues=[]
for r in rows:
 p=Path('public/locale-media')/r['file']
 if hashlib.sha256(p.read_bytes()).hexdigest()!=r['sha256']:issues.append(p.name)
print('Original files checked:',len(rows),'Changed:',issues)
assert not issues
video=[]
for p in Path('public/video').glob('*.mp4'):
 info=json.loads(subprocess.check_output(['ffprobe','-v','quiet','-show_streams','-show_format','-of','json',str(p)]));video.append({'file':p.name,'bytes':p.stat().st_size,'duration':info['format']['duration'],'audio':any(s['codec_type']=='audio' for s in info['streams'])});assert not video[-1]['audio']
assert Path('public/video/hero.mp4').stat().st_size < 6000000
Path('audit/brand/media-verification.json').write_text(json.dumps({'originalsUnchanged':len(rows),'videos':video},indent=2),encoding='utf8')
print('Silent videos verified:',len(video))
