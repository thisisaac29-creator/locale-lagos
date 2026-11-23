from pathlib import Path
p=Path('audit/brand/browser-check.cjs');s=p.read_text(encoding='utf8');s=s.replace('path:\x07udit/brand/viewport--.png',"path:'audit/brand/viewport-'+name+'-'+width+'.png'");p.write_text(s,encoding='utf8')
