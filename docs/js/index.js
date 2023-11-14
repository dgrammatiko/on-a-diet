const{isArray:e}=Array,t=[],n=()=>document.createRange(),s=(e,t,n)=>(e.set(t,n),n),r=(e,t,n,s="")=>({t:e,p:t,u:n,n:s}),l=e=>({s:e,t:null,n:null,d:t}),{setPrototypeOf:i}=Object;let o;var a=(e,t,s)=>(o||(o=n()),s?o.setStartAfter(e):o.setStartBefore(e),o.setEndAfter(t),o.deleteContents(),e);const c=({firstChild:e,lastChild:t})=>a(e,t,!0);let d=!1;const h=(e,t)=>d&&11===e.nodeType?1/t<0?t?c(e):e.lastChild:t?e.valueOf():e.firstChild:e;class p extends((e=>{function t(e){return i(e,new.target.prototype)}return t.prototype=e.prototype,t})(DocumentFragment)){#e;#t;constructor(e){super(e),this.#e=[...e.childNodes],this.#t=this.#e.length,d=!0}get firstChild(){return this.#e[0]}get lastChild(){return this.#e.at(-1)}get parentNode(){return this.#e[0].parentNode}replaceWith(e){c(this).replaceWith(e)}valueOf(){return this.childNodes.length!==this.#t&&this.append(...this.#e),this}}const u=(e,t)=>t.reduceRight(m,e),m=(e,t)=>e.childNodes[t];var f=e=>(n,s)=>{const{c:r,e:l,l:i}=e(n,s),o=r.cloneNode(!0);let a,c,d=l.length,h=d?l.slice(0):t;for(;d--;){const{t:e,p:n,u:r,n:i}=l[d],p=n===c?a:a=u(o,c=n),m=8===e?r():r;h[d]={v:m(p,s[d],i,t),u:m,t:p,n:i}}return((e,t)=>({n:e,d:t}))(1===i?o.firstChild:new p(o),h)};const g=/^(?:plaintext|script|style|textarea|title|xmp)$/i,b=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,y=/<([a-zA-Z0-9]+[a-zA-Z0-9:._-]*)([^>]*?)(\/?)>/g,$=/([^\s\\>"'=]+)\s*=\s*(['"]?)\x01/g,w=/[\x01\x02]/g;let v;const C=(t,n,r)=>{r=r.slice(1),v||(v=new WeakMap);const l=v.get(t)||s(v,t,{});let i=l[r];return i&&i[0]&&t.removeEventListener(r,...i),i=e(n)?n:[n,!1],l[r]=i,i[0]&&t.addEventListener(r,...i),n},x=(e,t,n)=>e[n]=t,k=(e,t,n)=>x(e,t,n.slice(1)),E=(e,t)=>("function"==typeof t?t(e):t.current=e,t),N=(e,t,n)=>(null==t?e.removeAttribute(n):e.setAttribute(n,t),t),S=(e,t,n)=>(e.toggleAttribute(n.slice(1),t),t),A=(e,n,s,r)=>n.length?((e,t,n,s,r)=>{const l=n.length;let i=t.length,o=l,a=0,c=0,d=null;for(;a<i||c<o;)if(i===a){const t=o<l?c?s(n[c-1],-0).nextSibling:s(n[o-c],0):r;for(;c<o;)e.insertBefore(s(n[c++],1),t)}else if(o===c)for(;a<i;)d&&d.has(t[a])||e.removeChild(s(t[a],-1)),a++;else if(t[a]===n[c])a++,c++;else if(t[i-1]===n[o-1])i--,o--;else if(t[a]===n[o-1]&&n[c]===t[i-1]){const r=s(t[--i],-1).nextSibling;e.insertBefore(s(n[c++],1),s(t[a++],-1).nextSibling),e.insertBefore(s(n[--o],1),r),t[i]=n[o]}else{if(!d){d=new Map;let e=c;for(;e<o;)d.set(n[e],e++)}if(d.has(t[a])){const r=d.get(t[a]);if(c<r&&r<o){let l=a,h=1;for(;++l<i&&l<o&&d.get(t[l])===r+h;)h++;if(h>r-c){const l=s(t[a],0);for(;c<r;)e.insertBefore(s(n[c++],1),l)}else e.replaceChild(s(n[c++],1),s(t[a++],-1))}else a++}else e.removeChild(s(t[a++],-1))}return n})(e.parentNode,r,n,h,e):(r.length&&a(r[0],r.at(-1),!1),t),j=new Map([["aria",(e,t)=>{for(const n in t){const s=t[n],r="role"===n?n:`aria-${n}`;null==s?e.removeAttribute(r):e.setAttribute(r,s)}return t}],["class",(e,t)=>x(e,t,"className")],["data",(e,t)=>{const{dataset:n}=e;for(const e in t)null==t[e]?delete n[e]:n[e]=t[e];return t}],["ref",E],["style",(e,t)=>x(e.style,t,"cssText")]]),I=(e,t,n)=>{switch(t[0]){case".":return k;case"?":return S;case"@":return C;default:return n||"ownerSVGElement"in e?"ref"===t?E:N:j.get(t)||(t in e?x:N)}},O=(e,t)=>(e.textContent=null==t?"":t,t);function W(e,t){const n=this.n||(this.n=e);switch(typeof t){case"string":case"number":case"boolean":n!==e&&n.replaceWith(this.n=e),this.n.data=t;break;case"object":case"undefined":null==t?(this.n=e).data="":this.n=t.valueOf(),n.replaceWith(this.n)}return t}let T,B,L=document.createElement("template");var M=(e,t)=>{if(t)return T||(T=document.createElementNS("http://www.w3.org/2000/svg","svg"),B=n(),B.selectNodeContents(T)),B.createContextualFragment(e);L.innerHTML=e;const{content:s}=L;return L=L.cloneNode(!1),s};const V=e=>{const t=[];let n;for(;n=e.parentNode;)t.push(t.indexOf.call(n.childNodes,e)),e=n;return t},Z=()=>W.bind({n:null}),D=()=>A,J=(n,l,i)=>{const o=M(((e,t,n)=>{let s=0;return e.join("").trim().replace(y,((e,t,s,r)=>`<${t}${s.replace($,"=$2$1").trimEnd()}${r?n||b.test(t)?" /":`></${t}`:""}>`)).replace(w,(e=>""===e?`\x3c!--${t+s++}--\x3e`:t+s++))})(n,R,i),i);let a=!1,c=t;const{length:d}=n;if(d>1){const t=document.createTreeWalker(o,129),n=[];let s=0,h=`${R}${s++}`;for(c=[];s<d;){const o=t.nextNode();if(8===o.nodeType){if(o.data===h){let t=e(l[s-1])?D:Z;t===Z?n.push(o):a=!0,c.push(r(8,V(o),t)),h=`${R}${s++}`}}else{let e;for(;o.hasAttribute(h);){e||(e=V(o));const t=o.getAttribute(h);c.push(r(2,e,I(o,t,i),t)),o.removeAttribute(h),h=`${R}${s++}`}g.test(o.localName)&&o.textContent.trim()===`\x3c!--${h}--\x3e`&&(c.push(r(3,e||V(o),O)),h=`${R}${s++}`)}}for(s=0;s<n.length;s++)n[s].replaceWith(document.createTextNode(""))}const h=o.childNodes.length;return s(_,n,((e,t,n)=>({c:e,e:t,l:n}))(o,c,1===h&&a?0:h))},_=new WeakMap,R="isµ";var z=e=>(t,n)=>_.get(t)||J(t,n,e);const P=f(z(!1)),U=f(z(!0)),F=(e,{s:n,t:s,v:r})=>{r.length&&e.s===t&&(e.s=[]);const l=G(e,r);if(e.t!==s){const{n:t,d:l}=(n?U:P)(s,r);e.t=s,e.n=t,e.d=l}else{const{d:t}=e;for(let e=0;e<l;e++){const n=r[e],s=t[e],{v:l}=s;if(n!==l){const{u:e,t:t,n:r}=s;s.v=e(t,n,r,l)}}}return e.n},G=({s:n},s)=>{const{length:r}=s;for(let i=0;i<r;i++){const r=s[i];r instanceof H?s[i]=F(n[i]||(n[i]=l(t)),r):e(r)?G(n[i]||(n[i]=l([])),r):n[i]=null}return r<n.length&&n.splice(r),r};class H{constructor(e,t,n){this.s=e,this.t=t,this.v=n}}const q=new WeakMap;
/*! (c) Andrea Giammarchi - MIT */
const K=(e=>(t,...n)=>new H(e,t,n))(!1),Q=(e,t)=>{const n=e.name.toUpperCase(),s=t.name.toUpperCase();let r=0;return n>s?r=1:n<s&&(r=-1),r},X=(e,t)=>{e.store={component:[],plugin:[],module:[],template:[]},t.j4.forEach((t=>{t.locked&&1===t.locked||0===t.protected&&e.store[t.type].push({name:t.name,folder:t.folder,clientId:t.client_id,enabled:t.enabled})})),e.store.component=e.store.component.sort(Q),e.store.plugin=e.store.plugin.sort(Q),e.store.module=e.store.module.sort(Q),e.store.template=e.store.template.sort(Q)},Y=async e=>{const{configure:t,BlobReader:n,BlobWriter:s,ZipReader:r,ZipWriter:l}=await import("./zip.pKeXPYpe.js");let i;t({workerScriptsPath:"/js/"}),e.writer=new s("application/zip"),e.ZipWriter=new l(e.writer);const o=[],a={},c=e.data.files;Object.keys(c).map((e=>a[e]=c[e]));const d=ee(e.store);a["script.php"]=e.data.files["script.php"].replace("/**{{replacement}}**/",d),Object.keys(a).map((t=>o.push((async(e,t,n,s)=>{const r=new Blob([t],{type:"text/plain"});await n.ZipWriter.add(e,new s(r))})(`${t}`,a[t],e,n)))),await Promise.all(o);const h=new r(new n(await e.ZipWriter.close()));try{await h.close(),i=URL.createObjectURL(await e.writer.getData()),e.ZipWriter=null;let t=document.createElement("a");t.href=i,t.download="com_remove_joomla_fat.zip",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch(e){alert(e)}},ee=e=>{let t="$useless = array(";return["component","plugin","module","template"].forEach((n=>{e[n].forEach((e=>{t+=`\n      '${e.name}' => array(`,"component"===n&&(t+="'type' => 'component',"),"module"===n&&(t+=`'type' => 'module', 'client_id' => ${parseInt(e.clientId,10)},`),"plugin"===n&&(t+=`'type' => 'plugin', 'folder' => '${e.folder}'`),"template"===n&&(t+=`'type' => '"template"', 'client_id' => ${parseInt(e.clientId,10)},`),t+=`'enabled' => ${e.enabled}`,t+="),"}))})),t+="\n  );",t};class te extends HTMLElement{constructor(){super(),this.jVersion=4,this.store={},this.renderEl=this.renderEl.bind(this),this.updState=this.updState.bind(this),this.onClick=this.onClick.bind(this),this.onCreate=this.onCreate.bind(this),this.onSelectChange=this.onSelectChange.bind(this)}connectedCallback(){let e,t;const n=document.getElementById("data"),s=document.getElementById("db");if(!n||!s)throw new Error("Data is missing...");try{e=JSON.parse(n.innerText)}catch(e){throw new Error("Malformed JSON...")}try{t=JSON.parse(s.innerText)}catch(e){throw new Error("Malformed JSON...")}if(!e||!t)throw new Error("Data is missing...");this.data={files:e.files,data:t},X(this,this.data.data,this.jVersion),this.renderEl()}renderEl(){((e,n)=>{const r=q.get(e)||s(q,e,l(t));r.n!==F(r,"function"==typeof n?n():n)&&e.replaceChildren(r.n)})(this,K`<div><details><summary class="h1">Online Joomla's fat-remover plugin creator</summary><div><p>A simple (client side exclusive) plugin generator. The plugin upon installation will disable (hide) all the extensions you have disabled in the given list. The plugin will uninstall itself after that. No extension is uninstalled they are just disabled.</p></div></details><hr><label>Select your Joomla version <select value="${this.jVersion}" oninput="${this.onSelectChange}">${[4,3].map((e=>K`<option value="${e}" .selected="${this.jVersion===e}">Version ${e}.x</option>`))}</select></label></div><hr>${["component","plugin","module","template"].map((e=>K`<details><summary class="h1">List of Joomla's ${e}s:</summary><table class="rwd-table"><thead><tr class="table100-head"><th class="column1">Name</th>${"plugin"===e?K`<th class="column2">Type</th>`:"module"===e||"template"===e?K`<th class="column2">Client</th>`:""}<th class="column3">State</th></tr></thead><tbody>${this.store[e].map(((t,n)=>K`<tr tabindex="0" onclick="${this.onClick}" onkeydown="${this.onClick}" index="${n}" type="${e}" prop="enabled" value="${1===parseInt(t.enabled,10)?0:1}"><td class="column1"><strong>${t.name.toLowerCase()}</strong></td>${"plugin"===e?K`<td class="column2">${t.folder}</td>`:"module"===e||"template"===e?K`<td class="column2">${1!==parseInt(t.clientId,10)?"site":"admin"}</td>`:""}<td class="column2"><div class="inputGroup"><input tabindex="-1" id="${t.name+t.clientId}" name="option1" type="checkbox" value="${parseInt(t.enabled,10)}" checked="${1===parseInt(t.enabled,10)||null}"> <label for="${t.name+t.clientId}">${1===parseInt(t.enabled,10)?"Enabled":"Disabled"}</label></div></td></tr>`))}</tbody></table></details>`))}<hr><button onclick="${this.onCreate}">Computer, build me the plugin...</button>`)}updState(e,t,n,s){this.store[e]&&this.store[e].length&&this.store[e][s]&&(this.store[e][s][t]=parseInt(n,10))}onSelectChange(e){const t=e.target;this.jVersion=parseInt(t.options[t.selectedIndex].value,10),X(this,this.data.data,this.jVersion),this.renderEl()}onClick(e){if(e.key&&[32,13].indexOf(e.keyCode)<0)return;let t=e.target;"tr"!==t.tagName.toLowerCase()&&(t=t.closest("tr")),this.updState(t.getAttribute("type"),t.getAttribute("prop"),t.getAttribute("value"),t.getAttribute("index")),e.preventDefault(),e.stopPropagation(),this.renderEl()}async onCreate(e){e.preventDefault,Y(this)}}customElements.define("create-joomla-fat-free-plugin",te);
