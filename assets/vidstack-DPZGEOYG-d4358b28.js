import{aX as a,m as n,x as c,e as d,p as h,aY as u,i as l}from"./vidstack-D1JzjGR7-bc05d0cf.js";function f(r,t=3e3){const s=a();return setTimeout(()=>{const i=r();i&&s.reject(i)},t),s}class p{constructor(t){this.db=t,this.cb=n(""),this.referrerPolicy=null,t.setAttribute("frameBorder","0"),t.setAttribute("aria-hidden","true"),t.setAttribute("allow","autoplay; fullscreen; encrypted-media; picture-in-picture; accelerometer; gyroscope"),this.referrerPolicy!==null&&t.setAttribute("referrerpolicy",this.referrerPolicy)}get iframe(){return this.db}setup(){c(window,"message",this.Lg.bind(this)),c(this.db,"load",this.lc.bind(this)),d(this.fd.bind(this))}fd(){const t=this.cb();if(!t.length){this.db.setAttribute("src","");return}const s=h(()=>this.Te());this.db.setAttribute("src",u(t,s))}gd(t,s){var i;(i=this.db.contentWindow)==null||i.postMessage(JSON.stringify(t),s??"*")}Lg(t){var o;const s=this.eb();if((t.source===null||t.source===((o=this.db)==null?void 0:o.contentWindow))&&(!l(s)||s===t.origin)){try{const e=JSON.parse(t.data);e&&this.hd(e,t);return}catch{}t.data&&this.hd(t.data,t)}}}export{p as E,f as t};
