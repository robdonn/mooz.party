if(!self.define){let e,i={};const t=(t,n)=>(t=new URL(t+".js",n).href,i[t]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=i,document.head.appendChild(e)}else e=t,importScripts(t),i()})).then((()=>{let e=i[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(n,s)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const c=e=>t(e,r),f={module:{uri:r},exports:o,require:c};i[r]=Promise.all(n.map((e=>f[e]||c(e)))).then((e=>(s(...e),o)))}}define(["./workbox-099bf95e"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/index.html",revision:"6b2524c0505466f302c2edb511ab5130"},{url:"/manifest.json",revision:"c579979b68c2dbee36482db6f8e9f04f"},{url:"/static/main.9989f5a176780936c713.js",revision:null},{url:"/static/main.9989f5a176780936c713.js.LICENSE.txt",revision:"c3bcfc30a3eb2b25584b9f47b03e21fb"}],{})}));
