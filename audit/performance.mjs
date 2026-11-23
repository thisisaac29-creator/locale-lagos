import lighthouse from 'file:///C:/Users/ola/AppData/Local/Temp/brun-audit-tools/node_modules/lighthouse/core/index.js';
import * as chromeLauncher from 'file:///C:/Users/ola/AppData/Local/Temp/brun-audit-tools/node_modules/chrome-launcher/dist/index.js';
import fs from 'node:fs';
const chrome=await chromeLauncher.launch({chromePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',chromeFlags:['--headless','--no-sandbox']});
const summary=fs.existsSync('audit/performance-summary.json')?JSON.parse(fs.readFileSync('audit/performance-summary.json')):[];
try {
 for(const [i,route,desktop] of [[13,'/offers',false],[14,'/offers',false]]) {
  const result=await lighthouse('http://localhost:3101'+route,{port:chrome.port,output:'json',logLevel:'error',onlyCategories:['performance','accessibility','best-practices','seo'],...(desktop?{formFactor:'desktop',screenEmulation:{mobile:false,width:1440,height:900,deviceScaleFactor:1,disabled:false},throttling:{rttMs:40,throughputKbps:10240,cpuSlowdownMultiplier:1}}:{})});
  fs.writeFileSync(`audit/lighthouse-${i}.json`,result.report);
  const l=result.lhr;const row={i,route,desktop,version:l.lighthouseVersion,settings:l.configSettings,scores:Object.fromEntries(Object.entries(l.categories).map(([k,v])=>[k,v.score])),metrics:Object.fromEntries(['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index','total-byte-weight'].map(k=>[k,l.audits[k]?.numericValue])),failures:Object.entries(l.audits).filter(([k,a])=>a.score!==null&&a.score<.9).map(([k,a])=>({id:k,title:a.title,value:a.displayValue,details:a.details}))};summary.push(row);fs.writeFileSync('audit/performance-summary.json',JSON.stringify(summary,null,2));console.log(JSON.stringify({...row,settings:undefined,failures:row.failures.map(x=>({id:x.id,value:x.value}))}));
 }
}finally{await chrome.kill()}


