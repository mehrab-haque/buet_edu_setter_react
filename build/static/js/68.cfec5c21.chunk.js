/*! For license information please see 68.cfec5c21.chunk.js.LICENSE.txt */
(this.webpackJsonpbuet_edu_setter=this.webpackJsonpbuet_edu_setter||[]).push([[68],{370:function(e,n,t){(function(n){var t=function(e){var n=/\blang(?:uage)?-([\w-]+)\b/i,t=0,r={manual:e.Prism&&e.Prism.manual,disableWorkerMessageHandler:e.Prism&&e.Prism.disableWorkerMessageHandler,util:{encode:function e(n){return n instanceof a?new a(n.type,e(n.content),n.alias):Array.isArray(n)?n.map(e):n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function e(n,t){var a,i;switch(t=t||{},r.util.type(n)){case"Object":if(i=r.util.objId(n),t[i])return t[i];for(var l in a={},t[i]=a,n)n.hasOwnProperty(l)&&(a[l]=e(n[l],t));return a;case"Array":return i=r.util.objId(n),t[i]?t[i]:(a=[],t[i]=a,n.forEach((function(n,r){a[r]=e(n,t)})),a);default:return n}},getLanguage:function(e){for(;e&&!n.test(e.className);)e=e.parentElement;return e?(e.className.match(n)||[,"none"])[1].toLowerCase():"none"},currentScript:function(){if("undefined"===typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(r){var e=(/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(r.stack)||[])[1];if(e){var n=document.getElementsByTagName("script");for(var t in n)if(n[t].src==e)return n[t]}return null}},isActive:function(e,n,t){for(var r="no-"+n;e;){var a=e.classList;if(a.contains(n))return!0;if(a.contains(r))return!1;e=e.parentElement}return!!t}},languages:{extend:function(e,n){var t=r.util.clone(r.languages[e]);for(var a in n)t[a]=n[a];return t},insertBefore:function(e,n,t,a){var i=(a=a||r.languages)[e],l={};for(var o in i)if(i.hasOwnProperty(o)){if(o==n)for(var s in t)t.hasOwnProperty(s)&&(l[s]=t[s]);t.hasOwnProperty(o)||(l[o]=i[o])}var u=a[e];return a[e]=l,r.languages.DFS(r.languages,(function(n,t){t===u&&n!=e&&(this[n]=l)})),l},DFS:function e(n,t,a,i){i=i||{};var l=r.util.objId;for(var o in n)if(n.hasOwnProperty(o)){t.call(n,o,n[o],a||o);var s=n[o],u=r.util.type(s);"Object"!==u||i[l(s)]?"Array"!==u||i[l(s)]||(i[l(s)]=!0,e(s,t,o,i)):(i[l(s)]=!0,e(s,t,null,i))}}},plugins:{},highlightAll:function(e,n){r.highlightAllUnder(document,e,n)},highlightAllUnder:function(e,n,t){var a={callback:t,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};r.hooks.run("before-highlightall",a),a.elements=Array.prototype.slice.apply(a.container.querySelectorAll(a.selector)),r.hooks.run("before-all-elements-highlight",a);for(var i,l=0;i=a.elements[l++];)r.highlightElement(i,!0===n,a.callback)},highlightElement:function(t,a,i){var l=r.util.getLanguage(t),o=r.languages[l];t.className=t.className.replace(n,"").replace(/\s+/g," ")+" language-"+l;var s=t.parentElement;s&&"pre"===s.nodeName.toLowerCase()&&(s.className=s.className.replace(n,"").replace(/\s+/g," ")+" language-"+l);var u={element:t,language:l,grammar:o,code:t.textContent};function c(e){u.highlightedCode=e,r.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r.hooks.run("after-highlight",u),r.hooks.run("complete",u),i&&i.call(u.element)}if(r.hooks.run("before-sanity-check",u),!u.code)return r.hooks.run("complete",u),void(i&&i.call(u.element));if(r.hooks.run("before-highlight",u),u.grammar)if(a&&e.Worker){var g=new Worker(r.filename);g.onmessage=function(e){c(e.data)},g.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else c(r.highlight(u.code,u.grammar,u.language));else c(r.util.encode(u.code))},highlight:function(e,n,t){var i={code:e,grammar:n,language:t};return r.hooks.run("before-tokenize",i),i.tokens=r.tokenize(i.code,i.grammar),r.hooks.run("after-tokenize",i),a.stringify(r.util.encode(i.tokens),i.language)},tokenize:function(e,n){var t=n.rest;if(t){for(var r in t)n[r]=t[r];delete n.rest}var a=new l;return o(a,a.head,e),i(e,a,n,a.head,0),function(e){var n=[],t=e.head.next;for(;t!==e.tail;)n.push(t.value),t=t.next;return n}(a)},hooks:{all:{},add:function(e,n){var t=r.hooks.all;t[e]=t[e]||[],t[e].push(n)},run:function(e,n){var t=r.hooks.all[e];if(t&&t.length)for(var a,i=0;a=t[i++];)a(n)}},Token:a};function a(e,n,t,r){this.type=e,this.content=n,this.alias=t,this.length=0|(r||"").length}function i(e,n,t,l,u,c){for(var g in t)if(t.hasOwnProperty(g)&&t[g]){var h=t[g];h=Array.isArray(h)?h:[h];for(var f=0;f<h.length;++f){if(c&&c.cause==g+","+f)return;var d=h[f],p=d.inside,v=!!d.lookbehind,m=!!d.greedy,y=0,k=d.alias;if(m&&!d.pattern.global){var b=d.pattern.toString().match(/[imsuy]*$/)[0];d.pattern=RegExp(d.pattern.source,b+"g")}for(var w=d.pattern||d,x=l.next,A=u;x!==n.tail&&!(c&&A>=c.reach);A+=x.value.length,x=x.next){var S=x.value;if(n.length>e.length)return;if(!(S instanceof a)){var E=1;if(m&&x!=n.tail.prev){if(w.lastIndex=A,!(_=w.exec(e)))break;var O=_.index+(v&&_[1]?_[1].length:0),P=_.index+_[0].length,L=A;for(L+=x.value.length;O>=L;)L+=(x=x.next).value.length;if(A=L-=x.value.length,x.value instanceof a)continue;for(var N=x;N!==n.tail&&(L<P||"string"===typeof N.value);N=N.next)E++,L+=N.value.length;E--,S=e.slice(A,L),_.index-=A}else{w.lastIndex=0;var _=w.exec(S)}if(_){v&&(y=_[1]?_[1].length:0);O=_.index+y;var j=_[0].slice(y),C=(P=O+j.length,S.slice(0,O)),M=S.slice(P),W=A+S.length;c&&W>c.reach&&(c.reach=W);var I=x.prev;C&&(I=o(n,I,C),A+=C.length),s(n,I,E),x=o(n,I,new a(g,p?r.tokenize(j,p):j,k,j)),M&&o(n,x,M),E>1&&i(e,n,t,x.prev,A,{cause:g+","+f,reach:W})}}}}}}function l(){var e={value:null,prev:null,next:null},n={value:null,prev:e,next:null};e.next=n,this.head=e,this.tail=n,this.length=0}function o(e,n,t){var r=n.next,a={value:t,prev:n,next:r};return n.next=a,r.prev=a,e.length++,a}function s(e,n,t){for(var r=n.next,a=0;a<t&&r!==e.tail;a++)r=r.next;n.next=r,r.prev=n,e.length-=a}if(e.Prism=r,a.stringify=function e(n,t){if("string"==typeof n)return n;if(Array.isArray(n)){var a="";return n.forEach((function(n){a+=e(n,t)})),a}var i={type:n.type,content:e(n.content,t),tag:"span",classes:["token",n.type],attributes:{},language:t},l=n.alias;l&&(Array.isArray(l)?Array.prototype.push.apply(i.classes,l):i.classes.push(l)),r.hooks.run("wrap",i);var o="";for(var s in i.attributes)o+=" "+s+'="'+(i.attributes[s]||"").replace(/"/g,"&quot;")+'"';return"<"+i.tag+' class="'+i.classes.join(" ")+'"'+o+">"+i.content+"</"+i.tag+">"},!e.document)return e.addEventListener?(r.disableWorkerMessageHandler||e.addEventListener("message",(function(n){var t=JSON.parse(n.data),a=t.language,i=t.code,l=t.immediateClose;e.postMessage(r.highlight(i,r.languages[a],a)),l&&e.close()}),!1),r):r;var u=r.util.currentScript();function c(){r.manual||r.highlightAll()}if(u&&(r.filename=u.src,u.hasAttribute("data-manual")&&(r.manual=!0)),!r.manual){var g=document.readyState;"loading"===g||"interactive"===g&&u&&u.defer?document.addEventListener("DOMContentLoaded",c):window.requestAnimationFrame?window.requestAnimationFrame(c):window.setTimeout(c,16)}return r}("undefined"!==typeof window?window:"undefined"!==typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{});e.exports&&(e.exports=t),"undefined"!==typeof n&&(n.Prism=t)}).call(this,t(31))}}]);