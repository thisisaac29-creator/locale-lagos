const {chromium}=require('C:/Users/ola/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core');
const fs=require('fs');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});const results=[];
for(const width of [360,768,1440]){
 const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
 for(const route of ['/','/about','/menu','/gallery','/offers','/contact','/brand-test-404']){
 const page=await context.newPage();await page.route('https://www.google.com/maps**',route=>route.abort());const errors=[];page.on('pageerror',e=>errors.push(e.message));const response=await page.goto('http://localhost:3103'+route,{waitUntil:'domcontentloaded',timeout:60000});
 await page.waitForLoadState('networkidle',{timeout:2500}).catch(()=>{});
 await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}window.scrollTo(0,0)});await page.waitForFunction(()=>[...document.images].every(i=>i.complete),{},{timeout:3000}).catch(()=>{});await page.waitForTimeout(300);
 await page.addScriptTag({path:'C:/Users/ola/locale-lagos/node_modules/axe-core/axe.min.js'});
 const state=await page.evaluate(async()=>({scrollWidth:document.documentElement.scrollWidth,h1:[...document.querySelectorAll('h1')].map(x=>x.textContent),brokenImages:[...document.images].filter(x=>x.currentSrc&&x.complete&&!x.naturalWidth).map(x=>x.currentSrc),videos:[...document.querySelectorAll('video')].map(v=>({paused:v.paused,preload:v.preload})),violations:(await axe.run(document,{iframes:false,runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))}));
 const name=route.slice(1)||'home';await page.screenshot({path:'audit/brand/viewport-'+name+'-'+width+'.png'});await page.screenshot({path:`audit/brand/${name}-${width}.png`,fullPage:route!='/gallery'});
 results.push({width,route,status:response.status(),errors,...state});console.log(route,width,'overflow',state.scrollWidth>width,'axe',state.violations.length,'errors',errors.length);fs.writeFileSync('audit/brand/browser-results.json',JSON.stringify(results,null,2));await page.close();
 }await context.close();
}
const page=await browser.newPage({viewport:{width:1440,height:900}});await page.goto('http://localhost:3103',{waitUntil:'networkidle'});await page.waitForTimeout(900);await page.screenshot({path:'audit/brand/home-motion-1440.png'});console.log('hero',await page.locator('video').evaluateAll(v=>v.map(x=>({paused:x.paused,muted:x.muted,currentTime:x.currentTime}))));await browser.close();})();


