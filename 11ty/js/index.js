const{isArray:e}=Array,{getPrototypeOf:t,getOwnPropertyDescriptor:n}=Object,s=[],r=()=>document.createRange(),l=(e,t,n)=>(e.set(t,n),n),{setPrototypeOf:i}=Object;let a;var o=(e,t,n)=>(a||(a=r()),n?a.setStartAfter(e):a.setStartBefore(e),a.setEndAfter(t),a.deleteContents(),e);const c=({firstChild:e,lastChild:t},n)=>o(e,t,n);let d=!1;const h=(e,t)=>d&&11===e.nodeType?1/t<0?t?c(e,!0):e.lastChild:t?e.valueOf():e.firstChild:e,u=e=>document.createComment(e);class p extends((e=>{function t(e){return i(e,new.target.prototype)}return t.prototype=e.prototype,t})(DocumentFragment)){#e=u("<>");#t=u("</>");#n=s;constructor(e){super(e),this.replaceChildren(this.#e,...e.childNodes,this.#t),d=!0}get firstChild(){return this.#e}get lastChild(){return this.#t}get parentNode(){return this.#e.parentNode}remove(){c(this,!1)}replaceWith(e){c(this,!0).replaceWith(e)}valueOf(){let{firstChild:e,lastChild:t,parentNode:n}=this;if(n===this)this.#n===s&&(this.#n=[...this.childNodes]);else{if(n)for(this.#n=[e];e!==t;)this.#n.push(e=e.nextSibling);this.replaceChildren(...this.#n)}return this}}const m=(e,t,n)=>e.setAttribute(t,n),f=(e,t)=>e.removeAttribute(t);let g;const b=(t,n,s)=>{s=s.slice(1),g||(g=new WeakMap);const r=g.get(t)||l(g,t,{});let i=r[s];return i&&i[0]&&t.removeEventListener(s,...i),i=e(n)?n:[n,!1],r[s]=i,i[0]&&t.addEventListener(s,...i),n},y=(e,t)=>{const{t:n,n:s}=e;let r=!1;switch(typeof t){case"object":if(null!==t){(s||n).replaceWith(e.n=t.valueOf());break}case"undefined":r=!0;default:n.data=r?"":t,s&&(e.n=null,s.replaceWith(n))}return t},C=(e,t,n)=>e[n]=t,$=(e,t,n)=>C(e,t,n.slice(1)),w=(e,t,n)=>null==t?(f(e,n),t):C(e,t,n),v=(e,t)=>("function"==typeof t?t(e):t.current=e,t),x=(e,t,n)=>(null==t?f(e,n):m(e,n,t),t),k=(e,t,n)=>(e.toggleAttribute(n.slice(1),t),t),E=(e,t,n)=>{const{length:r}=t;if(e.data=`[${r}]`,r)return((e,t,n,s,r)=>{const l=n.length;let i=t.length,a=l,o=0,c=0,d=null;for(;o<i||c<a;)if(i===o){const t=a<l?c?s(n[c-1],-0).nextSibling:s(n[a-c],0):r;for(;c<a;)e.insertBefore(s(n[c++],1),t)}else if(a===c)for(;o<i;)d&&d.has(t[o])||e.removeChild(s(t[o],-1)),o++;else if(t[o]===n[c])o++,c++;else if(t[i-1]===n[a-1])i--,a--;else if(t[o]===n[a-1]&&n[c]===t[i-1]){const r=s(t[--i],-1).nextSibling;e.insertBefore(s(n[c++],1),s(t[o++],-1).nextSibling),e.insertBefore(s(n[--a],1),r),t[i]=n[a]}else{if(!d){d=new Map;let e=c;for(;e<a;)d.set(n[e],e++)}if(d.has(t[o])){const r=d.get(t[o]);if(c<r&&r<a){let l=o,h=1;for(;++l<i&&l<a&&d.get(t[l])===r+h;)h++;if(h>r-c){const l=s(t[o],0);for(;c<r;)e.insertBefore(s(n[c++],1),l)}else e.replaceChild(s(n[c++],1),s(t[o++],-1))}else o++}else e.removeChild(s(t[o++],-1))}return n})(e.parentNode,n,t,h,e);switch(n.length){case 1:n[0].remove();case 0:break;default:o(h(n[0],0),h(n.at(-1),-0),!1)}return s},N=new Map([["aria",(e,t)=>{for(const n in t){const s=t[n],r="role"===n?n:`aria-${n}`;null==s?f(e,r):m(e,r,s)}return t}],["class",(e,t)=>w(e,t,null==t?"class":"className")],["data",(e,t)=>{const{dataset:n}=e;for(const e in t)null==t[e]?delete n[e]:n[e]=t[e];return t}],["ref",v],["style",(e,t)=>null==t?w(e,t,"style"):C(e.style,t,"cssText")]]),S=(e,s,r)=>{switch(s[0]){case".":return $;case"?":return k;case"@":return b;default:return r||"ownerSVGElement"in e?"ref"===s?v:x:N.get(s)||(s in e?s.startsWith("on")?C:((e,s)=>{let r;do{r=n(e,s)}while(!r&&(e=t(e)));return r})(e,s)?.set?w:x:x)}},O=(e,t)=>(e.textContent=null==t?"":t,t),j=(e,t,n)=>({a:e,b:t,c:n}),I=()=>j(null,null,s),A=(e,t)=>t.reduceRight(W,e),W=(e,t)=>e.childNodes[t];var T=e=>(t,n)=>{const{a:r,b:l,c:i}=e(t,n),a=document.importNode(r,!0);let o=s;if(l!==s){o=[];for(let e,t,n=0;n<l.length;n++){const{a:r,b:i,c:p}=l[n],m=r===t?e:e=A(a,t=r);o[n]=(c=i,d=m,h=p,u=i===E?[]:i===y?I():null,{v:s,u:c,t:d,n:h,c:u})}}var c,d,h,u;return((e,t)=>({b:e,c:t}))(i?a.firstChild:new p(a),o)};const M=/^(?:plaintext|script|style|textarea|title|xmp)$/i,B=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,D=/<([a-zA-Z0-9]+[a-zA-Z0-9:._-]*)([^>]*?)(\/?)>/g,L=/([^\s\\>"'=]+)\s*=\s*(['"]?)\x01/g,V=/[\x01\x02]/g;let Z,J,_=document.createElement("template");var P=(e,t)=>{if(t)return Z||(Z=document.createElementNS("http://www.w3.org/2000/svg","svg"),J=r(),J.selectNodeContents(Z)),J.createContextualFragment(e);_.innerHTML=e;const{content:n}=_;return _=_.cloneNode(!1),n};const R=e=>{const t=[];let n;for(;n=e.parentNode;)t.push(t.indexOf.call(n.childNodes,e)),e=n;return t},z=()=>document.createTextNode(""),U=(t,n,r)=>{const i=P(((e,t,n)=>{let s=0;return e.join("").trim().replace(D,((e,t,s,r)=>`<${t}${s.replace(L,"=$2$1").trimEnd()}${r?n||B.test(t)?" /":`></${t}`:""}>`)).replace(V,(e=>""===e?`\x3c!--${t+s++}--\x3e`:t+s++))})(t,G,r),r),{length:a}=t;let o=s;if(a>1){const t=[],s=document.createTreeWalker(i,129);let l=0,c=`${G}${l++}`;for(o=[];l<a;){const i=s.nextNode();if(8===i.nodeType){if(i.data===c){const s=e(n[l-1])?E:y;s===y&&t.push(i),o.push(j(R(i),s,null)),c=`${G}${l++}`}}else{let e;for(;i.hasAttribute(c);){e||(e=R(i));const t=i.getAttribute(c);o.push(j(e,S(i,t,r),t)),f(i,c),c=`${G}${l++}`}!r&&M.test(i.localName)&&i.textContent.trim()===`\x3c!--${c}--\x3e`&&(o.push(j(e||R(i),O,null)),c=`${G}${l++}`)}}for(l=0;l<t.length;l++)t[l].replaceWith(z())}const{childNodes:c}=i;let{length:d}=c;return d<1?(d=1,i.appendChild(z())):1===d&&1!==a&&1!==c[0].nodeType&&(d=0),l(F,t,j(i,o,1===d))},F=new WeakMap,G="isµ";var H=e=>(t,n)=>F.get(t)||U(t,n,e);const q=T(H(!1)),K=T(H(!0)),Q=(e,{s:t,t:n,v:s})=>{if(e.a!==n){const{b:r,c:l}=(t?K:q)(n,s);e.a=n,e.b=r,e.c=l}for(let{c:t}=e,n=0;n<t.length;n++){const e=s[n],r=t[n];switch(r.u){case E:r.v=E(r.t,X(r.c,e),r.v);break;case y:const t=e instanceof Y?Q(r.c||(r.c=I()),e):(r.c=null,e);t!==r.v&&(r.v=y(r,t));break;default:e!==r.v&&(r.v=r.u(r.t,e,r.n,r.v))}}return e.b},X=(e,t)=>{let n=0,{length:s}=t;for(s<e.length&&e.splice(s);n<s;n++){const s=t[n];s instanceof Y?t[n]=Q(e[n]||(e[n]=I()),s):e[n]=null}return t};class Y{constructor(e,t,n){this.s=e,this.t=t,this.v=n}toDOM(e=I()){return Q(e,this)}}const ee=new WeakMap;
/*! (c) Andrea Giammarchi - MIT */
const te=(e=>(t,...n)=>new Y(e,t,n))(!1),ne=(e,t)=>{const n=e.name.toUpperCase(),s=t.name.toUpperCase();let r=0;return n>s?r=1:n<s&&(r=-1),r},se=(e,t)=>{e.store={component:[],plugin:[],module:[],template:[]},t.j4.forEach((t=>{t.locked&&1===t.locked||0===t.protected&&e.store[t.type].push({name:t.name,folder:t.folder,clientId:t.client_id,enabled:t.enabled})})),e.store.component=e.store.component.sort(ne),e.store.plugin=e.store.plugin.sort(ne),e.store.module=e.store.module.sort(ne),e.store.template=e.store.template.sort(ne)},re=async e=>{const{configure:t,BlobReader:n,BlobWriter:s,ZipReader:r,ZipWriter:l}=await import("./zip.B0G3XpsP.js");let i;t({workerScriptsPath:"/js/"}),e.writer=new s("application/zip"),e.ZipWriter=new l(e.writer);const a=[],o={},c=e.data.files;Object.keys(c).map((e=>o[e]=c[e]));const d=le(e.store);o["script.php"]=e.data.files["script.php"].replace("/**{{replacement}}**/",d),Object.keys(o).map((t=>a.push((async(e,t,n,s)=>{const r=new Blob([t],{type:"text/plain"});await n.ZipWriter.add(e,new s(r))})(`${t}`,o[t],e,n)))),await Promise.all(a);const h=new r(new n(await e.ZipWriter.close()));try{await h.close(),i=URL.createObjectURL(await e.writer.getData()),e.ZipWriter=null;let t=document.createElement("a");t.href=i,t.download="com_remove_joomla_fat.zip",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch(e){alert(e)}},le=e=>{let t="$useless = array(";return["component","plugin","module","template"].forEach((n=>{e[n].forEach((e=>{t+=`\n      '${e.name}' => array(`,"component"===n&&(t+="'type' => 'component',"),"module"===n&&(t+=`'type' => 'module', 'client_id' => ${parseInt(e.clientId,10)},`),"plugin"===n&&(t+=`'type' => 'plugin', 'folder' => '${e.folder}'`),"template"===n&&(t+=`'type' => '"template"', 'client_id' => ${parseInt(e.clientId,10)},`),t+=`'enabled' => ${e.enabled}`,t+="),"}))})),t+="\n  );",t};class ie extends HTMLElement{constructor(){super(),this.jVersion=4,this.store={},this.renderEl=this.renderEl.bind(this),this.updState=this.updState.bind(this),this.onClick=this.onClick.bind(this),this.onCreate=this.onCreate.bind(this),this.onSelectChange=this.onSelectChange.bind(this)}connectedCallback(){let e,t;const n=document.getElementById("data"),s=document.getElementById("db");if(!n||!s)throw new Error("Data is missing...");try{e=JSON.parse(n.innerText)}catch(e){throw new Error("Malformed JSON...")}try{t=JSON.parse(s.innerText)}catch(e){throw new Error("Malformed JSON...")}if(!e||!t)throw new Error("Data is missing...");this.data={files:e.files,data:t},se(this,this.data.data,this.jVersion),this.renderEl()}renderEl(){((e,t)=>{const n=ee.get(e)||l(ee,e,I()),{b:s}=n;s!==("function"==typeof t?t():t).toDOM(n)&&e.replaceChildren(n.b.valueOf())})(this,te`<div><details><summary class="h1">Online Joomla's fat-remover plugin creator</summary><div><p>A simple (client side exclusive) plugin generator. The plugin upon installation will disable (hide) all the extensions you have disabled in the given list. The plugin will uninstall itself after that. No extension is uninstalled they are just disabled.</p></div></details><hr><label>Select your Joomla version <select value="${this.jVersion}" oninput="${this.onSelectChange}">${[4,3].map((e=>te`<option value="${e}" .selected="${this.jVersion===e}">Version ${e}.x</option>`))}</select></label></div><hr>${["component","plugin","module","template"].map((e=>te`<details><summary class="h1">List of Joomla's ${e}s:</summary><table class="rwd-table"><thead><tr class="table100-head"><th class="column1">Name</th>${"plugin"===e?te`<th class="column2">Type</th>`:"module"===e||"template"===e?te`<th class="column2">Client</th>`:""}<th class="column3">State</th></tr></thead><tbody>${this.store[e].map(((t,n)=>te`<tr tabindex="0" onclick="${this.onClick}" onkeydown="${this.onClick}" index="${n}" type="${e}" prop="enabled" value="${1===parseInt(t.enabled,10)?0:1}"><td class="column1"><strong>${t.name.toLowerCase()}</strong></td>${"plugin"===e?te`<td class="column2">${t.folder}</td>`:"module"===e||"template"===e?te`<td class="column2">${1!==parseInt(t.clientId,10)?"site":"admin"}</td>`:""}<td class="column2"><div class="inputGroup"><input tabindex="-1" id="${t.name+t.clientId}" name="option1" type="checkbox" value="${parseInt(t.enabled,10)}" checked="${1===parseInt(t.enabled,10)||null}"> <label for="${t.name+t.clientId}">${1===parseInt(t.enabled,10)?"Enabled":"Disabled"}</label></div></td></tr>`))}</tbody></table></details>`))}<hr><button onclick="${this.onCreate}">Computer, build me the plugin...</button>`)}updState(e,t,n,s){this.store[e]&&this.store[e].length&&this.store[e][s]&&(this.store[e][s][t]=parseInt(n,10))}onSelectChange(e){const t=e.target;this.jVersion=parseInt(t.options[t.selectedIndex].value,10),se(this,this.data.data,this.jVersion),this.renderEl()}onClick(e){if(e.key&&[32,13].indexOf(e.keyCode)<0)return;let t=e.target;"tr"!==t.tagName.toLowerCase()&&(t=t.closest("tr")),this.updState(t.getAttribute("type"),t.getAttribute("prop"),t.getAttribute("value"),t.getAttribute("index")),e.preventDefault(),e.stopPropagation(),this.renderEl()}async onCreate(e){e.preventDefault,re(this)}}customElements.define("create-joomla-fat-free-plugin",ie);
