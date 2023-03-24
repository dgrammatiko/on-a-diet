class e extends Map{set(e,t){return super.set(e,t),t}}class t extends WeakMap{set(e,t){return super.set(e,t),t}}
/*! (c) Andrea Giammarchi - ISC */const n=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,r=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/?)>/g,s=/([^\s\\>"'=]+)\s*=\s*(['"]?)\x01/g,l=/[\x01\x02]/g;const a=(e,t)=>111===e.nodeType?1/t<0?t?(({firstChild:e,lastChild:t})=>{const n=document.createRange();return n.setStartAfter(e),n.setEndAfter(t),n.deleteContents(),e})(e):e.lastChild:t?e.valueOf():e.firstChild:e,{isArray:i}=Array,o=e=>null==e?e:e.valueOf(),c=(e,t)=>{let n,r,s=t.slice(2);return!(t in e)&&(r=t.toLowerCase())in e&&(s=r.slice(2)),t=>{const r=i(t)?t:[t,!1];n!==r[0]&&(n&&e.removeEventListener(s,n,r[1]),(n=r[0])&&e.addEventListener(s,n,r[1]))}};const{isArray:d,prototype:u}=Array,{indexOf:p}=u,{createDocumentFragment:h,createElement:m,createElementNS:f,createTextNode:b,createTreeWalker:g,importNode:y}=new Proxy(document,{get:(e,t)=>e[t].bind(e)});let w;const $=(e,t)=>t?(e=>{w||(w=f("http://www.w3.org/2000/svg","svg")),w.innerHTML=e;const t=h();return t.append(...w.childNodes),t})(e):(e=>{const t=m("template");return t.innerHTML=e,t.content})(e),v=({childNodes:e},t)=>e[t],C=(e,t,n)=>((e,t,n,r,s)=>{const l=n.length;let a=t.length,i=l,o=0,c=0,d=null;for(;o<a||c<i;)if(a===o){const t=i<l?c?r(n[c-1],-0).nextSibling:r(n[i-c],0):s;for(;c<i;)e.insertBefore(r(n[c++],1),t)}else if(i===c)for(;o<a;)d&&d.has(t[o])||e.removeChild(r(t[o],-1)),o++;else if(t[o]===n[c])o++,c++;else if(t[a-1]===n[i-1])a--,i--;else if(t[o]===n[i-1]&&n[c]===t[a-1]){const s=r(t[--a],-1).nextSibling;e.insertBefore(r(n[c++],1),r(t[o++],-1).nextSibling),e.insertBefore(r(n[--i],1),s),t[a]=n[i]}else{if(!d){d=new Map;let e=c;for(;e<i;)d.set(n[e],e++)}if(d.has(t[o])){const s=d.get(t[o]);if(c<s&&s<i){let l=o,u=1;for(;++l<a&&l<i&&d.get(t[l])===s+u;)u++;if(u>s-c){const l=r(t[o],0);for(;c<s;)e.insertBefore(r(n[c++],1),l)}else e.replaceChild(r(n[c++],1),r(t[o++],-1))}else o++}else e.removeChild(r(t[o++],-1))}return n})(e.parentNode,t,n,a,e),x=(e,t)=>{switch(t[0]){case"?":return((e,t,n)=>r=>{const s=!!o(r);n!==s&&((n=s)?e.setAttribute(t,""):e.removeAttribute(t))})(e,t.slice(1),!1);case".":return((e,t)=>"dataset"===t?(({dataset:e})=>t=>{for(const n in t){const r=t[n];null==r?delete e[n]:e[n]=r}})(e):n=>{e[t]=n})(e,t.slice(1));case"@":return c(e,"on"+t.slice(1));case"o":if("n"===t[1])return c(e,t)}switch(t){case"ref":return(e=>{let t;return n=>{t!==n&&(t=n,"function"==typeof n?n(e):n.current=e)}})(e);case"aria":return(e=>t=>{for(const n in t){const r="role"===n?n:`aria-${n}`,s=t[n];null==s?e.removeAttribute(r):e.setAttribute(r,s)}})(e)}return((e,t)=>{let n,r=!0;const s=document.createAttributeNS(null,t);return t=>{const l=o(t);n!==l&&(null==(n=l)?r||(e.removeAttributeNode(s),r=!0):(s.value=l,r&&(e.setAttributeNodeNS(s),r=!1)))}})(e,t)};function k(e){const{type:t,path:n}=e,r=n.reduceRight(v,this);return"node"===t?(e=>{let t,n,r=[];const s=l=>{switch(typeof l){case"string":case"number":case"boolean":t!==l&&(t=l,n||(n=b("")),n.data=l,r=C(e,r,[n]));break;case"object":case"undefined":if(null==l){t!=l&&(t=l,r=C(e,r,[]));break}if(d(l)){t=l,0===l.length?r=C(e,r,[]):"object"==typeof l[0]?r=C(e,r,l):s(String(l));break}if(t!==l)if("ELEMENT_NODE"in l)t=l,r=C(e,r,11===l.nodeType?[...l.childNodes]:[l]);else{const e=l.valueOf();e!==l&&s(e)}break;case"function":s(l(e))}};return s})(r):"attr"===t?x(r,e.name):(e=>{let t;return n=>{const r=o(n);t!=r&&(t=r,e.textContent=null==r?"":r)}})(r)}const E=e=>{const t=[];let{parentNode:n}=e;for(;n;)t.push(p.call(n.childNodes,e)),e=n,({parentNode:n}=e);return t},N="isµ",S=new t,j=/^(?:textarea|script|style|title|plaintext|xmp)$/,A=(e,t)=>{const a="svg"===e,i=((e,t,a)=>{let i=0;return e.join("").trim().replace(r,((e,t,r,l)=>{let i=t+r.replace(s,"=$2$1").trimEnd();return l.length&&(i+=a||n.test(t)?" /":"></"+t),"<"+i+">"})).replace(l,(e=>""===e?"\x3c!--"+t+i+++"--\x3e":t+i++))})(t,N,a),o=$(i,a),c=g(o,129),d=[],u=t.length-1;let p=0,h=`${N}${p}`;for(;p<u;){const e=c.nextNode();if(!e)throw`bad template: ${i}`;if(8===e.nodeType)e.data===h&&(d.push({type:"node",path:E(e)}),h=`${N}${++p}`);else{for(;e.hasAttribute(h);)d.push({type:"attr",path:E(e),name:e.getAttribute(h)}),e.removeAttribute(h),h=`${N}${++p}`;j.test(e.localName)&&e.textContent.trim()===`\x3c!--${h}--\x3e`&&(e.textContent="",d.push({type:"text",path:E(e)}),h=`${N}${++p}`)}}return{content:o,nodes:d}},O=(e,t)=>{const{content:n,nodes:r}=S.get(t)||S.set(t,A(e,t)),s=y(n,!0);return{content:s,updates:r.map(k,s)}},I=(e,{type:t,template:n,values:r})=>{const s=T(e,r);let{entry:l}=e;l&&l.template===n&&l.type===t||(e.entry=l=((e,t)=>{const{content:n,updates:r}=O(e,t);return{type:e,template:t,content:n,updates:r,wire:null}})(t,n));const{content:a,updates:i,wire:o}=l;for(let e=0;e<s;e++)i[e](r[e]);return o||(l.wire=(e=>{const{firstChild:t,lastChild:n}=e;if(t===n)return n||e;const{childNodes:r}=e,s=[...r];return{ELEMENT_NODE:1,nodeType:111,firstChild:t,lastChild:n,valueOf:()=>(r.length!==s.length&&e.append(...s),e)}})(a))},T=({stack:e},t)=>{const{length:n}=t;for(let r=0;r<n;r++){const n=t[r];n instanceof L?t[r]=I(e[r]||(e[r]={stack:[],entry:null,wire:null}),n):d(n)?T(e[r]||(e[r]={stack:[],entry:null,wire:null}),n):e[r]=null}return n<e.length&&e.splice(n),n};class L{constructor(e,t,n){this.type=e,this.template=t,this.values=n}}const M=n=>{const r=new t;return Object.assign(((e,...t)=>new L(n,e,t)),{for(t,s){const l=r.get(t)||r.set(t,new e);return l.get(s)||l.set(s,(e=>(t,...r)=>I(e,{type:n,template:t,values:r}))({stack:[],entry:null,wire:null}))},node:(e,...t)=>I({stack:[],entry:null,wire:null},new L(n,e,t)).valueOf()})},B=new t,D=M("html");M("svg");const _=(e,t)=>{const n=e.name.toUpperCase(),r=t.name.toUpperCase();let s=0;return n>r?s=1:n<r&&(s=-1),s},W=(e,t)=>{e.store={component:[],plugin:[],module:[],template:[]},t.j4.forEach((t=>{t.locked&&1===t.locked||0===t.protected&&e.store[t.type].push({name:t.name,folder:t.folder,clientId:t.client_id,enabled:t.enabled})})),e.store.component=e.store.component.sort(_),e.store.plugin=e.store.plugin.sort(_),e.store.module=e.store.module.sort(_),e.store.template=e.store.template.sort(_)},z=async e=>{const{configure:t,BlobReader:n,BlobWriter:r,ZipReader:s,ZipWriter:l}=await import("@zip.js/zip.js/lib/zip.js");let a;t({workerScriptsPath:"/js/"}),e.writer=new r("application/zip"),e.ZipWriter=new l(e.writer);const i=[],o={},c=e.data.files;Object.keys(c).map((e=>o[e]=c[e]));const d=J(e.store);o["script.php"]=e.data.files["script.php"].replace("/**{{replacement}}**/",d),Object.keys(o).map((t=>i.push((async(e,t,n,r)=>{const s=new Blob([t],{type:"text/plain"});await n.ZipWriter.add(e,new r(s))})(`${t}`,o[t],e,n)))),await Promise.all(i);const u=new s(new n(await e.ZipWriter.close()));try{await u.close(),a=URL.createObjectURL(await e.writer.getData()),e.ZipWriter=null;let t=document.createElement("a");t.href=a,t.download="com_remove_joomla_fat.zip",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch(e){alert(e)}},J=e=>{let t="$useless = array(";return["component","plugin","module","template"].forEach((n=>{e[n].forEach((e=>{t+=`\n      '${e.name}' => array(`,"component"===n&&(t+="'type' => 'component',"),"module"===n&&(t+=`'type' => 'module', 'client_id' => ${parseInt(e.clientId,10)},`),"plugin"===n&&(t+=`'type' => 'plugin', 'folder' => '${e.folder}'`),"template"===n&&(t+=`'type' => '"template"', 'client_id' => ${parseInt(e.clientId,10)},`),t+=`'enabled' => ${e.enabled}`,t+="),"}))})),t+="\n  );",t};class V extends HTMLElement{constructor(){super(),this.jVersion=4,this.store={},this.renderEl=this.renderEl.bind(this),this.updState=this.updState.bind(this),this.onClick=this.onClick.bind(this),this.onCreate=this.onCreate.bind(this),this.onSelectChange=this.onSelectChange.bind(this)}connectedCallback(){let e,t;const n=document.getElementById("data"),r=document.getElementById("db");if(!n||!r)throw new Error("Data is missing...");try{e=JSON.parse(n.innerText)}catch(e){throw new Error("Malformed JSON...")}try{t=JSON.parse(r.innerText)}catch(e){throw new Error("Malformed JSON...")}if(!e||!t)throw new Error("Data is missing...");this.data={files:e.files,data:t},W(this,this.data.data,this.jVersion),this.renderEl()}renderEl(){((e,t)=>{const n="function"==typeof t?t():t,r=B.get(e)||B.set(e,{stack:[],entry:null,wire:null}),s=n instanceof L?I(r,n):n;s!==r.wire&&(r.wire=s,e.replaceChildren(s.valueOf()))})(this,D`<div><details><summary class="h1">Online Joomla's fat-remover plugin creator</summary><div><p>A simple (client side exclusive) plugin generator. The plugin upon installation will disable (hide) all the extensions you have disabled in the given list. The plugin will uninstall itself after that. No extension is uninstalled they are just disabled.</p></div></details><hr><label>Select your Joomla version <select value="${this.jVersion}" oninput="${this.onSelectChange}">${[4,3].map((e=>D`<option value="${e}" .selected="${this.jVersion===e}">Version ${e}.x</option>`))}</select></label></div><hr>${["component","plugin","module","template"].map((e=>D`<details><summary class="h1">List of Joomla's ${e}s:</summary><table class="rwd-table"><thead><tr class="table100-head"><th class="column1">Name</th>${"plugin"===e?D`<th class="column2">Type</th>`:"module"===e||"template"===e?D`<th class="column2">Client</th>`:""}<th class="column3">State</th></tr></thead><tbody>${this.store[e].map(((t,n)=>D`<tr tabindex="0" onclick="${this.onClick}" onkeydown="${this.onClick}" index="${n}" type="${e}" prop="enabled" value="${1===parseInt(t.enabled,10)?0:1}"><td class="column1"><strong>${t.name.toLowerCase()}</strong></td>${"plugin"===e?D`<td class="column2">${t.folder}</td>`:"module"===e||"template"===e?D`<td class="column2">${1!==parseInt(t.clientId,10)?"site":"admin"}</td>`:""}<td class="column2"><div class="inputGroup"><input tabindex="-1" id="${t.name+t.clientId}" name="option1" type="checkbox" value="${parseInt(t.enabled,10)}" checked="${1===parseInt(t.enabled,10)||null}"> <label for="${t.name+t.clientId}">${1===parseInt(t.enabled,10)?"Enabled":"Disabled"}</label></div></td></tr>`))}</tbody></table></details>`))}<hr><button onclick="${this.onCreate}">Computer, build me the plugin...</button>`)}updState(e,t,n,r){this.store[e]&&this.store[e].length&&this.store[e][r]&&(this.store[e][r][t]=parseInt(n,10))}onSelectChange(e){const t=e.target;this.jVersion=parseInt(t.options[t.selectedIndex].value,10),W(this,this.data.data,this.jVersion),this.renderEl()}onClick(e){if(e.key&&[32,13].indexOf(e.keyCode)<0)return;let t=e.target;"tr"!==t.tagName.toLowerCase()&&(t=t.closest("tr")),this.updState(t.getAttribute("type"),t.getAttribute("prop"),t.getAttribute("value"),t.getAttribute("index")),e.preventDefault(),e.stopPropagation(),this.renderEl()}async onCreate(e){e.preventDefault,z(this)}}customElements.define("create-joomla-fat-free-plugin",V);
