const { chromium } = require('C:/Users/ola/AppData/Local/Temp/brun-audit-tools/node_modules/playwright-core');
const fs = require('fs');
const axe = 'C:/Users/ola/AppData/Local/Temp/brun-audit-tools/node_modules/axe-core/axe.min.js';
const base = 'http://localhost:3101';
(async () => {
 const browser = await chromium.launch({channel:'chrome',headless:true});
 const results = fs.existsSync('audit/browser-results.json') ? JSON.parse(fs.readFileSync('audit/browser-results.json')) : {browser:browser.version(),pages:[],links:[]};
 const links = new Set();
 for (const width of [320,360,390,768,1024,1440]) {
  const context = await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  for(const route of ['/','/about','/menu','/offers','/gallery','/contact']) {
   if(results.pages.some(p=>p.width===width&&p.route===route))continue;
   const page = await context.newPage(); const errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   const response=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:60000}); await page.waitForLoadState('networkidle',{timeout:15000}).catch(()=>{});
   await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,30))}window.scrollTo(0,0)});
   await page.waitForTimeout(300);
   const state=await page.evaluate(()=>({title:document.title,h1:[...document.querySelectorAll('h1')].map(x=>x.textContent),width:innerWidth,scrollWidth:document.documentElement.scrollWidth,brokenImages:[...document.images].filter(x=>!x.complete||!x.naturalWidth).map(x=>x.currentSrc),links:[...document.querySelectorAll('a[href]')].map(x=>({text:x.textContent.trim(),href:x.getAttribute('href')})),overflow:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+2||r.left< -2)&&getComputedStyle(e).position!=='absolute'}).slice(0,12).map(e=>({tag:e.tagName,text:e.textContent.slice(0,70),class:e.className})),description:document.querySelector('meta[name="description"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href}));
   state.links.forEach(l=>{if(l.href.startsWith('/')&&!l.href.startsWith('//'))links.add(l.href.split('#')[0])});
   let accessibility;
   if(width===390||width===1440){await page.addScriptTag({path:axe});accessibility=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return r.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});await page.screenshot({path:`audit/${route.slice(1)||'home'}-${width}.png`,fullPage:true});}
   results.pages.push({route,width,status:response.status(),errors,...state,accessibility});
   console.log(route,width,response.status(), 'overflow',state.scrollWidth>width,'axe',accessibility?.length);
   fs.writeFileSync('audit/browser-results.json',JSON.stringify(results,null,2));await page.close();
  }
  await context.close();
 }
 for(const row of results.pages)for(const link of row.links)if(link.href.startsWith('/')&&!link.href.startsWith('//'))links.add(link.href.split('#')[0]);
 for(const href of [...links,'/robots.txt','/sitemap.xml','/nonexistent-audit-page']){const r=await fetch(base+href);results.links.push({href,status:r.status,type:r.headers.get('content-type')});}
 fs.writeFileSync('audit/browser-results.json',JSON.stringify(results,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

