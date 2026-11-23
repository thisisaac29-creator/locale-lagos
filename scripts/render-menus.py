from pathlib import Path
import subprocess
root=Path('public/locale-media'); out=Path('audit/brand')
exe=r'C:\Users\ola\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe'
for p in root.glob('*.pdf'):
 subprocess.run([exe,'-scale-to','1700','-png',str(p),str(out/p.stem.split('_')[-1])],check=True)
