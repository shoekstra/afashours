(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.31
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Gi(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const ie={},vn=[],ft=()=>{},xc=()=>!1,ds=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),hs=e=>e.startsWith("onUpdate:"),Te=Object.assign,zi=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Cf=Object.prototype.hasOwnProperty,ne=(e,t)=>Cf.call(e,t),K=Array.isArray,yn=e=>mr(e)==="[object Map]",Cc=e=>mr(e)==="[object Set]",ca=e=>mr(e)==="[object Date]",$=e=>typeof e=="function",ge=e=>typeof e=="string",ht=e=>typeof e=="symbol",re=e=>e!==null&&typeof e=="object",Ic=e=>(re(e)||$(e))&&$(e.then)&&$(e.catch),Mc=Object.prototype.toString,mr=e=>Mc.call(e),If=e=>mr(e).slice(8,-1),jc=e=>mr(e)==="[object Object]",Ji=e=>ge(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Gn=Gi(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ps=e=>{const t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},Mf=/-\w/g,Ne=ps(e=>e.replace(Mf,t=>t.slice(1).toUpperCase())),jf=/\B([A-Z])/g,un=ps(e=>e.replace(jf,"-$1").toLowerCase()),gs=ps(e=>e.charAt(0).toUpperCase()+e.slice(1)),qs=ps(e=>e?`on${gs(e)}`:""),ut=(e,t)=>!Object.is(e,t),Hr=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},Nc=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},Qi=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let ua;const ms=()=>ua||(ua=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Yi(e){if(K(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],s=ge(r)?Lf(r):Yi(r);if(s)for(const i in s)t[i]=s[i]}return t}else if(ge(e)||re(e))return e}const Nf=/;(?![^(]*\))/g,Df=/:([^]+)/,Uf=/\/\*[^]*?\*\//g;function Lf(e){const t={};return e.replace(Uf,"").split(Nf).forEach(n=>{if(n){const r=n.split(Df);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function vs(e){let t="";if(ge(e))t=e;else if(K(e))for(let n=0;n<e.length;n++){const r=vs(e[n]);r&&(t+=r+" ")}else if(re(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const Ff="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Vf=Gi(Ff);function Dc(e){return!!e||e===""}function Hf(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=Xi(e[r],t[r]);return n}function Xi(e,t){if(e===t)return!0;let n=ca(e),r=ca(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=ht(e),r=ht(t),n||r)return e===t;if(n=K(e),r=K(t),n||r)return n&&r?Hf(e,t):!1;if(n=re(e),r=re(t),n||r){if(!n||!r)return!1;const s=Object.keys(e).length,i=Object.keys(t).length;if(s!==i)return!1;for(const o in e){const a=e.hasOwnProperty(o),c=t.hasOwnProperty(o);if(a&&!c||!a&&c||!Xi(e[o],t[o]))return!1}}return String(e)===String(t)}const Uc=e=>!!(e&&e.__v_isRef===!0),Tt=e=>ge(e)?e:e==null?"":K(e)||re(e)&&(e.toString===Mc||!$(e.toString))?Uc(e)?Tt(e.value):JSON.stringify(e,Lc,2):String(e),Lc=(e,t)=>Uc(t)?Lc(e,t.value):yn(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,s],i)=>(n[Ks(r,i)+" =>"]=s,n),{})}:Cc(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>Ks(n))}:ht(t)?Ks(t):re(t)&&!K(t)&&!jc(t)?String(t):t,Ks=(e,t="")=>{var n;return ht(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.31
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Le;class Bf{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=Le,!t&&Le&&(this.index=(Le.scopes||(Le.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){if(this._active){const n=Le;try{return Le=this,t()}finally{Le=n}}}on(){++this._on===1&&(this.prevScope=Le,Le=this)}off(){this._on>0&&--this._on===0&&(Le=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function qf(){return Le}let ae;const Ws=new WeakSet;class Fc{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Le&&Le.active&&Le.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ws.has(this)&&(Ws.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Hc(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,la(this),Bc(this);const t=ae,n=Ze;ae=this,Ze=!0;try{return this.fn()}finally{qc(this),ae=t,Ze=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)to(t);this.deps=this.depsTail=void 0,la(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ws.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){li(this)&&this.run()}get dirty(){return li(this)}}let Vc=0,zn,Jn;function Hc(e,t=!1){if(e.flags|=8,t){e.next=Jn,Jn=e;return}e.next=zn,zn=e}function Zi(){Vc++}function eo(){if(--Vc>0)return;if(Jn){let t=Jn;for(Jn=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;zn;){let t=zn;for(zn=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(r){e||(e=r)}t=n}}if(e)throw e}function Bc(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function qc(e){let t,n=e.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),to(r),Kf(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}e.deps=t,e.depsTail=n}function li(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Kc(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Kc(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===or)||(e.globalVersion=or,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!li(e))))return;e.flags|=2;const t=e.dep,n=ae,r=Ze;ae=e,Ze=!0;try{Bc(e);const s=e.fn(e._value);(t.version===0||ut(s,e._value))&&(e.flags|=128,e._value=s,t.version++)}catch(s){throw t.version++,s}finally{ae=n,Ze=r,qc(e),e.flags&=-3}}function to(e,t=!1){const{dep:n,prevSub:r,nextSub:s}=e;if(r&&(r.nextSub=s,e.prevSub=void 0),s&&(s.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)to(i,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Kf(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let Ze=!0;const Wc=[];function xt(){Wc.push(Ze),Ze=!1}function Ct(){const e=Wc.pop();Ze=e===void 0?!0:e}function la(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=ae;ae=void 0;try{t()}finally{ae=n}}}let or=0;class Wf{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class no{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!ae||!Ze||ae===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==ae)n=this.activeLink=new Wf(ae,this),ae.deps?(n.prevDep=ae.depsTail,ae.depsTail.nextDep=n,ae.depsTail=n):ae.deps=ae.depsTail=n,$c(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=ae.depsTail,n.nextDep=void 0,ae.depsTail.nextDep=n,ae.depsTail=n,ae.deps===n&&(ae.deps=r)}return n}trigger(t){this.version++,or++,this.notify(t)}notify(t){Zi();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{eo()}}}function $c(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let r=t.deps;r;r=r.nextDep)$c(r)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const fi=new WeakMap,nn=Symbol(""),di=Symbol(""),ar=Symbol("");function Ee(e,t,n){if(Ze&&ae){let r=fi.get(e);r||fi.set(e,r=new Map);let s=r.get(n);s||(r.set(n,s=new no),s.map=r,s.key=n),s.track()}}function Ot(e,t,n,r,s,i){const o=fi.get(e);if(!o){or++;return}const a=c=>{c&&c.trigger()};if(Zi(),t==="clear")o.forEach(a);else{const c=K(e),u=c&&Ji(n);if(c&&n==="length"){const l=Number(r);o.forEach((f,d)=>{(d==="length"||d===ar||!ht(d)&&d>=l)&&a(f)})}else switch((n!==void 0||o.has(void 0))&&a(o.get(n)),u&&a(o.get(ar)),t){case"add":c?u&&a(o.get("length")):(a(o.get(nn)),yn(e)&&a(o.get(di)));break;case"delete":c||(a(o.get(nn)),yn(e)&&a(o.get(di)));break;case"set":yn(e)&&a(o.get(nn));break}}eo()}function dn(e){const t=te(e);return t===e?t:(Ee(t,"iterate",ar),Je(e)?t:t.map(et))}function ys(e){return Ee(e=te(e),"iterate",ar),e}function at(e,t){return It(e)?En(rn(e)?et(t):t):et(t)}const $f={__proto__:null,[Symbol.iterator](){return $s(this,Symbol.iterator,e=>at(this,e))},concat(...e){return dn(this).concat(...e.map(t=>K(t)?dn(t):t))},entries(){return $s(this,"entries",e=>(e[1]=at(this,e[1]),e))},every(e,t){return wt(this,"every",e,t,void 0,arguments)},filter(e,t){return wt(this,"filter",e,t,n=>n.map(r=>at(this,r)),arguments)},find(e,t){return wt(this,"find",e,t,n=>at(this,n),arguments)},findIndex(e,t){return wt(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return wt(this,"findLast",e,t,n=>at(this,n),arguments)},findLastIndex(e,t){return wt(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return wt(this,"forEach",e,t,void 0,arguments)},includes(...e){return Gs(this,"includes",e)},indexOf(...e){return Gs(this,"indexOf",e)},join(e){return dn(this).join(e)},lastIndexOf(...e){return Gs(this,"lastIndexOf",e)},map(e,t){return wt(this,"map",e,t,void 0,arguments)},pop(){return Ln(this,"pop")},push(...e){return Ln(this,"push",e)},reduce(e,...t){return fa(this,"reduce",e,t)},reduceRight(e,...t){return fa(this,"reduceRight",e,t)},shift(){return Ln(this,"shift")},some(e,t){return wt(this,"some",e,t,void 0,arguments)},splice(...e){return Ln(this,"splice",e)},toReversed(){return dn(this).toReversed()},toSorted(e){return dn(this).toSorted(e)},toSpliced(...e){return dn(this).toSpliced(...e)},unshift(...e){return Ln(this,"unshift",e)},values(){return $s(this,"values",e=>at(this,e))}};function $s(e,t,n){const r=ys(e),s=r[t]();return r!==e&&!Je(e)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.done||(i.value=n(i.value)),i}),s}const Gf=Array.prototype;function wt(e,t,n,r,s,i){const o=ys(e),a=o!==e&&!Je(e),c=o[t];if(c!==Gf[t]){const f=c.apply(e,i);return a?et(f):f}let u=n;o!==e&&(a?u=function(f,d){return n.call(this,at(e,f),d,e)}:n.length>2&&(u=function(f,d){return n.call(this,f,d,e)}));const l=c.call(o,u,r);return a&&s?s(l):l}function fa(e,t,n,r){const s=ys(e),i=s!==e&&!Je(e);let o=n,a=!1;s!==e&&(i?(a=r.length===0,o=function(u,l,f){return a&&(a=!1,u=at(e,u)),n.call(this,u,at(e,l),f,e)}):n.length>3&&(o=function(u,l,f){return n.call(this,u,l,f,e)}));const c=s[t](o,...r);return a?at(e,c):c}function Gs(e,t,n){const r=te(e);Ee(r,"iterate",ar);const s=r[t](...n);return(s===-1||s===!1)&&io(n[0])?(n[0]=te(n[0]),r[t](...n)):s}function Ln(e,t,n=[]){xt(),Zi();const r=te(e)[t].apply(e,n);return eo(),Ct(),r}const zf=Gi("__proto__,__v_isRef,__isVue"),Gc=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(ht));function Jf(e){ht(e)||(e=String(e));const t=te(this);return Ee(t,"has",e),t.hasOwnProperty(e)}class zc{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,r){if(n==="__v_skip")return t.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?id:Xc:i?Yc:Qc).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(r)?t:void 0;const o=K(t);if(!s){let c;if(o&&(c=$f[n]))return c;if(n==="hasOwnProperty")return Jf}const a=Reflect.get(t,n,ke(t)?t:r);if((ht(n)?Gc.has(n):zf(n))||(s||Ee(t,"get",n),i))return a;if(ke(a)){const c=o&&Ji(n)?a:a.value;return s&&re(c)?pi(c):c}return re(a)?s?pi(a):ws(a):a}}class Jc extends zc{constructor(t=!1){super(!1,t)}set(t,n,r,s){let i=t[n];const o=K(t)&&Ji(n);if(!this._isShallow){const u=It(i);if(!Je(r)&&!It(r)&&(i=te(i),r=te(r)),!o&&ke(i)&&!ke(r))return u||(i.value=r),!0}const a=o?Number(n)<t.length:ne(t,n),c=Reflect.set(t,n,r,ke(t)?t:s);return t===te(s)&&(a?ut(r,i)&&Ot(t,"set",n,r):Ot(t,"add",n,r)),c}deleteProperty(t,n){const r=ne(t,n);t[n];const s=Reflect.deleteProperty(t,n);return s&&r&&Ot(t,"delete",n,void 0),s}has(t,n){const r=Reflect.has(t,n);return(!ht(n)||!Gc.has(n))&&Ee(t,"has",n),r}ownKeys(t){return Ee(t,"iterate",K(t)?"length":nn),Reflect.ownKeys(t)}}class Qf extends zc{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const Yf=new Jc,Xf=new Qf,Zf=new Jc(!0);const hi=e=>e,xr=e=>Reflect.getPrototypeOf(e);function ed(e,t,n){return function(...r){const s=this.__v_raw,i=te(s),o=yn(i),a=e==="entries"||e===Symbol.iterator&&o,c=e==="keys"&&o,u=s[e](...r),l=n?hi:t?En:et;return!t&&Ee(i,"iterate",c?di:nn),Te(Object.create(u),{next(){const{value:f,done:d}=u.next();return d?{value:f,done:d}:{value:a?[l(f[0]),l(f[1])]:l(f),done:d}}})}}function Cr(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function td(e,t){const n={get(s){const i=this.__v_raw,o=te(i),a=te(s);e||(ut(s,a)&&Ee(o,"get",s),Ee(o,"get",a));const{has:c}=xr(o),u=t?hi:e?En:et;if(c.call(o,s))return u(i.get(s));if(c.call(o,a))return u(i.get(a));i!==o&&i.get(s)},get size(){const s=this.__v_raw;return!e&&Ee(te(s),"iterate",nn),s.size},has(s){const i=this.__v_raw,o=te(i),a=te(s);return e||(ut(s,a)&&Ee(o,"has",s),Ee(o,"has",a)),s===a?i.has(s):i.has(s)||i.has(a)},forEach(s,i){const o=this,a=o.__v_raw,c=te(a),u=t?hi:e?En:et;return!e&&Ee(c,"iterate",nn),a.forEach((l,f)=>s.call(i,u(l),u(f),o))}};return Te(n,e?{add:Cr("add"),set:Cr("set"),delete:Cr("delete"),clear:Cr("clear")}:{add(s){const i=te(this),o=xr(i),a=te(s),c=!t&&!Je(s)&&!It(s)?a:s;return o.has.call(i,c)||ut(s,c)&&o.has.call(i,s)||ut(a,c)&&o.has.call(i,a)||(i.add(c),Ot(i,"add",c,c)),this},set(s,i){!t&&!Je(i)&&!It(i)&&(i=te(i));const o=te(this),{has:a,get:c}=xr(o);let u=a.call(o,s);u||(s=te(s),u=a.call(o,s));const l=c.call(o,s);return o.set(s,i),u?ut(i,l)&&Ot(o,"set",s,i):Ot(o,"add",s,i),this},delete(s){const i=te(this),{has:o,get:a}=xr(i);let c=o.call(i,s);c||(s=te(s),c=o.call(i,s)),a&&a.call(i,s);const u=i.delete(s);return c&&Ot(i,"delete",s,void 0),u},clear(){const s=te(this),i=s.size!==0,o=s.clear();return i&&Ot(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=ed(s,e,t)}),n}function ro(e,t){const n=td(e,t);return(r,s,i)=>s==="__v_isReactive"?!e:s==="__v_isReadonly"?e:s==="__v_raw"?r:Reflect.get(ne(n,s)&&s in r?n:r,s,i)}const nd={get:ro(!1,!1)},rd={get:ro(!1,!0)},sd={get:ro(!0,!1)};const Qc=new WeakMap,Yc=new WeakMap,Xc=new WeakMap,id=new WeakMap;function od(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ad(e){return e.__v_skip||!Object.isExtensible(e)?0:od(If(e))}function ws(e){return It(e)?e:so(e,!1,Yf,nd,Qc)}function Zc(e){return so(e,!1,Zf,rd,Yc)}function pi(e){return so(e,!0,Xf,sd,Xc)}function so(e,t,n,r,s){if(!re(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const i=ad(e);if(i===0)return e;const o=s.get(e);if(o)return o;const a=new Proxy(e,i===2?r:n);return s.set(e,a),a}function rn(e){return It(e)?rn(e.__v_raw):!!(e&&e.__v_isReactive)}function It(e){return!!(e&&e.__v_isReadonly)}function Je(e){return!!(e&&e.__v_isShallow)}function io(e){return e?!!e.__v_raw:!1}function te(e){const t=e&&e.__v_raw;return t?te(t):e}function cd(e){return!ne(e,"__v_skip")&&Object.isExtensible(e)&&Nc(e,"__v_skip",!0),e}const et=e=>re(e)?ws(e):e,En=e=>re(e)?pi(e):e;function ke(e){return e?e.__v_isRef===!0:!1}function Oe(e){return tu(e,!1)}function eu(e){return tu(e,!0)}function tu(e,t){return ke(e)?e:new ud(e,t)}class ud{constructor(t,n){this.dep=new no,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:te(t),this._value=n?t:et(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,r=this.__v_isShallow||Je(t)||It(t);t=r?t:te(t),ut(t,n)&&(this._rawValue=t,this._value=r?t:et(t),this.dep.trigger())}}function ld(e){e.dep&&e.dep.trigger()}function wn(e){return ke(e)?e.value:e}const fd={get:(e,t,n)=>t==="__v_raw"?e:wn(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const s=e[t];return ke(s)&&!ke(n)?(s.value=n,!0):Reflect.set(e,t,n,r)}};function nu(e){return rn(e)?e:new Proxy(e,fd)}class dd{constructor(t,n,r){this.fn=t,this.setter=n,this._value=void 0,this.dep=new no(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=or-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&ae!==this)return Hc(this,!0),!0}get value(){const t=this.dep.track();return Kc(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function hd(e,t,n=!1){let r,s;return $(e)?r=e:(r=e.get,s=e.set),new dd(r,s,n)}const Ir={},es=new WeakMap;let Jt;function pd(e,t=!1,n=Jt){if(n){let r=es.get(n);r||es.set(n,r=[]),r.push(e)}}function gd(e,t,n=ie){const{immediate:r,deep:s,once:i,scheduler:o,augmentJob:a,call:c}=n,u=x=>s?x:Je(x)||s===!1||s===0?Et(x,1):Et(x);let l,f,d,h,v=!1,m=!1;if(ke(e)?(f=()=>e.value,v=Je(e)):rn(e)?(f=()=>u(e),v=!0):K(e)?(m=!0,v=e.some(x=>rn(x)||Je(x)),f=()=>e.map(x=>{if(ke(x))return x.value;if(rn(x))return u(x);if($(x))return c?c(x,2):x()})):$(e)?t?f=c?()=>c(e,2):e:f=()=>{if(d){xt();try{d()}finally{Ct()}}const x=Jt;Jt=l;try{return c?c(e,3,[h]):e(h)}finally{Jt=x}}:f=ft,t&&s){const x=f,z=s===!0?1/0:s;f=()=>Et(x(),z)}const O=qf(),R=()=>{l.stop(),O&&O.active&&zi(O.effects,l)};if(i&&t){const x=t;t=(...z)=>{x(...z),R()}}let k=m?new Array(e.length).fill(Ir):Ir;const M=x=>{if(!(!(l.flags&1)||!l.dirty&&!x))if(t){const z=l.run();if(s||v||(m?z.some((J,Q)=>ut(J,k[Q])):ut(z,k))){d&&d();const J=Jt;Jt=l;try{const Q=[z,k===Ir?void 0:m&&k[0]===Ir?[]:k,h];k=z,c?c(t,3,Q):t(...Q)}finally{Jt=J}}}else l.run()};return a&&a(M),l=new Fc(f),l.scheduler=o?()=>o(M,!1):M,h=x=>pd(x,!1,l),d=l.onStop=()=>{const x=es.get(l);if(x){if(c)c(x,4);else for(const z of x)z();es.delete(l)}},t?r?M(!0):k=l.run():o?o(M.bind(null,!0),!0):l.run(),R.pause=l.pause.bind(l),R.resume=l.resume.bind(l),R.stop=R,R}function Et(e,t=1/0,n){if(t<=0||!re(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,ke(e))Et(e.value,t,n);else if(K(e))for(let r=0;r<e.length;r++)Et(e[r],t,n);else if(Cc(e)||yn(e))e.forEach(r=>{Et(r,t,n)});else if(jc(e)){for(const r in e)Et(e[r],t,n);for(const r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&Et(e[r],t,n)}return e}/**
* @vue/runtime-core v3.5.31
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function vr(e,t,n,r){try{return r?e(...r):e()}catch(s){bs(s,t,n)}}function pt(e,t,n,r){if($(e)){const s=vr(e,t,n,r);return s&&Ic(s)&&s.catch(i=>{bs(i,t,n)}),s}if(K(e)){const s=[];for(let i=0;i<e.length;i++)s.push(pt(e[i],t,n,r));return s}}function bs(e,t,n,r=!0){const s=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||ie;if(t){let a=t.parent;const c=t.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const l=a.ec;if(l){for(let f=0;f<l.length;f++)if(l[f](e,c,u)===!1)return}a=a.parent}if(i){xt(),vr(i,null,10,[e,c,u]),Ct();return}}md(e,n,s,r,o)}function md(e,t,n,r=!0,s=!1){if(s)throw e;console.error(e)}const Ie=[];let ot=-1;const bn=[];let Lt=null,hn=0;const ru=Promise.resolve();let ts=null;function su(e){const t=ts||ru;return e?t.then(this?e.bind(this):e):t}function vd(e){let t=ot+1,n=Ie.length;for(;t<n;){const r=t+n>>>1,s=Ie[r],i=cr(s);i<e||i===e&&s.flags&2?t=r+1:n=r}return t}function oo(e){if(!(e.flags&1)){const t=cr(e),n=Ie[Ie.length-1];!n||!(e.flags&2)&&t>=cr(n)?Ie.push(e):Ie.splice(vd(t),0,e),e.flags|=1,iu()}}function iu(){ts||(ts=ru.then(au))}function yd(e){K(e)?bn.push(...e):Lt&&e.id===-1?Lt.splice(hn+1,0,e):e.flags&1||(bn.push(e),e.flags|=1),iu()}function da(e,t,n=ot+1){for(;n<Ie.length;n++){const r=Ie[n];if(r&&r.flags&2){if(e&&r.id!==e.uid)continue;Ie.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function ou(e){if(bn.length){const t=[...new Set(bn)].sort((n,r)=>cr(n)-cr(r));if(bn.length=0,Lt){Lt.push(...t);return}for(Lt=t,hn=0;hn<Lt.length;hn++){const n=Lt[hn];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Lt=null,hn=0}}const cr=e=>e.id==null?e.flags&2?-1:1/0:e.id;function au(e){try{for(ot=0;ot<Ie.length;ot++){const t=Ie[ot];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),vr(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;ot<Ie.length;ot++){const t=Ie[ot];t&&(t.flags&=-2)}ot=-1,Ie.length=0,ou(),ts=null,(Ie.length||bn.length)&&au()}}let We=null,cu=null;function ns(e){const t=We;return We=e,cu=e&&e.type.__scopeId||null,t}function ao(e,t=We,n){if(!t||e._n)return e;const r=(...s)=>{r._d&&is(-1);const i=ns(t);let o;try{o=e(...s)}finally{ns(i),r._d&&is(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function Hn(e,t){if(We===null)return e;const n=Os(We),r=e.dirs||(e.dirs=[]);for(let s=0;s<t.length;s++){let[i,o,a,c=ie]=t[s];i&&($(i)&&(i={mounted:i,updated:i}),i.deep&&Et(o),r.push({dir:i,instance:n,value:o,oldValue:void 0,arg:a,modifiers:c}))}return e}function Gt(e,t,n,r){const s=e.dirs,i=t&&t.dirs;for(let o=0;o<s.length;o++){const a=s[o];i&&(a.oldValue=i[o].value);let c=a.dir[r];c&&(xt(),pt(c,n,8,[e.el,a,e,t]),Ct())}}function Br(e,t){if(Ae){let n=Ae.provides;const r=Ae.parent&&Ae.parent.provides;r===n&&(n=Ae.provides=Object.create(r)),n[e]=t}}function dt(e,t,n=!1){const r=vh();if(r||_n){let s=_n?_n._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&e in s)return s[e];if(arguments.length>1)return n&&$(t)?t.call(r&&r.proxy):t}}const wd=Symbol.for("v-scx"),bd=()=>dt(wd);function qr(e,t,n){return uu(e,t,n)}function uu(e,t,n=ie){const{immediate:r,deep:s,flush:i,once:o}=n,a=Te({},n),c=t&&r||!t&&i!=="post";let u;if(lr){if(i==="sync"){const h=bd();u=h.__watcherHandles||(h.__watcherHandles=[])}else if(!c){const h=()=>{};return h.stop=ft,h.resume=ft,h.pause=ft,h}}const l=Ae;a.call=(h,v,m)=>pt(h,l,v,m);let f=!1;i==="post"?a.scheduler=h=>{Ue(h,l&&l.suspense)}:i!=="sync"&&(f=!0,a.scheduler=(h,v)=>{v?h():oo(h)}),a.augmentJob=h=>{t&&(h.flags|=4),f&&(h.flags|=2,l&&(h.id=l.uid,h.i=l))};const d=gd(e,t,a);return lr&&(u?u.push(d):c&&d()),d}function _d(e,t,n){const r=this.proxy,s=ge(e)?e.includes(".")?lu(r,e):()=>r[e]:e.bind(r,r);let i;$(t)?i=t:(i=t.handler,n=t);const o=yr(this),a=uu(s,i.bind(r),n);return o(),a}function lu(e,t){const n=t.split(".");return()=>{let r=e;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const Td=Symbol("_vte"),Sd=e=>e.__isTeleport,Od=Symbol("_leaveCb");function co(e,t){e.shapeFlag&6&&e.component?(e.transition=t,co(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function fu(e,t){return $(e)?Te({name:e.name},t,{setup:e}):e}function du(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function ha(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}const rs=new WeakMap;function Qn(e,t,n,r,s=!1){if(K(e)){e.forEach((m,O)=>Qn(m,t&&(K(t)?t[O]:t),n,r,s));return}if(Yn(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&Qn(e,t,n,r.component.subTree);return}const i=r.shapeFlag&4?Os(r.component):r.el,o=s?null:i,{i:a,r:c}=e,u=t&&t.r,l=a.refs===ie?a.refs={}:a.refs,f=a.setupState,d=te(f),h=f===ie?xc:m=>ha(l,m)?!1:ne(d,m),v=(m,O)=>!(O&&ha(l,O));if(u!=null&&u!==c){if(pa(t),ge(u))l[u]=null,h(u)&&(f[u]=null);else if(ke(u)){const m=t;v(u,m.k)&&(u.value=null),m.k&&(l[m.k]=null)}}if($(c))vr(c,a,12,[o,l]);else{const m=ge(c),O=ke(c);if(m||O){const R=()=>{if(e.f){const k=m?h(c)?f[c]:l[c]:v()||!e.k?c.value:l[e.k];if(s)K(k)&&zi(k,i);else if(K(k))k.includes(i)||k.push(i);else if(m)l[c]=[i],h(c)&&(f[c]=l[c]);else{const M=[i];v(c,e.k)&&(c.value=M),e.k&&(l[e.k]=M)}}else m?(l[c]=o,h(c)&&(f[c]=o)):O&&(v(c,e.k)&&(c.value=o),e.k&&(l[e.k]=o))};if(o){const k=()=>{R(),rs.delete(e)};k.id=-1,rs.set(e,k),Ue(k,n)}else pa(e),R()}}}function pa(e){const t=rs.get(e);t&&(t.flags|=8,rs.delete(e))}ms().requestIdleCallback;ms().cancelIdleCallback;const Yn=e=>!!e.type.__asyncLoader,hu=e=>e.type.__isKeepAlive;function Ed(e,t){pu(e,"a",t)}function Ad(e,t){pu(e,"da",t)}function pu(e,t,n=Ae){const r=e.__wdc||(e.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return e()});if(_s(t,r,n),n){let s=n.parent;for(;s&&s.parent;)hu(s.parent.vnode)&&kd(r,t,n,s),s=s.parent}}function kd(e,t,n,r){const s=_s(t,e,r,!0);vu(()=>{zi(r[t],s)},n)}function _s(e,t,n=Ae,r=!1){if(n){const s=n[e]||(n[e]=[]),i=t.__weh||(t.__weh=(...o)=>{xt();const a=yr(n),c=pt(t,n,e,o);return a(),Ct(),c});return r?s.unshift(i):s.push(i),i}}const jt=e=>(t,n=Ae)=>{(!lr||e==="sp")&&_s(e,(...r)=>t(...r),n)},gu=jt("bm"),uo=jt("m"),Pd=jt("bu"),Rd=jt("u"),mu=jt("bum"),vu=jt("um"),xd=jt("sp"),Cd=jt("rtg"),Id=jt("rtc");function Md(e,t=Ae){_s("ec",e,t)}const jd="components";function lo(e,t){return Dd(jd,e,!0,t)||e}const Nd=Symbol.for("v-ndc");function Dd(e,t,n=!0,r=!1){const s=We||Ae;if(s){const i=s.type;{const a=Th(i,!1);if(a&&(a===t||a===Ne(t)||a===gs(Ne(t))))return i}const o=ga(s[e]||i[e],t)||ga(s.appContext[e],t);return!o&&r?i:o}}function ga(e,t){return e&&(e[t]||e[Ne(t)]||e[gs(Ne(t))])}function Ud(e,t,n,r){let s;const i=n,o=K(e);if(o||ge(e)){const a=o&&rn(e);let c=!1,u=!1;a&&(c=!Je(e),u=It(e),e=ys(e)),s=new Array(e.length);for(let l=0,f=e.length;l<f;l++)s[l]=t(c?u?En(et(e[l])):et(e[l]):e[l],l,void 0,i)}else if(typeof e=="number"){s=new Array(e);for(let a=0;a<e;a++)s[a]=t(a+1,a,void 0,i)}else if(re(e))if(e[Symbol.iterator])s=Array.from(e,(a,c)=>t(a,c,void 0,i));else{const a=Object.keys(e);s=new Array(a.length);for(let c=0,u=a.length;c<u;c++){const l=a[c];s[c]=t(e[l],l,c,i)}}else s=[];return s}const gi=e=>e?Lu(e)?Os(e):gi(e.parent):null,Xn=Te(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>gi(e.parent),$root:e=>gi(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>wu(e),$forceUpdate:e=>e.f||(e.f=()=>{oo(e.update)}),$nextTick:e=>e.n||(e.n=su.bind(e.proxy)),$watch:e=>_d.bind(e)}),zs=(e,t)=>e!==ie&&!e.__isScriptSetup&&ne(e,t),Ld={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:a,appContext:c}=e;if(t[0]!=="$"){const d=o[t];if(d!==void 0)switch(d){case 1:return r[t];case 2:return s[t];case 4:return n[t];case 3:return i[t]}else{if(zs(r,t))return o[t]=1,r[t];if(s!==ie&&ne(s,t))return o[t]=2,s[t];if(ne(i,t))return o[t]=3,i[t];if(n!==ie&&ne(n,t))return o[t]=4,n[t];mi&&(o[t]=0)}}const u=Xn[t];let l,f;if(u)return t==="$attrs"&&Ee(e.attrs,"get",""),u(e);if((l=a.__cssModules)&&(l=l[t]))return l;if(n!==ie&&ne(n,t))return o[t]=4,n[t];if(f=c.config.globalProperties,ne(f,t))return f[t]},set({_:e},t,n){const{data:r,setupState:s,ctx:i}=e;return zs(s,t)?(s[t]=n,!0):r!==ie&&ne(r,t)?(r[t]=n,!0):ne(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(i[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:s,props:i,type:o}},a){let c;return!!(n[a]||e!==ie&&a[0]!=="$"&&ne(e,a)||zs(t,a)||ne(i,a)||ne(r,a)||ne(Xn,a)||ne(s.config.globalProperties,a)||(c=o.__cssModules)&&c[a])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:ne(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function ma(e){return K(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let mi=!0;function Fd(e){const t=wu(e),n=e.proxy,r=e.ctx;mi=!1,t.beforeCreate&&va(t.beforeCreate,e,"bc");const{data:s,computed:i,methods:o,watch:a,provide:c,inject:u,created:l,beforeMount:f,mounted:d,beforeUpdate:h,updated:v,activated:m,deactivated:O,beforeDestroy:R,beforeUnmount:k,destroyed:M,unmounted:x,render:z,renderTracked:J,renderTriggered:Q,errorCaptured:ve,serverPrefetch:le,expose:De,inheritAttrs:fe,components:ce,directives:Ge,filters:vt}=t;if(u&&Vd(u,r,null),o)for(const U in o){const F=o[U];$(F)&&(r[U]=F.bind(n))}if(s){const U=s.call(n,n);re(U)&&(e.data=ws(U))}if(mi=!0,i)for(const U in i){const F=i[U],X=$(F)?F.bind(n,n):$(F.get)?F.get.bind(n,n):ft,W=!$(F)&&$(F.set)?F.set.bind(n):ft,Pe=Xe({get:X,set:W});Object.defineProperty(r,U,{enumerable:!0,configurable:!0,get:()=>Pe.value,set:ye=>Pe.value=ye})}if(a)for(const U in a)yu(a[U],r,n,U);if(c){const U=$(c)?c.call(n):c;Reflect.ownKeys(U).forEach(F=>{Br(F,U[F])})}l&&va(l,e,"c");function E(U,F){K(F)?F.forEach(X=>U(X.bind(n))):F&&U(F.bind(n))}if(E(gu,f),E(uo,d),E(Pd,h),E(Rd,v),E(Ed,m),E(Ad,O),E(Md,ve),E(Id,J),E(Cd,Q),E(mu,k),E(vu,x),E(xd,le),K(De))if(De.length){const U=e.exposed||(e.exposed={});De.forEach(F=>{Object.defineProperty(U,F,{get:()=>n[F],set:X=>n[F]=X,enumerable:!0})})}else e.exposed||(e.exposed={});z&&e.render===ft&&(e.render=z),fe!=null&&(e.inheritAttrs=fe),ce&&(e.components=ce),Ge&&(e.directives=Ge),le&&du(e)}function Vd(e,t,n=ft){K(e)&&(e=vi(e));for(const r in e){const s=e[r];let i;re(s)?"default"in s?i=dt(s.from||r,s.default,!0):i=dt(s.from||r):i=dt(s),ke(i)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):t[r]=i}}function va(e,t,n){pt(K(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function yu(e,t,n,r){let s=r.includes(".")?lu(n,r):()=>n[r];if(ge(e)){const i=t[e];$(i)&&qr(s,i)}else if($(e))qr(s,e.bind(n));else if(re(e))if(K(e))e.forEach(i=>yu(i,t,n,r));else{const i=$(e.handler)?e.handler.bind(n):t[e.handler];$(i)&&qr(s,i,e)}}function wu(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=e.appContext,a=i.get(t);let c;return a?c=a:!s.length&&!n&&!r?c=t:(c={},s.length&&s.forEach(u=>ss(c,u,o,!0)),ss(c,t,o)),re(t)&&i.set(t,c),c}function ss(e,t,n,r=!1){const{mixins:s,extends:i}=t;i&&ss(e,i,n,!0),s&&s.forEach(o=>ss(e,o,n,!0));for(const o in t)if(!(r&&o==="expose")){const a=Hd[o]||n&&n[o];e[o]=a?a(e[o],t[o]):t[o]}return e}const Hd={data:ya,props:wa,emits:wa,methods:Bn,computed:Bn,beforeCreate:xe,created:xe,beforeMount:xe,mounted:xe,beforeUpdate:xe,updated:xe,beforeDestroy:xe,beforeUnmount:xe,destroyed:xe,unmounted:xe,activated:xe,deactivated:xe,errorCaptured:xe,serverPrefetch:xe,components:Bn,directives:Bn,watch:qd,provide:ya,inject:Bd};function ya(e,t){return t?e?function(){return Te($(e)?e.call(this,this):e,$(t)?t.call(this,this):t)}:t:e}function Bd(e,t){return Bn(vi(e),vi(t))}function vi(e){if(K(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function xe(e,t){return e?[...new Set([].concat(e,t))]:t}function Bn(e,t){return e?Te(Object.create(null),e,t):t}function wa(e,t){return e?K(e)&&K(t)?[...new Set([...e,...t])]:Te(Object.create(null),ma(e),ma(t??{})):t}function qd(e,t){if(!e)return t;if(!t)return e;const n=Te(Object.create(null),e);for(const r in t)n[r]=xe(e[r],t[r]);return n}function bu(){return{app:null,config:{isNativeTag:xc,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Kd=0;function Wd(e,t){return function(r,s=null){$(r)||(r=Te({},r)),s!=null&&!re(s)&&(s=null);const i=bu(),o=new WeakSet,a=[];let c=!1;const u=i.app={_uid:Kd++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:Oh,get config(){return i.config},set config(l){},use(l,...f){return o.has(l)||(l&&$(l.install)?(o.add(l),l.install(u,...f)):$(l)&&(o.add(l),l(u,...f))),u},mixin(l){return i.mixins.includes(l)||i.mixins.push(l),u},component(l,f){return f?(i.components[l]=f,u):i.components[l]},directive(l,f){return f?(i.directives[l]=f,u):i.directives[l]},mount(l,f,d){if(!c){const h=u._ceVNode||je(r,s);return h.appContext=i,d===!0?d="svg":d===!1&&(d=void 0),e(h,l,d),c=!0,u._container=l,l.__vue_app__=u,Os(h.component)}},onUnmount(l){a.push(l)},unmount(){c&&(pt(a,u._instance,16),e(null,u._container),delete u._container.__vue_app__)},provide(l,f){return i.provides[l]=f,u},runWithContext(l){const f=_n;_n=u;try{return l()}finally{_n=f}}};return u}}let _n=null;const $d=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${Ne(t)}Modifiers`]||e[`${un(t)}Modifiers`];function Gd(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||ie;let s=n;const i=t.startsWith("update:"),o=i&&$d(r,t.slice(7));o&&(o.trim&&(s=n.map(l=>ge(l)?l.trim():l)),o.number&&(s=n.map(Qi)));let a,c=r[a=qs(t)]||r[a=qs(Ne(t))];!c&&i&&(c=r[a=qs(un(t))]),c&&pt(c,e,6,s);const u=r[a+"Once"];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,pt(u,e,6,s)}}const zd=new WeakMap;function _u(e,t,n=!1){const r=n?zd:t.emitsCache,s=r.get(e);if(s!==void 0)return s;const i=e.emits;let o={},a=!1;if(!$(e)){const c=u=>{const l=_u(u,t,!0);l&&(a=!0,Te(o,l))};!n&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}return!i&&!a?(re(e)&&r.set(e,null),null):(K(i)?i.forEach(c=>o[c]=null):Te(o,i),re(e)&&r.set(e,o),o)}function Ts(e,t){return!e||!ds(t)?!1:(t=t.slice(2).replace(/Once$/,""),ne(e,t[0].toLowerCase()+t.slice(1))||ne(e,un(t))||ne(e,t))}function ba(e){const{type:t,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:o,attrs:a,emit:c,render:u,renderCache:l,props:f,data:d,setupState:h,ctx:v,inheritAttrs:m}=e,O=ns(e);let R,k;try{if(n.shapeFlag&4){const x=s||r,z=x;R=ct(u.call(z,x,l,f,h,d,v)),k=a}else{const x=t;R=ct(x.length>1?x(f,{attrs:a,slots:o,emit:c}):x(f,null)),k=t.props?a:Jd(a)}}catch(x){Zn.length=0,bs(x,e,1),R=je(Bt)}let M=R;if(k&&m!==!1){const x=Object.keys(k),{shapeFlag:z}=M;x.length&&z&7&&(i&&x.some(hs)&&(k=Qd(k,i)),M=An(M,k,!1,!0))}return n.dirs&&(M=An(M,null,!1,!0),M.dirs=M.dirs?M.dirs.concat(n.dirs):n.dirs),n.transition&&co(M,n.transition),R=M,ns(O),R}const Jd=e=>{let t;for(const n in e)(n==="class"||n==="style"||ds(n))&&((t||(t={}))[n]=e[n]);return t},Qd=(e,t)=>{const n={};for(const r in e)(!hs(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function Yd(e,t,n){const{props:r,children:s,component:i}=e,{props:o,children:a,patchFlag:c}=t,u=i.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?_a(r,o,u):!!o;if(c&8){const l=t.dynamicProps;for(let f=0;f<l.length;f++){const d=l[f];if(Tu(o,r,d)&&!Ts(u,d))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:r===o?!1:r?o?_a(r,o,u):!0:!!o;return!1}function _a(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(Tu(t,e,i)&&!Ts(n,i))return!0}return!1}function Tu(e,t,n){const r=e[n],s=t[n];return n==="style"&&re(r)&&re(s)?!Xi(r,s):r!==s}function Xd({vnode:e,parent:t,suspense:n},r){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===e&&(s.suspense.vnode.el=s.el=r,e=s),s===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}const Su={},Ou=()=>Object.create(Su),Eu=e=>Object.getPrototypeOf(e)===Su;function Zd(e,t,n,r=!1){const s={},i=Ou();e.propsDefaults=Object.create(null),Au(e,t,s,i);for(const o in e.propsOptions[0])o in s||(s[o]=void 0);n?e.props=r?s:Zc(s):e.type.props?e.props=s:e.props=i,e.attrs=i}function eh(e,t,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=e,a=te(s),[c]=e.propsOptions;let u=!1;if((r||o>0)&&!(o&16)){if(o&8){const l=e.vnode.dynamicProps;for(let f=0;f<l.length;f++){let d=l[f];if(Ts(e.emitsOptions,d))continue;const h=t[d];if(c)if(ne(i,d))h!==i[d]&&(i[d]=h,u=!0);else{const v=Ne(d);s[v]=yi(c,a,v,h,e,!1)}else h!==i[d]&&(i[d]=h,u=!0)}}}else{Au(e,t,s,i)&&(u=!0);let l;for(const f in a)(!t||!ne(t,f)&&((l=un(f))===f||!ne(t,l)))&&(c?n&&(n[f]!==void 0||n[l]!==void 0)&&(s[f]=yi(c,a,f,void 0,e,!0)):delete s[f]);if(i!==a)for(const f in i)(!t||!ne(t,f))&&(delete i[f],u=!0)}u&&Ot(e.attrs,"set","")}function Au(e,t,n,r){const[s,i]=e.propsOptions;let o=!1,a;if(t)for(let c in t){if(Gn(c))continue;const u=t[c];let l;s&&ne(s,l=Ne(c))?!i||!i.includes(l)?n[l]=u:(a||(a={}))[l]=u:Ts(e.emitsOptions,c)||(!(c in r)||u!==r[c])&&(r[c]=u,o=!0)}if(i){const c=te(n),u=a||ie;for(let l=0;l<i.length;l++){const f=i[l];n[f]=yi(s,c,f,u[f],e,!ne(u,f))}}return o}function yi(e,t,n,r,s,i){const o=e[n];if(o!=null){const a=ne(o,"default");if(a&&r===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&$(c)){const{propsDefaults:u}=s;if(n in u)r=u[n];else{const l=yr(s);r=u[n]=c.call(null,t),l()}}else r=c;s.ce&&s.ce._setProp(n,r)}o[0]&&(i&&!a?r=!1:o[1]&&(r===""||r===un(n))&&(r=!0))}return r}const th=new WeakMap;function ku(e,t,n=!1){const r=n?th:t.propsCache,s=r.get(e);if(s)return s;const i=e.props,o={},a=[];let c=!1;if(!$(e)){const l=f=>{c=!0;const[d,h]=ku(f,t,!0);Te(o,d),h&&a.push(...h)};!n&&t.mixins.length&&t.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}if(!i&&!c)return re(e)&&r.set(e,vn),vn;if(K(i))for(let l=0;l<i.length;l++){const f=Ne(i[l]);Ta(f)&&(o[f]=ie)}else if(i)for(const l in i){const f=Ne(l);if(Ta(f)){const d=i[l],h=o[f]=K(d)||$(d)?{type:d}:Te({},d),v=h.type;let m=!1,O=!0;if(K(v))for(let R=0;R<v.length;++R){const k=v[R],M=$(k)&&k.name;if(M==="Boolean"){m=!0;break}else M==="String"&&(O=!1)}else m=$(v)&&v.name==="Boolean";h[0]=m,h[1]=O,(m||ne(h,"default"))&&a.push(f)}}const u=[o,a];return re(e)&&r.set(e,u),u}function Ta(e){return e[0]!=="$"&&!Gn(e)}const fo=e=>e==="_"||e==="_ctx"||e==="$stable",ho=e=>K(e)?e.map(ct):[ct(e)],nh=(e,t,n)=>{if(t._n)return t;const r=ao((...s)=>ho(t(...s)),n);return r._c=!1,r},Pu=(e,t,n)=>{const r=e._ctx;for(const s in e){if(fo(s))continue;const i=e[s];if($(i))t[s]=nh(s,i,r);else if(i!=null){const o=ho(i);t[s]=()=>o}}},Ru=(e,t)=>{const n=ho(t);e.slots.default=()=>n},xu=(e,t,n)=>{for(const r in t)(n||!fo(r))&&(e[r]=t[r])},rh=(e,t,n)=>{const r=e.slots=Ou();if(e.vnode.shapeFlag&32){const s=t._;s?(xu(r,t,n),n&&Nc(r,"_",s,!0)):Pu(t,r)}else t&&Ru(e,t)},sh=(e,t,n)=>{const{vnode:r,slots:s}=e;let i=!0,o=ie;if(r.shapeFlag&32){const a=t._;a?n&&a===1?i=!1:xu(s,t,n):(i=!t.$stable,Pu(t,s)),o=t}else t&&(Ru(e,t),o={default:1});if(i)for(const a in s)!fo(a)&&o[a]==null&&delete s[a]},Ue=uh;function ih(e){return oh(e)}function oh(e,t){const n=ms();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:a,createComment:c,setText:u,setElementText:l,parentNode:f,nextSibling:d,setScopeId:h=ft,insertStaticContent:v}=e,m=(p,g,y,b=null,A=null,T=null,j=void 0,I=null,C=!!g.dynamicChildren)=>{if(p===g)return;p&&!Fn(p,g)&&(b=S(p),ye(p,A,T,!0),p=null),g.patchFlag===-2&&(C=!1,g.dynamicChildren=null);const{type:P,ref:B,shapeFlag:D}=g;switch(P){case Ss:O(p,g,y,b);break;case Bt:R(p,g,y,b);break;case Qs:p==null&&k(g,y,b,j);break;case Fe:ce(p,g,y,b,A,T,j,I,C);break;default:D&1?z(p,g,y,b,A,T,j,I,C):D&6?Ge(p,g,y,b,A,T,j,I,C):(D&64||D&128)&&P.process(p,g,y,b,A,T,j,I,C,V)}B!=null&&A?Qn(B,p&&p.ref,T,g||p,!g):B==null&&p&&p.ref!=null&&Qn(p.ref,null,T,p,!0)},O=(p,g,y,b)=>{if(p==null)r(g.el=a(g.children),y,b);else{const A=g.el=p.el;g.children!==p.children&&u(A,g.children)}},R=(p,g,y,b)=>{p==null?r(g.el=c(g.children||""),y,b):g.el=p.el},k=(p,g,y,b)=>{[p.el,p.anchor]=v(p.children,g,y,b,p.el,p.anchor)},M=({el:p,anchor:g},y,b)=>{let A;for(;p&&p!==g;)A=d(p),r(p,y,b),p=A;r(g,y,b)},x=({el:p,anchor:g})=>{let y;for(;p&&p!==g;)y=d(p),s(p),p=y;s(g)},z=(p,g,y,b,A,T,j,I,C)=>{if(g.type==="svg"?j="svg":g.type==="math"&&(j="mathml"),p==null)J(g,y,b,A,T,j,I,C);else{const P=p.el&&p.el._isVueCE?p.el:null;try{P&&P._beginPatch(),le(p,g,A,T,j,I,C)}finally{P&&P._endPatch()}}},J=(p,g,y,b,A,T,j,I)=>{let C,P;const{props:B,shapeFlag:D,transition:H,dirs:q}=p;if(C=p.el=o(p.type,T,B&&B.is,B),D&8?l(C,p.children):D&16&&ve(p.children,C,null,b,A,Js(p,T),j,I),q&&Gt(p,null,b,"created"),Q(C,p,p.scopeId,j,b),B){for(const se in B)se!=="value"&&!Gn(se)&&i(C,se,null,B[se],T,b);"value"in B&&i(C,"value",null,B.value,T),(P=B.onVnodeBeforeMount)&&it(P,b,p)}q&&Gt(p,null,b,"beforeMount");const Z=ah(A,H);Z&&H.beforeEnter(C),r(C,g,y),((P=B&&B.onVnodeMounted)||Z||q)&&Ue(()=>{try{P&&it(P,b,p),Z&&H.enter(C),q&&Gt(p,null,b,"mounted")}finally{}},A)},Q=(p,g,y,b,A)=>{if(y&&h(p,y),b)for(let T=0;T<b.length;T++)h(p,b[T]);if(A){let T=A.subTree;if(g===T||ju(T.type)&&(T.ssContent===g||T.ssFallback===g)){const j=A.vnode;Q(p,j,j.scopeId,j.slotScopeIds,A.parent)}}},ve=(p,g,y,b,A,T,j,I,C=0)=>{for(let P=C;P<p.length;P++){const B=p[P]=I?St(p[P]):ct(p[P]);m(null,B,g,y,b,A,T,j,I)}},le=(p,g,y,b,A,T,j)=>{const I=g.el=p.el;let{patchFlag:C,dynamicChildren:P,dirs:B}=g;C|=p.patchFlag&16;const D=p.props||ie,H=g.props||ie;let q;if(y&&zt(y,!1),(q=H.onVnodeBeforeUpdate)&&it(q,y,g,p),B&&Gt(g,p,y,"beforeUpdate"),y&&zt(y,!0),(D.innerHTML&&H.innerHTML==null||D.textContent&&H.textContent==null)&&l(I,""),P?De(p.dynamicChildren,P,I,y,b,Js(g,A),T):j||F(p,g,I,null,y,b,Js(g,A),T,!1),C>0){if(C&16)fe(I,D,H,y,A);else if(C&2&&D.class!==H.class&&i(I,"class",null,H.class,A),C&4&&i(I,"style",D.style,H.style,A),C&8){const Z=g.dynamicProps;for(let se=0;se<Z.length;se++){const oe=Z[se],pe=D[oe],_e=H[oe];(_e!==pe||oe==="value")&&i(I,oe,pe,_e,A,y)}}C&1&&p.children!==g.children&&l(I,g.children)}else!j&&P==null&&fe(I,D,H,y,A);((q=H.onVnodeUpdated)||B)&&Ue(()=>{q&&it(q,y,g,p),B&&Gt(g,p,y,"updated")},b)},De=(p,g,y,b,A,T,j)=>{for(let I=0;I<g.length;I++){const C=p[I],P=g[I],B=C.el&&(C.type===Fe||!Fn(C,P)||C.shapeFlag&198)?f(C.el):y;m(C,P,B,null,b,A,T,j,!0)}},fe=(p,g,y,b,A)=>{if(g!==y){if(g!==ie)for(const T in g)!Gn(T)&&!(T in y)&&i(p,T,g[T],null,A,b);for(const T in y){if(Gn(T))continue;const j=y[T],I=g[T];j!==I&&T!=="value"&&i(p,T,I,j,A,b)}"value"in y&&i(p,"value",g.value,y.value,A)}},ce=(p,g,y,b,A,T,j,I,C)=>{const P=g.el=p?p.el:a(""),B=g.anchor=p?p.anchor:a("");let{patchFlag:D,dynamicChildren:H,slotScopeIds:q}=g;q&&(I=I?I.concat(q):q),p==null?(r(P,y,b),r(B,y,b),ve(g.children||[],y,B,A,T,j,I,C)):D>0&&D&64&&H&&p.dynamicChildren&&p.dynamicChildren.length===H.length?(De(p.dynamicChildren,H,y,A,T,j,I),(g.key!=null||A&&g===A.subTree)&&Cu(p,g,!0)):F(p,g,y,B,A,T,j,I,C)},Ge=(p,g,y,b,A,T,j,I,C)=>{g.slotScopeIds=I,p==null?g.shapeFlag&512?A.ctx.activate(g,y,b,j,C):vt(g,y,b,A,T,j,C):w(p,g,C)},vt=(p,g,y,b,A,T,j)=>{const I=p.component=mh(p,b,A);if(hu(p)&&(I.ctx.renderer=V),yh(I,!1,j),I.asyncDep){if(A&&A.registerDep(I,E,j),!p.el){const C=I.subTree=je(Bt);R(null,C,g,y),p.placeholder=C.el}}else E(I,p,g,y,A,T,j)},w=(p,g,y)=>{const b=g.component=p.component;if(Yd(p,g,y))if(b.asyncDep&&!b.asyncResolved){U(b,g,y);return}else b.next=g,b.update();else g.el=p.el,b.vnode=g},E=(p,g,y,b,A,T,j)=>{const I=()=>{if(p.isMounted){let{next:D,bu:H,u:q,parent:Z,vnode:se}=p;{const rt=Iu(p);if(rt){D&&(D.el=se.el,U(p,D,j)),rt.asyncDep.then(()=>{Ue(()=>{p.isUnmounted||P()},A)});return}}let oe=D,pe;zt(p,!1),D?(D.el=se.el,U(p,D,j)):D=se,H&&Hr(H),(pe=D.props&&D.props.onVnodeBeforeUpdate)&&it(pe,Z,D,se),zt(p,!0);const _e=ba(p),nt=p.subTree;p.subTree=_e,m(nt,_e,f(nt.el),S(nt),p,A,T),D.el=_e.el,oe===null&&Xd(p,_e.el),q&&Ue(q,A),(pe=D.props&&D.props.onVnodeUpdated)&&Ue(()=>it(pe,Z,D,se),A)}else{let D;const{el:H,props:q}=g,{bm:Z,m:se,parent:oe,root:pe,type:_e}=p,nt=Yn(g);zt(p,!1),Z&&Hr(Z),!nt&&(D=q&&q.onVnodeBeforeMount)&&it(D,oe,g),zt(p,!0);{pe.ce&&pe.ce._hasShadowRoot()&&pe.ce._injectChildStyle(_e,p.parent?p.parent.type:void 0);const rt=p.subTree=ba(p);m(null,rt,y,b,p,A,T),g.el=rt.el}if(se&&Ue(se,A),!nt&&(D=q&&q.onVnodeMounted)){const rt=g;Ue(()=>it(D,oe,rt),A)}(g.shapeFlag&256||oe&&Yn(oe.vnode)&&oe.vnode.shapeFlag&256)&&p.a&&Ue(p.a,A),p.isMounted=!0,g=y=b=null}};p.scope.on();const C=p.effect=new Fc(I);p.scope.off();const P=p.update=C.run.bind(C),B=p.job=C.runIfDirty.bind(C);B.i=p,B.id=p.uid,C.scheduler=()=>oo(B),zt(p,!0),P()},U=(p,g,y)=>{g.component=p;const b=p.vnode.props;p.vnode=g,p.next=null,eh(p,g.props,b,y),sh(p,g.children,y),xt(),da(p),Ct()},F=(p,g,y,b,A,T,j,I,C=!1)=>{const P=p&&p.children,B=p?p.shapeFlag:0,D=g.children,{patchFlag:H,shapeFlag:q}=g;if(H>0){if(H&128){W(P,D,y,b,A,T,j,I,C);return}else if(H&256){X(P,D,y,b,A,T,j,I,C);return}}q&8?(B&16&&ze(P,A,T),D!==P&&l(y,D)):B&16?q&16?W(P,D,y,b,A,T,j,I,C):ze(P,A,T,!0):(B&8&&l(y,""),q&16&&ve(D,y,b,A,T,j,I,C))},X=(p,g,y,b,A,T,j,I,C)=>{p=p||vn,g=g||vn;const P=p.length,B=g.length,D=Math.min(P,B);let H;for(H=0;H<D;H++){const q=g[H]=C?St(g[H]):ct(g[H]);m(p[H],q,y,null,A,T,j,I,C)}P>B?ze(p,A,T,!0,!1,D):ve(g,y,b,A,T,j,I,C,D)},W=(p,g,y,b,A,T,j,I,C)=>{let P=0;const B=g.length;let D=p.length-1,H=B-1;for(;P<=D&&P<=H;){const q=p[P],Z=g[P]=C?St(g[P]):ct(g[P]);if(Fn(q,Z))m(q,Z,y,null,A,T,j,I,C);else break;P++}for(;P<=D&&P<=H;){const q=p[D],Z=g[H]=C?St(g[H]):ct(g[H]);if(Fn(q,Z))m(q,Z,y,null,A,T,j,I,C);else break;D--,H--}if(P>D){if(P<=H){const q=H+1,Z=q<B?g[q].el:b;for(;P<=H;)m(null,g[P]=C?St(g[P]):ct(g[P]),y,Z,A,T,j,I,C),P++}}else if(P>H)for(;P<=D;)ye(p[P],A,T,!0),P++;else{const q=P,Z=P,se=new Map;for(P=Z;P<=H;P++){const qe=g[P]=C?St(g[P]):ct(g[P]);qe.key!=null&&se.set(qe.key,P)}let oe,pe=0;const _e=H-Z+1;let nt=!1,rt=0;const Un=new Array(_e);for(P=0;P<_e;P++)Un[P]=0;for(P=q;P<=D;P++){const qe=p[P];if(pe>=_e){ye(qe,A,T,!0);continue}let st;if(qe.key!=null)st=se.get(qe.key);else for(oe=Z;oe<=H;oe++)if(Un[oe-Z]===0&&Fn(qe,g[oe])){st=oe;break}st===void 0?ye(qe,A,T,!0):(Un[st-Z]=P+1,st>=rt?rt=st:nt=!0,m(qe,g[st],y,null,A,T,j,I,C),pe++)}const ia=nt?ch(Un):vn;for(oe=ia.length-1,P=_e-1;P>=0;P--){const qe=Z+P,st=g[qe],oa=g[qe+1],aa=qe+1<B?oa.el||Mu(oa):b;Un[P]===0?m(null,st,y,aa,A,T,j,I,C):nt&&(oe<0||P!==ia[oe]?Pe(st,y,aa,2):oe--)}}},Pe=(p,g,y,b,A=null)=>{const{el:T,type:j,transition:I,children:C,shapeFlag:P}=p;if(P&6){Pe(p.component.subTree,g,y,b);return}if(P&128){p.suspense.move(g,y,b);return}if(P&64){j.move(p,g,y,V);return}if(j===Fe){r(T,g,y);for(let D=0;D<C.length;D++)Pe(C[D],g,y,b);r(p.anchor,g,y);return}if(j===Qs){M(p,g,y);return}if(b!==2&&P&1&&I)if(b===0)I.beforeEnter(T),r(T,g,y),Ue(()=>I.enter(T),A);else{const{leave:D,delayLeave:H,afterLeave:q}=I,Z=()=>{p.ctx.isUnmounted?s(T):r(T,g,y)},se=()=>{T._isLeaving&&T[Od](!0),D(T,()=>{Z(),q&&q()})};H?H(T,Z,se):se()}else r(T,g,y)},ye=(p,g,y,b=!1,A=!1)=>{const{type:T,props:j,ref:I,children:C,dynamicChildren:P,shapeFlag:B,patchFlag:D,dirs:H,cacheIndex:q,memo:Z}=p;if(D===-2&&(A=!1),I!=null&&(xt(),Qn(I,null,y,p,!0),Ct()),q!=null&&(g.renderCache[q]=void 0),B&256){g.ctx.deactivate(p);return}const se=B&1&&H,oe=!Yn(p);let pe;if(oe&&(pe=j&&j.onVnodeBeforeUnmount)&&it(pe,g,p),B&6)Re(p.component,y,b);else{if(B&128){p.suspense.unmount(y,b);return}se&&Gt(p,null,g,"beforeUnmount"),B&64?p.type.remove(p,g,y,V,b):P&&!P.hasOnce&&(T!==Fe||D>0&&D&64)?ze(P,g,y,!1,!0):(T===Fe&&D&384||!A&&B&16)&&ze(C,g,y),b&&yt(p)}const _e=Z!=null&&q==null;(oe&&(pe=j&&j.onVnodeUnmounted)||se||_e)&&Ue(()=>{pe&&it(pe,g,p),se&&Gt(p,null,g,"unmounted"),_e&&(p.el=null)},y)},yt=p=>{const{type:g,el:y,anchor:b,transition:A}=p;if(g===Fe){ue(y,b);return}if(g===Qs){x(p);return}const T=()=>{s(y),A&&!A.persisted&&A.afterLeave&&A.afterLeave()};if(p.shapeFlag&1&&A&&!A.persisted){const{leave:j,delayLeave:I}=A,C=()=>j(y,T);I?I(p.el,T,C):C()}else T()},ue=(p,g)=>{let y;for(;p!==g;)y=d(p),s(p),p=y;s(g)},Re=(p,g,y)=>{const{bum:b,scope:A,job:T,subTree:j,um:I,m:C,a:P}=p;Sa(C),Sa(P),b&&Hr(b),A.stop(),T&&(T.flags|=8,ye(j,p,g,y)),I&&Ue(I,g),Ue(()=>{p.isUnmounted=!0},g)},ze=(p,g,y,b=!1,A=!1,T=0)=>{for(let j=T;j<p.length;j++)ye(p[j],g,y,b,A)},S=p=>{if(p.shapeFlag&6)return S(p.component.subTree);if(p.shapeFlag&128)return p.suspense.next();const g=d(p.anchor||p.el),y=g&&g[Td];return y?d(y):g};let L=!1;const N=(p,g,y)=>{let b;p==null?g._vnode&&(ye(g._vnode,null,null,!0),b=g._vnode.component):m(g._vnode||null,p,g,null,null,null,y),g._vnode=p,L||(L=!0,da(b),ou(),L=!1)},V={p:m,um:ye,m:Pe,r:yt,mt:vt,mc:ve,pc:F,pbc:De,n:S,o:e};return{render:N,hydrate:void 0,createApp:Wd(N)}}function Js({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function zt({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function ah(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Cu(e,t,n=!1){const r=e.children,s=t.children;if(K(r)&&K(s))for(let i=0;i<r.length;i++){const o=r[i];let a=s[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[i]=St(s[i]),a.el=o.el),!n&&a.patchFlag!==-2&&Cu(o,a)),a.type===Ss&&(a.patchFlag===-1&&(a=s[i]=St(a)),a.el=o.el),a.type===Bt&&!a.el&&(a.el=o.el)}}function ch(e){const t=e.slice(),n=[0];let r,s,i,o,a;const c=e.length;for(r=0;r<c;r++){const u=e[r];if(u!==0){if(s=n[n.length-1],e[s]<u){t[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)a=i+o>>1,e[n[a]]<u?i=a+1:o=a;u<e[n[i]]&&(i>0&&(t[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=t[o];return n}function Iu(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Iu(t)}function Sa(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function Mu(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?Mu(t.subTree):null}const ju=e=>e.__isSuspense;function uh(e,t){t&&t.pendingBranch?K(e)?t.effects.push(...e):t.effects.push(e):yd(e)}const Fe=Symbol.for("v-fgt"),Ss=Symbol.for("v-txt"),Bt=Symbol.for("v-cmt"),Qs=Symbol.for("v-stc"),Zn=[];let $e=null;function we(e=!1){Zn.push($e=e?null:[])}function lh(){Zn.pop(),$e=Zn[Zn.length-1]||null}let ur=1;function is(e,t=!1){ur+=e,e<0&&$e&&t&&($e.hasOnce=!0)}function Nu(e){return e.dynamicChildren=ur>0?$e||vn:null,lh(),ur>0&&$e&&$e.push(e),e}function Se(e,t,n,r,s,i){return Nu(G(e,t,n,r,s,i,!0))}function Du(e,t,n,r,s){return Nu(je(e,t,n,r,s,!0))}function os(e){return e?e.__v_isVNode===!0:!1}function Fn(e,t){return e.type===t.type&&e.key===t.key}const Uu=({key:e})=>e??null,Kr=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?ge(e)||ke(e)||$(e)?{i:We,r:e,k:t,f:!!n}:e:null);function G(e,t=null,n=null,r=0,s=null,i=e===Fe?0:1,o=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Uu(t),ref:t&&Kr(t),scopeId:cu,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:We};return a?(po(c,n),i&128&&e.normalize(c)):n&&(c.shapeFlag|=ge(n)?8:16),ur>0&&!o&&$e&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&$e.push(c),c}const je=fh;function fh(e,t=null,n=null,r=0,s=null,i=!1){if((!e||e===Nd)&&(e=Bt),os(e)){const a=An(e,t,!0);return n&&po(a,n),ur>0&&!i&&$e&&(a.shapeFlag&6?$e[$e.indexOf(e)]=a:$e.push(a)),a.patchFlag=-2,a}if(Sh(e)&&(e=e.__vccOpts),t){t=dh(t);let{class:a,style:c}=t;a&&!ge(a)&&(t.class=vs(a)),re(c)&&(io(c)&&!K(c)&&(c=Te({},c)),t.style=Yi(c))}const o=ge(e)?1:ju(e)?128:Sd(e)?64:re(e)?4:$(e)?2:0;return G(e,t,n,r,s,o,i,!0)}function dh(e){return e?io(e)||Eu(e)?Te({},e):e:null}function An(e,t,n=!1,r=!1){const{props:s,ref:i,patchFlag:o,children:a,transition:c}=e,u=t?hh(s||{},t):s,l={__v_isVNode:!0,__v_skip:!0,type:e.type,props:u,key:u&&Uu(u),ref:t&&t.ref?n&&i?K(i)?i.concat(Kr(t)):[i,Kr(t)]:Kr(t):i,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Fe?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&An(e.ssContent),ssFallback:e.ssFallback&&An(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&r&&co(l,c.clone(l)),l}function At(e=" ",t=0){return je(Ss,null,e,t)}function Tn(e="",t=!1){return t?(we(),Du(Bt,null,e)):je(Bt,null,e)}function ct(e){return e==null||typeof e=="boolean"?je(Bt):K(e)?je(Fe,null,e.slice()):os(e)?St(e):je(Ss,null,String(e))}function St(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:An(e)}function po(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(K(t))n=16;else if(typeof t=="object")if(r&65){const s=t.default;s&&(s._c&&(s._d=!1),po(e,s()),s._c&&(s._d=!0));return}else{n=32;const s=t._;!s&&!Eu(t)?t._ctx=We:s===3&&We&&(We.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else $(t)?(t={default:t,_ctx:We},n=32):(t=String(t),r&64?(n=16,t=[At(t)]):n=8);e.children=t,e.shapeFlag|=n}function hh(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const s in r)if(s==="class")t.class!==r.class&&(t.class=vs([t.class,r.class]));else if(s==="style")t.style=Yi([t.style,r.style]);else if(ds(s)){const i=t[s],o=r[s];o&&i!==o&&!(K(i)&&i.includes(o))?t[s]=i?[].concat(i,o):o:o==null&&i==null&&!hs(s)&&(t[s]=o)}else s!==""&&(t[s]=r[s])}return t}function it(e,t,n,r=null){pt(e,t,7,[n,r])}const ph=bu();let gh=0;function mh(e,t,n){const r=e.type,s=(t?t.appContext:e.appContext)||ph,i={uid:gh++,vnode:e,type:r,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Bf(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:ku(r,s),emitsOptions:_u(r,s),emit:null,emitted:null,propsDefaults:ie,inheritAttrs:r.inheritAttrs,ctx:ie,data:ie,props:ie,attrs:ie,slots:ie,refs:ie,setupState:ie,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=t?t.root:i,i.emit=Gd.bind(null,i),e.ce&&e.ce(i),i}let Ae=null;const vh=()=>Ae||We;let as,wi;{const e=ms(),t=(n,r)=>{let s;return(s=e[n])||(s=e[n]=[]),s.push(r),i=>{s.length>1?s.forEach(o=>o(i)):s[0](i)}};as=t("__VUE_INSTANCE_SETTERS__",n=>Ae=n),wi=t("__VUE_SSR_SETTERS__",n=>lr=n)}const yr=e=>{const t=Ae;return as(e),e.scope.on(),()=>{e.scope.off(),as(t)}},Oa=()=>{Ae&&Ae.scope.off(),as(null)};function Lu(e){return e.vnode.shapeFlag&4}let lr=!1;function yh(e,t=!1,n=!1){t&&wi(t);const{props:r,children:s}=e.vnode,i=Lu(e);Zd(e,r,i,t),rh(e,s,n||t);const o=i?wh(e,t):void 0;return t&&wi(!1),o}function wh(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Ld);const{setup:r}=n;if(r){xt();const s=e.setupContext=r.length>1?_h(e):null,i=yr(e),o=vr(r,e,0,[e.props,s]),a=Ic(o);if(Ct(),i(),(a||e.sp)&&!Yn(e)&&du(e),a){if(o.then(Oa,Oa),t)return o.then(c=>{Ea(e,c)}).catch(c=>{bs(c,e,0)});e.asyncDep=o}else Ea(e,o)}else Fu(e)}function Ea(e,t,n){$(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:re(t)&&(e.setupState=nu(t)),Fu(e)}function Fu(e,t,n){const r=e.type;e.render||(e.render=r.render||ft);{const s=yr(e);xt();try{Fd(e)}finally{Ct(),s()}}}const bh={get(e,t){return Ee(e,"get",""),e[t]}};function _h(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,bh),slots:e.slots,emit:e.emit,expose:t}}function Os(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(nu(cd(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in Xn)return Xn[n](e)},has(t,n){return n in t||n in Xn}})):e.proxy}function Th(e,t=!0){return $(e)?e.displayName||e.name:e.name||t&&e.__name}function Sh(e){return $(e)&&"__vccOpts"in e}const Xe=(e,t)=>hd(e,t,lr);function go(e,t,n){try{is(-1);const r=arguments.length;return r===2?re(t)&&!K(t)?os(t)?je(e,null,[t]):je(e,t):je(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&os(n)&&(n=[n]),je(e,t,n))}finally{is(1)}}const Oh="3.5.31";/**
* @vue/runtime-dom v3.5.31
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let bi;const Aa=typeof window<"u"&&window.trustedTypes;if(Aa)try{bi=Aa.createPolicy("vue",{createHTML:e=>e})}catch{}const Vu=bi?e=>bi.createHTML(e):e=>e,Eh="http://www.w3.org/2000/svg",Ah="http://www.w3.org/1998/Math/MathML",_t=typeof document<"u"?document:null,ka=_t&&_t.createElement("template"),kh={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const s=t==="svg"?_t.createElementNS(Eh,e):t==="mathml"?_t.createElementNS(Ah,e):n?_t.createElement(e,{is:n}):_t.createElement(e);return e==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:e=>_t.createTextNode(e),createComment:e=>_t.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>_t.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,s,i){const o=n?n.previousSibling:t.lastChild;if(s&&(s===i||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{ka.innerHTML=Vu(r==="svg"?`<svg>${e}</svg>`:r==="mathml"?`<math>${e}</math>`:e);const a=ka.content;if(r==="svg"||r==="mathml"){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}t.insertBefore(a,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Ph=Symbol("_vtc");function Rh(e,t,n){const r=e[Ph];r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const Pa=Symbol("_vod"),xh=Symbol("_vsh"),Ch=Symbol(""),Ih=/(?:^|;)\s*display\s*:/;function Mh(e,t,n){const r=e.style,s=ge(n);let i=!1;if(n&&!s){if(t)if(ge(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();n[a]==null&&Wr(r,a,"")}else for(const o in t)n[o]==null&&Wr(r,o,"");for(const o in n)o==="display"&&(i=!0),Wr(r,o,n[o])}else if(s){if(t!==n){const o=r[Ch];o&&(n+=";"+o),r.cssText=n,i=Ih.test(n)}}else t&&e.removeAttribute("style");Pa in e&&(e[Pa]=i?r.display:"",e[xh]&&(r.display="none"))}const Ra=/\s*!important$/;function Wr(e,t,n){if(K(n))n.forEach(r=>Wr(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=jh(e,t);Ra.test(n)?e.setProperty(un(r),n.replace(Ra,""),"important"):e[r]=n}}const xa=["Webkit","Moz","ms"],Ys={};function jh(e,t){const n=Ys[t];if(n)return n;let r=Ne(t);if(r!=="filter"&&r in e)return Ys[t]=r;r=gs(r);for(let s=0;s<xa.length;s++){const i=xa[s]+r;if(i in e)return Ys[t]=i}return t}const Ca="http://www.w3.org/1999/xlink";function Ia(e,t,n,r,s,i=Vf(t)){r&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(Ca,t.slice(6,t.length)):e.setAttributeNS(Ca,t,n):n==null||i&&!Dc(n)?e.removeAttribute(t):e.setAttribute(t,i?"":ht(n)?String(n):n)}function Ma(e,t,n,r,s){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?Vu(n):n);return}const i=e.tagName;if(t==="value"&&i!=="PROGRESS"&&!i.includes("-")){const a=i==="OPTION"?e.getAttribute("value")||"":e.value,c=n==null?e.type==="checkbox"?"on":"":String(n);(a!==c||!("_value"in e))&&(e.value=c),n==null&&e.removeAttribute(t),e._value=n;return}let o=!1;if(n===""||n==null){const a=typeof e[t];a==="boolean"?n=Dc(n):n==null&&a==="string"?(n="",o=!0):a==="number"&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(s||t)}function pn(e,t,n,r){e.addEventListener(t,n,r)}function Nh(e,t,n,r){e.removeEventListener(t,n,r)}const ja=Symbol("_vei");function Dh(e,t,n,r,s=null){const i=e[ja]||(e[ja]={}),o=i[t];if(r&&o)o.value=r;else{const[a,c]=Uh(t);if(r){const u=i[t]=Vh(r,s);pn(e,a,u,c)}else o&&(Nh(e,a,o,c),i[t]=void 0)}}const Na=/(?:Once|Passive|Capture)$/;function Uh(e){let t;if(Na.test(e)){t={};let r;for(;r=e.match(Na);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):un(e.slice(2)),t]}let Xs=0;const Lh=Promise.resolve(),Fh=()=>Xs||(Lh.then(()=>Xs=0),Xs=Date.now());function Vh(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;pt(Hh(r,n.value),t,5,[r])};return n.value=e,n.attached=Fh(),n}function Hh(e,t){if(K(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>s=>!s._stopped&&r&&r(s))}else return t}const Da=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Bh=(e,t,n,r,s,i)=>{const o=s==="svg";t==="class"?Rh(e,r,o):t==="style"?Mh(e,n,r):ds(t)?hs(t)||Dh(e,t,n,r,i):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):qh(e,t,r,o))?(Ma(e,t,r),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Ia(e,t,r,o,i,t!=="value")):e._isVueCE&&(Kh(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!ge(r)))?Ma(e,Ne(t),r,i,t):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),Ia(e,t,r,o))};function qh(e,t,n,r){if(r)return!!(t==="innerHTML"||t==="textContent"||t in e&&Da(t)&&$(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=e.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Da(t)&&ge(n)?!1:t in e}function Kh(e,t){const n=e._def.props;if(!n)return!1;const r=Ne(t);return Array.isArray(n)?n.some(s=>Ne(s)===r):Object.keys(n).some(s=>Ne(s)===r)}const Ua=e=>{const t=e.props["onUpdate:modelValue"]||!1;return K(t)?n=>Hr(t,n):t};function Wh(e){e.target.composing=!0}function La(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const Zs=Symbol("_assign");function Fa(e,t,n){return t&&(e=e.trim()),n&&(e=Qi(e)),e}const qn={created(e,{modifiers:{lazy:t,trim:n,number:r}},s){e[Zs]=Ua(s);const i=r||s.props&&s.props.type==="number";pn(e,t?"change":"input",o=>{o.target.composing||e[Zs](Fa(e.value,n,i))}),(n||i)&&pn(e,"change",()=>{e.value=Fa(e.value,n,i)}),t||(pn(e,"compositionstart",Wh),pn(e,"compositionend",La),pn(e,"change",La))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:s,number:i}},o){if(e[Zs]=Ua(o),e.composing)return;const a=(i||e.type==="number")&&!/^0\d/.test(e.value)?Qi(e.value):e.value,c=t??"";if(a===c)return;const u=e.getRootNode();(u instanceof Document||u instanceof ShadowRoot)&&u.activeElement===e&&e.type!=="range"&&(r&&t===n||s&&e.value.trim()===c)||(e.value=c)}},$h=Te({patchProp:Bh},kh);let Va;function Gh(){return Va||(Va=ih($h))}const zh=((...e)=>{const t=Gh().createApp(...e),{mount:n}=t;return t.mount=r=>{const s=Qh(r);if(!s)return;const i=t._component;!$(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=n(s,!1,Jh(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t});function Jh(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Qh(e){return ge(e)?document.querySelector(e):e}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */var Qt;(function(e){e.SUCCESS="SUCCESS",e.PENDING="PENDING",e.FAILURE="FAILURE",e.TERMINAL="TERMINAL",e.CANCELED="CANCELED"})(Qt||(Qt={}));var kt;(function(e){e.OKTA_PASSWORD="okta_password",e.OKTA_EMAIL="okta_email",e.PHONE_NUMBER="phone_number",e.GOOGLE_AUTHENTICATOR="google_otp",e.SECURITY_QUESTION="security_question",e.OKTA_VERIFY="okta_verify",e.WEBAUTHN="webauthn"})(kt||(kt={}));var Vt;(function(e){e.PASSWORD_RECOVERY="recover-password",e.REGISTRATION="enroll-profile",e.SOCIAL_IDP="redirect-idp",e.ACCOUNT_UNLOCK="unlock-account"})(Vt||(Vt={}));function cs(e){return e&&(e.key||e.id)}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Yh(){return typeof window<"u"?window.console:typeof console<"u"?console:void 0}function Kn(){var e=Yh();return e&&e.log?e:{log:function(){},warn:function(){},group:function(){},groupEnd:function(){}}}function gt(e){Kn().warn("[okta-auth-sdk] WARN: "+e)}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Ye(e){var t={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=e[n];r!=null&&(t[n]=r)}return t}function He(e){if(e){var t=JSON.stringify(e);if(t)return JSON.parse(t)}return e}function er(e,...t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)==-1&&(n[r]=e[r]);return He(n)}function _i(e,t){for(var n=e.length;n--;){var r=e[n],s=!0;for(var i in t)if(Object.prototype.hasOwnProperty.call(t,i)&&r[i]!==t[i]){s=!1;break}if(s)return r}}function Ti(e,t,n){if(!(!e||!e._links)){var r=He(e._links[t]);if(r&&r.name&&n){if(r.name===n)return r}else return r}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class jn extends Error{constructor(t){super(t),Object.setPrototypeOf(this,new.target.prototype)}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function kn(e){return Object.prototype.toString.call(e)==="[object String]"}function Hu(e){return Object.prototype.toString.call(e)==="[object Object]"}function Xh(e){return Object.prototype.toString.call(e)==="[object Number]"}function Bu(e){return!!e&&{}.toString.call(e)==="[object Function]"}function Zh(e){return e&&e.finally&&typeof e.finally=="function"}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Qe extends jn{constructor(t,n,r){var s;super((s=n.error)!==null&&s!==void 0?s:Qe.UNKNOWN_ERROR),this.name="WWWAuthError",this.resp=null,this.scheme=t,this.parameters=n,r&&(this.resp=r)}get error(){return this.parameters.error}get errorCode(){return this.error}get error_description(){return this.parameters.error_description}get errorDescription(){return this.error_description}get errorSummary(){return this.errorDescription}get realm(){return this.parameters.realm}static parseHeader(t){var n;if(!t)return null;const r=/(?:,|, )?([a-zA-Z0-9!#$%&'*+\-.^_`|~]+)=(?:"([a-zA-Z0-9!#$%&'*+\-.,^_`|~ /:]+)"|([a-zA-Z0-9!#$%&'*+\-.^_`|~/:]+))/g,s=t.indexOf(" "),i=t.slice(0,s),o=t.slice(s+1),a={};let c;for(;(c=r.exec(o))!==null;)a[c[1]]=(n=c[2])!==null&&n!==void 0?n:c[3];return new Qe(i,a)}static getWWWAuthenticateHeader(t={}){var n;return Bu(t?.get)?t.get("WWW-Authenticate"):(n=t["www-authenticate"])!==null&&n!==void 0?n:t["WWW-Authenticate"]}}Qe.UNKNOWN_ERROR="UNKNOWN_WWW_AUTH_ERROR";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function qu(e){for(var t="abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",n="",r=0,s=t.length;r<e;++r)n+=t[Math.floor(Math.random()*s)];return n}function Ha(e){return new Promise(function(t){setTimeout(t,e)})}function ep(e,t){const n=e.split(t);return[n[0],n.splice(1,n.length).join(t)]}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Es(e){return/^[a-z][a-z0-9+.-]*:/i.test(e)}function tp(e="",t){return Es(e)?e:(t=Ke(t),e[0]==="/"?`${t}${e}`:`${t}/${e}`)}function np(e="",t){return Es(e)&&(e=e.substring(t.length)),e[0]==="/"?e:`/${e}`}function Nt(e){var t=[];if(e!==null)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&e[n]!==void 0&&e[n]!==null&&t.push(n+"="+encodeURIComponent(e[n]));return t.length?"?"+t.join("&"):""}function Ke(e){if(e){var t=e.replace(/^\s+|\s+$/gm,"");return t=t.replace(/\/+$/,""),t}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class _ extends jn{constructor(t,n){super(t),this.name="AuthSdkError",this.errorCode="INTERNAL",this.errorSummary=t,this.errorLink="INTERNAL",this.errorId="INTERNAL",this.errorCauses=[],n&&(this.xhr=n)}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function mo(){return qu(64)}function rp(){return qu(64)}function vo(e,t={}){return Ke(t.issuer)||e.options.issuer}function Ku(e,t={}){const n=vo(e,t);return n.indexOf("/oauth2")>0?n:n+"/oauth2"}function sp(e,t={}){return vo(e,t).split("/oauth2")[0]}function Kt(e,t){if(arguments.length>2)throw new _('As of version 3.0, "getOAuthUrls" takes only a single set of options');t=t||{};var n=Ke(t.authorizeUrl)||e.options.authorizeUrl,r=vo(e,t),s=Ke(t.userinfoUrl)||e.options.userinfoUrl,i=Ke(t.tokenUrl)||e.options.tokenUrl,o=Ke(t.logoutUrl)||e.options.logoutUrl,a=Ke(t.revokeUrl)||e.options.revokeUrl,c=Ku(e,t);return n=n||c+"/v1/authorize",s=s||c+"/v1/userinfo",i=i||c+"/v1/token",a=a||c+"/v1/revoke",o=o||c+"/v1/logout",{issuer:r,authorizeUrl:n,userinfoUrl:s,tokenUrl:i,revokeUrl:a,logoutUrl:o}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Wu(e,t){const n=e.options.issuer,r=Kt(e,t),s={issuer:n,urls:r,clientId:t.clientId,redirectUri:t.redirectUri,responseType:t.responseType,responseMode:t.responseMode,scopes:t.scopes,state:t.state,nonce:t.nonce,ignoreSignature:t.ignoreSignature,acrValues:t.acrValues,extraParams:t.extraParams};return t.pkce===!1?s:Object.assign(Object.assign({},s),{codeVerifier:t.codeVerifier,codeChallengeMethod:t.codeChallengeMethod,codeChallenge:t.codeChallenge})}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const tr="oktaStateToken",$u=500,Gu=3,zu=300,Ju=86400,yo="okta-token-storage",Qu="okta-cache-storage",ip="okta-pkce-storage",Yu="okta-transaction-storage",Xu="okta-shared-transaction-storage",Zu="okta-original-uri-storage",el="okta-idx-response-storage",op="accessToken",ap="idToken",Si="refreshToken",$r="referrerPath",Oi=43,tl=128,wo="S256",bo="1.0.0",Ba=Object.freeze(Object.defineProperty({__proto__:null,ACCESS_TOKEN_STORAGE_KEY:op,CACHE_STORAGE_NAME:Qu,DEFAULT_CACHE_DURATION:Ju,DEFAULT_CODE_CHALLENGE_METHOD:wo,DEFAULT_MAX_CLOCK_SKEW:zu,DEFAULT_POLLING_DELAY:$u,IDX_API_VERSION:bo,IDX_RESPONSE_STORAGE_NAME:el,ID_TOKEN_STORAGE_KEY:ap,IOS_MAX_RETRY_COUNT:Gu,MAX_VERIFIER_LENGTH:tl,MIN_VERIFIER_LENGTH:Oi,ORIGINAL_URI_STORAGE_NAME:Zu,PKCE_STORAGE_NAME:ip,REFERRER_PATH_STORAGE_KEY:$r,REFRESH_TOKEN_STORAGE_KEY:Si,SHARED_TRANSACTION_STORAGE_NAME:Xu,STATE_TOKEN_KEY_NAME:tr,TOKEN_STORAGE_NAME:yo,TRANSACTION_STORAGE_NAME:Yu},Symbol.toStringTag,{value:"Module"}));/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class sn extends jn{constructor(t,n,r){const s=t.errorSummary;super(s),this.name="AuthApiError",this.errorSummary=t.errorSummary,this.errorCode=t.errorCode,this.errorLink=t.errorLink,this.errorId=t.errorId,this.errorCauses=t.errorCauses,n&&(this.xhr=n),r&&(this.meta=r)}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Pn extends jn{constructor(t,n,r){super(n),this.resp=null,this.name="OAuthError",this.errorCode=t,this.errorSummary=n,this.error=t,this.error_description=n,r&&(this.resp=r)}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const _o=function(e){return atob(e)},qt=function(e){return btoa(e)},Ve=typeof crypto>"u"?null:crypto;/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const cp=/windows phone|iemobile|wpdesktop/i;function be(){return typeof document<"u"&&typeof window<"u"}function As(){if(!be())return!1;const e=document.documentMode;return!!e&&e<=11}function nl(){return navigator.userAgent}function rl(){const e=nl();return e&&!cp.test(e)}function up(){if(!be())return!1;const e=document.documentMode;var t=e&&e<10;return typeof window.postMessage<"u"&&!t}function sl(){return typeof Ve<"u"&&Ve!==null&&typeof Ve.subtle<"u"&&typeof Uint8Array<"u"}function il(){return sl()}function To(){return typeof TextEncoder<"u"}function lp(){return il()&&To()}function ol(){return be()?window.location.protocol==="https:":!1}function al(){return be()&&window.location.hostname==="localhost"}function fp(){return!As()&&typeof window.indexedDB<"u"&&To()&&sl()}function dp(){return be()&&typeof navigator<"u"&&typeof navigator.userAgent<"u"&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream}const ei=Object.freeze(Object.defineProperty({__proto__:null,getUserAgent:nl,hasTextEncoder:To,isBrowser:be,isDPoPSupported:fp,isFingerprintSupported:rl,isHTTPS:ol,isIE11OrLess:As,isIOS:dp,isLocalhost:al,isPKCESupported:lp,isPopupPostMessageSupported:up,isTokenVerifySupported:il},Symbol.toStringTag,{value:"Module"}));/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */let Ei=0,qa;be()&&(Ei=Date.now(),qa=()=>{document.hidden||(Ei=Date.now())},document.addEventListener("visibilitychange",qa));const hp=(e,t)=>{var n;if(t instanceof Error)return new sn({errorSummary:t.message});let r=t,s,i={};if(r.responseText&&kn(r.responseText))try{i=JSON.parse(r.responseText)}catch{i={errorSummary:"Unknown error"}}r.status>=500&&(i.errorSummary="Unknown error"),e.options.transformErrorXHR&&(r=e.options.transformErrorXHR(He(r)));const o=(n=Qe.getWWWAuthenticateHeader(r?.headers))!==null&&n!==void 0?n:"";if(i.error&&i.error_description?s=new Pn(i.error,i.error_description,r):s=new sn(i,r,{wwwAuthHeader:o}),o&&r?.status>=400&&r?.status<500){const a=Qe.parseHeader(o);if(r.status===403&&a?.error==="insufficient_authentication_context"){const{max_age:c,acr_values:u}=a.parameters;s=new sn({errorSummary:a.error,errorCauses:[{errorSummary:a.errorDescription}]},r,Object.assign({max_age:+c},u&&{acr_values:u}))}else a?.scheme==="DPoP"&&(s=a)}return s};function mt(e,t){var n;if(t=t||{},e.options.httpRequestInterceptors)for(const J of e.options.httpRequestInterceptors)J(t);var r=t.url,s=t.method,i=t.args,o=t.saveAuthnState,a=t.accessToken,c=t.withCredentials===!0,u=e.options.storageUtil,l=u.storage,f=e.storageManager.getHttpCache(e.options.cookies),d=t.pollingIntent,h=(n=e.options.pollDelay)!==null&&n!==void 0?n:0;if(t.cacheResponse){var v=f.getStorage(),m=v[r];if(m&&Date.now()/1e3<m.expiresAt)return Promise.resolve(m.response)}var O=e._oktaUserAgent.getHttpHeader(),R=Object.assign({Accept:"application/json","Content-Type":"application/json"},O);Object.assign(R,e.options.headers,t.headers),R=Ye(R),a&&kn(a)&&(R.Authorization="Bearer "+a);var k={headers:R,data:i||void 0,withCredentials:c},M,x,z;if(d&&be()&&h>0){let J,Q,ve,le=0;Q=()=>{const fe=Date.now()-Ei;return fe<h?new Promise(ce=>setTimeout(()=>{document.hidden?ce(J()):ce()},h-fe)):Promise.resolve()},J=()=>{if(document.hidden){let fe;return new Promise(ce=>{fe=()=>{document.hidden||(document.removeEventListener("visibilitychange",fe),ce(Q()))},document.addEventListener("visibilitychange",fe)})}else return Q()};const De=()=>e.options.httpRequestClient(s,r,k).catch(fe=>{if(fe?.message==="Load failed"&&le<Gu)return le++,ve();throw fe});ve=()=>J().then(De),z=ve()}else z=e.options.httpRequestClient(s,r,k);return z.then(function(J){return x=J.responseText,x&&kn(x)&&(x=JSON.parse(x),x&&typeof x=="object"&&!x.headers&&(Array.isArray(x)?x.forEach(Q=>{Q.headers=J.headers}):x.headers=J.headers)),o&&(x.stateToken||l.delete(tr)),x&&x.stateToken&&x.expiresAt&&l.set(tr,x.stateToken,x.expiresAt,e.options.cookies),x&&t.cacheResponse&&f.updateStorage(r,{expiresAt:Math.floor(Date.now()/1e3)+Ju,response:x}),x}).catch(function(J){throw M=hp(e,J),M.errorCode==="E0000011"&&l.delete(tr),M})}function Rn(e,t,n){t=Es(t)?t:e.getIssuerOrigin()+t;var r={url:t,method:"GET"};return Object.assign(r,n),mt(e,r)}function Wt(e,t,n,r){t=Es(t)?t:e.getIssuerOrigin()+t;var s={url:t,method:"POST",args:n,saveAuthnState:!0};return Object.assign(s,r),mt(e,s)}var Mr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function So(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ti,Ka;function pp(){if(Ka)return ti;Ka=1;function e(){}return e.prototype={on:function(t,n,r){var s=this.e||(this.e={});return(s[t]||(s[t]=[])).push({fn:n,ctx:r}),this},once:function(t,n,r){var s=this;function i(){s.off(t,i),n.apply(r,arguments)}return i._=n,this.on(t,i,r)},emit:function(t){var n=[].slice.call(arguments,1),r=((this.e||(this.e={}))[t]||[]).slice(),s=0,i=r.length;for(s;s<i;s++)r[s].fn.apply(r[s].ctx,n);return this},off:function(t,n){var r=this.e||(this.e={}),s=r[t],i=[];if(s&&n)for(var o=0,a=s.length;o<a;o++)s[o].fn!==n&&s[o].fn._!==n&&i.push(s[o]);return i.length?r[t]=i:delete r[t],this}},ti=e,ti}var gp=pp();const mp=So(gp);/*! js-cookie v3.0.5 | MIT */function jr(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}var vp={read:function(e){return e[0]==='"'&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};function Ai(e,t){function n(s,i,o){if(!(typeof document>"u")){o=jr({},t,o),typeof o.expires=="number"&&(o.expires=new Date(Date.now()+o.expires*864e5)),o.expires&&(o.expires=o.expires.toUTCString()),s=encodeURIComponent(s).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var a="";for(var c in o)o[c]&&(a+="; "+c,o[c]!==!0&&(a+="="+o[c].split(";")[0]));return document.cookie=s+"="+e.write(i,s)+a}}function r(s){if(!(typeof document>"u"||arguments.length&&!s)){for(var i=document.cookie?document.cookie.split("; "):[],o={},a=0;a<i.length;a++){var c=i[a].split("="),u=c.slice(1).join("=");try{var l=decodeURIComponent(c[0]);if(o[l]=e.read(u,l),s===l)break}catch{}}return s?o[s]:o}}return Object.create({set:n,get:r,remove:function(s,i){n(s,"",jr({},i,{expires:-1}))},withAttributes:function(s){return Ai(this.converter,jr({},this.attributes,s))},withConverter:function(s){return Ai(jr({},this.converter,s),this.attributes)}},{attributes:{value:Object.freeze(t)},converter:{value:Object.freeze(e)}})}var Nr=Ai(vp,{path:"/"}),Dr={exports:{}},Wa;function yp(){return Wa||(Wa=1,(function(e,t){var n=typeof globalThis<"u"&&globalThis||typeof self<"u"&&self||typeof Mr<"u"&&Mr,r=(function(){function i(){this.fetch=!1,this.DOMException=n.DOMException}return i.prototype=n,new i})();(function(i){(function(o){var a=typeof i<"u"&&i||typeof self<"u"&&self||typeof Mr<"u"&&Mr||{},c={searchParams:"URLSearchParams"in a,iterable:"Symbol"in a&&"iterator"in Symbol,blob:"FileReader"in a&&"Blob"in a&&(function(){try{return new Blob,!0}catch{return!1}})(),formData:"FormData"in a,arrayBuffer:"ArrayBuffer"in a};function u(w){return w&&DataView.prototype.isPrototypeOf(w)}if(c.arrayBuffer)var l=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],f=ArrayBuffer.isView||function(w){return w&&l.indexOf(Object.prototype.toString.call(w))>-1};function d(w){if(typeof w!="string"&&(w=String(w)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(w)||w==="")throw new TypeError('Invalid character in header field name: "'+w+'"');return w.toLowerCase()}function h(w){return typeof w!="string"&&(w=String(w)),w}function v(w){var E={next:function(){var U=w.shift();return{done:U===void 0,value:U}}};return c.iterable&&(E[Symbol.iterator]=function(){return E}),E}function m(w){this.map={},w instanceof m?w.forEach(function(E,U){this.append(U,E)},this):Array.isArray(w)?w.forEach(function(E){if(E.length!=2)throw new TypeError("Headers constructor: expected name/value pair to be length 2, found"+E.length);this.append(E[0],E[1])},this):w&&Object.getOwnPropertyNames(w).forEach(function(E){this.append(E,w[E])},this)}m.prototype.append=function(w,E){w=d(w),E=h(E);var U=this.map[w];this.map[w]=U?U+", "+E:E},m.prototype.delete=function(w){delete this.map[d(w)]},m.prototype.get=function(w){return w=d(w),this.has(w)?this.map[w]:null},m.prototype.has=function(w){return this.map.hasOwnProperty(d(w))},m.prototype.set=function(w,E){this.map[d(w)]=h(E)},m.prototype.forEach=function(w,E){for(var U in this.map)this.map.hasOwnProperty(U)&&w.call(E,this.map[U],U,this)},m.prototype.keys=function(){var w=[];return this.forEach(function(E,U){w.push(U)}),v(w)},m.prototype.values=function(){var w=[];return this.forEach(function(E){w.push(E)}),v(w)},m.prototype.entries=function(){var w=[];return this.forEach(function(E,U){w.push([U,E])}),v(w)},c.iterable&&(m.prototype[Symbol.iterator]=m.prototype.entries);function O(w){if(!w._noBody){if(w.bodyUsed)return Promise.reject(new TypeError("Already read"));w.bodyUsed=!0}}function R(w){return new Promise(function(E,U){w.onload=function(){E(w.result)},w.onerror=function(){U(w.error)}})}function k(w){var E=new FileReader,U=R(E);return E.readAsArrayBuffer(w),U}function M(w){var E=new FileReader,U=R(E),F=/charset=([A-Za-z0-9_-]+)/.exec(w.type),X=F?F[1]:"utf-8";return E.readAsText(w,X),U}function x(w){for(var E=new Uint8Array(w),U=new Array(E.length),F=0;F<E.length;F++)U[F]=String.fromCharCode(E[F]);return U.join("")}function z(w){if(w.slice)return w.slice(0);var E=new Uint8Array(w.byteLength);return E.set(new Uint8Array(w)),E.buffer}function J(){return this.bodyUsed=!1,this._initBody=function(w){this.bodyUsed=this.bodyUsed,this._bodyInit=w,w?typeof w=="string"?this._bodyText=w:c.blob&&Blob.prototype.isPrototypeOf(w)?this._bodyBlob=w:c.formData&&FormData.prototype.isPrototypeOf(w)?this._bodyFormData=w:c.searchParams&&URLSearchParams.prototype.isPrototypeOf(w)?this._bodyText=w.toString():c.arrayBuffer&&c.blob&&u(w)?(this._bodyArrayBuffer=z(w.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):c.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(w)||f(w))?this._bodyArrayBuffer=z(w):this._bodyText=w=Object.prototype.toString.call(w):(this._noBody=!0,this._bodyText=""),this.headers.get("content-type")||(typeof w=="string"?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):c.searchParams&&URLSearchParams.prototype.isPrototypeOf(w)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},c.blob&&(this.blob=function(){var w=O(this);if(w)return w;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))}),this.arrayBuffer=function(){if(this._bodyArrayBuffer){var w=O(this);return w||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer))}else{if(c.blob)return this.blob().then(k);throw new Error("could not read as ArrayBuffer")}},this.text=function(){var w=O(this);if(w)return w;if(this._bodyBlob)return M(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(x(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},c.formData&&(this.formData=function(){return this.text().then(De)}),this.json=function(){return this.text().then(JSON.parse)},this}var Q=["CONNECT","DELETE","GET","HEAD","OPTIONS","PATCH","POST","PUT","TRACE"];function ve(w){var E=w.toUpperCase();return Q.indexOf(E)>-1?E:w}function le(w,E){if(!(this instanceof le))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');E=E||{};var U=E.body;if(w instanceof le){if(w.bodyUsed)throw new TypeError("Already read");this.url=w.url,this.credentials=w.credentials,E.headers||(this.headers=new m(w.headers)),this.method=w.method,this.mode=w.mode,this.signal=w.signal,!U&&w._bodyInit!=null&&(U=w._bodyInit,w.bodyUsed=!0)}else this.url=String(w);if(this.credentials=E.credentials||this.credentials||"same-origin",(E.headers||!this.headers)&&(this.headers=new m(E.headers)),this.method=ve(E.method||this.method||"GET"),this.mode=E.mode||this.mode||null,this.signal=E.signal||this.signal||(function(){if("AbortController"in a){var W=new AbortController;return W.signal}})(),this.referrer=null,(this.method==="GET"||this.method==="HEAD")&&U)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(U),(this.method==="GET"||this.method==="HEAD")&&(E.cache==="no-store"||E.cache==="no-cache")){var F=/([?&])_=[^&]*/;if(F.test(this.url))this.url=this.url.replace(F,"$1_="+new Date().getTime());else{var X=/\?/;this.url+=(X.test(this.url)?"&":"?")+"_="+new Date().getTime()}}}le.prototype.clone=function(){return new le(this,{body:this._bodyInit})};function De(w){var E=new FormData;return w.trim().split("&").forEach(function(U){if(U){var F=U.split("="),X=F.shift().replace(/\+/g," "),W=F.join("=").replace(/\+/g," ");E.append(decodeURIComponent(X),decodeURIComponent(W))}}),E}function fe(w){var E=new m,U=w.replace(/\r?\n[\t ]+/g," ");return U.split("\r").map(function(F){return F.indexOf(`
`)===0?F.substr(1,F.length):F}).forEach(function(F){var X=F.split(":"),W=X.shift().trim();if(W){var Pe=X.join(":").trim();try{E.append(W,Pe)}catch(ye){console.warn("Response "+ye.message)}}}),E}J.call(le.prototype);function ce(w,E){if(!(this instanceof ce))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');if(E||(E={}),this.type="default",this.status=E.status===void 0?200:E.status,this.status<200||this.status>599)throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");this.ok=this.status>=200&&this.status<300,this.statusText=E.statusText===void 0?"":""+E.statusText,this.headers=new m(E.headers),this.url=E.url||"",this._initBody(w)}J.call(ce.prototype),ce.prototype.clone=function(){return new ce(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new m(this.headers),url:this.url})},ce.error=function(){var w=new ce(null,{status:200,statusText:""});return w.ok=!1,w.status=0,w.type="error",w};var Ge=[301,302,303,307,308];ce.redirect=function(w,E){if(Ge.indexOf(E)===-1)throw new RangeError("Invalid status code");return new ce(null,{status:E,headers:{location:w}})},o.DOMException=a.DOMException;try{new o.DOMException}catch{o.DOMException=function(E,U){this.message=E,this.name=U;var F=Error(E);this.stack=F.stack},o.DOMException.prototype=Object.create(Error.prototype),o.DOMException.prototype.constructor=o.DOMException}function vt(w,E){return new Promise(function(U,F){var X=new le(w,E);if(X.signal&&X.signal.aborted)return F(new o.DOMException("Aborted","AbortError"));var W=new XMLHttpRequest;function Pe(){W.abort()}W.onload=function(){var ue={statusText:W.statusText,headers:fe(W.getAllResponseHeaders()||"")};X.url.indexOf("file://")===0&&(W.status<200||W.status>599)?ue.status=200:ue.status=W.status,ue.url="responseURL"in W?W.responseURL:ue.headers.get("X-Request-URL");var Re="response"in W?W.response:W.responseText;setTimeout(function(){U(new ce(Re,ue))},0)},W.onerror=function(){setTimeout(function(){F(new TypeError("Network request failed"))},0)},W.ontimeout=function(){setTimeout(function(){F(new TypeError("Network request timed out"))},0)},W.onabort=function(){setTimeout(function(){F(new o.DOMException("Aborted","AbortError"))},0)};function ye(ue){try{return ue===""&&a.location.href?a.location.href:ue}catch{return ue}}if(W.open(X.method,ye(X.url),!0),X.credentials==="include"?W.withCredentials=!0:X.credentials==="omit"&&(W.withCredentials=!1),"responseType"in W&&(c.blob?W.responseType="blob":c.arrayBuffer&&(W.responseType="arraybuffer")),E&&typeof E.headers=="object"&&!(E.headers instanceof m||a.Headers&&E.headers instanceof a.Headers)){var yt=[];Object.getOwnPropertyNames(E.headers).forEach(function(ue){yt.push(d(ue)),W.setRequestHeader(ue,h(E.headers[ue]))}),X.headers.forEach(function(ue,Re){yt.indexOf(Re)===-1&&W.setRequestHeader(Re,ue)})}else X.headers.forEach(function(ue,Re){W.setRequestHeader(Re,ue)});X.signal&&(X.signal.addEventListener("abort",Pe),W.onreadystatechange=function(){W.readyState===4&&X.signal.removeEventListener("abort",Pe)}),W.send(typeof X._bodyInit>"u"?null:X._bodyInit)})}return vt.polyfill=!0,a.fetch||(a.fetch=vt,a.Headers=m,a.Request=le,a.Response=ce),o.Headers=m,o.Request=le,o.Response=ce,o.fetch=vt,Object.defineProperty(o,"__esModule",{value:!0}),o})({})})(r),r.fetch.ponyfill=!0,delete r.fetch.polyfill;var s=n.fetch?n:r;t=s.fetch,t.default=s.fetch,t.fetch=s.fetch,t.Headers=s.Headers,t.Request=s.Request,t.Response=s.Response,e.exports=t})(Dr,Dr.exports)),Dr.exports}var wp=yp();const bp=So(wp);/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */var ki;(function(e){e.ACCESS="accessToken",e.ID="idToken",e.REFRESH="refreshToken"})(ki||(ki={}));function Pt(e){return e&&e.accessToken}function Ht(e){return e&&e.idToken}function Yt(e){return e&&e.refreshToken}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function ln(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(e);s<r.length;s++)t.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(e,r[s])&&(n[r[s]]=e[r[s]]);return n}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */async function Oo(e,t={}){const n=await e.token.prepareTokenParams(t),r=Wu(e,n);let{flow:s="default",withCredentials:i=!0,activationToken:o=void 0,recoveryToken:a=void 0,maxAge:c=void 0,acrValues:u=void 0}=Object.assign(Object.assign({},e.options),t);return Object.assign(Object.assign({},r),{flow:s,withCredentials:i,activationToken:o,recoveryToken:a,maxAge:c,acrValues:u})}function cl(e,t){const n=$t(e,t);return!!n?.interactionHandle}function $t(e,t){t=Ye(t),t=Object.assign(Object.assign({},e.options),t);let n;try{n=e.transactionManager.load(t)}catch{}if(n){if(ul(n,t))return n;gt("Saved transaction meta does not match the current configuration. This may indicate that two apps are sharing a storage key.")}}async function _p(e,t){t=Ye(t),t=Object.assign(Object.assign({},e.options),t);const n=$t(e,t);return n||Oo(e,t)}function Eo(e,t){e.transactionManager.save(t,{muteWarning:!0})}function Tp(e){e.transactionManager.clear()}function ul(e,t={}){if(Op(e,t,["issuer","clientId","redirectUri","state","codeChallenge","codeChallengeMethod","activationToken","recoveryToken"])===!1)return!1;const{flow:r}=t;return Sp(e,r)!==!1}function Sp(e,t){return!(t&&t!=="default"&&t!=="proceed"&&t!==e.flow)}function Op(e,t,n){return!n.some(s=>{const i=t[s];if(i&&i!==e[s])return!0})}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function $a(e){return{meta:e,interactionHandle:e.interactionHandle,state:e.state}}async function ll(e,t={}){t=Ye(t);let n=$t(e,t);if(n?.interactionHandle)return $a(n);n=await Oo(e,Object.assign(Object.assign({},n),t));const r=Ku(e);let{clientId:s,redirectUri:i,state:o,scopes:a,withCredentials:c,codeChallenge:u,codeChallengeMethod:l,activationToken:f,recoveryToken:d,maxAge:h,acrValues:v,nonce:m}=n;const O=t.clientSecret||e.options.clientSecret;c=c??!0;const R=`${r}/v1/interact`,k=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({client_id:s,scope:a.join(" "),redirect_uri:i,code_challenge:u,code_challenge_method:l,state:o},f&&{activation_token:f}),d&&{recovery_token:d}),O&&{client_secret:O}),h&&{max_age:h}),v&&{acr_values:v}),m&&{nonce:m}),z=(await mt(e,{method:"POST",url:R,headers:{"Content-Type":"application/x-www-form-urlencoded"},withCredentials:c,args:k})).interaction_handle,J=Object.assign(Object.assign({},n),{interactionHandle:z,withCredentials:c,state:o,scopes:a,recoveryToken:d,activationToken:f});return Eo(e,J),$a(J)}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const Ep=function(t){return t.mutable!==!1},Ap=function(t){var n,r;const s={},i=[],o={};if(!t.value)return i.push(t),{defaultParamsForAction:s,neededParamsForAction:i,immutableParamsForAction:o};for(let a of t.value)Ep(a)?(i.push(a),(n=a.value)!==null&&n!==void 0&&n&&(s[a.name]=a.value)):o[a.name]=(r=a.value)!==null&&r!==void 0?r:"";return{defaultParamsForAction:s,neededParamsForAction:i,immutableParamsForAction:o}},kp=function(t){t=Array.isArray(t)?t:[t];const n=[],r={},s={};for(let i of t){const{defaultParamsForAction:o,neededParamsForAction:a,immutableParamsForAction:c}=Ap(i);n.push(a),r[i.name]=o,s[i.name]=c}return{defaultParams:r,neededParams:n,immutableParams:s}};/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const Pp=function(t,{actionDefinition:n,defaultParamsForAction:r={},immutableParamsForAction:s={},toPersist:i={}}){const o=n.href;return async function(a={}){var c,u;const l={"Content-Type":"application/json",Accept:n.accepts||"application/ion+json"},f=JSON.stringify(Object.assign(Object.assign(Object.assign({},r),a),s));try{const d={url:o,method:n.method,headers:l,args:f,withCredentials:(c=i?.withCredentials)!==null&&c!==void 0?c:!0};(n.name==="poll"||((u=n.name)===null||u===void 0?void 0:u.endsWith("-poll")))&&(d.pollingIntent=!0);const v=await mt(t,d);return t.idx.makeIdxResponse(Object.assign({},v),i,!0)}catch(d){if(!(d instanceof sn)||!d?.xhr)throw d;const h=d.xhr,v=h.responseJSON||JSON.parse(h.responseText),m=h.headers["WWW-Authenticate"]||h.headers["www-authenticate"],O=t.idx.makeIdxResponse(Object.assign({},v),i,!1);return h.status===401&&m==='Oktadevicejwt realm="Okta Device"'&&(O.stepUp=!0),O}}},Pi=function(t,n,r){const s=Pp,{defaultParams:i,neededParams:o,immutableParams:a}=kp(n),c=s(t,{actionDefinition:n,defaultParamsForAction:i[n.name],immutableParamsForAction:a[n.name],toPersist:r});return c.neededParams=o,c};/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const Rp=function(t,n,r={}){return n.reduce((s,i)=>Object.assign(Object.assign({},s),{[i.name]:Pi(t,i,r)}),{})};/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const xp=/\$?(?<step>\w+)|(?:\[(?<index>\d+)\])/g;function Cp({path:e,json:t}){var n,r,s;const i=[];let o;for(;(o=xp.exec(e))!==null;){const u=(r=(n=o?.groups)===null||n===void 0?void 0:n.step)!==null&&r!==void 0?r:(s=o?.groups)===null||s===void 0?void 0:s.index;u&&i.push(u)}if(i.length<1)return;const a=i.pop();let c=t;for(const u of i)if(Object.prototype.hasOwnProperty.call(c,u)){if(typeof c[u]!="object")return;c=c[u]}return c[a]}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const Ip={remediation:!0,context:!0},Mp=function(t,n,r={}){const s={},i={};return Object.keys(n).filter(o=>!Ip[o]).forEach(o=>{if(!(typeof n[o]=="object"&&!!n[o])){i[o]=n[o];return}if(n[o].rel){s[n[o].name]=Pi(t,n[o],r);return}const c=n[o],{value:u,type:l}=c,f=ln(c,["value","type"]);if(i[o]=Object.assign({type:l},f),l!=="object"){i[o].value=u;return}i[o].value={},Object.entries(u).forEach(([d,h])=>{h.rel?s[`${o}-${d.name||d}`]=Pi(t,h,r):i[o].value[d]=h})}),{context:i,actions:s}},fl=(e,t)=>{Object.keys(t).forEach(n=>{if(n==="relatesTo"){const r=Array.isArray(t[n])?t[n][0]:t[n];if(typeof r=="string"){const s=Cp({path:r,json:e});if(s){t[n]=s;return}else throw new _(`Cannot resolve relatesTo: ${r}`)}}Array.isArray(t[n])&&t[n].forEach(r=>fl(e,r))})},jp=(e,t,n)=>{if(t.rel){const s=Rp(e,[t],n)[t.name];return Object.assign(Object.assign({},t),{action:s})}return t},Np=function(t,n,r={}){var s;const i=((s=n.remediation)===null||s===void 0?void 0:s.value)||[];i.forEach(u=>{var l;if(u.name==="launch-authenticator"&&((l=u?.relatesTo)===null||l===void 0?void 0:l[0])==="authenticatorChallenge"&&!n?.authenticatorChallenge){delete u.relatesTo;return}return fl(n,u)});const o=i.map(u=>jp(t,u,r)),{context:a,actions:c}=Mp(t,n,r);return{remediations:o,context:a,actions:c}};/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Dp(e,t,n,r){var s,i,o;const a=t,{remediations:c,context:u,actions:l}=Np(e,t,n),f=[...c],d=async function(m,O={}){const R=c.find(M=>M.name===m);return R?typeof R.action!="function"?Promise.reject(`Current remediation cannot make form submit action: [${m}]`):R.action(O):Promise.reject(`Unknown remediation choice: [${m}]`)},h=m=>m.name==="interaction_code",v=(o=(i=(s=a.successWithInteractionCode)===null||s===void 0?void 0:s.value)===null||i===void 0?void 0:i.find(h))===null||o===void 0?void 0:o.value;return{proceed:d,neededToProceed:f,actions:l,context:u,rawIdxState:a,interactionCode:v,toPersist:n,requestDidSucceed:r}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */var Up={makeIdxState:Dp};/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const dl=function(t){switch(t){case"1.0.0":return Up;case void 0:case null:throw new Error("Api version is required");default:throw new Error(`Unknown api version: ${t}.  Use an exact semver version.`)}};function hl(e){if(!e)throw new Error("version is required");if((e??"").replace(/[^0-9a-zA-Z._-]/,"")!==e||!e)throw new Error("invalid version supplied - version is required and uses semver syntax");dl(e)}function pl(e,t,n,r){var s;const i=(s=t?.version)!==null&&s!==void 0?s:bo;hl(i);const{makeIdxState:o}=dl(i);return o(e,t,n,r)}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function gl(e){return e&&e.version}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Lp(e){return e instanceof sn}function ml(e){return e instanceof Pn}function Fp(e){return e instanceof Qe}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */async function Ri(e,t={}){var n;let r,s;const i=e.transactionManager.loadIdxResponse(t);if(i&&(r=i.rawIdxResponse,s=i.requestDidSucceed),!r){const a=t.version||bo,c=sp(e),{interactionHandle:u,stateHandle:l}=t,f=(n=t.withCredentials)!==null&&n!==void 0?n:!0;try{s=!0,hl(a);const d=`${c}/idp/idx/introspect`,h=l?{stateToken:l}:{interactionHandle:u},v={"Content-Type":`application/ion+json; okta-version=${a}`,Accept:`application/ion+json; okta-version=${a}`};r=await mt(e,{method:"POST",url:d,headers:v,withCredentials:f,args:h})}catch(d){if(Lp(d)&&d.xhr&&gl(d.xhr.responseJSON))r=d.xhr.responseJSON,s=!1;else throw d}}const{withCredentials:o}=t;return pl(e,r,{withCredentials:o},s)}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Vp(e){var t;return(t=e.value)===null||t===void 0?void 0:t.map(n=>n.name)}function Hp(e){var t;return(t=e.value)===null||t===void 0?void 0:t.reduce((n,r)=>(r.required&&n.push(r.name),n),[])}function Ur(e){return e.charAt(0).toUpperCase()+e.substring(1)}function ks(e){return e.value.find(({name:t})=>t==="authenticator")}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Ga(e){let t;if(cs(e))t=e;else if(typeof e=="string")t={key:e};else throw new Error("Invalid format for authenticator");return t}function mn(e,t){return!e||!t?!1:e.id&&t.id?e.id===t.id:e.key&&t.key?e.key===t.key:!1}function Bp(e,t){let n;for(let r of e)if(n=t.find(({relatesTo:s})=>s.key&&s.key===r.key),n)break;return n}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Be{constructor(t,n={},r={}){this.values=Object.assign({},n),this.options=Object.assign({},r),this.formatAuthenticators(),this.remediation=t}formatAuthenticators(){if(this.values.authenticators=this.values.authenticators||[],this.values.authenticators=this.values.authenticators.map(t=>Ga(t)),this.values.authenticator){const t=Ga(this.values.authenticator);this.values.authenticators.some(r=>mn(t,r))||this.values.authenticators.push(t)}this.values.authenticatorsData=this.values.authenticators.reduce((t,n)=>(typeof n=="object"&&Object.keys(n).length>1&&t.push(n),t),this.values.authenticatorsData||[])}getName(){return this.remediation.name}canRemediate(t){return!Hp(this.remediation).find(s=>!this.hasData(s))}getData(t){if(!t)return Vp(this.remediation).reduce((s,i)=>(s[i]=this.getData(i),s),{});if(typeof this[`map${Ur(t)}`]=="function"){const n=this[`map${Ur(t)}`](this.remediation.value.find(({name:r})=>r===t));if(n)return n}if(this.map&&this.map[t]){const n=this.map[t];for(let r=0;r<n.length;r++){let s=this.values[n[r]];if(s)return s}}return this.values[t]}hasData(t){return!!this.getData(t)}getNextStep(t,n){const r=this.getName(),s=this.getInputs(),i=this.getAuthenticator(),o=i?.type;return Object.assign(Object.assign({name:r,inputs:s},o&&{type:o}),i&&{authenticator:i})}getInputs(){const t=[];return(this.remediation.value||[]).forEach(r=>{let s,{name:i,type:o,visible:a,messages:c}=r;if(a!==!1){if(typeof this[`getInput${Ur(i)}`]=="function")s=this[`getInput${Ur(i)}`](r);else if(o!=="object"){let u;const l=(this.map?this.map[i]:null)||[];l.length===1?u=l[0]:u=l.find(f=>Object.keys(this.values).includes(f)),u&&(s=Object.assign(Object.assign({},r),{name:u}))}s||(s=r),Array.isArray(s)?s.forEach(u=>t.push(u)):(c&&(s.messages=c),t.push(s))}}),t}static getMessages(t){var n,r;if(t.value)return(r=(n=t.value[0])===null||n===void 0?void 0:n.form)===null||r===void 0?void 0:r.value.reduce((s,i)=>(i.messages&&(s=[...s,...i.messages.value]),s),[])}getValuesAfterProceed(){const t=this.remediation.value||[],n=this.getInputs(),r=[...t,...n];for(const s of r)delete this.values[s.name];return this.values}getAuthenticator(){var t,n;const r=(t=this.remediation.relatesTo)===null||t===void 0?void 0:t.value;if(!r)return;const s=ks(this.remediation);if(!s)return r;const i=s.form.value.find(({name:a})=>a==="id").value,o=(n=s.form.value.find(({name:a})=>a==="enrollmentId"))===null||n===void 0?void 0:n.value;return Object.assign(Object.assign({},r),{id:i,enrollmentId:o})}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Gr(e){if(Array.isArray(e))return e.map(n=>typeof n=="string"||typeof n=="number"||typeof n=="boolean"?n:Gr(n));const t={};for(const[n,r]of Object.entries(e))if(!(r===null||typeof r>"u"))if(typeof r=="object"){const s=Object.keys(r);if(["value","form"].includes(n)&&s.length===1&&["value","form"].includes(s[0])){const i=Gr(r);Object.entries(i).forEach(([o,a])=>{t[o]=a})}else t[n]=Gr(r)}else t[n]=r;return t}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Ao extends Be{canRemediate(){return typeof this.remediation.action!="function"?!1:!!(this.remediation.name==="poll"||this.remediation.name.endsWith("-poll")||this.options.step)}getData(){return this.getInputs().reduce((n,{name:r})=>(n[r]=this.values[r],n),{})}getNextStep(t,n){const r=this.getName(),s=this.getInputs(),i=this.remediation,{href:o,method:a,rel:c,accepts:u,produces:l,value:f,action:d}=i,h=ln(i,["href","method","rel","accepts","produces","value","action"]);return d?Object.assign(Object.assign(Object.assign({},h),!!s.length&&{inputs:s}),{action:async v=>t.idx.proceed(Object.assign({step:r},v))}):Object.assign({},this.remediation)}getInputs(){return(this.remediation.value||[]).filter(({name:t})=>t!=="stateHandle").map(Gr).map(t=>(t.type=t.type||"string",t))}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const ko={remediators:{},getFlowSpecification:function(e,t="default"){return{remediators:{}}}};function qp(e){Object.assign(ko,e)}function Kp(e,t="default"){return ko.getFlowSpecification(e,t)}function us(e){const{neededToProceed:t,interactionCode:n}=e;return!t.length&&!n}function Wp(e){return e.neededToProceed.some(({name:t})=>t==="skip")}function $p(e){return Object.keys(e.actions).some(t=>t.includes("resend"))}function xi(e){if(!(!e||!Array.isArray(e)))return e.reduce((t,n)=>{if(n.messages&&(t=[...t,...n.messages.value]),n.form){const r=xi(n.form.value)||[];t=[...t,...r]}if(n.options){let r=[];n.options.forEach(i=>{!i.value||typeof i.value=="string"||(r=[...r,i.value])});const s=xi(r)||[];t=[...t,...s]}return t},[])}function vl(e,t){var n;let r=[];const{rawIdxState:s,neededToProceed:i}=e,o=(n=s.messages)===null||n===void 0?void 0:n.value.map(c=>c);if(o&&(r=[...r,...o]),!t.useGenericRemediator)for(let c of i){const u=xi(c.value);u&&(r=[...r,...u])}const a={};return r=r.reduce((c,u)=>{var l;const f=(l=u.i18n)===null||l===void 0?void 0:l.key;return f&&a[f]&&u.message===a[f].message||(a[f]=u,c=[...c,u]),c},[]),r}function Gp(e){const t=[],{actions:n,neededToProceed:r}=e;return n["currentAuthenticator-recover"]&&t.push(Vt.PASSWORD_RECOVERY),r.some(({name:s})=>s==="select-enroll-profile")&&t.push(Vt.REGISTRATION),r.some(({name:s})=>s==="redirect-idp")&&t.push(Vt.SOCIAL_IDP),r.some(({name:s})=>s==="unlock-account")&&t.push(Vt.ACCOUNT_UNLOCK),t}function zp(e,t,n){var r;const s=[],i=Object.values(ko.remediators).reduce((o,a)=>(a.remediationName&&(o[a.remediationName]=a),o),{});for(let o of t.neededToProceed){const a=Ci(o,{useGenericRemediator:n,remediators:i});if(a){const c=new a(o);s.push(c.getNextStep(e,t.context))}}for(const[o]of Object.entries(t.actions||{})){let a={name:o,action:async c=>e.idx.proceed({actions:[{name:o,params:c}]})};if(o.startsWith("currentAuthenticator")){const[c,u]=ep(o,"-"),l=t.rawIdxState[c].value[u],f=ln(l,["href","method","rel","accepts","produces"]),d=(r=l.value)===null||r===void 0?void 0:r.filter(h=>h.name!=="stateHandle");a=Object.assign(Object.assign(Object.assign({},f),d&&{value:d}),a)}s.push(a)}return s}function Jp(e,t,n){const s=(e.neededToProceed||[]).find(o=>o.name===t);return s?s.value.reduce((o,a)=>{const{name:c,value:u}=a;return c==="stateHandle"?o[c]=u:o[c]=n[c],o},{}):(gt(`filterValuesForRemediation: "${t}" did not match any remediations`),n)}function Ci(e,t){const{useGenericRemediator:n,remediators:r}=t;if(e)return n?Ao:r[e.name]}function Ii(e,t,n){const r=n.remediators,s=n.useGenericRemediator,{neededToProceed:i,context:o}=e;let a;if(n.step){const u=i.find(({name:l})=>l===n.step);if(u){const l=Ci(u,n);return l?new l(u,t,n):void 0}else{gt(`step "${n.step}" did not match any remediations`);return}}const c=[];if(s)c.push(new Ao(i[0],t,n));else for(let u of i){if(!Object.keys(r).includes(u.name))continue;const f=Ci(u,n);if(a=new f(u,t,n),a.canRemediate(o))return a;c.push(a)}return c[0]}function Mi(e,t,n){const r=t.getNextStep(e,n.context),s=Wp(n),i=$p(n);return Object.assign(Object.assign(Object.assign({},r),s&&{canSkip:s}),i&&{canResend:i})}function Lr(e,t,n={}){const r=us(t),s=vl(t,n);if(r)return{idxResponse:t,terminal:r,messages:s};{const i=Ii(t,{},n),o=i&&Mi(e,i,t);return Object.assign({idxResponse:t,messages:s},o&&{nextStep:o})}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Qp(e,t){return Object.keys(t.actions).find(n=>!!e.resend&&n.includes("-resend"))}function Yp(e){return Object.assign(Object.assign({},e),{resend:void 0})}function Xp(e,t){let n=e.actions||[];return n=n.filter(r=>typeof r=="string"?r!==t:r.name!==t),Object.assign(Object.assign({},e),{actions:n})}async function zr(e,t,n,r){let{neededToProceed:s,interactionCode:i}=t;const{flow:o}=r;if(i)return{idxResponse:t};const a=Ii(t,n,r),c=Qp(n,t),l=[...r.actions||[],...c&&[c]||[]];if(l)for(let v of l){let m={};typeof v!="string"&&(m=v.params||{},v=v.name);let O=Yp(n),R=Xp(r,v);if(typeof t.actions[v]=="function")return t=await t.actions[v](m),t.requestDidSucceed===!1?Lr(e,t,r):v==="cancel"?{idxResponse:t,canceled:!0}:zr(e,t,O,R);if(s.find(({name:M})=>M===v))return t=await t.proceed(v,m),t.requestDidSucceed===!1?Lr(e,t,r):zr(e,t,n,R)}const f=us(t);if(f)return{idxResponse:t,terminal:f};if(!a){if(r.step)return n=Jp(t,r.step,n),t=await t.proceed(r.step,n),t.requestDidSucceed===!1?Lr(e,t,r):{idxResponse:t};if(o==="default")return{idxResponse:t};throw new _(`
      No remediation can match current flow, check policy settings in your org.
      Remediations: [${s.reduce((v,m)=>v?v+" ,"+m.name:m.name,"")}]
    `)}if(!a.canRemediate()){const v=Mi(e,a,t);return{idxResponse:t,nextStep:v}}const d=a.getName(),h=a.getData();if(t=await t.proceed(d,h),t.requestDidSucceed===!1)return Lr(e,t,r);if(n=a.getValuesAfterProceed(),r=Object.assign(Object.assign({},r),{step:void 0}),r.useGenericRemediator&&!t.interactionCode&&!us(t)){const v=Ii(t,n,r),m=Mi(e,v,t);return{idxResponse:t,nextStep:m}}return zr(e,t,n,r)}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Zp(e){const t=["flow","remediators","actions","withCredentials","step","useGenericRemediator","exchangeCodeForTokens"],n=Object.assign({},e);return t.forEach(r=>{delete n[r]}),n}function eg(e,t){var n,r,s,i;let{options:o}=t;o=Object.assign(Object.assign({},e.options.idx),o);let{flow:a,withCredentials:c,remediators:u,actions:l}=o;const f=Qt.PENDING;if(a=a||((r=(n=e.idx).getFlow)===null||r===void 0?void 0:r.call(n))||"default",a){(i=(s=e.idx).setFlow)===null||i===void 0||i.call(s,a);const d=Kp(e,a);c=typeof c<"u"?c:d.withCredentials,u=u||d.remediators,l=l||d.actions}return Object.assign(Object.assign({},t),{options:Object.assign(Object.assign({},o),{flow:a,withCredentials:c,remediators:u,actions:l}),status:f})}async function tg(e,t){const{options:n}=t,{stateHandle:r,withCredentials:s,version:i,state:o,scopes:a,recoveryToken:c,activationToken:u,maxAge:l,acrValues:f,nonce:d,useGenericRemediator:h}=n;let v,m=$t(e,{state:o,recoveryToken:c,activationToken:u});if(r)v=await Ri(e,{withCredentials:s,version:i,stateHandle:r,useGenericRemediator:h});else{let O=m?.interactionHandle;if(!O){e.transactionManager.clear();const R=await ll(e,{withCredentials:s,state:o,scopes:a,activationToken:u,recoveryToken:c,maxAge:l,acrValues:f,nonce:d});O=R.interactionHandle,m=R.meta}v=await Ri(e,{withCredentials:s,version:i,interactionHandle:O,useGenericRemediator:h})}return Object.assign(Object.assign({},t),{idxResponse:v,meta:m})}async function ng(e,t){let{idxResponse:n,options:r,values:s}=t;const{autoRemediate:i,remediators:o,actions:a,flow:c,step:u,useGenericRemediator:l}=r;if(!(i!==!1&&(o||a||u)))return t;s=Object.assign(Object.assign({},s),{stateHandle:n.rawIdxState.stateHandle});const{idxResponse:d,nextStep:h,canceled:v}=await zr(e,n,s,{remediators:o,actions:a,flow:c,step:u,useGenericRemediator:l});return n=d,Object.assign(Object.assign({},t),{idxResponse:n,nextStep:h,canceled:v})}async function rg(e,t){let{meta:n,idxResponse:r}=t;const{interactionCode:s}=r,{clientId:i,codeVerifier:o,ignoreSignature:a,redirectUri:c,urls:u,scopes:l}=n;return(await e.token.exchangeCodeForTokens({interactionCode:s,clientId:i,codeVerifier:o,ignoreSignature:a,redirectUri:c,scopes:l},u)).tokens}async function sg(e,t){let{options:n,idxResponse:r,canceled:s,status:i}=t;const{exchangeCodeForTokens:o}=n;let a=!1,c=!1,u=!0,l,f,d,h,v,m;if(r&&(a=!!(r.requestDidSucceed||r.stepUp),d=Gp(r),h=zp(e,r,n.useGenericRemediator),v=vl(r,n),m=us(r)),m){i=Qt.TERMINAL;const O=Object.keys(r.actions).length>0,R=!!v.find(M=>M.class==="ERROR");!O&&!R&&r.requestDidSucceed===!0?c=!0:a=!!O,u=!1}else s?(i=Qt.CANCELED,c=!0):r?.interactionCode&&(l=r.interactionCode,o===!1?(i=Qt.SUCCESS,c=!1):(f=await rg(e,t),i=Qt.SUCCESS,c=!0));return Object.assign(Object.assign({},t),{status:i,interactionCode:l,tokens:f,shouldSaveResponse:a,shouldClearTransaction:c,clearSharedStorage:u,enabledFeatures:d,availableSteps:h,messages:v,terminal:m})}async function fn(e,t={}){var n;let r={options:t,values:Zp(t)};r=eg(e,r),r=await tg(e,r),r=await ng(e,r),r=await sg(e,r);const{idxResponse:s,meta:i,shouldSaveResponse:o,shouldClearTransaction:a,clearSharedStorage:c,status:u,enabledFeatures:l,availableSteps:f,tokens:d,nextStep:h,messages:v,error:m,interactionCode:O}=r;if(a)e.transactionManager.clear({clearSharedStorage:c});else if(Eo(e,Object.assign({},i)),o){const{rawIdxState:ve,requestDidSucceed:le}=s;e.transactionManager.saveIdxResponse({rawIdxResponse:ve,requestDidSucceed:le,stateHandle:(n=s.context)===null||n===void 0?void 0:n.stateHandle,interactionHandle:i?.interactionHandle})}const{actions:R,context:k,neededToProceed:M,proceed:x,rawIdxState:z,requestDidSucceed:J,stepUp:Q}=s||{};return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({status:u},i&&{meta:i}),l&&{enabledFeatures:l}),f&&{availableSteps:f}),d&&{tokens:d}),h&&{nextStep:h}),v&&v.length&&{messages:v}),m&&{error:m}),Q&&{stepUp:Q}),{interactionCode:O,actions:R,context:k,neededToProceed:M,proceed:x,rawIdxState:z,requestDidSucceed:J})}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */async function ig(e,t={}){return t.password&&!t.authenticator&&(t.authenticator=kt.OKTA_PASSWORD),fn(e,Object.assign(Object.assign({},t),{flow:"authenticate"}))}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Nn{constructor(t){this.meta=t}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class yl extends Nn{canVerify(t){return!!(t.credentials||t.verificationCode||t.otp)}mapCredentials(t){const{credentials:n,verificationCode:r,otp:s}=t;if(!(!n&&!r&&!s))return n||{passcode:r||s}}getInputs(t){var n;return Object.assign(Object.assign({},(n=t.form)===null||n===void 0?void 0:n.value[0]),{name:"verificationCode",type:"string",required:t.required})}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class og extends yl{mapCredentials(t){const{verificationCode:n}=t;if(n)return{totp:n}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class wl extends Nn{canVerify(t){return!!(t.credentials||t.password||t.passcode)}mapCredentials(t){const{credentials:n,password:r,passcode:s,revokeSessions:i}=t;if(!(!n&&!r&&!s))return n||{passcode:s||r,revokeSessions:i}}getInputs(t){var n,r;const s=[Object.assign(Object.assign({},(n=t.form)===null||n===void 0?void 0:n.value[0]),{name:"password",type:"string",required:t.required})];return((r=t.form)===null||r===void 0?void 0:r.value.find(o=>o.name==="revokeSessions"))&&s.push({name:"revokeSessions",type:"boolean",label:"Sign me out of all other devices",required:!1}),s}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class ag extends Nn{canVerify(t){const{credentials:n}=t;if(n&&n.questionKey&&n.answer)return!0;const{questionKey:r,question:s,answer:i}=t;return!!(r&&i)||!!(s&&i)}mapCredentials(t){const{questionKey:n,question:r,answer:s}=t;if(!(!s||!n&&!r))return{questionKey:r?"custom":n,question:r,answer:s}}getInputs(){return[{name:"questionKey",type:"string",required:!0},{name:"question",type:"string",label:"Create a security question"},{name:"answer",type:"string",label:"Answer",required:!0}]}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class cg extends Nn{canVerify(t){const{credentials:n}=t;if(n&&n.answer)return!0;const{answer:r}=t;return!!r}mapCredentials(t){const{answer:n}=t;if(n)return{questionKey:this.meta.contextualData.enrolledQuestion.questionKey,answer:n}}getInputs(){return[{name:"answer",type:"string",label:"Answer",required:!0}]}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class ug extends Nn{canVerify(t){const{credentials:n}=t,r=n||t,{clientData:s,attestation:i}=r;return!!(s&&i)}mapCredentials(t){const{credentials:n,clientData:r,attestation:s}=t;if(!(!n&&!r&&!s))return n||{clientData:r,attestation:s}}getInputs(){return[{name:"clientData",type:"string",required:!0,visible:!1,label:"Client Data"},{name:"attestation",type:"string",required:!0,visible:!1,label:"Attestation"}]}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class lg extends Nn{canVerify(t){const{credentials:n}=t,r=n||t,{clientData:s,authenticatorData:i,signatureData:o}=r;return!!(s&&i&&o)}mapCredentials(t){const{credentials:n,authenticatorData:r,clientData:s,signatureData:i}=t;if(!(!n&&!r&&!s&&!i))return n||{authenticatorData:r,clientData:s,signatureData:i}}getInputs(){return[{name:"authenticatorData",type:"string",label:"Authenticator Data",required:!0,visible:!1},{name:"clientData",type:"string",label:"Client Data",required:!0,visible:!1},{name:"signatureData",type:"string",label:"Signature Data",required:!0,visible:!1}]}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function fg(e){var t,n;const r=e.relatesTo,s=r?.value||{};switch(s.key){case kt.OKTA_PASSWORD:return new wl(s);case kt.SECURITY_QUESTION:return!((t=s.contextualData)===null||t===void 0)&&t.enrolledQuestion?new cg(s):new ag(s);case kt.OKTA_VERIFY:return new og(s);case kt.WEBAUTHN:return!((n=s.contextualData)===null||n===void 0)&&n.challengeData?new lg(s):new ug(s);default:return new yl(s)}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Po extends Be{constructor(t,n={}){super(t,n),this.authenticator=fg(t)}getNextStep(t,n){var r;const s=super.getNextStep(t,n),i=(r=n?.authenticatorEnrollments)===null||r===void 0?void 0:r.value;return Object.assign(Object.assign({},s),{authenticatorEnrollments:i})}canRemediate(){return this.authenticator.canVerify(this.values)}mapCredentials(){return this.authenticator.mapCredentials(this.values)}getInputCredentials(t){return this.authenticator.getInputs(t)}getValuesAfterProceed(){return this.values=super.getValuesAfterProceed(),Object.keys(this.values).filter(n=>n!=="credentials").reduce((n,r)=>Object.assign(Object.assign({},n),{[r]:this.values[r]}),{})}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Ps extends Po{}Ps.remediationName="enroll-authenticator";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Dn extends Be{canRemediate(){return!!this.values.startPolling||this.options.step==="enroll-poll"}getNextStep(t,n){const r=super.getNextStep(t,n);let s=this.getAuthenticator();return!s&&n?.currentAuthenticator&&(s=n.currentAuthenticator.value),Object.assign(Object.assign({},r),{authenticator:s,poll:{required:!0,refresh:this.remediation.refresh}})}getValuesAfterProceed(){return Object.keys(this.values).filter(n=>n!=="startPolling").reduce((n,r)=>Object.assign(Object.assign({},n),{[r]:this.values[r]}),{})}}Dn.remediationName="enroll-poll";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Rs extends Be{canRemediate(){if(this.values.channel)return!0;if(this.values.authenticator){const{id:t,channel:n}=this.values.authenticator;if(t&&n)return!0}return!1}getNextStep(t,n){const r=super.getNextStep(t,n),s=n.currentAuthenticator.value;return Object.assign(Object.assign({},r),{authenticator:s})}getData(){var t;return{authenticator:{id:this.remediation.value[0].value.form.value[0].value,channel:((t=this.values.authenticator)===null||t===void 0?void 0:t.channel)||this.values.channel},stateHandle:this.values.stateHandle}}getValuesAfterProceed(){this.values=super.getValuesAfterProceed(),delete this.values.authenticators;const t=this.values.channel?"channel":"authenticator";return Object.keys(this.values).filter(r=>r!==t).reduce((r,s)=>Object.assign(Object.assign({},r),{[s]:this.values[s]}),{})}}Rs.remediationName="select-enrollment-channel";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class xs extends Be{getInputEmail(){return[{name:"email",type:"string",required:!0,label:"Email"}]}getInputPhoneNumber(){return[{name:"phoneNumber",type:"string",required:!0,label:"Phone Number"}]}canRemediate(){return!!(this.values.email||this.values.phoneNumber)}getNextStep(t,n){const r=super.getNextStep(t,n),s=n.currentAuthenticator.value;return Object.assign(Object.assign({},r),{authenticator:s})}getData(){return{stateHandle:this.values.stateHandle,email:this.values.email,phoneNumber:this.values.phoneNumber}}getValuesAfterProceed(){return Object.keys(this.values).filter(n=>!["email","phoneNumber"].includes(n)).reduce((n,r)=>Object.assign(Object.assign({},n),{[r]:this.values[r]}),{})}}xs.remediationName="enrollment-channel-data";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class wr extends Po{}wr.remediationName="challenge-authenticator";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Cs extends Dn{canRemediate(){return!!this.values.startPolling||this.options.step==="challenge-poll"}}Cs.remediationName="challenge-poll";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Ro extends Po{}Ro.remediationName="reset-authenticator";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class xo extends Be{constructor(t,n={},r={}){super(t,n,r),this.authenticator=null,this.getCredentialsFromRemediation()&&(this.authenticator=this.authenticator=new wl({}))}canRemediate(){if(this.authenticator&&!this.authenticator.canVerify(this.values))return!1;const t=this.getData().userProfile;return t?this.remediation.value.find(({name:r})=>r==="userProfile").form.value.reduce((r,s)=>(s.required&&(r=r&&!!t[s.name]),r),!0):!1}getCredentialsFromRemediation(){return this.remediation.value.find(({name:t})=>t==="credentials")}mapUserProfile({form:{value:t}}){const r=t.map(({name:s})=>s).reduce((s,i)=>this.values[i]?Object.assign(Object.assign({},s),{[i]:this.values[i]}):s,{});if(Object.keys(r).length!==0)return r}mapCredentials(){const t=this.authenticator&&this.authenticator.mapCredentials(this.values);if(t)return t}getInputUserProfile(t){return[...t.form.value]}getInputCredentials(t){return[...t.form.value]}getErrorMessages(t){return t.value[0].form.value.reduce((n,r)=>(r.messages&&n.push(r.messages.value[0].message),n),[])}}xo.remediationName="enroll-profile";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class xn extends Be{constructor(){super(...arguments),this.map={identifier:["username"]}}canRemediate(){const{identifier:t}=this.getData();return!!t}mapCredentials(){const{credentials:t,password:n}=this.values;if(!(!t&&!n))return t||{passcode:n}}getInputCredentials(t){return Object.assign(Object.assign({},t.form.value[0]),{name:"password",required:t.required})}}xn.remediationName="identify";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class br extends Be{mapCredentials(){const{newPassword:t}=this.values;if(t)return{passcode:t}}getInputCredentials(t){const r=this.getAuthenticator().type==="password"?"newPassword":"verificationCode";return Object.assign(Object.assign({},t.form.value[0]),{name:r})}}br.remediationName="reenroll-authenticator";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class _r extends br{}_r.remediationName="reenroll-authenticator-warning";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Co extends Be{canRemediate(){return!1}getNextStep(){const{name:t,type:n,idp:r,href:s}=this.remediation;return{name:t,type:n,idp:r,href:s}}}Co.remediationName="redirect-idp";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Io extends Be{findMatchedOption(t,n){let r;for(let s of t)if(r=n.find(({relatesTo:i})=>i.key&&i.key===s.key),r)break;return r}canRemediate(t){var n,r;const{authenticators:s,authenticator:i}=this.values,o=ks(this.remediation),{options:a}=o;if(!s||!s.length)return!1;if(cs(i)&&i.id)return!0;const c=this.findMatchedOption(s,a);if(c){const u=t?.currentAuthenticator&&t?.currentAuthenticator.value.id===((n=c.relatesTo)===null||n===void 0?void 0:n.id),l=t?.currentAuthenticatorEnrollment&&t?.currentAuthenticatorEnrollment.value.id===((r=c.relatesTo)===null||r===void 0?void 0:r.id);return!u&&!l}return!1}mapAuthenticator(t){const{authenticators:n,authenticator:r}=this.values;if(cs(r)&&r.id)return this.selectedAuthenticator=r,r;const{options:s}=t,i=Bp(n,s);return this.selectedAuthenticator=i.relatesTo,this.selectedOption=i,{id:i?.value.form.value.find(({name:o})=>o==="id").value}}getInputAuthenticator(t){return{name:"authenticator",type:"string",options:t.options.map(({label:r,relatesTo:s})=>({label:r,value:s.key}))}}getValuesAfterProceed(){this.values=super.getValuesAfterProceed();const t=this.values.authenticators.filter(n=>mn(n,this.selectedAuthenticator)!==!0);return Object.assign(Object.assign({},this.values),{authenticators:t})}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Tr extends Io{constructor(t,n={},r={}){var s;super(t,n,r);const i=this.options.flow==="recoverPassword";((s=ks(t).options)===null||s===void 0?void 0:s.some(({relatesTo:a})=>a?.key===kt.OKTA_PASSWORD))&&(i||this.values.password)&&(this.values.authenticators=[...this.values.authenticators||[],{key:kt.OKTA_PASSWORD}])}}Tr.remediationName="select-authenticator-authenticate";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Sr extends Io{}Sr.remediationName="select-authenticator-enroll";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Mo extends Io{constructor(){super(...arguments),this.map={identifier:["username"]}}canRemediate(){return!!this.getData("identifier")&&super.canRemediate()}mapAuthenticator(t){var n,r,s;const i=super.mapAuthenticator(t),o=(n=this.selectedOption)===null||n===void 0?void 0:n.value.form.value.find(({name:c})=>c==="methodType"),a=this.values.methodType||o?.value||((s=(r=o?.options)===null||r===void 0?void 0:r[0])===null||s===void 0?void 0:s.value);return a?Object.assign(Object.assign({},i),{methodType:a}):i}getInputUsername(){return{name:"username",type:"string"}}}Mo.remediationName="select-authenticator-unlock-account";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class jo extends Be{canRemediate(){return!0}}jo.remediationName="select-enroll-profile";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class bl extends Be{constructor(t,n={}){super(t,n),this.authenticator=this.getAuthenticator(),this.formatAuthenticatorData()}formatAuthenticatorData(){if(this.getAuthenticatorData())this.values.authenticatorsData=this.values.authenticatorsData.map(n=>mn(this.authenticator,n)?this.mapAuthenticatorDataFromValues(n):n);else{const n=this.mapAuthenticatorDataFromValues();n&&this.values.authenticatorsData.push(n)}}getAuthenticatorData(){return this.values.authenticatorsData.find(t=>mn(this.authenticator,t))}canRemediate(){return this.values.authenticatorsData.some(t=>mn(this.authenticator,t))}mapAuthenticatorDataFromValues(t){let{methodType:n,authenticator:r}=this.values;!n&&cs(r)&&(n=r?.methodType);const{id:s,enrollmentId:i}=this.authenticator,o=Object.assign(Object.assign({id:s,enrollmentId:i},t&&t),n&&{methodType:n});return o.methodType?o:null}getAuthenticatorFromRemediation(){return this.remediation.value.find(({name:n})=>n==="authenticator")}getValuesAfterProceed(){this.values=super.getValuesAfterProceed();const t=this.values.authenticatorsData.filter(n=>mn(this.authenticator,n)!==!0);return Object.assign(Object.assign({},this.values),{authenticatorsData:t})}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Or extends bl{mapAuthenticator(){return this.getAuthenticatorData()}getInputAuthenticator(){const t=this.getAuthenticatorFromRemediation(),n=t.form.value.find(({name:s})=>s==="methodType");return n&&n.options?{name:"methodType",type:"string",required:!0,options:n.options}:[...t.form.value]}getValuesAfterProceed(){return this.values=super.getValuesAfterProceed(),Object.keys(this.values).filter(n=>n!=="authenticator").reduce((n,r)=>Object.assign(Object.assign({},n),{[r]:this.values[r]}),{})}}Or.remediationName="authenticator-verification-data";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Er extends bl{mapAuthenticator(){const t=this.getAuthenticatorData();return{id:ks(this.remediation).form.value.find(({name:r})=>r==="id").value,methodType:t.methodType,phoneNumber:t.phoneNumber}}getInputAuthenticator(t){return[{name:"methodType",type:"string"},{name:"phoneNumber",label:"Phone Number",type:"string"}].map(n=>{const r=t.form.value.find(s=>s.name===n.name);return Object.assign(Object.assign({},r),n)})}mapAuthenticatorDataFromValues(t){t=super.mapAuthenticatorDataFromValues(t);const{phoneNumber:n}=this.values;if(!(!t&&!n))return Object.assign(Object.assign({},t&&t),n&&{phoneNumber:n})}}Er.remediationName="authenticator-enrollment-data";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Is extends Be{canRemediate(){return!!this.values.skip||this.options.step==="skip"}}Is.remediationName="skip";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const za={identify:xn,"select-authenticator-authenticate":Tr,"select-authenticator-enroll":Sr,"authenticator-enrollment-data":Er,"authenticator-verification-data":Or,"enroll-authenticator":Ps,"challenge-authenticator":wr,"challenge-poll":Cs,"reenroll-authenticator":br,"reenroll-authenticator-warning":_r,"enroll-poll":Dn,"select-enrollment-channel":Rs,"enrollment-channel-data":xs,"redirect-idp":Co,skip:Is};/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const dg={identify:xn,"identify-recovery":xn,"select-authenticator-authenticate":Tr,"select-authenticator-enroll":Sr,"challenge-authenticator":wr,"authenticator-verification-data":Or,"authenticator-enrollment-data":Er,"reset-authenticator":Ro,"reenroll-authenticator":br,"reenroll-authenticator-warning":_r,"enroll-poll":Dn};/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const hg={"select-enroll-profile":jo,"enroll-profile":xo,"authenticator-enrollment-data":Er,"select-authenticator-enroll":Sr,"enroll-poll":Dn,"select-enrollment-channel":Rs,"enrollment-channel-data":xs,"enroll-authenticator":Ps,skip:Is};/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const pg={identify:xn,"select-authenticator-unlock-account":Mo,"select-authenticator-authenticate":Tr,"challenge-authenticator":wr,"challenge-poll":Cs,"authenticator-verification-data":Or,"reenroll-authenticator-warning":_r};/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function No(e,t="default"){let n,r,s=!0;switch(t){case"register":case"signup":case"enrollProfile":n=hg,s=!1;break;case"recoverPassword":case"resetPassword":n=dg,r=["currentAuthenticator-recover","currentAuthenticatorEnrollment-recover"],s=!1;break;case"unlockAccount":n=pg,s=!1,r=["unlock-account"];break;case"authenticate":case"login":case"signin":n=za;break;default:n=za;break}return{flow:t,remediators:n,actions:r,withCredentials:s}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */async function gg(e,t){const n=e.transactionManager.load(),r=No(e,n.flow);return fn(e,Object.assign(Object.assign(Object.assign({},t),r),{actions:["cancel"]}))}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function _l(e){var t=/\+/g,n=/([^&=]+)=?([^&]*)/g,r=e||"";r.charAt(0)==="#"&&r.charAt(1)==="/"&&(r=r.substring(2)),(r.charAt(0)==="#"||r.charAt(0)==="?")&&(r=r.substring(1));for(var s={},i;i=n.exec(r),!!i;){var o=i[1],a=i[2];o==="id_token"||o==="access_token"||o==="code"?s[o]=a:s[o]=decodeURIComponent(a.replace(t," "))}return s}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class mg extends jn{constructor(t,n){super(`Enter the OTP code in the originating client: ${n}`),this.name="EmailVerifyCallbackError",this.state=t,this.otp=n}}function vg(e){return e.name==="EmailVerifyCallbackError"}function Tl(e){return/(otp=)/i.test(e)&&/(state=)/i.test(e)}function Sl(e){return _l(e)}async function yg(e,t){if(Tl(t)){const{state:n,otp:r}=Sl(t);if(e.idx.canProceed({state:n}))return await e.idx.proceed({state:n,otp:r});throw new mg(n,r)}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Ol(e,t={}){return!!($t(e,t)||t.stateHandle)}async function El(e,t={}){if(!Ol(e,t))throw new _("Unable to proceed: saved transaction could not be loaded");let{flow:n,state:r}=t;if(!n){const s=$t(e,{state:r});n=s?.flow}return fn(e,Object.assign(Object.assign({},t),{flow:n}))}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */async function Al(e,t={}){var n;const{withCredentials:r,exchangeCodeForTokens:s}=t;let i=await El(e,{startPolling:!0,withCredentials:r,exchangeCodeForTokens:s});const o=$t(e);let a=(n=o?.remediations)===null||n===void 0?void 0:n.find(c=>c.includes("poll"));return a?.length||gt("No polling remediations available at the current IDX flow stage"),Number.isInteger(t.refresh)?new Promise(function(c,u){setTimeout(async function(){var l,f;try{const d=(f=(l=i.nextStep)===null||l===void 0?void 0:l.poll)===null||f===void 0?void 0:f.refresh;c(d?Al(e,{refresh:d}):i)}catch(d){u(d)}},t.refresh)}):i}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */async function Do(e,t={}){return e.transactionManager.clear(),fn(e,Object.assign({exchangeCodeForTokens:!1},t))}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */async function wg(e,t={}){if(!cl(e)){const{enabledFeatures:n}=await Do(e,Object.assign(Object.assign({},t),{flow:"register",autoRemediate:!1}));if(!t.activationToken&&n&&!n.includes(Vt.REGISTRATION))throw new _("Registration is not supported based on your current org configuration.")}return fn(e,Object.assign(Object.assign({},t),{flow:"register"}))}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */async function bg(e,t={}){const n=No(e,"recoverPassword");return fn(e,Object.assign(Object.assign({},t),n))}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */async function _g(e,t){const n=e.transactionManager.load();if(!n)throw new _("No transaction data was found in storage");const{codeVerifier:r,state:s}=n,{searchParams:i}=new URL(t),o=i.get("state"),a=i.get("interaction_code"),c=i.get("error");if(c)throw new Pn(c,i.get("error_description"));if(o!==s)throw new _("State in redirect uri does not match with transaction state");if(!a)throw new _("Unable to parse interaction_code from the url");const{tokens:u}=await e.token.exchangeCodeForTokens({interactionCode:a,codeVerifier:r});e.tokenManager.setTokens(u)}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */async function Tg(e,t={}){if(t.flow="unlockAccount",!cl(e)){const{enabledFeatures:n}=await Do(e,Object.assign(Object.assign({},t),{autoRemediate:!1}));if(n&&!n.includes(Vt.ACCOUNT_UNLOCK))throw new _("Self Service Account Unlock is not supported based on your current org configuration.")}return fn(e,Object.assign({},t))}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function kl(e){return e.name!=="OAuthError"?!1:e.errorCode==="interaction_required"}function Sg(e){return ml(e)&&e.errorCode==="invalid_grant"&&e.errorSummary==="The refresh token is invalid or expired."}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Og(e){return/[?&#](id|access)_token=/.test(e)}function Eg(e){return/[?&#]code=/.test(e)}function Ag(e){return/[?&#]interaction_code=/.test(e)}function kg(e){return/[?&#]error=/.test(e)||/[?&#]error_description/.test(e)}function Pg(e,t){var n=t.options;return!e||!n.redirectUri?!1:e.indexOf(n.redirectUri)===0}function Pl(e){return e.pkce||e.responseType==="code"||e.responseMode==="query"}function Rg(e,t){let n=!1;return Array.isArray(t.responseType)&&t.responseType.length?n=t.responseType.indexOf(e)>=0:n=t.responseType===e,n}function Rl(e){var t=Pl(e),n=t&&e.responseMode!=="fragment";return n?window.location.search:window.location.hash}function Uo(e){if(!Pg(window.location.href,e))return!1;var t=Pl(e.options),n=Rl(e.options);if(kg(n))return!0;if(t){var r=Eg(n)||Ag(n);return r}return Og(window.location.hash)}function xg(e,t){if(!t){if(!Uo(e))return!1;t=Rl(e.options)}return/(error=interaction_required)/i.test(t)}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const Cg=Object.freeze(Object.defineProperty({__proto__:null,AuthenticatorEnrollmentData:Er,AuthenticatorVerificationData:Or,ChallengeAuthenticator:wr,ChallengePoll:Cs,EnrollAuthenticator:Ps,EnrollPoll:Dn,EnrollProfile:xo,EnrollmentChannelData:xs,GenericRemediator:Ao,Identify:xn,ReEnrollAuthenticator:br,ReEnrollAuthenticatorWarning:_r,RedirectIdp:Co,Remediator:Be,ResetAuthenticator:Ro,SelectAuthenticatorAuthenticate:Tr,SelectAuthenticatorEnroll:Sr,SelectAuthenticatorUnlockAccount:Mo,SelectEnrollProfile:jo,SelectEnrollmentChannel:Rs,Skip:Is},Symbol.toStringTag,{value:"Module"}));/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Ig(e){qp({remediators:Cg,getFlowSpecification:No});const t=Do.bind(null,e);return{interact:ll.bind(null,e),introspect:Ri.bind(null,e),makeIdxResponse:pl.bind(null,e),authenticate:ig.bind(null,e),register:wg.bind(null,e),start:t,startTransaction:t,poll:Al.bind(null,e),proceed:El.bind(null,e),cancel:gg.bind(null,e),recoverPassword:bg.bind(null,e),handleInteractionCodeRedirect:_g.bind(null,e),isInteractionRequired:xg.bind(null,e),isInteractionRequiredError:kl,handleEmailVerifyCallback:yg.bind(null,e),isEmailVerifyCallback:Tl,parseEmailVerifyCallback:Sl,isEmailVerifyCallbackError:vg,getSavedTransactionMeta:$t.bind(null,e),createTransactionMeta:Oo.bind(null,e),getTransactionMeta:_p.bind(null,e),saveTransactionMeta:Eo.bind(null,e),clearTransactionMeta:Tp.bind(null,e),isTransactionMetaValid:ul,setFlow:r=>{e.options.flow=r},getFlow:()=>e.options.flow,canProceed:Ol.bind(null,e),unlockAccount:Tg.bind(null,e)}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Mg(e){class t{constructor(...r){const s=new e(r.length?r[0]||{}:{});this.options=Ye(s),this.emitter=new mp,this.features=ei}}return t.features=ei,t.constants=Ba,t.features=t.prototype.features=ei,Object.assign(t,{constants:Ba}),t}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function jg(e,t){return class extends e{constructor(...r){super(...r);const{storageManager:s,cookies:i,storageUtil:o}=this.options;this.storageManager=new t(s,i,o)}clearStorage(){}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Ng{constructor(){this.environments=["okta-auth-js/7.14.1"],this.maybeAddNodeEnvironment()}addEnvironment(t){this.environments.push(t)}getHttpHeader(){return{"X-Okta-User-Agent-Extended":this.environments.join(" ")}}getVersion(){return"7.14.1"}maybeAddNodeEnvironment(){if(be()||!process||!process.versions)return;const{node:t}=process.versions;this.environments.push(`nodejs/${t}`)}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Dg(e,t,n){e.options.headers=e.options.headers||{},e.options.headers[t]=n}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Ug(e){return class extends e{constructor(...n){super(...n),this._oktaUserAgent=new Ng,this.http={setRequestHeader:Dg.bind(null,this)}}setHeaders(n){this.options.headers=Object.assign({},this.options.headers,n)}getIssuerOrigin(){return this.options.issuer.split("/oauth2/")[0]}webfinger(n){var r="/.well-known/webfinger"+Nt(n),s={headers:{Accept:"application/jrd+json"}};return Rn(this,r,s)}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function fr(e){var t=qt(e);return Lo(t)}function Lo(e){return e.replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function Fo(e){return e.replace(/-/g,"+").replace(/_/g,"/")}function ji(e){var t=Fo(e);switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new _("Not a valid Base64Url")}var n=_o(t);try{return decodeURIComponent(escape(n))}catch{return n}}function ls(e){for(var t=new Uint8Array(e.length),n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}function Vo(e){return _o(Fo(e))}function dr(e){return Uint8Array.from(Vo(e),t=>t.charCodeAt(0))}function on(e){return qt(new Uint8Array(e).reduce((t,n)=>t+String.fromCharCode(n),""))}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function xl(e){var t=new TextEncoder().encode(e);return Ve.subtle.digest("SHA-256",t).then(function(n){var r=new Uint8Array(n),s=r.slice(0,16),i=String.fromCharCode.apply(null,s),o=fr(i);return o})}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Cl(e,t){t=He(t);var n="jwk",r={name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}},s=!0,i=["verify"];return delete t.use,Ve.subtle.importKey(n,t,r,s,i).then(function(o){var a=e.split("."),c=ls(a[0]+"."+a[1]),u=Vo(a[2]),l=ls(u);return Ve.subtle.verify(r,o,l,c)})}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const Lg=Object.freeze(Object.defineProperty({__proto__:null,atob:_o,base64ToBase64Url:Lo,base64UrlDecode:Vo,base64UrlToBase64:Fo,base64UrlToBuffer:dr,base64UrlToString:ji,btoa:qt,bufferToBase64Url:on,getOidcHash:xl,stringToBase64Url:fr,stringToBuffer:ls,verifyToken:Cl,webcrypto:Ve},Symbol.toStringTag,{value:"Module"}));/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Ho{constructor(t={quiet:!1}){this.queue=[],this.running=!1,this.options=t}push(t,n,...r){return new Promise((s,i)=>{this.queue.length>0&&this.options.quiet!==!1&&gt("Async method is being called but another async method is already running. The new method will be delayed until the previous method completes."),this.queue.push({method:t,thisObject:n,args:r,resolve:s,reject:i}),this.run()})}run(){if(!this.running&&this.queue.length!==0){this.running=!0;var t=this.queue.shift(),n=t.method.apply(t.thisObject,t.args);Zh(n)?n.then(t.resolve,t.reject).finally(()=>{this.running=!1,this.run()}):(t.resolve(n),this.running=!1,this.run())}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Fg(e){return("0"+e.toString(16)).substr(-2)}function Vg(e){var t=new Uint8Array(Math.ceil(e/2));Ve.getRandomValues(t);var n=Array.from(t,Fg).join("");return n.slice(0,e)}function Hg(e){var t=e||"";return t.length<Oi&&(t=t+Vg(Oi-t.length)),encodeURIComponent(t).slice(0,tl)}function Bg(e){var t=new TextEncoder().encode(e);return Ve.subtle.digest("SHA-256",t).then(function(n){var r=String.fromCharCode.apply(null,new Uint8Array(n)),s=fr(r);return s})}var nr={DEFAULT_CODE_CHALLENGE_METHOD:wo,generateVerifier:Hg,computeChallenge:Bg};/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Il(e){var t=e.split("."),n;try{n={header:JSON.parse(ji(t[0])),payload:JSON.parse(ji(t[1])),signature:t[2]}}catch{throw new _("Malformed token")}return n}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Ms(e){const{pkce:t,clientId:n,redirectUri:r,responseType:s,responseMode:i,scopes:o,acrValues:a,maxAge:c,state:u,ignoreSignature:l,dpop:f}=e.options,d=be()?window.location.href:void 0;return Ye({pkce:t,clientId:n,redirectUri:r||d,responseType:s||["token","id_token"],responseMode:i,state:u||mo(),nonce:rp(),scopes:o||["openid","email"],acrValues:a,maxAge:c,ignoreSignature:l,dpop:f})}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const qg="OktaAuthJs",ni="DPoPKeys";function Ml(e){return(ml(e)||Fp(e))&&e.errorCode==="use_dpop_nonce"}async function Kg(e,t,n){const r=fr(JSON.stringify(e)),s=fr(JSON.stringify(t)),i=await Ve.subtle.sign({name:n.algorithm.name},n,ls(`${r}.${s}`));return`${r}.${s}.${Lo(on(i))}`}function jl(e=32){return[...Ve.getRandomValues(new Uint8Array(e))].map(t=>t.toString(16)).join("")}async function Wg(){const e={name:"RSASSA-PKCS1-v1_5",hash:"SHA-256",modulusLength:2048,publicExponent:new Uint8Array([1,0,1])};return Ve.subtle.generateKey(e,!1,["sign","verify"])}async function $g(e){const t=new TextEncoder().encode(e),n=await Ve.subtle.digest("SHA-256",t);return qt(String.fromCharCode.apply(null,new Uint8Array(n))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function Gg(){return new Promise((e,t)=>{try{const r=window.indexedDB.open(qg,1);r.onerror=function(){t(r.error)},r.onupgradeneeded=function(){r.result.createObjectStore(ni)},r.onsuccess=function(){const s=r.result,i=s.transaction(ni,"readwrite");i.onerror=function(){t(i.error)};const o=i.objectStore(ni);e(o),i.oncomplete=function(){s.close()}}}catch(n){t(n)}})}async function js(e,...t){const n=await Gg();return new Promise((r,s)=>{const i=n[e](...t);i.onsuccess=function(){r(i)},i.onerror=function(){s(i.error)}})}async function zg(e,t){return await js("add",t,e),t}async function Bo(e){if(e){const t=await js("get",e);if(t.result)return t.result}throw new _(`Unable to locate dpop key pair required for refresh${e?` (${e})`:""}`)}async function Ni(e){await js("delete",e)}async function Jg(){await js("clear")}async function Qg(){const e=jl(4),t=await Wg();return await zg(e,t),{keyPair:t,keyPairId:e}}async function Ja(e,t){var n;let r=!1;const{accessToken:s,refreshToken:i}=t;e==="access"&&s&&s.tokenType==="DPoP"&&!i&&(r=!0),e==="refresh"&&i&&!s&&(r=!0);const o=(n=s?.dpopPairId)!==null&&n!==void 0?n:i?.dpopPairId;r&&o&&await Ni(o)}async function Nl({keyPair:e,url:t,method:n,nonce:r,accessToken:s}){const{kty:i,crv:o,e:a,n:c,x:u,y:l}=await Ve.subtle.exportKey("jwk",e.publicKey),f={alg:"RS256",typ:"dpop+jwt",jwk:{kty:i,crv:o,e:a,n:c,x:u,y:l}},d={htm:n,htu:t,iat:Math.floor(Date.now()/1e3),jti:jl()};return r&&(d.nonce=r),s&&(d.ath=await $g(s)),Kg(f,d,e.privateKey)}async function Yg({keyPair:e,url:t,method:n,nonce:r}){const s={keyPair:e,url:t,method:n};return r&&(s.nonce=r),Nl(s)}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Xg(e){if(!e.clientId)throw new _("A clientId must be specified in the OktaAuth constructor to get a token");if(!e.redirectUri)throw new _("The redirectUri passed to /authorize must also be passed to /token");if(!e.authorizationCode&&!e.interactionCode)throw new _("An authorization code (returned from /authorize) must be passed to /token");if(!e.codeVerifier)throw new _('The "codeVerifier" (generated and saved by your app) must be passed to /token')}function Zg(e,t){var n=Ye({client_id:t.clientId,redirect_uri:t.redirectUri,grant_type:t.interactionCode?"interaction_code":"authorization_code",code_verifier:t.codeVerifier});t.interactionCode?n.interaction_code=t.interactionCode:t.authorizationCode&&(n.code=t.authorizationCode);const{clientSecret:r}=e.options;return r&&(n.client_secret=r),Nt(n).slice(1)}async function qo(e,{url:t,data:n,nonce:r,dpopKeyPair:s}){var i,o;const a="POST",c={"Content-Type":"application/x-www-form-urlencoded"};if(e.options.dpop){if(!s)throw new _("DPoP is configured but no key pair was provided");const u=await Yg({url:t,method:a,nonce:r,keyPair:s});c.DPoP=u}try{return await mt(e,{url:t,method:a,args:n,headers:c})}catch(u){if(Ml(u)&&!r){const l=(i=u.resp)===null||i===void 0?void 0:i.headers["dpop-nonce"];if(!l)throw new sn({errorSummary:"No `dpop-nonce` header found when required"},(o=u.resp)!==null&&o!==void 0?o:void 0);return qo(e,{url:t,data:n,dpopKeyPair:s,nonce:l})}throw u}}async function em(e,t,n){Xg(t);var r=Zg(e,t);const s={url:n.tokenUrl,data:r,dpopKeyPair:t?.dpopKeyPair};return qo(e,s)}async function tm(e,t,n){const r=Object.entries({client_id:t.clientId,grant_type:"refresh_token",scope:n.scopes.join(" "),refresh_token:n.refreshToken}).map(function([o,a]){return o+"="+encodeURIComponent(a)}).join("&");let s=n.tokenUrl;t.extraParams&&Object.keys(t.extraParams).length>=1&&(s+=Nt(t.extraParams));const i={url:s,data:r,dpopKeyPair:t?.dpopKeyPair};return qo(e,i)}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Ns(e,t){var n=t||e.options.issuer;return Rn(e,n+"/.well-known/openid-configuration",{cacheResponse:!0})}function nm(e,t,n){var r=e.storageManager.getHttpCache(e.options.cookies);return Ns(e,t).then(function(s){var i=s.jwks_uri,o=r.getStorage(),a=o[i];if(a&&Date.now()/1e3<a.expiresAt){var c=_i(a.response.keys,{kid:n});if(c)return c}return r.clearStorage(i),Rn(e,i,{cacheResponse:!0}).then(function(u){var l=_i(u.keys,{kid:n});if(l)return l;throw new _("The key id, "+n+", was not found in the server's keys")})})}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function rm(e,t,n){const r=n.clientId,s=n.issuer,i=n.nonce,o=n.acrValues;if(!t||!s||!r)throw new _("The jwt, iss, and aud arguments are all required");if(i&&t.nonce!==i)throw new _("OAuth flow response nonce doesn't match request nonce");const a=Math.floor(Date.now()/1e3);if(t.iss!==s)throw new _("The issuer ["+t.iss+"] does not match ["+s+"]");if(Array.isArray(t.aud)&&t.aud.indexOf(r)<0||!Array.isArray(t.aud)&&t.aud!==r)throw new _("The audience ["+t.aud+"] does not match ["+r+"]");if(o&&t.acr!==o)throw new _("The acr ["+t.acr+"] does not match acr_values ["+o+"]");if(t.iat>t.exp)throw new _("The JWT expired before it was issued");if(!e.options.ignoreLifetime){if(a-e.options.maxClockSkew>t.exp)throw new _("The JWT expired and is no longer valid");if(t.iat>a+e.options.maxClockSkew)throw new _("The JWT was issued in the future")}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */async function Dl(e,t,n){if(!t||!t.idToken)throw new _("Only idTokens may be verified");const r=Il(t.idToken),s=n?.issuer||e.options.issuer,{issuer:i}=await Ns(e,s),o=Object.assign({clientId:e.options.clientId,ignoreSignature:e.options.ignoreSignature},n,{issuer:i});if(rm(e,r.payload,o),o.ignoreSignature==!0||!e.features.isTokenVerifySupported())return t;const a=await nm(e,t.issuer,r.header.kid);if(!await Cl(t.idToken,a))throw new _("The token signature is not valid");if(n&&n.accessToken&&t.claims.at_hash&&await xl(n.accessToken)!==t.claims.at_hash)throw new _("Token hash verification failed");return t}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function sm(e,t){if(e.error&&e.error_description)throw new Pn(e.error,e.error_description);if(e.state!==t.state)throw new _("OAuth flow response state doesn't match request state")}async function Sn(e,t,n,r){var s,i;if(e.options.pkce!==!1&&(n.code||n.interaction_code))return e.token.exchangeCodeForTokens(Object.assign({},t,{authorizationCode:n.code,interactionCode:n.interaction_code}),r);t=t||Ms(e),r=r||Kt(e,t);let a=t.responseType||[];!Array.isArray(a)&&a!=="none"&&(a=[a]);let c;n.scope?c=n.scope.split(" "):c=He(t.scopes);const u=t.clientId||e.options.clientId;if(sm(n,t),t.dpop){const{allowBearerTokens:R}=(i=(s=e.options)===null||s===void 0?void 0:s.dpopOptions)!==null&&i!==void 0?i:{allowBearerTokens:!1};if(!R&&n.token_type!=="DPoP")throw new _('Unable to parse OAuth flow response: DPoP was configured but "token_type" was not DPoP')}const l={},f=n.expires_in,d=n.token_type,h=n.access_token,v=n.id_token,m=n.refresh_token,O=Math.floor(Date.now()/1e3);if(h){const R=e.token.decode(h);l.accessToken={accessToken:h,claims:R.payload,expiresAt:Number(f)+O,tokenType:d,scopes:c,authorizeUrl:r.authorizeUrl,userinfoUrl:r.userinfoUrl},t.dpopPairId&&(l.accessToken.dpopPairId=t.dpopPairId),t.extraParams&&(l.accessToken.extraParams=t.extraParams)}if(m&&(l.refreshToken={refreshToken:m,expiresAt:Number(f)+O,scopes:c,tokenUrl:r.tokenUrl,authorizeUrl:r.authorizeUrl,issuer:r.issuer},t.dpopPairId&&(l.refreshToken.dpopPairId=t.dpopPairId),t.extraParams&&(l.refreshToken.extraParams=t.extraParams)),v){const R=e.token.decode(v),k={idToken:v,claims:R.payload,expiresAt:R.payload.exp-R.payload.iat+O,scopes:c,authorizeUrl:r.authorizeUrl,issuer:r.issuer,clientId:u};t.extraParams&&(k.extraParams=t.extraParams);const M={clientId:u,issuer:r.issuer,nonce:t.nonce,accessToken:h,acrValues:t.acrValues};t.ignoreSignature!==void 0&&(M.ignoreSignature=t.ignoreSignature),await Dl(e,k,M),l.idToken=k}if(a.indexOf("token")!==-1&&!l.accessToken)throw new _('Unable to parse OAuth flow response: response type "token" was requested but "access_token" was not returned.');if(a.indexOf("id_token")!==-1&&!l.idToken)throw new _('Unable to parse OAuth flow response: response type "id_token" was requested but "id_token" was not returned.');return{tokens:l,state:n.state,code:n.code,responseType:a}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */async function im(e,t,n){n=n||Kt(e,t),t=Object.assign({},Ms(e),He(t));const{authorizationCode:r,interactionCode:s,codeVerifier:i,clientId:o,redirectUri:a,scopes:c,ignoreSignature:u,state:l,acrValues:f,dpop:d,dpopPairId:h,extraParams:v}=t,m={clientId:o,redirectUri:a,authorizationCode:r,interactionCode:s,codeVerifier:i,dpop:d},O=["token"];c.indexOf("openid")!==-1&&O.push("id_token");const R={clientId:o,redirectUri:a,scopes:c,responseType:O,ignoreSignature:u,acrValues:f,extraParams:v};try{if(d)if(h){const x=await Bo(h);m.dpopKeyPair=x,R.dpop=d,R.dpopPairId=h}else{const{keyPair:x,keyPairId:z}=await Qg();m.dpopKeyPair=x,R.dpop=d,R.dpopPairId=z}const k=await em(e,m,n),M=await Sn(e,R,k,n);return M.code=r,M.state=l,M}finally{e.transactionManager.clear()}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */async function om(e,t,n){if(t||(t=(await e.tokenManager.getTokens()).accessToken),n||(n=(await e.tokenManager.getTokens()).idToken),!t||!Pt(t))return Promise.reject(new _("getUserInfo requires an access token object"));if(!n||!Ht(n))return Promise.reject(new _("getUserInfo requires an ID token object"));const r={url:t.userinfoUrl,method:"GET",accessToken:t.accessToken};if(e.options.dpop){const s=await e.getDPoPAuthorizationHeaders(Object.assign(Object.assign({},r),{accessToken:t}));r.headers=s,delete r.accessToken}return mt(e,r).then(s=>s.sub===n.claims.sub?s:Promise.reject(new _("getUserInfo request was rejected due to token mismatch"))).catch(function(s){var i;if(s instanceof Qe&&!e.options.dpop){const{error:o,errorDescription:a}=s;throw new Pn(o,a)}if(!e.options.dpop){let o=s;if(s instanceof sn&&(!((i=s?.meta)===null||i===void 0)&&i.wwwAuthHeader)&&(o=Qe.parseHeader(s.meta.wwwAuthHeader)),o instanceof Qe){const{error:a,errorDescription:c}=o;throw new Pn(a,c)}}throw s})}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const Ul=12e4;function Ll(e,t,n){e.addEventListener?e.addEventListener(t,n):e.attachEvent("on"+t,n)}function Fl(e,t,n){e.removeEventListener?e.removeEventListener(t,n):e.detachEvent("on"+t,n)}function am(e){var t=document.createElement("iframe");return t.style.display="none",t.src=e,document.body.appendChild(t)}function Vl(e,t){var n=t.popupTitle||"External Identity Provider User Authentication",r="toolbar=no, scrollbars=yes, resizable=yes, top=100, left=500, width=600, height=600";return window.open(e,n,r)}function Qa(e,t,n){var r,s,i=new Promise(function(o,a){r=function(u){if(!(!u.data||u.data.state!==n)){if(u.origin!==e.getIssuerOrigin())return a(new _("The request does not match client configuration"));o(u.data)}},Ll(window,"message",r),s=setTimeout(function(){a(new _("OAuth flow timed out"))},t||Ul)});return i.finally(function(){clearTimeout(s),Fl(window,"message",r)})}function cm(e,t,n,r){let s;return new Promise((o,a)=>{n.onmessage=c=>{if(!(!c.isTrusted||!c.data)){if(typeof c.data=="object"&&r===c.data.state)return o(Object.assign({},c.data));a(new _("Unable to complete auth code exchange"))}},s=setTimeout(function(){a(new _("OAuth flow timed out"))},t||Ul)}).finally(()=>{clearTimeout(s),n.close()})}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function um(e){if(!e.features.isPKCESupported()){var t="PKCE requires a modern browser with encryption support running in a secure context.";throw e.features.isHTTPS()||(t+=`
The current page is not being served with HTTPS protocol. PKCE requires secure HTTPS protocol.`),e.features.hasTextEncoder()||(t+=`
"TextEncoder" is not defined. To use PKCE, you may need to include a polyfill/shim for this browser.`),new _(t)}}async function lm(e,t){t=t||e.options.codeChallengeMethod||wo;var r=(await Ns(e)).code_challenge_methods_supported||[];if(r.indexOf(t)===-1)throw new _("Invalid code_challenge_method");return t}async function fm(e,t){let{codeVerifier:n,codeChallenge:r,codeChallengeMethod:s}=t;return r=r||e.options.codeChallenge,r||(um(e),n=n||nr.generateVerifier(),r=await nr.computeChallenge(n)),s=await lm(e,s),t=Object.assign(Object.assign({},t),{responseType:"code",codeVerifier:n,codeChallenge:r,codeChallengeMethod:s}),t}async function Ko(e,t={}){const n=Ms(e);if(t=Object.assign(Object.assign({},n),t),t.dpop&&!e.features.isDPoPSupported())throw new _("DPoP has been configured, but is not supported by browser");return t.pkce===!1?t:fm(e,t)}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function dm(e){if(!e.clientId)throw new _("A clientId must be specified in the OktaAuth constructor to get a token");if(kn(e.responseType)&&e.responseType.indexOf(" ")!==-1)throw new _("Multiple OAuth responseTypes must be defined as an array");var t={client_id:e.clientId,code_challenge:e.codeChallenge,code_challenge_method:e.codeChallengeMethod,display:e.display,idp:e.idp,idp_scope:e.idpScope,login_hint:e.loginHint,max_age:e.maxAge,nonce:e.nonce,prompt:e.prompt,redirect_uri:e.redirectUri,response_mode:e.responseMode,response_type:e.responseType,sessionToken:e.sessionToken,state:e.state,acr_values:e.acrValues,enroll_amr_values:e.enrollAmrValues};if(t=Ye(t),["idp_scope","response_type","enroll_amr_values"].forEach(function(n){Array.isArray(t[n])&&(t[n]=t[n].join(" "))}),e.responseType.indexOf("id_token")!==-1&&e.scopes.indexOf("openid")===-1)throw new _("openid scope must be specified in the scopes argument when requesting an id_token");return e.scopes&&(t.scope=e.scopes.join(" ")),t}function Wo(e){var t=dm(e);return Nt(Object.assign(Object.assign({},t),e.extraParams&&Object.assign({},e.extraParams)))}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function $o(e,t){if(arguments.length>2)return Promise.reject(new _('As of version 3.0, "getToken" takes only a single set of options'));t=t||{};const n=t.popupWindow;return t.popupWindow=void 0,Ko(e,t).then(function(r){var s={prompt:"none",responseMode:"okta_post_message",display:null},i={display:"popup"};t.sessionToken?Object.assign(r,s):t.idp&&Object.assign(r,i);var o,a,c;c=Kt(e,r),a=t.codeVerifier?c.tokenUrl:c.authorizeUrl,o=a+Wo(r);var u="IMPLICIT";switch(r.sessionToken||r.display===null?u="IFRAME":r.display==="popup"?u=t.idpPopup?"IDP_POPUP":"POPUP":u="IMPLICIT",u){case"IFRAME":var l=Qa(e,t.timeout,r.state),f=am(o);return l.then(function(m){return Sn(e,r,m,c)}).finally(function(){var m;document.body.contains(f)&&((m=f.parentElement)===null||m===void 0||m.removeChild(f))});case"POPUP":var d;if(r.responseMode==="okta_post_message"){if(!e.features.isPopupPostMessageSupported())throw new _("This browser doesn't have full postMessage support");d=Qa(e,t.timeout,r.state)}n&&n.location.assign(o);var h=new Promise(function(m,O){var R=setInterval(function(){(!n||n.closed)&&(clearInterval(R),O(new _("Unable to parse OAuth flow response")))},100);d.then(function(k){clearInterval(R),m(k)}).catch(function(k){clearInterval(R),O(k)})});return h.then(function(m){return Sn(e,r,m,c)}).finally(function(){n&&!n.closed&&n.close()});case"IDP_POPUP":var v=cm(e,t.timeout,t.channel,r.state);if(n)n.location.assign(o);else throw new _("Unable to open popup window");return v.then(function(m){return Sn(e,r,m,c)});default:throw new _("The full page redirect flow is not supported")}})}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Go(e,t){return arguments.length>2?Promise.reject(new _('As of version 3.0, "getWithoutPrompt" takes only a single set of options')):(t=He(t)||{},Object.assign(t,{prompt:"none",responseMode:"okta_post_message",display:null}),$o(e,t))}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function hm(e,t){if(arguments.length>2)return Promise.reject(new _('As of version 3.0, "getWithPopup" takes only a single set of options'));const{initialPath:n}=t,r=ln(t,["initialPath"]),s=Vl(n??"/",r);return t=He(r)||{},Object.assign(r,{display:"popup",responseMode:"okta_post_message",popupWindow:s}),$o(e,r)}function pm(e,t){try{if(!BroadcastChannel)throw new _("Modern browser with `BroadcastChannel` support is required to use this method");if(!t.redirectUri)throw new _("`redirectUri` is a required param for `getWithIDPPopup`");t.state||(t.state=mo());const n=Vl("/",t),r=new BroadcastChannel(`popup-callback:${t.state}`);t=He(t)||{},Object.assign(t,{display:"popup",responseMode:"query",popupWindow:n,idpPopup:!0,channel:r});let s;return{promise:new Promise((a,c)=>(s=c,$o(e,t).then(u=>a(u)).catch(u=>c(u)))),cancel:()=>{r.close(),s(new _("Popup flow canceled"))}}}catch(n){return{promise:Promise.reject(n),cancel:()=>{}}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */async function gm(e,t){if(arguments.length>2)return Promise.reject(new _('As of version 3.0, "getWithRedirect" takes only a single set of options'));t=He(t)||{};const n=await Ko(e,t),r=Wu(e,n),s=r.urls.authorizeUrl+Wo(n);e.transactionManager.save(r),e.options.setLocation?e.options.setLocation(s):window.location.assign(s)}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function mm(e){var t=e.token.parseFromUrl._getHistory(),n=e.token.parseFromUrl._getDocument(),r=e.token.parseFromUrl._getLocation();t&&t.replaceState?t.replaceState(null,n.title,r.pathname+r.search):r.hash=""}function vm(e){var t=e.token.parseFromUrl._getHistory(),n=e.token.parseFromUrl._getDocument(),r=e.token.parseFromUrl._getLocation();t&&t.replaceState?t.replaceState(null,n.title,r.pathname+r.hash):r.search=""}function Hl(e){var t=e.options.pkce?"query":"fragment",n=e.options.responseMode||t;return n}function Di(e,t){t=t||{},kn(t)?t={url:t}:t=t;var n=t.url,r=t.responseMode||Hl(e),s=e.token.parseFromUrl._getLocation(),i;if(r==="query"?i=n?n.substring(n.indexOf("?")):s.search:i=n?n.substring(n.indexOf("#")):s.hash,!i)throw new _("Unable to parse a token from the url");return _l(i)}function ym(e,t){(t.responseMode||Hl(e))==="query"?vm(e):mm(e)}async function wm(e,t){t=t||{},kn(t)?t={url:t}:t=t;const n=Di(e,t),r=n.state,s=e.transactionManager.load({state:r});if(!s)throw e.options.pkce?new _("Could not load PKCE codeVerifier from storage. This may indicate the auth flow has already completed or multiple auth flows are executing concurrently.",void 0):new _("Unable to retrieve OAuth redirect params from storage");const i=s.urls;return delete s.urls,t.url||ym(e,t),Sn(e,s,n,i).catch(o=>{throw kl(o)||e.transactionManager.clear({state:r}),o}).then(o=>(e.transactionManager.clear({state:r}),o))}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function bm(e,t){return e.refreshToken===t.refreshToken}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */async function zo(e,t,n){const{clientId:r,dpop:s}=e.options;if(!r)throw new _("A clientId must be specified in the OktaAuth constructor to renew tokens");try{const i=Object.assign({},t,{clientId:r});n.extraParams&&(i.extraParams=n.extraParams);const o=Object.assign({},i);if(s){const f=await Bo(n?.dpopPairId);o.dpopKeyPair=f,i.dpop=s,i.dpopPairId=n.dpopPairId}const a=await tm(e,o,n),c=Kt(e,t),{tokens:u}=await Sn(e,i,a,c),{refreshToken:l}=u;return l&&!bm(l,n)&&e.tokenManager.updateRefreshToken(l),u}catch(i){throw Sg(i)&&e.tokenManager.removeRefreshToken(),i}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Bl(){throw new _("Renew must be passed a token with an array of scopes and an accessToken or idToken")}function Ya(e,t){if(Ht(e))return t.idToken;if(Pt(e))return t.accessToken;Bl()}async function _m(e,t){!Ht(t)&&!Pt(t)&&Bl();let n=e.tokenManager.getTokensSync();if(n.refreshToken)return n=await zo(e,{scopes:t.scopes},n.refreshToken),Ya(t,n);var r;e.options.pkce?r="code":Pt(t)?r="token":r="id_token";const{scopes:s,authorizeUrl:i,userinfoUrl:o,issuer:a,dpopPairId:c,extraParams:u}=t;return Go(e,{responseType:r,scopes:s,authorizeUrl:i,userinfoUrl:o,issuer:a,dpopPairId:c,extraParams:u}).then(function(l){return Ya(t,l.tokens)})}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */async function Tm(e,t){var n;const r=(n=t?.tokens)!==null&&n!==void 0?n:e.tokenManager.getTokensSync();if(r.refreshToken)return zo(e,t||{},r.refreshToken);if(!r.accessToken&&!r.idToken)throw new _("renewTokens() was called but there is no existing token");const s=r.accessToken||{},i=r.idToken||{},o=s.scopes||i.scopes;if(!o)throw new _("renewTokens: invalid tokens: could not read scopes");const a=s.authorizeUrl||i.authorizeUrl;if(!a)throw new _("renewTokens: invalid tokens: could not read authorizeUrl");const c=s.userinfoUrl||e.options.userinfoUrl,u=i.issuer||e.options.issuer,l=s?.dpopPairId,f=s?.extraParams||i?.extraParams;if(t=Object.assign({scopes:o,authorizeUrl:a,userinfoUrl:c,issuer:u,dpopPairId:l,extraParams:f},t),e.options.pkce)t.responseType="code";else{const{responseType:d}=Ms(e);t.responseType=d}return Go(e,t).then(d=>d.tokens)}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */async function Sm(e,t){let n="",r="";if(t&&(n=t.accessToken,r=t.refreshToken),!n&&!r)throw new _("A valid access or refresh token object is required");var s=e.options.clientId,i=e.options.clientSecret;if(!s)throw new _("A clientId must be specified in the OktaAuth constructor to revoke a token");var o=Kt(e).revokeUrl,a=Nt({token_type_hint:r?"refresh_token":"access_token",token:r||n}).slice(1),c=qt(i?`${s}:${i}`:s);return Wt(e,o,a,{headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:"Basic "+c}})}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const Om={accessToken:"access_token",idToken:"id_token",refreshToken:"refresh_token"};async function Em(e,t,n){var r;let s,i=e.options.clientId,o=e.options.clientSecret;if(n||(n=e.tokenManager.getTokens()[t]),!n)throw new _(`unable to find ${t} in storage or fn params`);if(t!==ki.ACCESS?s=n?.issuer:s=(r=n?.claims)===null||r===void 0?void 0:r.iss,s=s||e.options.issuer,!i)throw new _("A clientId must be specified in the OktaAuth constructor to introspect a token");if(!s)throw new _("Unable to find issuer");const{introspection_endpoint:a}=await Ns(e,s),c=qt(o?`${i}:${o}`:i),u=Nt({token_type_hint:Om[t],token:n[t]}).slice(1);return Wt(e,a,u,{headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:"Basic "+c}})}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Am(e,t){const n=e.options.issuer,r=Kt(e,t);return{issuer:n,urls:r,clientId:t.clientId,redirectUri:t.redirectUri,responseType:t.responseType,responseMode:t.responseMode,state:t.state,acrValues:t.acrValues,enrollAmrValues:t.enrollAmrValues}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function km(e){const{clientId:t,redirectUri:n,responseMode:r,state:s}=e.options,i=be()?window.location.href:void 0;return Ye({clientId:t,redirectUri:n||i,responseMode:r,state:s||mo(),responseType:"none",prompt:"enroll_authenticator"})}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Pm(e){if(e=Object.assign(Object.assign({},e),{responseType:"none",prompt:"enroll_authenticator",maxAge:0}),!e.enrollAmrValues)throw new _("enroll_amr_values must be specified");if(!e.acrValues)throw new _("acr_values must be specified");return delete e.scopes,delete e.nonce,e}function Rm(e,t){return Pm(Object.assign(Object.assign({},km(e)),t))}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function xm(e,t){t=He(t)||{};const n=Rm(e,t),r=Am(e,n),s=r.urls.authorizeUrl+Wo(n);e.transactionManager.save(r),e.options.setLocation?e.options.setLocation(s):window.location.assign(s)}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Cm(e,t){const n=c=>Ho.prototype.push.bind(t,c,null),r=n(gm.bind(null,e)),s=n(wm.bind(null,e)),i=Object.assign(s,{_getHistory:function(){return window.history},_getLocation:function(){return window.location},_getDocument:function(){return window.document}}),o={prepareTokenParams:Ko.bind(null,e),exchangeCodeForTokens:im.bind(null,e),getWithoutPrompt:Go.bind(null,e),getWithPopup:hm.bind(null,e),getWithIDPPopup:pm.bind(null,e),getWithRedirect:r,parseFromUrl:i,decode:Il,revoke:Sm.bind(null,e),renew:_m.bind(null,e),renewTokensWithRefresh:zo.bind(null,e),renewTokens:Tm.bind(null,e),getUserInfo:(c,u)=>om(e,c,u),verify:Dl.bind(null,e),isLoginRedirect:Uo.bind(null,e),introspect:Em.bind(null,e)};return["getWithoutPrompt","getWithPopup","revoke","renew","renewTokensWithRefresh","renewTokens"].forEach(c=>{o[c]=n(o[c])}),o}function Im(e){return{authorize:{enrollAuthenticator:xm.bind(null,e)}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Fr(e,t){if(!Ht(e)&&!Pt(e)&&!Yt(e))throw new _("Token must be an Object with scopes, expiresAt, and one of: an idToken, accessToken, or refreshToken property");if(t==="accessToken"&&!Pt(e))throw new _("invalid accessToken");if(t==="idToken"&&!Ht(e))throw new _("invalid idToken");if(t==="refreshToken"&&!Yt(e))throw new _("invalid refreshToken")}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Jo{constructor(t){this.localOffset=parseInt(t||0)}static create(){var t=0;return new Jo(t)}now(){var t=(Date.now()+this.localOffset)/1e3;return t}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const Ui="expired",Wn="renewed",Xt="added",Zt="removed",Mm="error",$n="set_storage";/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const Xa={autoRenew:!0,autoRemove:!0,syncStorage:!0,clearPendingRemoveTokens:!0,storage:void 0,expireEarlySeconds:30,storageKey:yo};function jm(){return{expireTimeouts:{},renewPromise:null}}class Nm{constructor(t,n={}){if(this.sdk=t,this.emitter=t.emitter,!this.emitter)throw new _("Emitter should be initialized before TokenManager");n=Object.assign({},Xa,Ye(n)),al()||(n.expireEarlySeconds=Xa.expireEarlySeconds),this.options=n;const r=Ye({storageKey:n.storageKey,secure:n.secure});typeof n.storage=="object"?r.storageProvider=n.storage:n.storage&&(r.storageType=n.storage),this.storage=t.storageManager.getTokenStorage(Object.assign(Object.assign({},r),{useSeparateCookies:!0})),this.clock=Jo.create(),this.state=jm()}on(t,n,r){r?this.emitter.on(t,n,r):this.emitter.on(t,n)}off(t,n){n?this.emitter.off(t,n):this.emitter.off(t)}start(){this.options.clearPendingRemoveTokens&&this.clearPendingRemoveTokens(),this.setExpireEventTimeoutAll(),this.state.started=!0}stop(){this.clearExpireEventTimeoutAll(),this.state.started=!1}isStarted(){return!!this.state.started}getOptions(){return He(this.options)}getExpireTime(t){const n=this.options.expireEarlySeconds||0;var r=t.expiresAt-n;return r}hasExpired(t){var n=this.getExpireTime(t);return n<=this.clock.now()}emitExpired(t,n){this.emitter.emit(Ui,t,n)}emitRenewed(t,n,r){this.emitter.emit(Wn,t,n,r)}emitAdded(t,n){this.emitter.emit(Xt,t,n)}emitRemoved(t,n){this.emitter.emit(Zt,t,n)}emitError(t){this.emitter.emit(Mm,t)}clearExpireEventTimeout(t){clearTimeout(this.state.expireTimeouts[t]),delete this.state.expireTimeouts[t],this.state.renewPromise=null}clearExpireEventTimeoutAll(){var t=this.state.expireTimeouts;for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&this.clearExpireEventTimeout(n)}setExpireEventTimeout(t,n){if(!Yt(n)){var r=this.getExpireTime(n),s=Math.max(r-this.clock.now(),0)*1e3;this.clearExpireEventTimeout(t);var i=setTimeout(()=>{this.emitExpired(t,n)},s);this.state.expireTimeouts[t]=i}}setExpireEventTimeoutAll(){var t=this.storage.getStorage();for(var n in t)if(Object.prototype.hasOwnProperty.call(t,n)){var r=t[n];this.setExpireEventTimeout(n,r)}}resetExpireEventTimeoutAll(){this.clearExpireEventTimeoutAll(),this.setExpireEventTimeoutAll()}add(t,n){var r=this.storage.getStorage();Fr(n),r[t]=n,this.storage.setStorage(r),this.emitSetStorageEvent(),this.emitAdded(t,n),this.setExpireEventTimeout(t,n)}getSync(t){var n=this.storage.getStorage();return n[t]}async get(t){return this.getSync(t)}getTokensSync(){const t={},n=this.storage.getStorage();return Object.keys(n).forEach(r=>{const s=n[r];Pt(s)?t.accessToken=s:Ht(s)?t.idToken=s:Yt(s)&&(t.refreshToken=s)}),t}async getTokens(){return this.getTokensSync()}getStorageKeyByType(t){const n=this.storage.getStorage();return Object.keys(n).filter(s=>{const i=n[s];return Pt(i)&&t==="accessToken"||Ht(i)&&t==="idToken"||Yt(i)&&t==="refreshToken"})[0]}getTokenType(t){if(Pt(t))return"accessToken";if(Ht(t))return"idToken";if(Yt(t))return"refreshToken";throw new _("Unknown token type")}emitSetStorageEvent(){if(As()){const t=this.storage.getStorage();this.emitter.emit($n,t)}}getStorage(){return this.storage}setTokens(t,n,r,s){const i=(d,h)=>{const v=this.getTokenType(h);v==="accessToken"?n&&n(d,h):v==="idToken"?r&&r(d,h):v==="refreshToken"&&s&&s(d,h)},o=(d,h)=>{this.emitAdded(d,h),this.setExpireEventTimeout(d,h),i(d,h)},a=(d,h,v)=>{this.emitRenewed(d,h,v),this.clearExpireEventTimeout(d),this.setExpireEventTimeout(d,h),i(d,h)},c=(d,h)=>{this.clearExpireEventTimeout(d),this.emitRemoved(d,h),i(d,h)},u=["idToken","accessToken","refreshToken"],l=this.getTokensSync();u.forEach(d=>{const h=t[d];h&&Fr(h,d)});const f=u.reduce((d,h)=>{const v=t[h];if(v){const m=this.getStorageKeyByType(h)||h;d[m]=v}return d},{});this.storage.setStorage(f),this.emitSetStorageEvent(),u.forEach(d=>{const h=t[d],v=l[d],m=this.getStorageKeyByType(d)||d;h&&v?(c(m,v),o(m,h),a(m,h,v)):h?o(m,h):v&&c(m,v)})}remove(t){this.clearExpireEventTimeout(t);var n=this.storage.getStorage(),r=n[t];delete n[t],this.storage.setStorage(n),this.emitSetStorageEvent(),this.emitRemoved(t,r)}async renewToken(t){var n;return(n=this.sdk.token)===null||n===void 0?void 0:n.renew(t)}validateToken(t){return Fr(t)}renew(t){if(this.state.renewPromise)return this.state.renewPromise;try{var n=this.getSync(t);let s=n!==void 0;if(!n&&t==="accessToken"){const i=this.getStorageKeyByType("refreshToken");s=this.getSync(i)!==void 0}if(!s)throw new _("The tokenManager has no token for the key: "+t)}catch(s){return this.emitError(s),Promise.reject(s)}return this.clearExpireEventTimeout(t),this.state.renewPromise=this.sdk.token.renewTokens().then(s=>{if(this.setTokens(s),!n&&t==="accessToken"){const o=s.accessToken;return this.emitRenewed(t,o,null),o}const i=this.getTokenType(n);return s[i]}).catch(s=>{throw this.remove(t),s.tokenKey=t,this.emitError(s),s}).finally(()=>{this.state.renewPromise=null})}clear(){const t=this.getTokensSync();this.clearExpireEventTimeoutAll(),this.storage.clearStorage(),this.emitSetStorageEvent(),Object.keys(t).forEach(n=>{this.emitRemoved(n,t[n])})}clearPendingRemoveTokens(){const t=this.storage.getStorage(),n={};Object.keys(t).forEach(r=>{t[r].pendingRemove&&(n[r]=t[r],delete t[r])}),this.storage.setStorage(t),this.emitSetStorageEvent(),Object.keys(n).forEach(r=>{this.clearExpireEventTimeout(r),this.emitRemoved(r,n[r])})}updateRefreshToken(t){const n=this.getStorageKeyByType("refreshToken")||Si;var r=this.storage.getStorage();Fr(t),r[n]=t,this.storage.setStorage(r),this.emitSetStorageEvent()}removeRefreshToken(){const t=this.getStorageKeyByType("refreshToken")||Si;this.remove(t)}addPendingRemoveFlags(){const t=this.getTokensSync();Object.keys(t).forEach(n=>{t[n].pendingRemove=!0}),this.setTokens(t)}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */var Jr={browserHasLocalStorage:function(){try{var e=this.getLocalStorage();return this.testStorage(e)}catch{return!1}},browserHasSessionStorage:function(){try{var e=this.getSessionStorage();return this.testStorage(e)}catch{return!1}},testStorageType:function(e){var t=!1;switch(e){case"sessionStorage":t=this.browserHasSessionStorage();break;case"localStorage":t=this.browserHasLocalStorage();break;case"cookie":case"memory":t=!0;break;default:t=!1;break}return t},getStorageByType:function(e,t){let n;switch(e){case"sessionStorage":n=this.getSessionStorage();break;case"localStorage":n=this.getLocalStorage();break;case"cookie":n=this.getCookieStorage(t);break;case"memory":n=this.getInMemoryStorage();break;default:throw new _(`Unrecognized storage option: ${e}`)}return n},findStorageType:function(e){let t,n;return e=e.slice(),t=e.shift(),n=e.length?e[0]:null,!n||this.testStorageType(t)?t:(gt(`This browser doesn't support ${t}. Switching to ${n}.`),this.findStorageType(e))},getLocalStorage:function(){return As()&&!window.onstorage&&(window.onstorage=function(){}),localStorage},getSessionStorage:function(){return sessionStorage},getCookieStorage:function(e){const t=e.secure,n=e.sameSite,r=e.sessionCookie;if(typeof t>"u"||typeof n>"u")throw new _('getCookieStorage: "secure" and "sameSite" options must be provided');const s={getItem:this.storage.get,setItem:(i,o,a="2200-01-01T00:00:00.000Z")=>{a=r?null:a,this.storage.set(i,o,a,{secure:t,sameSite:n})},removeItem:i=>{this.storage.delete(i)}};return e.useSeparateCookies?{getItem:function(i){var o=s.getItem(),a={};return Object.keys(o).forEach(c=>{c.indexOf(i)===0&&(a[c.replace(`${i}_`,"")]=JSON.parse(o[c]))}),JSON.stringify(a)},setItem:function(i,o){var a=JSON.parse(this.getItem(i));o=JSON.parse(o),Object.keys(o).forEach(c=>{var u=i+"_"+c,l=JSON.stringify(o[c]);s.setItem(u,l),delete a[c]}),Object.keys(a).forEach(c=>{s.removeItem(i+"_"+c)})},removeItem:function(i){var o=JSON.parse(this.getItem(i));Object.keys(o).forEach(a=>{s.removeItem(i+"_"+a)})}}:s},inMemoryStore:{},getInMemoryStorage:function(){return{getItem:e=>this.inMemoryStore[e],setItem:(e,t)=>{this.inMemoryStore[e]=t}}},testStorage:function(e){var t="okta-test-storage";try{return e.setItem(t,t),e.removeItem(t),!0}catch{return!1}},storage:{set:function(e,t,n,r){const{sameSite:s,secure:i}=r;if(typeof i>"u"||typeof s>"u")throw new _('storage.set: "secure" and "sameSite" options must be provided');var o={path:r.path||"/",secure:i,sameSite:s};return Date.parse(n)&&(o.expires=new Date(n)),Nr.set(e,t,o),this.get(e)},get:function(e){return arguments.length?Nr.get(e):Nr.get()},delete:function(e){return Nr.remove(e,{path:"/"})}}};/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Dm(e){return class extends e{setOriginalUri(n,r){Jr.getSessionStorage().setItem($r,n),r=r||this.options.state,r&&this.storageManager.getOriginalUriStorage().setItem(r,n)}getOriginalUri(n){if(n=n||this.options.state,n){const i=this.storageManager.getOriginalUriStorage().getItem(n);if(i)return i}const r=Jr.getSessionStorage();return r&&r.getItem($r)||void 0}removeOriginalUri(n){if(Jr.getSessionStorage().removeItem($r),n=n||this.options.state,n){const s=this.storageManager.getOriginalUriStorage();s.removeItem&&s.removeItem(n)}}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Um(e,t){var n;const r=Dm(e);return n=class extends r{constructor(...i){super(...i),this.transactionManager=new t(Object.assign({storageManager:this.storageManager},this.options.transactionManager)),this.pkce={DEFAULT_CODE_CHALLENGE_METHOD:nr.DEFAULT_CODE_CHALLENGE_METHOD,generateVerifier:nr.generateVerifier,computeChallenge:nr.computeChallenge},this._pending={handleLogin:!1},this._tokenQueue=new Ho,this.token=Cm(this,this._tokenQueue),this.tokenManager=new Nm(this,this.options.tokenManager),this.endpoints=Im(this)}clearStorage(){super.clearStorage(),this.tokenManager.clear()}async isAuthenticated(i={}){const{autoRenew:o,autoRemove:a}=this.tokenManager.getOptions(),c=i.onExpiredToken?i.onExpiredToken==="renew":o,u=i.onExpiredToken?i.onExpiredToken==="remove":a;let{accessToken:l}=this.tokenManager.getTokensSync();if(l&&this.tokenManager.hasExpired(l))if(l=void 0,c)try{l=await this.tokenManager.renew("accessToken")}catch{}else u&&this.tokenManager.remove("accessToken");let{idToken:f}=this.tokenManager.getTokensSync();if(f&&this.tokenManager.hasExpired(f))if(f=void 0,c)try{f=await this.tokenManager.renew("idToken")}catch{}else u&&this.tokenManager.remove("idToken");return!!(l&&f)}async signInWithRedirect(i={}){const{originalUri:o}=i,a=ln(i,["originalUri"]);if(!this._pending.handleLogin){this._pending.handleLogin=!0;try{o&&this.setOriginalUri(o);const c=Object.assign({scopes:this.options.scopes||["openid","email","profile"]},a);await this.token.getWithRedirect(c)}finally{this._pending.handleLogin=!1}}}async getUser(){const{idToken:i,accessToken:o}=this.tokenManager.getTokensSync();return this.token.getUserInfo(o,i)}getIdToken(){const{idToken:i}=this.tokenManager.getTokensSync();return i?i.idToken:void 0}getAccessToken(){const{accessToken:i}=this.tokenManager.getTokensSync();return i?i.accessToken:void 0}getRefreshToken(){const{refreshToken:i}=this.tokenManager.getTokensSync();return i?i.refreshToken:void 0}async getOrRenewAccessToken(){var i;const{accessToken:o}=this.tokenManager.getTokensSync();if(o&&!this.tokenManager.hasExpired(o))return o.accessToken;try{const a=this.tokenManager.getStorageKeyByType("accessToken"),c=await this.tokenManager.renew(a??"accessToken");return(i=c?.accessToken)!==null&&i!==void 0?i:null}catch(a){return this.emitter.emit("error",a),null}}async storeTokensFromRedirect(){const{tokens:i,responseType:o}=await this.token.parseFromUrl();o!=="none"&&this.tokenManager.setTokens(i)}isLoginRedirect(){return Uo(this)}isPKCE(){return!!this.options.pkce}hasResponseType(i){return Rg(i,this.options)}isAuthorizationCodeFlow(){return this.hasResponseType("code")}async invokeApiMethod(i){if(!i.accessToken){const o=(await this.tokenManager.getTokens()).accessToken;i.accessToken=o?.accessToken}return mt(this,i)}async revokeAccessToken(i){if(!i){const o=await this.tokenManager.getTokens();i=o.accessToken;const a=this.tokenManager.getStorageKeyByType("accessToken");this.tokenManager.remove(a),this.options.dpop&&await Ja("access",o)}return i?this.token.revoke(i):Promise.resolve(null)}async revokeRefreshToken(i){if(!i){const o=await this.tokenManager.getTokens();i=o.refreshToken;const a=this.tokenManager.getStorageKeyByType("refreshToken");this.tokenManager.remove(a),this.options.dpop&&await Ja("refresh",o)}return i?this.token.revoke(i):Promise.resolve(null)}getSignOutRedirectUrl(i={}){let{idToken:o,postLogoutRedirectUri:a,state:c}=i;if(o||(o=this.tokenManager.getTokensSync().idToken),!o)return"";a===void 0&&(a=this.options.postLogoutRedirectUri);const u=Kt(this).logoutUrl,l=o.idToken;let f=u+"?id_token_hint="+encodeURIComponent(l);return a&&(f+="&post_logout_redirect_uri="+encodeURIComponent(a)),c&&(f+="&state="+encodeURIComponent(c)),f}async signOut(i){var o;i=Object.assign({},i);const a=window.location.origin,c=window.location.href,u=i.postLogoutRedirectUri===null?null:i.postLogoutRedirectUri||this.options.postLogoutRedirectUri||a,l=i?.state;let f=i.accessToken,d=i.refreshToken;const h=i.revokeAccessToken!==!1,v=i.revokeRefreshToken!==!1;v&&typeof d>"u"&&(d=this.tokenManager.getTokensSync().refreshToken),h&&typeof f>"u"&&(f=this.tokenManager.getTokensSync().accessToken),i.idToken||(i.idToken=this.tokenManager.getTokensSync().idToken),v&&d&&await this.revokeRefreshToken(d),h&&f&&await this.revokeAccessToken(f);const m=(o=f?.dpopPairId)!==null&&o!==void 0?o:d?.dpopPairId;this.options.dpop&&m&&await Ni(m);const O=this.getSignOutRedirectUrl(Object.assign(Object.assign({},i),{postLogoutRedirectUri:u}));if(O)return i.clearTokensBeforeRedirect?this.tokenManager.clear():this.tokenManager.addPendingRemoveFlags(),window.location.assign(O),!0;{const R=await this.closeSession(),k=new URL(u||a);return l&&k.searchParams.append("state",l),u===c?window.location.href=k.href:window.location.assign(k.href),R}}async getDPoPAuthorizationHeaders(i){if(!this.options.dpop)throw new _("DPoP is not configured for this client instance");let{accessToken:o}=i;if(o||(o=this.tokenManager.getTokensSync().accessToken),!o)throw new _("AccessToken is required to generate a DPoP Proof");const a=await Bo(o?.dpopPairId),c=await Nl(Object.assign(Object.assign({},i),{keyPair:a,accessToken:o.accessToken}));return{Authorization:`DPoP ${o.accessToken}`,Dpop:c}}async clearDPoPStorage(i=!1){var o,a;if(i)return Jg();const c=await this.tokenManager.getTokens(),u=((o=c.accessToken)===null||o===void 0?void 0:o.dpopPairId)||((a=c.refreshToken)===null||a===void 0?void 0:a.dpopPairId);u&&await Ni(u)}parseUseDPoPNonceError(i){var o;const a=Qe.getWWWAuthenticateHeader(i),c=Qe.parseHeader(a??"");if(Ml(c)){let u=null;return Bu(i?.get)&&(u=i.get("DPoP-Nonce")),u=(o=u??i["dpop-nonce"])!==null&&o!==void 0?o:i["DPoP-Nonce"],u}return null}},n.crypto=Lg,n}var Vr={exports:{}},Za;function Lm(){if(Za)return Vr.exports;Za=1;class e extends Error{constructor(r){super(r||"Promise was canceled"),this.name="CancelError"}get isCanceled(){return!0}}class t{static fn(r){return(...s)=>new t((i,o,a)=>{s.push(a),r(...s).then(i,o)})}constructor(r){this._cancelHandlers=[],this._isPending=!0,this._isCanceled=!1,this._rejectOnCancel=!0,this._promise=new Promise((s,i)=>{this._reject=i;const o=u=>{(!this._isCanceled||!c.shouldReject)&&(this._isPending=!1,s(u))},a=u=>{this._isPending=!1,i(u)},c=u=>{if(!this._isPending)throw new Error("The `onCancel` handler was attached after the promise settled.");this._cancelHandlers.push(u)};return Object.defineProperties(c,{shouldReject:{get:()=>this._rejectOnCancel,set:u=>{this._rejectOnCancel=u}}}),r(o,a,c)})}then(r,s){return this._promise.then(r,s)}catch(r){return this._promise.catch(r)}finally(r){return this._promise.finally(r)}cancel(r){if(!(!this._isPending||this._isCanceled)){if(this._isCanceled=!0,this._cancelHandlers.length>0)try{for(const s of this._cancelHandlers)s()}catch(s){this._reject(s);return}this._rejectOnCancel&&this._reject(new e(r))}}get isCanceled(){return this._isCanceled}}return Object.setPrototypeOf(t.prototype,Promise.prototype),Vr.exports=t,Vr.exports.CancelError=e,Vr.exports}var Fm=Lm();const Vm=So(Fm);/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const Hm=null,ec={updateAuthStatePromise:null,canceledTimes:0},ri="authStateChange",Bm=10,qm=(e,t)=>e?e.isAuthenticated===t.isAuthenticated&&JSON.stringify(e.idToken)===JSON.stringify(t.idToken)&&JSON.stringify(e.accessToken)===JSON.stringify(t.accessToken)&&e.error===t.error:!1;class Km{constructor(t){if(!t.emitter)throw new _("Emitter should be initialized before AuthStateManager");this._sdk=t,this._pending=Object.assign({},ec),this._authState=Hm,this._logOptions={},this._prevAuthState=null,this._transformQueue=new Ho({quiet:!0}),t.tokenManager.on(Xt,(n,r)=>{this._setLogOptions({event:Xt,key:n,token:r}),this.updateAuthState()}),t.tokenManager.on(Zt,(n,r)=>{this._setLogOptions({event:Zt,key:n,token:r}),this.updateAuthState()})}_setLogOptions(t){this._logOptions=t}getAuthState(){return this._authState}getPreviousAuthState(){return this._prevAuthState}async updateAuthState(){const{transformAuthState:t,devMode:n}=this._sdk.options,r=a=>{const{event:c,key:u,token:l}=this._logOptions;Kn().group(`OKTA-AUTH-JS:updateAuthState: Event:${c} Status:${a}`),Kn().log(u,l),Kn().log("Current authState",this._authState),Kn().groupEnd(),this._logOptions={}},s=a=>{if(qm(this._authState,a)){n&&r("unchanged");return}this._prevAuthState=this._authState,this._authState=a,this._sdk.emitter.emit(ri,Object.assign({},a)),n&&r("emitted")},i=a=>this._pending.updateAuthStatePromise.then(()=>{const c=this._pending.updateAuthStatePromise;return c&&c!==a?i(c):this.getAuthState()});if(this._pending.updateAuthStatePromise){if(this._pending.canceledTimes>=Bm)return n&&r("terminated"),i(this._pending.updateAuthStatePromise);this._pending.updateAuthStatePromise.cancel()}const o=new Vm((a,c,u)=>{u.shouldReject=!1,u(()=>{this._pending.updateAuthStatePromise=null,this._pending.canceledTimes=this._pending.canceledTimes+1,n&&r("canceled")});const l=f=>{if(o.isCanceled){a();return}s(f),a(),this._pending=Object.assign({},ec)};this._sdk.isAuthenticated().then(()=>{if(o.isCanceled){a();return}const{accessToken:f,idToken:d,refreshToken:h}=this._sdk.tokenManager.getTokensSync(),v={accessToken:f,idToken:d,refreshToken:h,isAuthenticated:!!(f&&d)};(t?this._transformQueue.push(t,null,this._sdk,v):Promise.resolve(v)).then(O=>l(O)).catch(O=>l({accessToken:f,idToken:d,refreshToken:h,isAuthenticated:!1,error:O}))})});return this._pending.updateAuthStatePromise=o,i(o)}subscribe(t){this._sdk.emitter.on(ri,t)}unsubscribe(t){this._sdk.emitter.off(ri,t)}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Wm{constructor(t,n={}){this.started=!1,this.tokenManager=t,this.options=n,this.renewTimeQueue=[],this.onTokenExpiredHandler=this.onTokenExpiredHandler.bind(this)}shouldThrottleRenew(){let t=!1;if(this.renewTimeQueue.push(Date.now()),this.renewTimeQueue.length>=10){const n=this.renewTimeQueue.shift();t=this.renewTimeQueue[this.renewTimeQueue.length-1]-n<30*1e3}return t}requiresLeadership(){return!!this.options.syncStorage&&be()}processExpiredTokens(){const n=this.tokenManager.getStorage().getStorage();Object.keys(n).forEach(r=>{const s=n[r];!Yt(s)&&this.tokenManager.hasExpired(s)&&this.onTokenExpiredHandler(r)})}onTokenExpiredHandler(t){if(this.options.autoRenew)if(this.shouldThrottleRenew()){const n=new _("Too many token renew requests");this.tokenManager.emitError(n)}else this.tokenManager.renew(t).catch(()=>{});else this.options.autoRemove&&this.tokenManager.remove(t)}canStart(){return(!!this.options.autoRenew||!!this.options.autoRemove)&&!this.started}async start(){this.canStart()&&(this.tokenManager.on(Ui,this.onTokenExpiredHandler),this.tokenManager.isStarted()&&this.processExpiredTokens(),this.started=!0)}async stop(){this.started&&(this.tokenManager.off(Ui,this.onTokenExpiredHandler),this.renewTimeQueue=[],this.started=!1)}isStarted(){return this.started}}function $m(e){return e&&typeof e.then=="function"}Promise.resolve(!1);var Gm=Promise.resolve(!0),Rt=Promise.resolve();function en(e,t){return e||(e=0),new Promise(function(n){return setTimeout(function(){return n(t)},e)})}function zm(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function Ar(){return Math.random().toString(36).substring(2)}var tc=0,si=0;function Ds(){var e=new Date().getTime();return e===tc?(si++,e*1e3+si):(tc=e,si=0,e*1e3)}function Jm(){return typeof navigator<"u"&&typeof navigator.locks<"u"&&typeof navigator.locks.request=="function"}var Qm=Ds,Ym="native";function Xm(e){var t={messagesCallback:null,bc:new BroadcastChannel(e),subFns:[]};return t.bc.onmessage=function(n){t.messagesCallback&&t.messagesCallback(n.data)},t}function Zm(e){e.bc.close(),e.subFns=[]}function ev(e,t){try{return e.bc.postMessage(t,!1),Rt}catch(n){return Promise.reject(n)}}function tv(e,t){e.messagesCallback=t}function nv(){if((typeof window<"u"||typeof self<"u")&&typeof BroadcastChannel=="function"){if(BroadcastChannel._pubkey)throw new Error("BroadcastChannel: Do not overwrite window.BroadcastChannel with this module, this is not a polyfill");return!0}else return!1}function rv(){return 150}var sv={create:Xm,close:Zm,onMessage:tv,postMessage:ev,canBeUsed:nv,type:Ym,averageResponseTime:rv,microSeconds:Qm},ql=(function(){function e(t){this.ttl=t,this.map=new Map,this._to=!1}return e.prototype.has=function(t){return this.map.has(t)},e.prototype.add=function(t){var n=this;this.map.set(t,Kl()),this._to||(this._to=!0,setTimeout(function(){n._to=!1,iv(n)},0))},e.prototype.clear=function(){this.map.clear()},e})();function iv(e){for(var t=Kl()-e.ttl,n=e.map[Symbol.iterator]();;){var r=n.next().value;if(!r)return;var s=r[0],i=r[1];if(i<t)e.map.delete(s);else return}}function Kl(){return new Date().getTime()}function Qo(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=JSON.parse(JSON.stringify(e));return typeof t.webWorkerSupport>"u"&&(t.webWorkerSupport=!0),t.idb||(t.idb={}),t.idb.ttl||(t.idb.ttl=1e3*45),t.idb.fallbackInterval||(t.idb.fallbackInterval=150),e.idb&&typeof e.idb.onclose=="function"&&(t.idb.onclose=e.idb.onclose),t.localstorage||(t.localstorage={}),t.localstorage.removeTimeout||(t.localstorage.removeTimeout=1e3*60),e.methods&&(t.methods=e.methods),t.node||(t.node={}),t.node.ttl||(t.node.ttl=1e3*60*2),t.node.maxParallelWrites||(t.node.maxParallelWrites=2048),typeof t.node.useFastPath>"u"&&(t.node.useFastPath=!0),t}var ov=Ds,av="pubkey.broadcast-channel-0-",Mt="messages",Us={durability:"relaxed"},cv="idb";function Wl(){if(typeof indexedDB<"u")return indexedDB;if(typeof window<"u"){if(typeof window.mozIndexedDB<"u")return window.mozIndexedDB;if(typeof window.webkitIndexedDB<"u")return window.webkitIndexedDB;if(typeof window.msIndexedDB<"u")return window.msIndexedDB}return!1}function Yo(e){e.commit&&e.commit()}function uv(e){var t=Wl(),n=av+e,r=t.open(n);return r.onupgradeneeded=function(s){var i=s.target.result;i.createObjectStore(Mt,{keyPath:"id",autoIncrement:!0})},new Promise(function(s,i){r.onerror=function(o){return i(o)},r.onsuccess=function(){s(r.result)}})}function lv(e,t,n){var r=new Date().getTime(),s={uuid:t,time:r,data:n},i=e.transaction([Mt],"readwrite",Us);return new Promise(function(o,a){i.oncomplete=function(){return o()},i.onerror=function(u){return a(u)};var c=i.objectStore(Mt);c.add(s),Yo(i)})}function fv(e,t){var n=e.transaction(Mt,"readonly",Us),r=n.objectStore(Mt),s=[],i=IDBKeyRange.bound(t+1,1/0);if(r.getAll){var o=r.getAll(i);return new Promise(function(c,u){o.onerror=function(l){return u(l)},o.onsuccess=function(l){c(l.target.result)}})}function a(){try{return i=IDBKeyRange.bound(t+1,1/0),r.openCursor(i)}catch{return r.openCursor()}}return new Promise(function(c,u){var l=a();l.onerror=function(f){return u(f)},l.onsuccess=function(f){var d=f.target.result;d?d.value.id<t+1?d.continue(t+1):(s.push(d.value),d.continue()):(Yo(n),c(s))}})}function dv(e,t){if(e.closed)return Promise.resolve([]);var n=e.db.transaction(Mt,"readwrite",Us),r=n.objectStore(Mt);return Promise.all(t.map(function(s){var i=r.delete(s);return new Promise(function(o){i.onsuccess=function(){return o()}})}))}function hv(e,t){var n=new Date().getTime()-t,r=e.transaction(Mt,"readonly",Us),s=r.objectStore(Mt),i=[];return new Promise(function(o){s.openCursor().onsuccess=function(a){var c=a.target.result;if(c){var u=c.value;u.time<n?(i.push(u),c.continue()):(Yo(r),o(i))}else o(i)}})}function pv(e){return hv(e.db,e.options.idb.ttl).then(function(t){return dv(e,t.map(function(n){return n.id}))})}function gv(e,t){return t=Qo(t),uv(e).then(function(n){var r={closed:!1,lastCursorId:0,channelName:e,options:t,uuid:Ar(),eMIs:new ql(t.idb.ttl*2),writeBlockPromise:Rt,messagesCallback:null,readQueuePromises:[],db:n};return n.onclose=function(){r.closed=!0,t.idb.onclose&&t.idb.onclose()},$l(r),r})}function $l(e){e.closed||Gl(e).then(function(){return en(e.options.idb.fallbackInterval)}).then(function(){return $l(e)})}function mv(e,t){return!(e.uuid===t.uuid||t.eMIs.has(e.id)||e.data.time<t.messagesCallbackTime)}function Gl(e){return e.closed||!e.messagesCallback?Rt:fv(e.db,e.lastCursorId).then(function(t){var n=t.filter(function(r){return!!r}).map(function(r){return r.id>e.lastCursorId&&(e.lastCursorId=r.id),r}).filter(function(r){return mv(r,e)}).sort(function(r,s){return r.time-s.time});return n.forEach(function(r){e.messagesCallback&&(e.eMIs.add(r.id),e.messagesCallback(r.data))}),Rt})}function vv(e){e.closed=!0,e.db.close()}function yv(e,t){return e.writeBlockPromise=e.writeBlockPromise.then(function(){return lv(e.db,e.uuid,t)}).then(function(){zm(0,10)===0&&pv(e)}),e.writeBlockPromise}function wv(e,t,n){e.messagesCallbackTime=n,e.messagesCallback=t,Gl(e)}function bv(){return!!Wl()}function _v(e){return e.idb.fallbackInterval*2}var Tv={create:gv,close:vv,onMessage:wv,postMessage:yv,canBeUsed:bv,type:cv,averageResponseTime:_v,microSeconds:ov},Sv=Ds,Ov="pubkey.broadcastChannel-",Ev="localstorage";function zl(){var e;if(typeof window>"u")return null;try{e=window.localStorage,e=window["ie8-eventlistener/storage"]||window.localStorage}catch{}return e}function Jl(e){return Ov+e}function Av(e,t){return new Promise(function(n){en().then(function(){var r=Jl(e.channelName),s={token:Ar(),time:new Date().getTime(),data:t,uuid:e.uuid},i=JSON.stringify(s);zl().setItem(r,i);var o=document.createEvent("Event");o.initEvent("storage",!0,!0),o.key=r,o.newValue=i,window.dispatchEvent(o),n()})})}function kv(e,t){var n=Jl(e),r=function(i){i.key===n&&t(JSON.parse(i.newValue))};return window.addEventListener("storage",r),r}function Pv(e){window.removeEventListener("storage",e)}function Rv(e,t){if(t=Qo(t),!Ql())throw new Error("BroadcastChannel: localstorage cannot be used");var n=Ar(),r=new ql(t.localstorage.removeTimeout),s={channelName:e,uuid:n,eMIs:r};return s.listener=kv(e,function(i){s.messagesCallback&&i.uuid!==n&&(!i.token||r.has(i.token)||i.data.time&&i.data.time<s.messagesCallbackTime||(r.add(i.token),s.messagesCallback(i.data)))}),s}function xv(e){Pv(e.listener)}function Cv(e,t,n){e.messagesCallbackTime=n,e.messagesCallback=t}function Ql(){var e=zl();if(!e)return!1;try{var t="__broadcastchannel_check";e.setItem(t,"works"),e.removeItem(t)}catch{return!1}return!0}function Iv(){var e=120,t=navigator.userAgent.toLowerCase();return t.includes("safari")&&!t.includes("chrome")?e*2:e}var Mv={create:Rv,close:xv,onMessage:Cv,postMessage:Av,canBeUsed:Ql,type:Ev,averageResponseTime:Iv,microSeconds:Sv},jv=Ds,Nv="simulate",Xo=new Set;function Dv(e){var t={name:e,messagesCallback:null};return Xo.add(t),t}function Uv(e){Xo.delete(e)}function Lv(e,t){return new Promise(function(n){return setTimeout(function(){var r=Array.from(Xo);r.filter(function(s){return s.name===e.name}).filter(function(s){return s!==e}).filter(function(s){return!!s.messagesCallback}).forEach(function(s){return s.messagesCallback(t)}),n()},5)})}function Fv(e,t){e.messagesCallback=t}function Vv(){return!0}function Hv(){return 5}var Bv={create:Dv,close:Uv,onMessage:Fv,postMessage:Lv,canBeUsed:Vv,type:Nv,averageResponseTime:Hv,microSeconds:jv},nc=[sv,Tv,Mv];function qv(e){var t=[].concat(e.methods,nc).filter(Boolean);if(e.type){if(e.type==="simulate")return Bv;var n=t.find(function(s){return s.type===e.type});if(n)return n;throw new Error("method-type "+e.type+" not found")}e.webWorkerSupport||(t=t.filter(function(s){return s.type!=="idb"}));var r=t.find(function(s){return s.canBeUsed()});if(r)return r;throw new Error("No usable method found in "+JSON.stringify(nc.map(function(s){return s.type})))}var Yl=new Set,Kv=0,Ls=function(t,n){this.id=Kv++,Yl.add(this),this.name=t,this.options=Qo(n),this.method=qv(this.options),this._iL=!1,this._onML=null,this._addEL={message:[],internal:[]},this._uMP=new Set,this._befC=[],this._prepP=null,Wv(this)};Ls._pubkey=!0;Ls.prototype={postMessage:function(t){if(this.closed)throw new Error("BroadcastChannel.postMessage(): Cannot post message after channel has closed "+JSON.stringify(t));return rc(this,"message",t)},postInternal:function(t){return rc(this,"internal",t)},set onmessage(e){var t=this.method.microSeconds(),n={time:t,fn:e};ic(this,"message",this._onML),e&&typeof e=="function"?(this._onML=n,sc(this,"message",n)):this._onML=null},addEventListener:function(t,n){var r=this.method.microSeconds(),s={time:r,fn:n};sc(this,t,s)},removeEventListener:function(t,n){var r=this._addEL[t].find(function(s){return s.fn===n});ic(this,t,r)},close:function(){var t=this;if(!this.closed){Yl.delete(this),this.closed=!0;var n=this._prepP?this._prepP:Rt;return this._onML=null,this._addEL.message=[],n.then(function(){return Promise.all(Array.from(t._uMP))}).then(function(){return Promise.all(t._befC.map(function(r){return r()}))}).then(function(){return t.method.close(t._state)})}},get type(){return this.method.type},get isClosed(){return this.closed}};function rc(e,t,n){var r=e.method.microSeconds(),s={time:r,type:t,data:n},i=e._prepP?e._prepP:Rt;return i.then(function(){var o=e.method.postMessage(e._state,s);return e._uMP.add(o),o.catch().then(function(){return e._uMP.delete(o)}),o})}function Wv(e){var t=e.method.create(e.name,e.options);$m(t)?(e._prepP=t,t.then(function(n){e._state=n})):e._state=t}function Xl(e){return e._addEL.message.length>0||e._addEL.internal.length>0}function sc(e,t,n){e._addEL[t].push(n),$v(e)}function ic(e,t,n){e._addEL[t]=e._addEL[t].filter(function(r){return r!==n}),Gv(e)}function $v(e){if(!e._iL&&Xl(e)){var t=function(s){e._addEL[s.type].forEach(function(i){var o=1e5,a=i.time-o;s.time>=a&&i.fn(s.data)})},n=e.method.microSeconds();e._prepP?e._prepP.then(function(){e._iL=!0,e.method.onMessage(e._state,t,n)}):(e._iL=!0,e.method.onMessage(e._state,t,n))}}function Gv(e){if(e._iL&&!Xl(e)){e._iL=!1;var t=e.method.microSeconds();e.method.onMessage(e._state,null,t)}}function zv(e){if(typeof WorkerGlobalScope=="function"&&self instanceof WorkerGlobalScope){var t=self.close.bind(self);self.close=function(){return e(),t()}}else{if(typeof window.addEventListener!="function")return;window.addEventListener("beforeunload",function(){e()},!0),window.addEventListener("unload",function(){e()},!0)}}function Jv(e){process.on("exit",function(){return e()}),process.on("beforeExit",function(){return e().then(function(){return process.exit()})}),process.on("SIGINT",function(){return e().then(function(){return process.exit()})}),process.on("uncaughtException",function(t){return e().then(function(){console.trace(t),process.exit(101)})})}var Qv=Object.prototype.toString.call(typeof process<"u"?process:0)==="[object process]",Yv=Qv?Jv:zv,rr=new Set,oc=!1;function Xv(){oc||(oc=!0,Yv(ey))}function Zv(e){if(Xv(),typeof e!="function")throw new Error("Listener is no function");rr.add(e);var t={remove:function(){return rr.delete(e)},run:function(){return rr.delete(e),e()}};return t}function ey(){var e=[];return rr.forEach(function(t){e.push(t()),rr.delete(t)}),Promise.all(e)}function an(e,t){var n={context:"leader",action:t,token:e.token};return e.broadcastChannel.postInternal(n)}function Zl(e){e.isLeader=!0,e._hasLeader=!0;var t=Zv(function(){return e.die()});e._unl.push(t);var n=function(s){s.context==="leader"&&s.action==="apply"&&an(e,"tell"),s.context==="leader"&&s.action==="tell"&&!e._dpLC&&(e._dpLC=!0,e._dpL(),an(e,"tell"))};return e.broadcastChannel.addEventListener("internal",n),e._lstns.push(n),an(e,"tell")}var ef=function(t,n){var r=this;this.broadcastChannel=t,t._befC.push(function(){return r.die()}),this._options=n,this.isLeader=!1,this.isDead=!1,this.token=Ar(),this._lstns=[],this._unl=[],this._dpL=function(){},this._dpLC=!1,this._wKMC={},this.lN="pubkey-bc||"+t.method.type+"||"+t.name};ef.prototype={hasLeader:function(){var t=this;return navigator.locks.query().then(function(n){var r=n.held?n.held.filter(function(s){return s.name===t.lN}):[];return!!(r&&r.length>0)})},awaitLeadership:function(){var t=this;if(!this._wLMP){this._wKMC.c=new AbortController;var n=new Promise(function(r,s){t._wKMC.res=r,t._wKMC.rej=s});this._wLMP=new Promise(function(r){navigator.locks.request(t.lN,{signal:t._wKMC.c.signal},function(){return t._wKMC.c=void 0,Zl(t),r(),n}).catch(function(){})})}return this._wLMP},set onduplicate(e){},die:function(){var t=this;return this._lstns.forEach(function(n){return t.broadcastChannel.removeEventListener("internal",n)}),this._lstns=[],this._unl.forEach(function(n){return n.remove()}),this._unl=[],this.isLeader&&(this.isLeader=!1),this.isDead=!0,this._wKMC.res&&this._wKMC.res(),this._wKMC.c&&this._wKMC.c.abort("LeaderElectionWebLock.die() called"),an(this,"death")}};var tf=function(t,n){var r=this;this.broadcastChannel=t,this._options=n,this.isLeader=!1,this._hasLeader=!1,this.isDead=!1,this.token=Ar(),this._aplQ=Rt,this._aplQC=0,this._unl=[],this._lstns=[],this._dpL=function(){},this._dpLC=!1;var s=function(o){o.context==="leader"&&(o.action==="death"&&(r._hasLeader=!1),o.action==="tell"&&(r._hasLeader=!0))};this.broadcastChannel.addEventListener("internal",s),this._lstns.push(s)};tf.prototype={hasLeader:function(){return Promise.resolve(this._hasLeader)},applyOnce:function(t){var n=this;if(this.isLeader)return en(0,!0);if(this.isDead)return en(0,!1);if(this._aplQC>1)return this._aplQ;var r=function(){if(n.isLeader)return Gm;var i=!1,o,a=new Promise(function(l){o=function(){i=!0,l()}}),c=function(f){f.context==="leader"&&f.token!=n.token&&(f.action==="apply"&&f.token>n.token&&o(),f.action==="tell"&&(o(),n._hasLeader=!0))};n.broadcastChannel.addEventListener("internal",c);var u=t?n._options.responseTime*4:n._options.responseTime;return an(n,"apply").then(function(){return Promise.race([en(u),a.then(function(){return Promise.reject(new Error)})])}).then(function(){return an(n,"apply")}).then(function(){return Promise.race([en(u),a.then(function(){return Promise.reject(new Error)})])}).catch(function(){}).then(function(){return n.broadcastChannel.removeEventListener("internal",c),i?!1:Zl(n).then(function(){return!0})})};return this._aplQC=this._aplQC+1,this._aplQ=this._aplQ.then(function(){return r()}).then(function(){n._aplQC=n._aplQC-1}),this._aplQ.then(function(){return n.isLeader})},awaitLeadership:function(){return this._aLP||(this._aLP=ty(this)),this._aLP},set onduplicate(e){this._dpL=e},die:function(){var t=this;return this._lstns.forEach(function(n){return t.broadcastChannel.removeEventListener("internal",n)}),this._lstns=[],this._unl.forEach(function(n){return n.remove()}),this._unl=[],this.isLeader&&(this._hasLeader=!1,this.isLeader=!1),this.isDead=!0,an(this,"death")}};function ty(e){return e.isLeader?Rt:new Promise(function(t){var n=!1;function r(){n||(n=!0,e.broadcastChannel.removeEventListener("internal",i),t(!0))}e.applyOnce().then(function(){e.isLeader&&r()});var s=function o(){return en(e._options.fallbackInterval).then(function(){if(!(e.isDead||n))if(e.isLeader)r();else return e.applyOnce(!0).then(function(){e.isLeader?r():o()})})};s();var i=function(a){a.context==="leader"&&a.action==="death"&&(e._hasLeader=!1,e.applyOnce().then(function(){e.isLeader&&r()}))};e.broadcastChannel.addEventListener("internal",i),e._lstns.push(i)})}function ny(e,t){return e||(e={}),e=JSON.parse(JSON.stringify(e)),e.fallbackInterval||(e.fallbackInterval=3e3),e.responseTime||(e.responseTime=t.method.averageResponseTime(t.options)),e}function ry(e,t){if(e._leaderElector)throw new Error("BroadcastChannel already has a leader-elector");t=ny(t,e);var n=Jm()?new ef(e,t):new tf(e,t);return e._befC.push(function(){return n.die()}),e._leaderElector=n,n}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class sy{constructor(t,n={}){this.started=!1,this.enablePostMessage=!0,this.tokenManager=t,this.options=n,this.onTokenAddedHandler=this.onTokenAddedHandler.bind(this),this.onTokenRemovedHandler=this.onTokenRemovedHandler.bind(this),this.onTokenRenewedHandler=this.onTokenRenewedHandler.bind(this),this.onSetStorageHandler=this.onSetStorageHandler.bind(this),this.onSyncMessageHandler=this.onSyncMessageHandler.bind(this)}requiresLeadership(){return!1}isStarted(){return this.started}canStart(){return!!this.options.syncStorage&&be()&&!this.started}async start(){if(!this.canStart())return;const{syncChannelName:t}=this.options;try{this.channel=new Ls(t)}catch{throw new _("SyncStorageService is not supported in current browser.")}this.tokenManager.on(Xt,this.onTokenAddedHandler),this.tokenManager.on(Zt,this.onTokenRemovedHandler),this.tokenManager.on(Wn,this.onTokenRenewedHandler),this.tokenManager.on($n,this.onSetStorageHandler),this.channel.addEventListener("message",this.onSyncMessageHandler),this.started=!0}async stop(){var t,n;this.started&&(this.tokenManager.off(Xt,this.onTokenAddedHandler),this.tokenManager.off(Zt,this.onTokenRemovedHandler),this.tokenManager.off(Wn,this.onTokenRenewedHandler),this.tokenManager.off($n,this.onSetStorageHandler),(t=this.channel)===null||t===void 0||t.removeEventListener("message",this.onSyncMessageHandler),await((n=this.channel)===null||n===void 0?void 0:n.close()),this.channel=void 0,this.started=!1)}onTokenAddedHandler(t,n){var r;this.enablePostMessage&&((r=this.channel)===null||r===void 0||r.postMessage({type:Xt,key:t,token:n}))}onTokenRemovedHandler(t,n){var r;this.enablePostMessage&&((r=this.channel)===null||r===void 0||r.postMessage({type:Zt,key:t,token:n}))}onTokenRenewedHandler(t,n,r){var s;this.enablePostMessage&&((s=this.channel)===null||s===void 0||s.postMessage({type:Wn,key:t,token:n,oldToken:r}))}onSetStorageHandler(t){var n;(n=this.channel)===null||n===void 0||n.postMessage({type:$n,storage:t})}onSyncMessageHandler(t){switch(this.enablePostMessage=!1,t.type){case $n:this.tokenManager.getStorage().setStorage(t.storage);break;case Xt:this.tokenManager.emitAdded(t.key,t.token),this.tokenManager.setExpireEventTimeout(t.key,t.token);break;case Zt:this.tokenManager.clearExpireEventTimeout(t.key),this.tokenManager.emitRemoved(t.key,t.token);break;case Wn:this.tokenManager.emitRenewed(t.key,t.token,t.oldToken);break}this.enablePostMessage=!0}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class iy{constructor(t={}){this.started=!1,this.options=t,this.onLeaderDuplicate=this.onLeaderDuplicate.bind(this),this.onLeader=this.onLeader.bind(this)}onLeaderDuplicate(){}async onLeader(){var t,n;await((n=(t=this.options).onLeader)===null||n===void 0?void 0:n.call(t))}isLeader(){var t;return!!(!((t=this.elector)===null||t===void 0)&&t.isLeader)}hasLeader(){var t;return!!(!((t=this.elector)===null||t===void 0)&&t.hasLeader)}async start(){if(this.canStart()){const{electionChannelName:t}=this.options;this.channel=new Ls(t),this.elector=ry(this.channel),this.elector.onduplicate=this.onLeaderDuplicate,this.elector.awaitLeadership().then(this.onLeader),this.started=!0}}async stop(){this.started&&(this.elector&&(await this.elector.die(),this.elector=void 0),this.channel&&(this.channel.postInternal=()=>Promise.resolve(),await this.channel.close(),this.channel=void 0),this.started=!1)}requiresLeadership(){return!1}isStarted(){return this.started}canStart(){return be()&&!this.started}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const ac=()=>Math.floor(Date.now()/1e3);class oy{constructor(t,n={}){this.started=!1,this.lastHidden=-1,this.tokenManager=t,this.options=n,this.onPageVisbilityChange=this._onPageVisbilityChange.bind(this)}_onPageVisbilityChange(){if(document.hidden)this.lastHidden=ac();else if(this.lastHidden>0&&ac()-this.lastHidden>=this.options.tabInactivityDuration){const{accessToken:t,idToken:n}=this.tokenManager.getTokensSync();if(t&&this.tokenManager.hasExpired(t)){const r=this.tokenManager.getStorageKeyByType("accessToken");this.tokenManager.renew(r).catch(()=>{})}else if(n&&this.tokenManager.hasExpired(n)){const r=this.tokenManager.getStorageKeyByType("idToken");this.tokenManager.renew(r).catch(()=>{})}}}async start(){this.canStart()&&document&&(document.addEventListener("visibilitychange",this.onPageVisbilityChange),this.started=!0)}async stop(){document&&(document.removeEventListener("visibilitychange",this.onPageVisbilityChange),this.started=!1)}canStart(){return be()&&!!this.options.autoRenew&&!!this.options.renewOnTabActivation&&!this.started}requiresLeadership(){return!1}isStarted(){return this.started}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const nf="autoRenew",rf="syncStorage",Qr="leaderElection",sf="renewOnTabActivation";class Cn{constructor(t,n={}){this.sdk=t,this.onLeader=this.onLeader.bind(this);const{autoRenew:r,autoRemove:s,syncStorage:i}=t.tokenManager.getOptions();n.electionChannelName=n.electionChannelName||n.broadcastChannelName,this.options=Object.assign({},Cn.defaultOptions,{autoRenew:r,autoRemove:s,syncStorage:i},{electionChannelName:`${t.options.clientId}-election`,syncChannelName:`${t.options.clientId}-sync`},Ye(n)),this.started=!1,this.services=new Map,Cn.knownServices.forEach(o=>{const a=this.createService(o);a&&this.services.set(o,a)})}async onLeader(){this.started&&await this.startServices()}isLeader(){var t;return(t=this.getService(Qr))===null||t===void 0?void 0:t.isLeader()}isLeaderRequired(){return[...this.services.values()].some(t=>t.canStart()&&t.requiresLeadership())}async start(){this.started||(await this.startServices(),this.started=!0)}async stop(){await this.stopServices(),this.started=!1}getService(t){return this.services.get(t)}async startServices(){for(const[t,n]of this.services.entries())this.canStartService(t,n)&&await n.start()}async stopServices(){for(const t of this.services.values())await t.stop()}canStartService(t,n){let r=n.canStart()&&!n.isStarted();return t===Qr?r&&(r=this.isLeaderRequired()):n.requiresLeadership()&&r&&(r=this.isLeader()),r}createService(t){const n=this.sdk.tokenManager;let r;switch(t){case Qr:r=new iy(Object.assign(Object.assign({},this.options),{onLeader:this.onLeader}));break;case nf:r=new Wm(n,Object.assign({},this.options));break;case rf:r=new sy(n,Object.assign({},this.options));break;case sf:r=new oy(n,Object.assign({},this.options));break;default:throw new Error(`Unknown service ${t}`)}return r}}Cn.knownServices=[nf,rf,Qr,sf];Cn.defaultOptions={autoRenew:!0,autoRemove:!0,syncStorage:!0,renewOnTabActivation:!0,tabInactivityDuration:1800};/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function ay(e){return class extends e{constructor(...n){super(...n),this.authStateManager=new Km(this),this.serviceManager=new Cn(this,this.options.services)}async start(){await this.serviceManager.start(),this.tokenManager.start(),this.token.isLoginRedirect()||await this.authStateManager.updateAuthState()}async stop(){this.tokenManager.stop(),await this.serviceManager.stop()}async handleRedirect(n){await this.handleLoginRedirect(void 0,n)}async handleLoginRedirect(n,r){let s=this.options.state;if(n)this.tokenManager.setTokens(n),r=r||this.getOriginalUri(this.options.state);else if(this.isLoginRedirect())try{s=(await Di(this,{})).state,r=r||this.getOriginalUri(s),await this.storeTokensFromRedirect()}catch(o){throw await this.authStateManager.updateAuthState(),o}else return;await this.authStateManager.updateAuthState(),this.removeOriginalUri(s);const{restoreOriginalUri:i}=this.options;i?await i(this,r):r&&window.location.replace(r)}handleIDPPopupRedirect(n=window.location.href){const r=Di(this,{responseMode:"query",url:n});if(r.state){const s=new BroadcastChannel(`popup-callback:${r.state}`);s.postMessage(r),s.close()}else throw new _("Unable to parse auth code params")}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function cy(e){return e.session.get().then(function(t){return t.status==="ACTIVE"}).catch(function(){return!1})}function uy(e){return Rn(e,"/api/v1/sessions/me",{withCredentials:!0}).then(function(t){var n=er(t,"_links");return n.refresh=function(){return Wt(e,Ti(t,"refresh").href,{},{withCredentials:!0})},n.user=function(){return Rn(e,Ti(t,"user").href,{withCredentials:!0})},n}).catch(function(){return{status:"INACTIVE"}})}function ly(e){return mt(e,{url:e.getIssuerOrigin()+"/api/v1/sessions/me",method:"DELETE",withCredentials:!0})}function fy(e){return Wt(e,"/api/v1/sessions/me/lifecycle/refresh",{},{withCredentials:!0})}function dy(e,t,n){n=n||window.location.href,window.location.assign(e.getIssuerOrigin()+"/login/sessionCookieRedirect"+Nt({checkAccountSetupComplete:!0,token:t,redirectUrl:n}))}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function hy(e){return{close:ly.bind(null,e),exists:cy.bind(null,e),get:uy.bind(null,e),refresh:fy.bind(null,e),setCookieAndRedirect:dy.bind(null,e)}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function py(e){return class extends e{constructor(...n){super(...n),this.session=hy(this)}closeSession(){return this.session.close().then(async()=>(this.clearStorage(),!0)).catch(function(n){if(n.name==="AuthApiError"&&n.errorCode==="E0000007")return!1;throw n})}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function gy(e,t,n){const r=Mg(t),s=jg(r,e),i=Ug(s),o=py(i),a=Um(o,n);return ay(a)}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const my=(e,t)=>t.source===e.contentWindow;function of(e,t){var n;if(!rl())return Promise.reject(new _("Fingerprinting is not supported on this device"));const r=(n=t?.container)!==null&&n!==void 0?n:document.body;let s,i,o;return new Promise(function(c,u){i=document.createElement("iframe"),i.style.display="none",o=function(f){var d;if(!my(i,f)||!f||!f.data||f.origin!==e.getIssuerOrigin())return;let h;try{h=JSON.parse(f.data)}catch{return}if(h){if(h.type==="FingerprintAvailable")return c(h.fingerprint);if(h.type==="FingerprintServiceReady")(d=i?.contentWindow)===null||d===void 0||d.postMessage(JSON.stringify({type:"GetFingerprint"}),f.origin);else return u(new _("No data"))}},Ll(window,"message",o),i.src=e.getIssuerOrigin()+"/auth/services/devicefingerprint",r.appendChild(i),s=setTimeout(function(){u(new _("Fingerprinting timed out"))},t?.timeout||15e3)}).finally(function(){var c;clearTimeout(s),Fl(window,"message",o),r.contains(i)&&((c=i.parentElement)===null||c===void 0||c.removeChild(i))})}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const af=(e=[])=>{const t=[];return e.forEach(n=>{n.key==="webauthn"&&t.push({type:"public-key",id:dr(n.credentialId)})}),t},vy=(e,t)=>({publicKey:{rp:e.rp,user:{id:dr(e.user.id),name:e.user.name,displayName:e.user.displayName},challenge:dr(e.challenge),pubKeyCredParams:e.pubKeyCredParams,attestation:e.attestation,authenticatorSelection:e.authenticatorSelection,excludeCredentials:af(t)}}),yy=(e,t)=>({publicKey:Object.assign({challenge:dr(e.challenge),userVerification:e.userVerification,allowCredentials:af(t)},e.rpId&&{rpId:e.rpId})}),wy=e=>{const t=e.response,n=e.id,r=on(t.clientDataJSON),s=on(t.attestationObject);return{id:n,clientData:r,attestation:s}},by=e=>{const t=e.response,n=e.id,r=on(t.clientDataJSON),s=on(t.authenticatorData),i=on(t.signature);return{id:n,clientData:r,authenticatorData:s,signatureData:i}},_y=Object.freeze(Object.defineProperty({__proto__:null,buildCredentialCreationOptions:vy,buildCredentialRequestOptions:yy,getAssertion:by,getAttestation:wy},Symbol.toStringTag,{value:"Module"}));/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Ty(e){var t;return t=class extends e{constructor(...r){super(...r),this.idx=Ig(this),this.fingerprint=of.bind(null,this)}},t.webauthn=_y,t}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Sy(e,t,n){const r=gy(e,t,n);return Ty(r)}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Oy(){return class{constructor(t){this.devMode=!!t.devMode}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Ey(){return Object.assign({},Jr,{inMemoryStore:{}})}const Ay={token:{storageTypes:["localStorage","sessionStorage","cookie"]},cache:{storageTypes:["localStorage","sessionStorage","cookie"]},transaction:{storageTypes:["sessionStorage","localStorage","cookie"]},"shared-transaction":{storageTypes:["localStorage"]},"original-uri":{storageTypes:["localStorage"]}};function ky(e={},t){var n=e.cookies||{};return typeof n.secure>"u"&&(n.secure=t),typeof n.sameSite>"u"&&(n.sameSite=n.secure?"none":"lax"),n.secure&&!t&&(gt(`The current page is not being served with the HTTPS protocol.
For security reasons, we strongly recommend using HTTPS.
If you cannot use HTTPS, set "cookies.secure" option to false.`),n.secure=!1),n.sameSite==="none"&&!n.secure&&(n.sameSite="lax"),n}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Py(){const e=Oy();return class extends e{constructor(n){super(n),this.cookies=ky(n,ol()),this.storageUtil=n.storageUtil||Ey(),this.storageManager=Object.assign(Object.assign({},Ay),n.storageManager)}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const Ry=/application\/\w*\+?json/;function xy(e){return e.headers.get("Content-Type")&&e.headers.get("Content-Type").toLowerCase().indexOf("application/json")>=0?e.json().catch(t=>({error:t,errorSummary:"Could not parse server response"})):e.text()}function Cy(e,t,n){const r=typeof t=="object",s={};for(const o of n.headers.entries())s[o[0]]=o[1];const i={responseText:r?JSON.stringify(t):t,status:e,headers:s};return r&&(i.responseType="json",i.responseJSON=t),i}function Iy(e,t,n){var r=n.data,s=n.headers||{},i=s["Content-Type"]||s["content-type"]||"";r&&typeof r!="string"&&(Ry.test(i)?r=JSON.stringify(r):i==="application/x-www-form-urlencoded"&&(r=Object.entries(r).map(([c,u])=>`${c}=${encodeURIComponent(u)}`).join("&")));var o=window.fetch||bp,a=o(t,{method:e,headers:n.headers,body:r,credentials:n.withCredentials?"include":"omit"});return a.finally||(a=Promise.resolve(a)),a.then(function(c){var u=!c.ok,l=c.status;return xy(c).then(f=>Cy(l,f,c)).then(f=>{var d;if(u||!((d=f.responseJSON)===null||d===void 0)&&d.error)throw f;return f})})}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function My(){const e=Py();return class extends e{constructor(n){super(n),this.issuer=n.issuer,this.transformErrorXHR=n.transformErrorXHR,this.headers=n.headers,this.httpRequestClient=n.httpRequestClient||Iy,this.httpRequestInterceptors=n.httpRequestInterceptors,this.pollDelay=n.pollDelay}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const jy=!0;/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Ny(e){e=e||{};var t=e.scopes;if(t&&!Array.isArray(t))throw new _('scopes must be a array of strings. Required usage: new OktaAuth({scopes: ["openid", "email"]})');var n=e.issuer;if(!n)throw new _('No issuer passed to constructor. Required usage: new OktaAuth({issuer: "https://{yourOktaDomain}.com/oauth2/{authServerId}"})');var r=new RegExp("^http?s?://.+");if(!r.test(n))throw new _('Issuer must be a valid URL. Required usage: new OktaAuth({issuer: "https://{yourOktaDomain}.com/oauth2/{authServerId}"})');if(n.indexOf("-admin.okta")!==-1)throw new _('Issuer URL passed to constructor contains "-admin" in subdomain. Required usage: new OktaAuth({issuer: "https://{yourOktaDomain}.com})')}function Dy(){const e=My();return class extends e{constructor(n){super(n),Ny(n),this.issuer=Ke(n.issuer),this.tokenUrl=Ke(n.tokenUrl),this.authorizeUrl=Ke(n.authorizeUrl),this.userinfoUrl=Ke(n.userinfoUrl),this.revokeUrl=Ke(n.revokeUrl),this.logoutUrl=Ke(n.logoutUrl),this.pkce=n.pkce!==!1,this.clientId=n.clientId,this.redirectUri=n.redirectUri,be()&&(this.redirectUri=tp(n.redirectUri,window.location.origin)),this.responseType=n.responseType,this.responseMode=n.responseMode,this.state=n.state,this.scopes=n.scopes,this.ignoreSignature=!!n.ignoreSignature,this.codeChallenge=n.codeChallenge,this.codeChallengeMethod=n.codeChallengeMethod,this.acrValues=n.acrValues,this.maxAge=n.maxAge,this.dpop=n.dpop===!0,this.dpopOptions=Object.assign({allowBearerTokens:!1},n.dpopOptions),this.tokenManager=n.tokenManager,this.postLogoutRedirectUri=n.postLogoutRedirectUri,this.restoreOriginalUri=n.restoreOriginalUri,this.transactionManager=Object.assign({enableSharedStorage:jy},n.transactionManager),this.clientSecret=n.clientSecret,this.setLocation=n.setLocation,this.ignoreLifetime=!!n.ignoreLifetime,!n.maxClockSkew&&n.maxClockSkew!==0?this.maxClockSkew=zu:this.maxClockSkew=n.maxClockSkew}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Uy(){const e=Dy();return class extends e{constructor(n){super(n),this.services=n.services,this.transformAuthState=n.transformAuthState}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Ly(){const e=Uy();return class extends e{constructor(n){super(n),this.flow=n.flow,this.activationToken=n.activationToken,this.recoveryToken=n.recoveryToken,this.idx=n.idx}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class On{constructor(t,n){if(!t)throw new _('"storage" is required');if(typeof n!="string"||!n.length)throw new _('"storageName" is required');this.storageName=n,this.storageProvider=t}getItem(t){return this.getStorage()[t]}setItem(t,n){return this.updateStorage(t,n)}removeItem(t){return this.clearStorage(t)}getStorage(){var t=this.storageProvider.getItem(this.storageName);t=t||"{}";try{return JSON.parse(t)}catch{throw new _("Unable to parse storage string: "+this.storageName)}}setStorage(t){try{var n=t?JSON.stringify(t):"{}";this.storageProvider.setItem(this.storageName,n)}catch{throw new _("Unable to set storage: "+this.storageName)}}clearStorage(t){if(!t){this.storageProvider.removeItem?this.storageProvider.removeItem(this.storageName):this.setStorage();return}var n=this.getStorage();delete n[t],this.setStorage(n)}updateStorage(t,n){var r=this.getStorage();r[t]=n,this.setStorage(r)}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Yr(e){!be()&&!e.storageProvider&&!e.storageKey&&gt("Memory storage can only support simple single user use case on server side, please provide custom storageProvider or storageKey if advanced scenarios need to be supported.")}class Fy{constructor(t,n,r){this.storageManagerOptions=t,this.cookieOptions=n,this.storageUtil=r}getOptionsForSection(t,n){return Object.assign({},this.storageManagerOptions[t],n)}getStorage(t){if(t=Object.assign({},this.cookieOptions,t),t.storageProvider)return t.storageProvider;let{storageType:n,storageTypes:r}=t;if(n==="sessionStorage"&&(t.sessionCookie=!0),n&&r){const s=r.indexOf(n);s>=0&&(r=r.slice(s),n=void 0)}return n||(n=this.storageUtil.findStorageType(r)),this.storageUtil.getStorageByType(n,t)}getTokenStorage(t){t=this.getOptionsForSection("token",t),Yr(t);const n=this.getStorage(t),r=t.storageKey||yo;return new On(n,r)}getHttpCache(t){t=this.getOptionsForSection("cache",t);const n=this.getStorage(t),r=t.storageKey||Qu;return new On(n,r)}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Vy(){return class extends Fy{constructor(t,n,r){super(t,n,r)}getTransactionStorage(t){t=this.getOptionsForSection("transaction",t),Yr(t);const n=this.getStorage(t),r=t.storageKey||Yu;return new On(n,r)}getSharedTansactionStorage(t){t=this.getOptionsForSection("shared-transaction",t),Yr(t);const n=this.getStorage(t),r=t.storageKey||Xu;return new On(n,r)}getOriginalUriStorage(t){t=this.getOptionsForSection("original-uri",t),Yr(t);const n=this.getStorage(t),r=t.storageKey||Zu;return new On(n,r)}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Hy(){return Vy()}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function By(){const e=Hy();return class extends e{constructor(n,r,s){super(n,r,s)}getIdxResponseStorage(n){let r;if(be())try{r=this.storageUtil.getStorageByType("memory",n)}catch{gt("No response storage found, you may want to provide custom implementation for intermediate idx responses to optimize the network traffic")}else{const s=this.getTransactionStorage(n);s&&(r={getItem:i=>{const o=s.getStorage();return o&&o[i]?o[i]:null},setItem:(i,o)=>{const a=s.getStorage();if(!a)throw new _("Transaction has been cleared, failed to save idxState");a[i]=o,s.setStorage(a)},removeItem:i=>{const o=s.getStorage();o&&(delete o[i],s.setStorage(o))}})}return r?new On(r,el):null}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function cf(e){return!(!e||typeof e!="object"||Object.values(e).length===0)}function qy(e){return cf(e)?!!e.redirectUri||!!e.responseType:!1}function Ky(e){return cf(e)?Object.values(e).find(n=>typeof n!="string")===void 0:!1}function Xr(e){return!!(qy(e)||Ky(e))}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const Wy=1800*1e3;function $y(e){const t=e.getSharedTansactionStorage(),n=t.getStorage();Object.keys(n).forEach(r=>{const s=n[r];Date.now()-s.dateCreated>Wy&&delete n[r]}),t.setStorage(n)}function Gy(e,t,n){const r=e.getSharedTansactionStorage(),s=r.getStorage();s[t]={dateCreated:Date.now(),transaction:n},r.setStorage(s)}function zy(e,t){const s=e.getSharedTansactionStorage().getStorage()[t];return s&&s.transaction&&Xr(s.transaction)?s.transaction:null}function Jy(e,t){const n=e.getSharedTansactionStorage(),r=n.getStorage();delete r[t],n.setStorage(r)}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Qy(){return class{constructor(t){this.storageManager=t.storageManager,this.enableSharedStorage=t.enableSharedStorage!==!1,this.saveLastResponse=t.saveLastResponse!==!1,this.options=t}clear(t={}){const n=this.storageManager.getTransactionStorage(),r=n.getStorage();if(n.clearStorage(),this.enableSharedStorage&&t.clearSharedStorage!==!1){const s=t.state||r?.state;s&&Jy(this.storageManager,s)}}save(t,n={}){let r=this.storageManager.getTransactionStorage();const s=r.getStorage();Xr(s)&&!n.muteWarning&&gt("a saved auth transaction exists in storage. This may indicate another auth flow is already in progress."),r.setStorage(t),this.enableSharedStorage&&t.state&&Gy(this.storageManager,t.state,t)}exists(t={}){try{return!!this.load(t)}catch{return!1}}load(t={}){let n;return this.enableSharedStorage&&t.state&&($y(this.storageManager),n=zy(this.storageManager,t.state),Xr(n))||(n=this.storageManager.getTransactionStorage().getStorage(),Xr(n))?n:null}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Yy(){const e=Qy();return class extends e{constructor(n){super(n)}clear(n={}){super.clear(n),n.clearIdxResponse!==!1&&this.clearIdxResponse()}saveIdxResponse(n){if(!this.saveLastResponse)return;const r=this.storageManager.getIdxResponseStorage();r&&r.setStorage(n)}loadIdxResponse(n){if(!this.saveLastResponse)return null;const r=this.storageManager.getIdxResponseStorage();if(!r)return null;const s=r.getStorage();if(!s||!gl(s.rawIdxResponse))return null;if(n){const{stateHandle:i,interactionHandle:o}=n;if(!n.useGenericRemediator&&i&&s.stateHandle!==i||o&&s.interactionHandle!==o)return null}return s}clearIdxResponse(){if(!this.saveLastResponse)return;const n=this.storageManager.getIdxResponseStorage();n?.clearStorage()}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Dt{constructor(t,n){const{res:r}=n,{headers:s}=r,i=ln(r,["headers"]);s&&(this.headers=s),Object.keys(i).forEach(o=>{o!=="_links"&&(this[o]=i[o])})}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */async function he(e,t,n=Dt){const{accessToken:r}=e.tokenManager.getTokensSync(),s=t.accessToken||r,i=e.getIssuerOrigin(),{url:o,method:a,payload:c}=t,u=o.startsWith(i)?o:`${i}${o}`;if(!s)throw new _("AccessToken is required to request MyAccount API endpoints.");let l=s;const f=Object.assign({headers:{Accept:"*/*;okta-version=1.0.0"},url:u,method:a},c&&{args:c});if(e.options.dpop){if(typeof l=="string")throw new _("AccessToken object must be provided when using dpop");const{Authorization:v,Dpop:m}=await e.getDPoPAuthorizationHeaders({method:a,url:u,accessToken:l});f.headers.Authorization=v,f.headers.Dpop=m}else l=typeof l=="string"?l:l.accessToken,f.accessToken=l;const d=await mt(e,f);let h;return Array.isArray(d)?h=d.map(v=>new n(e,{res:v,accessToken:l})):h=new n(e,{res:d,accessToken:l}),h}function Me({oktaAuth:e,accessToken:t,methodName:n,links:r},s=Dt){for(const o of["GET","POST","PUT","DELETE"])if(o.toLowerCase()===n){const a=r.self;return(async c=>he(e,{accessToken:t,url:a.href,method:o,payload:c},s))}const i=r[n];if(!i)throw new _(`No link is found with methodName: ${n}`);return(async o=>he(e,{accessToken:t,url:i.href,method:i.hints.allow[0],payload:o},s))}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class uf extends Dt{constructor(t,n){super(t,n);const{createdAt:r,modifiedAt:s,profile:i}=n.res;this.createdAt=r,this.modifiedAt=s,this.profile=i}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Xy extends Dt{constructor(t,n){super(t,n),this.properties=n.res.properties}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */var cc;(function(e){e.PRIMARY="PRIMARY",e.SECONDARY="SECONDARY"})(cc||(cc={}));var uc;(function(e){e.VERIFIED="VERIFIED",e.UNVERIFIED="UNVERIFIED"})(uc||(uc={}));var Li;(function(e){e.NOT_ENROLLED="NOT_ENROLLED",e.ACTIVE="ACTIVE"})(Li||(Li={}));/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const Zy=async(e,t)=>await he(e,{url:"/idp/myaccount/profile",method:"GET",accessToken:t?.accessToken},uf),ew=async(e,t)=>{const{payload:n,accessToken:r}=t;return await he(e,{url:"/idp/myaccount/profile",method:"PUT",payload:n,accessToken:r},uf)},tw=async(e,t)=>await he(e,{url:"/idp/myaccount/profile/schema",method:"GET",accessToken:t?.accessToken},Xy);/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class lf extends Dt{constructor(t,n){super(t,n);const{res:r}=n,{id:s,profile:i,expiresAt:o,status:a}=r;this.id=s,this.expiresAt=o,this.profile=i,this.status=a}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class kr extends Dt{constructor(t,n){super(t,n);const{accessToken:r,res:s}=n,{id:i,expiresAt:o,profile:a,status:c,_links:u}=s;this.id=i,this.expiresAt=o,this.profile=a,this.status=c,this.poll=async()=>await Me({oktaAuth:t,accessToken:r,methodName:"poll",links:u},lf)(),this.verify=async l=>await Me({oktaAuth:t,accessToken:r,methodName:"verify",links:u},kr)(l)}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Pr extends Dt{constructor(t,n){super(t,n);const{accessToken:r,res:s}=n,{id:i,profile:o,roles:a,status:c,_links:u}=s;this.id=i,this.profile=o,this.roles=a,this.status=c,this.get=async()=>await Me({oktaAuth:t,accessToken:r,methodName:"get",links:u},Pr)(),this.delete=async()=>await Me({oktaAuth:t,accessToken:r,methodName:"delete",links:u})(),this.challenge=async()=>await Me({oktaAuth:t,accessToken:r,methodName:"challenge",links:u},kr)(),u.poll&&(this.poll=async()=>await Me({oktaAuth:t,accessToken:r,methodName:"poll",links:u},lf)()),u.verify&&(this.verify=async l=>await Me({oktaAuth:t,accessToken:r,methodName:"verify",links:u})(l))}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const nw=async(e,t)=>await he(e,{url:"/idp/myaccount/emails",method:"GET",accessToken:t?.accessToken},Pr),rw=async(e,t)=>{const{id:n,accessToken:r}=t;return await he(e,{url:`/idp/myaccount/emails/${n}`,method:"GET",accessToken:r},Pr)},sw=async(e,t)=>{const{accessToken:n,payload:r}=t;return await he(e,{url:"/idp/myaccount/emails",method:"POST",payload:r,accessToken:n},Pr)},iw=async(e,t)=>{const{id:n,accessToken:r}=t;return await he(e,{url:`/idp/myaccount/emails/${n}`,method:"DELETE",accessToken:r})},ow=async(e,t)=>{const{id:n,accessToken:r}=t;return await he(e,{url:`/idp/myaccount/emails/${n}/challenge`,method:"POST",accessToken:r},kr)},aw=async(e,t)=>{const{emailId:n,challengeId:r,accessToken:s}=t;return await he(e,{url:`/idp/myaccount/emails/${n}/challenge/${r}`,method:"POST",accessToken:s},kr)},cw=async(e,t)=>{const{emailId:n,challengeId:r,payload:s,accessToken:i}=t;return await he(e,{url:`/idp/myaccount/emails/${n}/challenge/${r}/verify`,method:"POST",payload:s,accessToken:i})};/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Rr extends Dt{constructor(t,n){super(t,n);const{res:r,accessToken:s}=n,{id:i,profile:o,status:a,_links:c}=r;this.id=i,this.profile=o,this.status=a,this.get=async()=>await Me({oktaAuth:t,accessToken:s,methodName:"get",links:c},Rr)(),this.delete=async()=>await Me({oktaAuth:t,accessToken:s,methodName:"delete",links:c})(),this.challenge=async u=>await Me({oktaAuth:t,accessToken:s,methodName:"challenge",links:c})(u),c.verify&&(this.verify=async u=>await Me({oktaAuth:t,accessToken:s,methodName:"verify",links:c})(u))}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const uw=async(e,t)=>await he(e,{url:"/idp/myaccount/phones",method:"GET",accessToken:t?.accessToken},Rr),lw=async(e,t)=>{const{accessToken:n,id:r}=t;return await he(e,{url:`/idp/myaccount/phones/${r}`,method:"GET",accessToken:n},Rr)},fw=async(e,t)=>{const{accessToken:n,payload:r}=t;return await he(e,{url:"/idp/myaccount/phones",method:"POST",payload:r,accessToken:n},Rr)},dw=async(e,t)=>{const{id:n,accessToken:r}=t;return await he(e,{url:`/idp/myaccount/phones/${n}`,method:"DELETE",accessToken:r})},hw=async(e,t)=>{const{accessToken:n,id:r,payload:s}=t;return await he(e,{url:`/idp/myaccount/phones/${r}/challenge`,method:"POST",payload:s,accessToken:n})},pw=async(e,t)=>{const{id:n,payload:r,accessToken:s}=t;return await he(e,{url:`/idp/myaccount/phones/${n}/verify`,method:"POST",payload:r,accessToken:s})};/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class cn extends Dt{constructor(t,n){super(t,n);const{res:r,accessToken:s}=n,{id:i,status:o,created:a,lastUpdated:c,_links:u}=r;this.id=i,this.status=o,this.created=a,this.lastUpdated=c,this.status==Li.NOT_ENROLLED?this.enroll=async l=>await Me({oktaAuth:t,accessToken:s,methodName:"enroll",links:u},cn)(l):(this.get=async()=>await Me({oktaAuth:t,accessToken:s,methodName:"get",links:u},cn)(),this.update=async l=>await Me({oktaAuth:t,accessToken:s,methodName:"put",links:u},cn)(l),this.delete=async()=>await Me({oktaAuth:t,accessToken:s,methodName:"delete",links:u})())}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const gw=async(e,t)=>await he(e,{url:"/idp/myaccount/password",method:"GET",accessToken:t?.accessToken},cn),mw=async(e,t)=>{const{accessToken:n,payload:r}=t;return await he(e,{url:"/idp/myaccount/password",method:"POST",payload:r,accessToken:n},cn)},vw=async(e,t)=>{const{accessToken:n,payload:r}=t;return await he(e,{url:"/idp/myaccount/password",method:"PUT",payload:r,accessToken:n},cn)},yw=async(e,t)=>await he(e,{url:"/idp/myaccount/password",method:"DELETE",accessToken:t?.accessToken});/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const ww=Object.freeze(Object.defineProperty({__proto__:null,addEmail:sw,addPhone:fw,deleteEmail:iw,deletePassword:yw,deletePhone:dw,enrollPassword:mw,getEmail:rw,getEmailChallenge:aw,getEmails:nw,getPassword:gw,getPhone:lw,getPhones:uw,getProfile:Zy,getProfileSchema:tw,sendEmailChallenge:ow,sendPhoneChallenge:hw,updatePassword:vw,updateProfile:ew,verifyEmailChallenge:cw,verifyPhoneChallenge:pw},Symbol.toStringTag,{value:"Module"}));/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function bw(e){return class extends e{constructor(...n){super(...n),this.myaccount=Object.entries(ww).filter(([r])=>r!=="default").reduce((r,[s,i])=>(r[s]=i.bind(null,this),r),{})}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Fs(e,t){var n={};return Object.assign(n,t),!n.stateToken&&e.stateToken&&(n.stateToken=e.stateToken),n}function _w(e){return Fs(e)}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function ff(e,t){return t=Fs(e,t),Wt(e,e.getIssuerOrigin()+"/api/v1/authn",t,{withCredentials:!0})}function Tw(e,t,n){if(!n||!n.stateToken){var r=Zo(e);if(r)n={stateToken:r};else return Promise.reject(new _("No transaction to resume"))}return ff(e,n).then(function(s){return t.createTransaction(s)})}function Sw(e,t,n){if(!n||!n.stateToken){var r=Zo(e);if(r)n={stateToken:r};else return Promise.reject(new _("No transaction to evaluate"))}return Ow(e,n).then(function(s){return t.createTransaction(s)})}function Ow(e,t){return t=Fs(e,t),Wt(e,e.getIssuerOrigin()+"/api/v1/authn/introspect",t,{withCredentials:!0})}function Ew(e){return!!Zo(e)}function df(e,t,n,r,s){return s=Object.assign({withCredentials:!0},s),Wt(e,n,r,s).then(function(i){return t.createTransaction(i)})}function Zo(e){return e.options.storageUtil.storage.get(tr)}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function hf(e,t,n,r,s,i){if(Array.isArray(s))return function(a,c){if(!a)throw new _("Must provide a link name");var u=_i(s,{name:a});if(!u)throw new _("No link found for that name");return hf(e,t,n,r,u,i)(c)};if(s.hints&&s.hints.allow&&s.hints.allow.length===1){var o=s.hints.allow[0];switch(o){case"GET":return function(){return Rn(e,s.href,{withCredentials:!0})};case"POST":return function(a){i&&i.isPolling&&(i.isPolling=!1);var c=Fs(n,a);(n.status==="MFA_ENROLL"||n.status==="FACTOR_ENROLL")&&Object.assign(c,{factorType:r.factorType,provider:r.provider});var u={},l=c.autoPush;if(l!==void 0){if(typeof l=="function")try{u.autoPush=!!l()}catch{return Promise.reject(new _("AutoPush resulted in an error."))}else l!==null&&(u.autoPush=!!l);c=er(c,"autoPush")}var f=c.rememberDevice;if(f!==void 0){if(typeof f=="function")try{u.rememberDevice=!!f()}catch{return Promise.reject(new _("RememberDevice resulted in an error."))}else f!==null&&(u.rememberDevice=!!f);c=er(c,"rememberDevice")}else c.profile&&c.profile.updatePhone!==void 0&&(c.profile.updatePhone&&(u.updatePhone=!0),c.profile=er(c.profile,"updatePhone"));var d=s.href+Nt(u);return df(e,t,d,c)}}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class lc extends jn{constructor(){super("The poll was stopped by the sdk")}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Aw(e,t,n){return function(r){var s,i,o,a;Xh(r)?s=r:Hu(r)&&(r=r,s=r.delay,i=r.rememberDevice,o=r.autoPush,a=r.transactionCallBack),!s&&s!==0&&(s=$u);var c=Ti(t,"next","poll");function u(){var d={};if(typeof o=="function")try{d.autoPush=!!o()}catch{return Promise.reject(new _("AutoPush resulted in an error."))}else o!=null&&(d.autoPush=!!o);if(typeof i=="function")try{d.rememberDevice=!!i()}catch{return Promise.reject(new _("RememberDevice resulted in an error."))}else i!=null&&(d.rememberDevice=!!i);var h=c.href+Nt(d);return Wt(e,h,_w(t),{saveAuthnState:!1,withCredentials:!0,pollingIntent:!0})}n.isPolling=!0;var l=0,f=function(){return n.isPolling?u().then(function(d){if(l=0,d.factorResult&&d.factorResult==="WAITING"){if(!n.isPolling)throw new lc;return typeof a=="function"&&a(d),Ha(s).then(f)}else return n.isPolling=!1,e.tx.createTransaction(d)}).catch(function(d){if(d.xhr&&(d.xhr.status===0||d.xhr.status===429)&&l<=4){var h=Math.pow(2,l)*1e3;return l++,Ha(h).then(f)}throw d}):Promise.reject(new lc)};return f().catch(function(d){throw n.isPolling=!1,d})}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function kw(e,t,n,r,s){var i={};for(var o in r._links)if(Object.prototype.hasOwnProperty.call(r._links,o)){var a=r._links[o];if(o==="next"&&(o=a.name),a.type){i[o]=a;continue}switch(o){case"poll":i.poll=Aw(e,n,s);break;default:var c=hf(e,t,n,r,a,s);c&&(i[o]=c)}}return i}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Fi(e,t,n,r,s){if(r=r||n,r=He(r),Array.isArray(r)){for(var i=[],o=0,a=r.length;o<a;o++)i.push(Fi(e,t,n,r[o],s));return i}var c=r._embedded||{};for(var u in c)Object.prototype.hasOwnProperty.call(c,u)&&(Hu(c[u])||Array.isArray(c[u]))&&(c[u]=Fi(e,t,n,c[u],s));var l=kw(e,t,n,r,s);return Object.assign(c,l),r=er(r,"_embedded","_links"),Object.assign(r,c),r}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */class Pw{constructor(t,n,r=null){this.data=void 0,this.status=void 0,r&&(this.data=r,Object.assign(this,Fi(t,n,r,r,{})),delete this.stateToken,r.status==="RECOVERY_CHALLENGE"&&!r._links&&(this.cancel=function(){return Promise.resolve(n.createTransaction())}))}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function Rw(e){const t={status:ff.bind(null,e),resume(n){return Tw(e,t,n)},exists:Ew.bind(null,e),introspect(n){return Sw(e,t,n)},createTransaction:n=>new Pw(e,t,n),postToTransaction:(n,r,s)=>df(e,t,n,r,s)};return t}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */function xw(e){return class extends e{constructor(...n){super(...n),this.authn=this.tx=Rw(this),this.fingerprint=of.bind(null,this)}async signIn(n){n=He(n||{});const r=s=>(delete n.sendFingerprint,this.tx.postToTransaction("/api/v1/authn",n,s));return n.sendFingerprint?this.fingerprint().then(function(s){return r({headers:{"X-Device-Fingerprint":s}})}):r()}async signInWithCredentials(n){return this.signIn(n)}forgotPassword(n){return this.tx.postToTransaction("/api/v1/authn/recovery/password",n)}unlockAccount(n){return this.tx.postToTransaction("/api/v1/authn/recovery/unlock",n)}verifyRecoveryToken(n){const{multiOptionalFactorEnroll:r}=n,s=ln(n,["multiOptionalFactorEnroll"]);return r&&(s.options={multiOptionalFactorEnroll:r}),this.tx.postToTransaction("/api/v1/authn/recovery/token",s)}}}/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */const Cw=Ly(),Iw=By(),Mw=Yy(),jw=Sy(Iw,Cw,Mw),Nw=bw(jw),Dw=xw(Nw);class Uw extends Dw{constructor(t){super(t)}}function Vs(e,t){const n=fs(e),r=fs(t),s=n.pop(),i=r.pop(),o=Vi(n,r);return o!==0?o:s&&i?Vi(s.split("."),i.split(".")):s||i?s?-1:1:0}const Lw=e=>typeof e=="string"&&/^[v\d]/.test(e)&&pf.test(e),ea=(e,t,n)=>{Hw(n);const r=Vs(e,t);return gf[n].includes(r)},Fw=(e,t)=>{const n=t.match(/^([<>=~^]+)/),r=n?n[1]:"=";if(r!=="^"&&r!=="~")return ea(e,t,r);const[s,i,o]=fs(e),[a,c,u]=fs(t);return Zr(s,a)!==0?!1:r==="^"?Vi([i,o],[c,u])>=0:Zr(i,c)!==0?!1:Zr(o,u)>=0};Vs.validate=Lw;Vs.compare=ea;Vs.satisfies=Fw;const pf=/^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i,fs=e=>{if(typeof e!="string")throw new TypeError("Invalid argument expected string");const t=e.match(pf);if(!t)throw new Error(`Invalid argument not valid semver ('${e}' received)`);return t.shift(),t},fc=e=>e==="*"||e==="x"||e==="X",dc=e=>{const t=parseInt(e,10);return isNaN(t)?e:t},Vw=(e,t)=>typeof e!=typeof t?[String(e),String(t)]:[e,t],Zr=(e,t)=>{if(fc(e)||fc(t))return 0;const[n,r]=Vw(dc(e),dc(t));return n>r?1:n<r?-1:0},Vi=(e,t)=>{for(let n=0;n<Math.max(e.length,t.length);n++){const r=Zr(e[n]||0,t[n]||0);if(r!==0)return r}return 0},gf={">":[1],">=":[0,1],"=":[0],"<=":[-1,0],"<":[-1]},hc=Object.keys(gf),Hw=e=>{if(typeof e!="string")throw new TypeError(`Invalid operator type, expected string but got ${typeof e}`);if(hc.indexOf(e)===-1)throw new Error(`Invalid operator, expected one of ${hc.join("|")}`)};/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function hr(e,t,n,r){function s(i){return i instanceof n?i:new n(function(o){o(i)})}return new(n||(n=Promise))(function(i,o){function a(l){try{u(r.next(l))}catch(f){o(f)}}function c(l){try{u(r.throw(l))}catch(f){o(f)}}function u(l){l.done?i(l.value):s(l.value).then(a,c)}u((r=r.apply(e,[])).next())})}function pr(e,t){var n={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},r,s,i,o;return o={next:a(0),throw:a(1),return:a(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function a(u){return function(l){return c([u,l])}}function c(u){if(r)throw new TypeError("Generator is already executing.");for(;n;)try{if(r=1,s&&(i=u[0]&2?s.return:u[0]?s.throw||((i=s.return)&&i.call(s),0):s.next)&&!(i=i.call(s,u[1])).done)return i;switch(s=0,i&&(u=[u[0]&2,i.value]),u[0]){case 0:case 1:i=u;break;case 4:return n.label++,{value:u[1],done:!1};case 5:n.label++,s=u[1],u=[0];continue;case 7:u=n.ops.pop(),n.trys.pop();continue;default:if(i=n.trys,!(i=i.length>0&&i[i.length-1])&&(u[0]===6||u[0]===2)){n=0;continue}if(u[0]===3&&(!i||u[1]>i[0]&&u[1]<i[3])){n.label=u[1];break}if(u[0]===6&&n.label<i[1]){n.label=i[1],i=u;break}if(i&&n.label<i[2]){n.label=i[2],n.ops.push(u);break}i[2]&&n.ops.pop(),n.trys.pop();continue}u=t.call(e,n)}catch(l){u=[6,l],s=0}finally{r=i=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}}/*!
 * Copyright (c) 2017-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */var lt,Hi,mf,ii=function(e){return hr(void 0,void 0,void 0,function(){return pr(this,function(t){switch(t.label){case 0:return e&&!e.isAuthenticated?(lt.setOriginalUri(mf),Hi?[4,Hi(lt)]:[3,2]):[3,4];case 1:return t.sent(),[3,4];case 2:return[4,lt.signInWithRedirect()];case 3:t.sent(),t.label=4;case 4:return[2]}})})},Bw=function(e){return hr(void 0,void 0,void 0,function(){var t,n;return pr(this,function(r){switch(r.label){case 0:return lt.authStateManager.unsubscribe(ii),e.matched.some(function(s){return s.meta.requiresAuth})?(mf=e.fullPath,lt.authStateManager.subscribe(ii),[4,lt.isAuthenticated()]):[3,4];case 1:return t=r.sent(),t?[3,3]:(n=lt.authStateManager.getAuthState(),[4,ii(n)]);case 2:return r.sent(),[2,!1];case 3:return[2,!0];case 4:return[2,!0]}})})};function qw(e,t){var n=this,r=t===void 0?{}:t,s=r.oktaAuth,i=r.onAuthRequired,o=r.onAuthResume;if(!s)throw new _("No oktaAuth instance passed to OktaVue.");if(lt=s,Hi=i,s._oktaUserAgent){var a=ea(s._oktaUserAgent.getVersion(),"5.3.1",">=");if(!a)throw new _(`
      Passed in oktaAuth is not compatible with the SDK,
      minimum supported okta-auth-js version is `.concat("5.3.1",`.
    `));s._oktaUserAgent.addEnvironment("".concat("@okta/okta-vue","/").concat("5.9.0"))}else console.warn("_oktaUserAgent is not available on auth SDK instance. Please use okta-auth-js@^5.3.1 .");s.options.restoreOriginalUri||(s.options.restoreOriginalUri=function(l,f){return hr(n,void 0,void 0,function(){var d,h;return pr(this,function(v){return d=e.config.globalProperties.$router,d&&(h=np(f||"/",window.location.origin),d.replace({path:h})),[2]})})}),s.start();var c=eu(s.authStateManager.getAuthState()),u=function(l){return hr(this,void 0,void 0,function(){return pr(this,function(f){return c.value=l,ld(c),[2]})})};s.authStateManager.subscribe(u),e.mixin({computed:{authState:function(){return c.value}}}),e.provide("okta.authState",c),Object.assign(s.options,{onAuthRequired:i,onAuthResume:o}),e.config.globalProperties.$auth=s}function ta(){if(!lt)throw new _("No oktaAuth instance has instantiated.");return lt}var Kw={install:qw},vf={setup:function(e,t){var n=this,r=t.slots,s=Oe(null),i=ta();return gu(function(){return hr(n,void 0,void 0,function(){var o,a,c,u,l,f;return pr(this,function(d){switch(d.label){case 0:return d.trys.push([0,2,,3]),[4,i.handleLoginRedirect()];case 1:return d.sent(),[3,3];case 2:return o=d.sent(),a=i.isInteractionRequiredError||i.idx.isInteractionRequiredError,a(o)&&(c=i.options,u=c.onAuthResume,l=c.onAuthRequired,f=u||l,f)?(f(i),[2]):(s.value=o.toString(),[3,3]);case 3:return[2]}})})}),function(){return r.error?go("div",r.error({error:s.value})):s.value}}};vf.__file="src/components/LoginCallback.vue";const na=(e,t)=>{const n=e.__vccOpts||e;for(const[r,s]of t)n[r]=s;return n},Ww={};function $w(e,t){const n=lo("RouterView");return we(),Du(n)}const Gw=na(Ww,[["render",$w]]);/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const gn=typeof document<"u";function yf(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function zw(e){return e.__esModule||e[Symbol.toStringTag]==="Module"||e.default&&yf(e.default)}const ee=Object.assign;function oi(e,t){const n={};for(const r in t){const s=t[r];n[r]=tt(s)?s.map(e):e(s)}return n}const sr=()=>{},tt=Array.isArray;function pc(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}const wf=/#/g,Jw=/&/g,Qw=/\//g,Yw=/=/g,Xw=/\?/g,bf=/\+/g,Zw=/%5B/g,eb=/%5D/g,_f=/%5E/g,tb=/%60/g,Tf=/%7B/g,nb=/%7C/g,Sf=/%7D/g,rb=/%20/g;function ra(e){return e==null?"":encodeURI(""+e).replace(nb,"|").replace(Zw,"[").replace(eb,"]")}function sb(e){return ra(e).replace(Tf,"{").replace(Sf,"}").replace(_f,"^")}function Bi(e){return ra(e).replace(bf,"%2B").replace(rb,"+").replace(wf,"%23").replace(Jw,"%26").replace(tb,"`").replace(Tf,"{").replace(Sf,"}").replace(_f,"^")}function ib(e){return Bi(e).replace(Yw,"%3D")}function ob(e){return ra(e).replace(wf,"%23").replace(Xw,"%3F")}function ab(e){return ob(e).replace(Qw,"%2F")}function gr(e){if(e==null)return null;try{return decodeURIComponent(""+e)}catch{}return""+e}const cb=/\/$/,ub=e=>e.replace(cb,"");function ai(e,t,n="/"){let r,s={},i="",o="";const a=t.indexOf("#");let c=t.indexOf("?");return c=a>=0&&c>a?-1:c,c>=0&&(r=t.slice(0,c),i=t.slice(c,a>0?a:t.length),s=e(i.slice(1))),a>=0&&(r=r||t.slice(0,a),o=t.slice(a,t.length)),r=hb(r??t,n),{fullPath:r+i+o,path:r,query:s,hash:gr(o)}}function lb(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function gc(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function fb(e,t,n){const r=t.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&In(t.matched[r],n.matched[s])&&Of(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function In(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function Of(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(var n in e)if(!db(e[n],t[n]))return!1;return!0}function db(e,t){return tt(e)?mc(e,t):tt(t)?mc(t,e):e?.valueOf()===t?.valueOf()}function mc(e,t){return tt(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function hb(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,o,a;for(o=0;o<r.length;o++)if(a=r[o],a!==".")if(a==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o).join("/")}const Ut={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let qi=(function(e){return e.pop="pop",e.push="push",e})({}),ci=(function(e){return e.back="back",e.forward="forward",e.unknown="",e})({});function pb(e){if(!e)if(gn){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),ub(e)}const gb=/^[^#]+#/;function mb(e,t){return e.replace(gb,"#")+t}function vb(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const Hs=()=>({left:window.scrollX,top:window.scrollY});function yb(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;t=vb(s,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function vc(e,t){return(history.state?history.state.position-t:-1)+e}const Ki=new Map;function wb(e,t){Ki.set(e,t)}function bb(e){const t=Ki.get(e);return Ki.delete(e),t}function _b(e){return typeof e=="string"||e&&typeof e=="object"}function Ef(e){return typeof e=="string"||typeof e=="symbol"}let de=(function(e){return e[e.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",e[e.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",e[e.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",e[e.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",e[e.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",e})({});const Af=Symbol("");de.MATCHER_NOT_FOUND+"",de.NAVIGATION_GUARD_REDIRECT+"",de.NAVIGATION_ABORTED+"",de.NAVIGATION_CANCELLED+"",de.NAVIGATION_DUPLICATED+"";function Mn(e,t){return ee(new Error,{type:e,[Af]:!0},t)}function bt(e,t){return e instanceof Error&&Af in e&&(t==null||!!(e.type&t))}const Tb=["params","query","hash"];function Sb(e){if(typeof e=="string")return e;if(e.path!=null)return e.path;const t={};for(const n of Tb)n in e&&(t[n]=e[n]);return JSON.stringify(t,null,2)}function Ob(e){const t={};if(e===""||e==="?")return t;const n=(e[0]==="?"?e.slice(1):e).split("&");for(let r=0;r<n.length;++r){const s=n[r].replace(bf," "),i=s.indexOf("="),o=gr(i<0?s:s.slice(0,i)),a=i<0?null:gr(s.slice(i+1));if(o in t){let c=t[o];tt(c)||(c=t[o]=[c]),c.push(a)}else t[o]=a}return t}function yc(e){let t="";for(let n in e){const r=e[n];if(n=ib(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(tt(r)?r.map(s=>s&&Bi(s)):[r&&Bi(r)]).forEach(s=>{s!==void 0&&(t+=(t.length?"&":"")+n,s!=null&&(t+="="+s))})}return t}function Eb(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=tt(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return t}const Ab=Symbol(""),wc=Symbol(""),Bs=Symbol(""),kf=Symbol(""),Wi=Symbol("");function Vn(){let e=[];function t(r){return e.push(r),()=>{const s=e.indexOf(r);s>-1&&e.splice(s,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function Ft(e,t,n,r,s,i=o=>o()){const o=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((a,c)=>{const u=d=>{d===!1?c(Mn(de.NAVIGATION_ABORTED,{from:n,to:t})):d instanceof Error?c(d):_b(d)?c(Mn(de.NAVIGATION_GUARD_REDIRECT,{from:t,to:d})):(o&&r.enterCallbacks[s]===o&&typeof d=="function"&&o.push(d),a())},l=i(()=>e.call(r&&r.instances[s],t,n,u));let f=Promise.resolve(l);e.length<3&&(f=f.then(u)),f.catch(d=>c(d))})}function ui(e,t,n,r,s=i=>i()){const i=[];for(const o of e)for(const a in o.components){let c=o.components[a];if(!(t!=="beforeRouteEnter"&&!o.instances[a]))if(yf(c)){const u=(c.__vccOpts||c)[t];u&&i.push(Ft(u,n,r,o,a,s))}else{let u=c();i.push(()=>u.then(l=>{if(!l)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const f=zw(l)?l.default:l;o.mods[a]=l,o.components[a]=f;const d=(f.__vccOpts||f)[t];return d&&Ft(d,n,r,o,a,s)()}))}}return i}function kb(e,t){const n=[],r=[],s=[],i=Math.max(t.matched.length,e.matched.length);for(let o=0;o<i;o++){const a=t.matched[o];a&&(e.matched.find(u=>In(u,a))?r.push(a):n.push(a));const c=e.matched[o];c&&(t.matched.find(u=>In(u,c))||s.push(c))}return[n,r,s]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Pb=()=>location.protocol+"//"+location.host;function Pf(e,t){const{pathname:n,search:r,hash:s}=t,i=e.indexOf("#");if(i>-1){let o=s.includes(e.slice(i))?e.slice(i).length:1,a=s.slice(o);return a[0]!=="/"&&(a="/"+a),gc(a,"")}return gc(n,e)+r+s}function Rb(e,t,n,r){let s=[],i=[],o=null;const a=({state:d})=>{const h=Pf(e,location),v=n.value,m=t.value;let O=0;if(d){if(n.value=h,t.value=d,o&&o===v){o=null;return}O=m?d.position-m.position:0}else r(h);s.forEach(R=>{R(n.value,v,{delta:O,type:qi.pop,direction:O?O>0?ci.forward:ci.back:ci.unknown})})};function c(){o=n.value}function u(d){s.push(d);const h=()=>{const v=s.indexOf(d);v>-1&&s.splice(v,1)};return i.push(h),h}function l(){if(document.visibilityState==="hidden"){const{history:d}=window;if(!d.state)return;d.replaceState(ee({},d.state,{scroll:Hs()}),"")}}function f(){for(const d of i)d();i=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",l),document.removeEventListener("visibilitychange",l)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",l),document.addEventListener("visibilitychange",l),{pauseListeners:c,listen:u,destroy:f}}function bc(e,t,n,r=!1,s=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:s?Hs():null}}function xb(e){const{history:t,location:n}=window,r={value:Pf(e,n)},s={value:t.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function i(c,u,l){const f=e.indexOf("#"),d=f>-1?(n.host&&document.querySelector("base")?e:e.slice(f))+c:Pb()+e+c;try{t[l?"replaceState":"pushState"](u,"",d),s.value=u}catch(h){console.error(h),n[l?"replace":"assign"](d)}}function o(c,u){i(c,ee({},t.state,bc(s.value.back,c,s.value.forward,!0),u,{position:s.value.position}),!0),r.value=c}function a(c,u){const l=ee({},s.value,t.state,{forward:c,scroll:Hs()});i(l.current,l,!0),i(c,ee({},bc(r.value,c,null),{position:l.position+1},u),!1),r.value=c}return{location:r,state:s,push:a,replace:o}}function Cb(e){e=pb(e);const t=xb(e),n=Rb(e,t.state,t.location,t.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=ee({location:"",base:e,go:r,createHref:mb.bind(null,e)},t,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>t.state.value}),s}let tn=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.Group=2]="Group",e})({});var me=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.ParamRegExp=2]="ParamRegExp",e[e.ParamRegExpEnd=3]="ParamRegExpEnd",e[e.EscapeNext=4]="EscapeNext",e})(me||{});const Ib={type:tn.Static,value:""},Mb=/[a-zA-Z0-9_]/;function jb(e){if(!e)return[[]];if(e==="/")return[[Ib]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(h){throw new Error(`ERR (${n})/"${u}": ${h}`)}let n=me.Static,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let a=0,c,u="",l="";function f(){u&&(n===me.Static?i.push({type:tn.Static,value:u}):n===me.Param||n===me.ParamRegExp||n===me.ParamRegExpEnd?(i.length>1&&(c==="*"||c==="+")&&t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),i.push({type:tn.Param,value:u,regexp:l,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):t("Invalid state to consume buffer"),u="")}function d(){u+=c}for(;a<e.length;){if(c=e[a++],c==="\\"&&n!==me.ParamRegExp){r=n,n=me.EscapeNext;continue}switch(n){case me.Static:c==="/"?(u&&f(),o()):c===":"?(f(),n=me.Param):d();break;case me.EscapeNext:d(),n=r;break;case me.Param:c==="("?n=me.ParamRegExp:Mb.test(c)?d():(f(),n=me.Static,c!=="*"&&c!=="?"&&c!=="+"&&a--);break;case me.ParamRegExp:c===")"?l[l.length-1]=="\\"?l=l.slice(0,-1)+c:n=me.ParamRegExpEnd:l+=c;break;case me.ParamRegExpEnd:f(),n=me.Static,c!=="*"&&c!=="?"&&c!=="+"&&a--,l="";break;default:t("Unknown state");break}}return n===me.ParamRegExp&&t(`Unfinished custom RegExp for param "${u}"`),f(),o(),s}const _c="[^/]+?",Nb={sensitive:!1,strict:!1,start:!0,end:!0};var Ce=(function(e){return e[e._multiplier=10]="_multiplier",e[e.Root=90]="Root",e[e.Segment=40]="Segment",e[e.SubSegment=30]="SubSegment",e[e.Static=40]="Static",e[e.Dynamic=20]="Dynamic",e[e.BonusCustomRegExp=10]="BonusCustomRegExp",e[e.BonusWildcard=-50]="BonusWildcard",e[e.BonusRepeatable=-20]="BonusRepeatable",e[e.BonusOptional=-8]="BonusOptional",e[e.BonusStrict=.7000000000000001]="BonusStrict",e[e.BonusCaseSensitive=.25]="BonusCaseSensitive",e})(Ce||{});const Db=/[.+*?^${}()[\]/\\]/g;function Ub(e,t){const n=ee({},Nb,t),r=[];let s=n.start?"^":"";const i=[];for(const u of e){const l=u.length?[]:[Ce.Root];n.strict&&!u.length&&(s+="/");for(let f=0;f<u.length;f++){const d=u[f];let h=Ce.Segment+(n.sensitive?Ce.BonusCaseSensitive:0);if(d.type===tn.Static)f||(s+="/"),s+=d.value.replace(Db,"\\$&"),h+=Ce.Static;else if(d.type===tn.Param){const{value:v,repeatable:m,optional:O,regexp:R}=d;i.push({name:v,repeatable:m,optional:O});const k=R||_c;if(k!==_c){h+=Ce.BonusCustomRegExp;try{`${k}`}catch(x){throw new Error(`Invalid custom RegExp for param "${v}" (${k}): `+x.message)}}let M=m?`((?:${k})(?:/(?:${k}))*)`:`(${k})`;f||(M=O&&u.length<2?`(?:/${M})`:"/"+M),O&&(M+="?"),s+=M,h+=Ce.Dynamic,O&&(h+=Ce.BonusOptional),m&&(h+=Ce.BonusRepeatable),k===".*"&&(h+=Ce.BonusWildcard)}l.push(h)}r.push(l)}if(n.strict&&n.end){const u=r.length-1;r[u][r[u].length-1]+=Ce.BonusStrict}n.strict||(s+="/?"),n.end?s+="$":n.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function a(u){const l=u.match(o),f={};if(!l)return null;for(let d=1;d<l.length;d++){const h=l[d]||"",v=i[d-1];f[v.name]=h&&v.repeatable?h.split("/"):h}return f}function c(u){let l="",f=!1;for(const d of e){(!f||!l.endsWith("/"))&&(l+="/"),f=!1;for(const h of d)if(h.type===tn.Static)l+=h.value;else if(h.type===tn.Param){const{value:v,repeatable:m,optional:O}=h,R=v in u?u[v]:"";if(tt(R)&&!m)throw new Error(`Provided param "${v}" is an array but it is not repeatable (* or + modifiers)`);const k=tt(R)?R.join("/"):R;if(!k)if(O)d.length<2&&(l.endsWith("/")?l=l.slice(0,-1):f=!0);else throw new Error(`Missing required param "${v}"`);l+=k}}return l||"/"}return{re:o,score:r,keys:i,parse:a,stringify:c}}function Lb(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===Ce.Static+Ce.Segment?-1:1:e.length>t.length?t.length===1&&t[0]===Ce.Static+Ce.Segment?1:-1:0}function Rf(e,t){let n=0;const r=e.score,s=t.score;for(;n<r.length&&n<s.length;){const i=Lb(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(Tc(r))return 1;if(Tc(s))return-1}return s.length-r.length}function Tc(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const Fb={strict:!1,end:!0,sensitive:!1};function Vb(e,t,n){const r=Ub(jb(e.path),n),s=ee(r,{record:e,parent:t,children:[],alias:[]});return t&&!s.record.aliasOf==!t.record.aliasOf&&t.children.push(s),s}function Hb(e,t){const n=[],r=new Map;t=pc(Fb,t);function s(f){return r.get(f)}function i(f,d,h){const v=!h,m=Oc(f);m.aliasOf=h&&h.record;const O=pc(t,f),R=[m];if("alias"in f){const x=typeof f.alias=="string"?[f.alias]:f.alias;for(const z of x)R.push(Oc(ee({},m,{components:h?h.record.components:m.components,path:z,aliasOf:h?h.record:m})))}let k,M;for(const x of R){const{path:z}=x;if(d&&z[0]!=="/"){const J=d.record.path,Q=J[J.length-1]==="/"?"":"/";x.path=d.record.path+(z&&Q+z)}if(k=Vb(x,d,O),h?h.alias.push(k):(M=M||k,M!==k&&M.alias.push(k),v&&f.name&&!Ec(k)&&o(f.name)),xf(k)&&c(k),m.children){const J=m.children;for(let Q=0;Q<J.length;Q++)i(J[Q],k,h&&h.children[Q])}h=h||k}return M?()=>{o(M)}:sr}function o(f){if(Ef(f)){const d=r.get(f);d&&(r.delete(f),n.splice(n.indexOf(d),1),d.children.forEach(o),d.alias.forEach(o))}else{const d=n.indexOf(f);d>-1&&(n.splice(d,1),f.record.name&&r.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function a(){return n}function c(f){const d=Kb(f,n);n.splice(d,0,f),f.record.name&&!Ec(f)&&r.set(f.record.name,f)}function u(f,d){let h,v={},m,O;if("name"in f&&f.name){if(h=r.get(f.name),!h)throw Mn(de.MATCHER_NOT_FOUND,{location:f});O=h.record.name,v=ee(Sc(d.params,h.keys.filter(M=>!M.optional).concat(h.parent?h.parent.keys.filter(M=>M.optional):[]).map(M=>M.name)),f.params&&Sc(f.params,h.keys.map(M=>M.name))),m=h.stringify(v)}else if(f.path!=null)m=f.path,h=n.find(M=>M.re.test(m)),h&&(v=h.parse(m),O=h.record.name);else{if(h=d.name?r.get(d.name):n.find(M=>M.re.test(d.path)),!h)throw Mn(de.MATCHER_NOT_FOUND,{location:f,currentLocation:d});O=h.record.name,v=ee({},d.params,f.params),m=h.stringify(v)}const R=[];let k=h;for(;k;)R.unshift(k.record),k=k.parent;return{name:O,path:m,params:v,matched:R,meta:qb(R)}}e.forEach(f=>i(f));function l(){n.length=0,r.clear()}return{addRoute:i,resolve:u,removeRoute:o,clearRoutes:l,getRoutes:a,getRecordMatcher:s}}function Sc(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function Oc(e){const t={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:Bb(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function Bb(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="object"?n[r]:n;return t}function Ec(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function qb(e){return e.reduce((t,n)=>ee(t,n.meta),{})}function Kb(e,t){let n=0,r=t.length;for(;n!==r;){const i=n+r>>1;Rf(e,t[i])<0?r=i:n=i+1}const s=Wb(e);return s&&(r=t.lastIndexOf(s,r-1)),r}function Wb(e){let t=e;for(;t=t.parent;)if(xf(t)&&Rf(e,t)===0)return t}function xf({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function Ac(e){const t=dt(Bs),n=dt(kf),r=Xe(()=>{const c=wn(e.to);return t.resolve(c)}),s=Xe(()=>{const{matched:c}=r.value,{length:u}=c,l=c[u-1],f=n.matched;if(!l||!f.length)return-1;const d=f.findIndex(In.bind(null,l));if(d>-1)return d;const h=kc(c[u-2]);return u>1&&kc(l)===h&&f[f.length-1].path!==h?f.findIndex(In.bind(null,c[u-2])):d}),i=Xe(()=>s.value>-1&&Qb(n.params,r.value.params)),o=Xe(()=>s.value>-1&&s.value===n.matched.length-1&&Of(n.params,r.value.params));function a(c={}){if(Jb(c)){const u=t[wn(e.replace)?"replace":"push"](wn(e.to)).catch(sr);return e.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>u),u}return Promise.resolve()}return{route:r,href:Xe(()=>r.value.href),isActive:i,isExactActive:o,navigate:a}}function $b(e){return e.length===1?e[0]:e}const Gb=fu({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Ac,setup(e,{slots:t}){const n=ws(Ac(e)),{options:r}=dt(Bs),s=Xe(()=>({[Pc(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[Pc(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=t.default&&$b(t.default(n));return e.custom?i:go("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),zb=Gb;function Jb(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function Qb(e,t){for(const n in t){const r=t[n],s=e[n];if(typeof r=="string"){if(r!==s)return!1}else if(!tt(s)||s.length!==r.length||r.some((i,o)=>i.valueOf()!==s[o].valueOf()))return!1}return!0}function kc(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Pc=(e,t,n)=>e??t??n,Yb=fu({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=dt(Wi),s=Xe(()=>e.route||r.value),i=dt(wc,0),o=Xe(()=>{let u=wn(i);const{matched:l}=s.value;let f;for(;(f=l[u])&&!f.components;)u++;return u}),a=Xe(()=>s.value.matched[o.value]);Br(wc,Xe(()=>o.value+1)),Br(Ab,a),Br(Wi,s);const c=Oe();return qr(()=>[c.value,a.value,e.name],([u,l,f],[d,h,v])=>{l&&(l.instances[f]=u,h&&h!==l&&u&&u===d&&(l.leaveGuards.size||(l.leaveGuards=h.leaveGuards),l.updateGuards.size||(l.updateGuards=h.updateGuards))),u&&l&&(!h||!In(l,h)||!d)&&(l.enterCallbacks[f]||[]).forEach(m=>m(u))},{flush:"post"}),()=>{const u=s.value,l=e.name,f=a.value,d=f&&f.components[l];if(!d)return Rc(n.default,{Component:d,route:u});const h=f.props[l],v=h?h===!0?u.params:typeof h=="function"?h(u):h:null,O=go(d,ee({},v,t,{onVnodeUnmounted:R=>{R.component.isUnmounted&&(f.instances[l]=null)},ref:c}));return Rc(n.default,{Component:O,route:u})||O}}});function Rc(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const Xb=Yb;function Zb(e){const t=Hb(e.routes,e),n=e.parseQuery||Ob,r=e.stringifyQuery||yc,s=e.history,i=Vn(),o=Vn(),a=Vn(),c=eu(Ut);let u=Ut;gn&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const l=oi.bind(null,S=>""+S),f=oi.bind(null,ab),d=oi.bind(null,gr);function h(S,L){let N,V;return Ef(S)?(N=t.getRecordMatcher(S),V=L):V=S,t.addRoute(V,N)}function v(S){const L=t.getRecordMatcher(S);L&&t.removeRoute(L)}function m(){return t.getRoutes().map(S=>S.record)}function O(S){return!!t.getRecordMatcher(S)}function R(S,L){if(L=ee({},L||c.value),typeof S=="string"){const y=ai(n,S,L.path),b=t.resolve({path:y.path},L),A=s.createHref(y.fullPath);return ee(y,b,{params:d(b.params),hash:gr(y.hash),redirectedFrom:void 0,href:A})}let N;if(S.path!=null)N=ee({},S,{path:ai(n,S.path,L.path).path});else{const y=ee({},S.params);for(const b in y)y[b]==null&&delete y[b];N=ee({},S,{params:f(y)}),L.params=f(L.params)}const V=t.resolve(N,L),Y=S.hash||"";V.params=l(d(V.params));const p=lb(r,ee({},S,{hash:sb(Y),path:V.path})),g=s.createHref(p);return ee({fullPath:p,hash:Y,query:r===yc?Eb(S.query):S.query||{}},V,{redirectedFrom:void 0,href:g})}function k(S){return typeof S=="string"?ai(n,S,c.value.path):ee({},S)}function M(S,L){if(u!==S)return Mn(de.NAVIGATION_CANCELLED,{from:L,to:S})}function x(S){return Q(S)}function z(S){return x(ee(k(S),{replace:!0}))}function J(S,L){const N=S.matched[S.matched.length-1];if(N&&N.redirect){const{redirect:V}=N;let Y=typeof V=="function"?V(S,L):V;return typeof Y=="string"&&(Y=Y.includes("?")||Y.includes("#")?Y=k(Y):{path:Y},Y.params={}),ee({query:S.query,hash:S.hash,params:Y.path!=null?{}:S.params},Y)}}function Q(S,L){const N=u=R(S),V=c.value,Y=S.state,p=S.force,g=S.replace===!0,y=J(N,V);if(y)return Q(ee(k(y),{state:typeof y=="object"?ee({},Y,y.state):Y,force:p,replace:g}),L||N);const b=N;b.redirectedFrom=L;let A;return!p&&fb(r,V,N)&&(A=Mn(de.NAVIGATION_DUPLICATED,{to:b,from:V}),Pe(V,V,!0,!1)),(A?Promise.resolve(A):De(b,V)).catch(T=>bt(T)?bt(T,de.NAVIGATION_GUARD_REDIRECT)?T:W(T):F(T,b,V)).then(T=>{if(T){if(bt(T,de.NAVIGATION_GUARD_REDIRECT))return Q(ee({replace:g},k(T.to),{state:typeof T.to=="object"?ee({},Y,T.to.state):Y,force:p}),L||b)}else T=ce(b,V,!0,g,Y);return fe(b,V,T),T})}function ve(S,L){const N=M(S,L);return N?Promise.reject(N):Promise.resolve()}function le(S){const L=ue.values().next().value;return L&&typeof L.runWithContext=="function"?L.runWithContext(S):S()}function De(S,L){let N;const[V,Y,p]=kb(S,L);N=ui(V.reverse(),"beforeRouteLeave",S,L);for(const y of V)y.leaveGuards.forEach(b=>{N.push(Ft(b,S,L))});const g=ve.bind(null,S,L);return N.push(g),ze(N).then(()=>{N=[];for(const y of i.list())N.push(Ft(y,S,L));return N.push(g),ze(N)}).then(()=>{N=ui(Y,"beforeRouteUpdate",S,L);for(const y of Y)y.updateGuards.forEach(b=>{N.push(Ft(b,S,L))});return N.push(g),ze(N)}).then(()=>{N=[];for(const y of p)if(y.beforeEnter)if(tt(y.beforeEnter))for(const b of y.beforeEnter)N.push(Ft(b,S,L));else N.push(Ft(y.beforeEnter,S,L));return N.push(g),ze(N)}).then(()=>(S.matched.forEach(y=>y.enterCallbacks={}),N=ui(p,"beforeRouteEnter",S,L,le),N.push(g),ze(N))).then(()=>{N=[];for(const y of o.list())N.push(Ft(y,S,L));return N.push(g),ze(N)}).catch(y=>bt(y,de.NAVIGATION_CANCELLED)?y:Promise.reject(y))}function fe(S,L,N){a.list().forEach(V=>le(()=>V(S,L,N)))}function ce(S,L,N,V,Y){const p=M(S,L);if(p)return p;const g=L===Ut,y=gn?history.state:{};N&&(V||g?s.replace(S.fullPath,ee({scroll:g&&y&&y.scroll},Y)):s.push(S.fullPath,Y)),c.value=S,Pe(S,L,N,g),W()}let Ge;function vt(){Ge||(Ge=s.listen((S,L,N)=>{if(!Re.listening)return;const V=R(S),Y=J(V,Re.currentRoute.value);if(Y){Q(ee(Y,{replace:!0,force:!0}),V).catch(sr);return}u=V;const p=c.value;gn&&wb(vc(p.fullPath,N.delta),Hs()),De(V,p).catch(g=>bt(g,de.NAVIGATION_ABORTED|de.NAVIGATION_CANCELLED)?g:bt(g,de.NAVIGATION_GUARD_REDIRECT)?(Q(ee(k(g.to),{force:!0}),V).then(y=>{bt(y,de.NAVIGATION_ABORTED|de.NAVIGATION_DUPLICATED)&&!N.delta&&N.type===qi.pop&&s.go(-1,!1)}).catch(sr),Promise.reject()):(N.delta&&s.go(-N.delta,!1),F(g,V,p))).then(g=>{g=g||ce(V,p,!1),g&&(N.delta&&!bt(g,de.NAVIGATION_CANCELLED)?s.go(-N.delta,!1):N.type===qi.pop&&bt(g,de.NAVIGATION_ABORTED|de.NAVIGATION_DUPLICATED)&&s.go(-1,!1)),fe(V,p,g)}).catch(sr)}))}let w=Vn(),E=Vn(),U;function F(S,L,N){W(S);const V=E.list();return V.length?V.forEach(Y=>Y(S,L,N)):console.error(S),Promise.reject(S)}function X(){return U&&c.value!==Ut?Promise.resolve():new Promise((S,L)=>{w.add([S,L])})}function W(S){return U||(U=!S,vt(),w.list().forEach(([L,N])=>S?N(S):L()),w.reset()),S}function Pe(S,L,N,V){const{scrollBehavior:Y}=e;if(!gn||!Y)return Promise.resolve();const p=!N&&bb(vc(S.fullPath,0))||(V||!N)&&history.state&&history.state.scroll||null;return su().then(()=>Y(S,L,p)).then(g=>g&&yb(g)).catch(g=>F(g,S,L))}const ye=S=>s.go(S);let yt;const ue=new Set,Re={currentRoute:c,listening:!0,addRoute:h,removeRoute:v,clearRoutes:t.clearRoutes,hasRoute:O,getRoutes:m,resolve:R,options:e,push:x,replace:z,go:ye,back:()=>ye(-1),forward:()=>ye(1),beforeEach:i.add,beforeResolve:o.add,afterEach:a.add,onError:E.add,isReady:X,install(S){S.component("RouterLink",zb),S.component("RouterView",Xb),S.config.globalProperties.$router=Re,Object.defineProperty(S.config.globalProperties,"$route",{enumerable:!0,get:()=>wn(c)}),gn&&!yt&&c.value===Ut&&(yt=!0,x(s.location).catch(V=>{}));const L={};for(const V in Ut)Object.defineProperty(L,V,{get:()=>c.value[V],enumerable:!0});S.provide(Bs,Re),S.provide(kf,Zc(L)),S.provide(Wi,c);const N=S.unmount;ue.add(S),S.unmount=function(){ue.delete(S),ue.size<1&&(u=Ut,Ge&&Ge(),Ge=null,c.value=Ut,yt=!1,U=!1),N()}}};function ze(S){return S.reduce((L,N)=>L.then(()=>le(N)),Promise.resolve())}return Re}function e_(){return dt(Bs)}async function ir(e,t,n={}){const r=await e.getAccessToken();if(!r)throw new Error("No access token — user not authenticated");const s={Authorization:`Bearer ${r}`,...n.headers};n.body!==void 0&&(s["Content-Type"]=s["Content-Type"]??"application/json");const i=await fetch(`/api/v1${t}`,{...n,headers:s});if(!i.ok){const o=await i.json().catch(()=>({}));throw new Error(o.error||`HTTP ${i.status}`)}return i}const t_={class:"page"},n_={key:0,class:"greeting"},r_={class:"card"},s_={class:"row"},i_=["disabled"],o_=["disabled"],a_={__name:"HomePage",setup(e){e_();const{authState:t,oktaAuth:n}=ta(),r=Oe(null),s=new Date,i=Oe(`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}`),o=Oe(!1),a=Oe(null),c=Oe(null),u=Oe(null);let l=null;uo(async()=>{try{const v=await ir(n,"/user/me");r.value=await v.json()}catch{}});async function f(){o.value=!0,a.value="pending",c.value=null,u.value=null;try{const v=await ir(n,"/sync",{method:"POST",body:JSON.stringify({month:i.value})}),{job_id:m}=await v.json();await d(m)}catch(v){a.value="failed",u.value=v.message,o.value=!1}}async function d(v){try{const O=await(await ir(n,`/sync/${v}`)).json();if(a.value=O.status,O.status==="complete"||O.status==="failed"){c.value=O.summary,O.status==="failed"&&(u.value=O.summary?.error||"Sync failed"),o.value=!1;return}l=setTimeout(()=>d(v),2e3)}catch(m){a.value="failed",u.value=m.message,o.value=!1}}function h(){l&&(clearTimeout(l),l=null),n.signOut()}return mu(()=>{l&&(clearTimeout(l),l=null)}),(v,m)=>{const O=lo("RouterLink");return we(),Se("div",t_,[G("header",null,[m[2]||(m[2]=G("h1",null,"afashours",-1)),G("nav",null,[je(O,{to:"/settings"},{default:ao(()=>[...m[1]||(m[1]=[At("Settings",-1)])]),_:1}),G("button",{class:"link",onClick:h},"Sign out")])]),G("main",null,[r.value?(we(),Se("p",n_,[m[3]||(m[3]=At("Signed in as ",-1)),G("strong",null,Tt(r.value.subject),1)])):Tn("",!0),G("section",r_,[m[5]||(m[5]=G("h2",null,"Sync hours to AFAS",-1)),G("div",s_,[m[4]||(m[4]=G("label",{for:"month"},"Month",-1)),Hn(G("input",{id:"month",type:"month","onUpdate:modelValue":m[0]||(m[0]=R=>i.value=R),disabled:o.value},null,8,i_),[[qn,i.value]]),G("button",{onClick:f,disabled:o.value},Tt(o.value?"Syncing…":"Sync"),9,o_)]),a.value?(we(),Se("div",{key:0,class:vs(["status",a.value])},[a.value==="pending"||a.value==="running"?(we(),Se(Fe,{key:0},[At(" Sync in progress… ")],64)):a.value==="complete"?(we(),Se(Fe,{key:1},[At(" ✓ Sync complete — "+Tt(c.value?.entries_synced??0)+" entries synced, "+Tt(c.value?.entries_skipped??0)+" skipped ("+Tt(c.value?.entries_found??0)+" found) ",1)],64)):a.value==="failed"?(we(),Se(Fe,{key:2},[At(" ✗ Sync failed: "+Tt(u.value),1)],64)):Tn("",!0)],2)):Tn("",!0)])])])}}},c_=na(a_,[["__scopeId","data-v-30e360f9"]]),u_={class:"page"},l_={key:0},f_={class:"card"},d_={key:0,class:"hint"},h_={key:1,class:"hint"},p_={class:"card"},g_={key:0},m_=["onUpdate:modelValue"],v_=["onUpdate:modelValue"],y_=["onUpdate:modelValue"],w_=["onClick"],b_={class:"actions"},__={key:0,class:"success"},T_={key:1,class:"fail"},S_=["disabled"],O_={__name:"SettingsPage",setup(e){const{oktaAuth:t}=ta(),n=Oe(!0),r=Oe(!1),s=Oe(!1),i=Oe(null),o=Oe(!1),a=Oe(""),c=Oe([]),u=Oe(!1);uo(async()=>{try{const v=await(await ir(t,"/user/me/preferences")).json();o.value=v.has_toggl_token,v.projects&&(c.value=Object.entries(v.projects).map(([m,O])=>({label:m,code:O.code,type:O.type})))}catch(h){i.value=h.message}finally{n.value=!1}});function l(){u.value=!0,c.value.push({label:"",code:"",type:""})}function f(h){u.value=!0,c.value.splice(h,1)}async function d(){r.value=!0,s.value=!1,i.value=null;const h={};a.value.trim()&&(h.toggl_token=a.value.trim());const v={};for(const m of c.value){const O=m.label.trim();O&&(v[O]={code:m.code.trim(),type:m.type.trim()})}(u.value||Object.keys(v).length>0)&&(h.projects=v);try{await ir(t,"/user/me/preferences",{method:"PATCH",body:JSON.stringify(h)}),s.value=!0,a.value="",h.toggl_token&&(o.value=!0)}catch(m){i.value=m.message}finally{r.value=!1}}return(h,v)=>{const m=lo("RouterLink");return we(),Se("div",u_,[G("header",null,[v[2]||(v[2]=G("h1",null,"Settings",-1)),G("nav",null,[je(m,{to:"/"},{default:ao(()=>[...v[1]||(v[1]=[At("← Home",-1)])]),_:1})])]),n.value?(we(),Se("div",l_,"Loading…")):(we(),Se(Fe,{key:1},[G("section",f_,[v[4]||(v[4]=G("h2",null,"Toggl API token",-1)),o.value?(we(),Se("p",d_,"A token is already saved. Enter a new value below to replace it.")):(we(),Se("p",h_,[...v[3]||(v[3]=[At("No token saved yet. Find yours at ",-1),G("a",{href:"https://track.toggl.com/profile",target:"_blank",rel:"noopener"},"track.toggl.com/profile",-1),At(".",-1)])])),Hn(G("input",{type:"password","onUpdate:modelValue":v[0]||(v[0]=O=>a.value=O),placeholder:"Paste new token (leave blank to keep existing)",autocomplete:"off"},null,512),[[qn,a.value]])]),G("section",p_,[v[6]||(v[6]=G("h2",null,"Project mappings",-1)),v[7]||(v[7]=G("p",{class:"hint"},"Map Toggl project names to AFAS project codes and type item codes.",-1)),c.value.length?(we(),Se("table",g_,[v[5]||(v[5]=G("thead",null,[G("tr",null,[G("th",null,"Toggl project name"),G("th",null,"AFAS code"),G("th",null,"AFAS type"),G("th")])],-1)),G("tbody",null,[(we(!0),Se(Fe,null,Ud(c.value,(O,R)=>(we(),Se("tr",{key:R},[G("td",null,[Hn(G("input",{"onUpdate:modelValue":k=>O.label=k,placeholder:"My project"},null,8,m_),[[qn,O.label]])]),G("td",null,[Hn(G("input",{"onUpdate:modelValue":k=>O.code=k,placeholder:"PROJ001"},null,8,v_),[[qn,O.code]])]),G("td",null,[Hn(G("input",{"onUpdate:modelValue":k=>O.type=k,placeholder:"INTERNAL"},null,8,y_),[[qn,O.type]])]),G("td",null,[G("button",{class:"remove",onClick:k=>f(R)},"✕",8,w_)])]))),128))])])):Tn("",!0),G("button",{class:"secondary",onClick:l},"+ Add project")]),G("div",b_,[s.value?(we(),Se("span",__,"Saved.")):Tn("",!0),i.value?(we(),Se("span",T_,Tt(i.value),1)):Tn("",!0),G("button",{onClick:d,disabled:r.value},Tt(r.value?"Saving…":"Save"),9,S_)])],64))])}}},E_=na(O_,[["__scopeId","data-v-12068895"]]);function A_(e){const t=Zb({history:Cb(),routes:[{path:"/",component:c_,meta:{requiresAuth:!0}},{path:"/settings",component:E_,meta:{requiresAuth:!0}},{path:"/login/callback",component:vf}]});return t.beforeEach(Bw),t}let $i;try{const e=await fetch("/api/v1/config");if(!e.ok)throw new Error(`Server returned ${e.status}`);$i=await e.json()}catch(e){throw document.getElementById("loading").textContent=`Failed to load configuration: ${e.message}`,e}const k_=new Uw({issuer:$i.okta_issuer,clientId:$i.okta_client_id,redirectUri:window.location.origin+"/login/callback",scopes:["openid","profile","email"],pkce:!0}),P_=A_(),sa=zh(Gw);sa.use(Kw,{oktaAuth:k_});sa.use(P_);document.getElementById("loading").style.display="none";document.getElementById("app").style.display="";sa.mount("#app");
