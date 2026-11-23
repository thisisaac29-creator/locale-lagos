from pathlib import Path
for name in ['performance.mjs','interactions.cjs','hero-check.cjs','browser-check.cjs']:
 p=Path('audit/brand')/name;s=p.read_text(encoding='utf8').replace('localhost:3102','localhost:3103');p.write_text(s,encoding='utf8')
