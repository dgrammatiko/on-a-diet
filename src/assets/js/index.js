import HyperHTMLElement from 'hyperhtml-element';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { dataScript, dataXML, dataMain } from './data.js';

const zip = new JSZip();

const store = {
  component: [],
  plugin: [],
  module: [],
  library: [],
  template: [],
  language: [],
  file: [],
  package: []
}

const compare = (a, b) => {
  // Ignore character casing
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

const updState = (type, prop, value, index) => {
  if (store[type] && store[type].length && store[type][index]) {
    store[type][index][prop] = parseInt(value, 10)
  }
};
const makeDastscript = () => {
  let txt = `$useless = [
      `;

  store.component.forEach(el => {
      txt += `'${el.name}' => [
        'type' => 'component',
        'enabled' => ${el.enabled},
      ],
      `
  });

  store.module.forEach(el => {
      txt += `'${el.name}' => [
        'type' => 'module',
        'client_id' => ${parseInt(el.clientId, 10)},
        'enabled' => ${el.enabled},
      ],
      `
  });

  store.plugin.forEach(el => {
      txt += `'${el.name}' => [
        'type' => 'plugin',
        'folder' => '${el.folder}',
        'enabled' => ${el.enabled},
      ],
    `
  });

  store.template.forEach(el => {
      txt += `'${el.name}' => [
        'type' => 'template',
        'client_id' => ${parseInt(el.clientId, 10)},
        'enabled' => ${el.enabled},
      ],
    `
  });

  txt += `];`;
  // console.log(txt)
  return dataScript.replace('/**{{replacement}}**/', txt)
}
const generateZip = () => {
  zip.file("removefat.php", dataMain);
  zip.file("removefat.xml", dataXML);
  zip.file("script.php", makeDastscript());
  zip.generateAsync({ type: "blob" }).then((blob) => { // 1) generate the zip file
      saveAs(blob, "removefat.zip");                   // 2) trigger the download
  }, (err) => {
      this.text(err);
  });
}

const GenButton = () => {
  return HyperHTMLElement.wire(generateZip)`
  <button class="build-button" onclick="${generateZip}">
    Computer, build me the plugin...
  </button>`;
}

class RemoveFatElement extends HyperHTMLElement {
  constructor() {
    super()
    
    this.findAncestorByTagName = this.findAncestorByTagName.bind(this)
    this.onClick = this.onClick.bind(this)
    }
    created() {
      this.render();
    }

  findAncestorByTagName(el, tagName) {
      while ((el = el.parentElement) && el.nodeName.toLowerCase() !== tagName);
      return el;
    }

  onClick(event) {
    if (event.key && [32, 13].indexOf(event.keyCode) < 0) {
        return;
    }

    let el = event.target;

    if (el.tagName.toLowerCase() !== 'tr') {
      el = this.findAncestorByTagName(el, 'tr')
    }

    updState(el.getAttribute('type'), el.getAttribute('prop'), el.getAttribute('value'), el.getAttribute('index'))

    event.preventDefault();
    event.stopPropagation()

    this.render()
  }

    render() {
      this.html`
      <div> <h1 class="h1">List of Joomla's [hideable] Components: </h1></div>
      <table class="rwd-table">
      <thead>
        <tr class="table100-head">
        <th class="column1">Name</th>
        <th class="column2">State</th>
        </tr>
      </thead>
      <tbody>
      ${store.component.map(
        (com, index) => HyperHTMLElement.wire(com)`
          <tr tabindex="0" onclick="${this.onClick}" onkeydown="${this.onClick}" index="${index}" type="component" prop="enabled" value="${parseInt(com.enabled,10) === 1 ? 0 : 1}">
            <td class="column1"><strong>${com.name.toLowerCase()}</strong></td>
            <td class="column2">
              <div class="inputGroup">
                <input tabindex="-1" id="${com.name+com.clientId}" name="option1" type="checkbox" value="${parseInt(com.enabled,10)}" checked="${parseInt(com.enabled,10) === 1 ? true : false}"/>
                <label for="${com.name+com.clientId}">${parseInt(com.enabled,10) === 1 ? 'Enabled' : 'Disabled'}</label>
              </div>
            </td>
          </tr>
        `
      )}
      </tbody>
      </table>

      <div> <h1 class="h1">List of Joomla's [hideable] Plugins: </h1></div>
      <table class="rwd-table">
      <thead>
        <tr class="table100-head">
        <th class="column1">Name</th>
        <th class="column2">Type</th>
        <th class="column3">Enabled</th>
        </tr>
      </thead>
      <tbody>
      ${store.plugin.map(
        (plg, index) => 
          HyperHTMLElement.wire(plg)`
        <tr tabindex="0" onclick="${this.onClick}" onkeydown="${this.onClick}" type="plugin" index="${index}" prop="enabled" value="${parseInt(plg.enabled, 10) === 1 ? 0 : 1}">
            <td class="column1"><strong>${plg.name.toLowerCase()}</strong></td>
            <td class="column2">${plg.folder}</td>
            <td class="column3">
              <div class="inputGroup">
                <input tabindex="-1" id="${plg.name+plg.clientId}" name="option1" type="checkbox" value="${plg.enabled}" checked="${parseInt(plg.enabled, 10) === 1 ? true : false}"/>
                <label for="${plg.name+plg.clientId}">State:</label>
              </div>
              </td>
          </tr>
        `
      )}
      </tbody>
      </table>

      <div> <h1 class="h1">List of Joomla's [hideable] Modules: </h1></div>
      <table class="rwd-table">
      <thead>
        <tr class="table100-head">
        <th class="column1">Name</th>
        <th class="column2">Client</th>
        <th class="column3">Enabled</th>
        </tr>
      </thead>
      <tbody>
      ${store.module.map(
        (mod, index) => 
          HyperHTMLElement.wire(mod)`
        <tr tabindex="0" onclick="${this.onClick}" onkeydown="${this.onClick}" type="module" index="${index}" prop="enabled" value="${parseInt(mod.enabled, 10) === 1 ? 0 : 1}">
            <td class="column1"><strong>${mod.name.toLowerCase()}</strong></td>
            <td class="column2">${parseInt(mod.clientId, 10) !== 1 ? 'site' : 'admin'}</td>
            <td class="column3">
              <div class="inputGroup">
                <input tabindex="-1" id="${mod.name+mod.clientId}" name="option1" type="checkbox" value="${mod.enabled}" checked="${parseInt(mod.enabled, 10) === 1 ? true : false}"/>
                <label for="${mod.name+mod.clientId}">State:</label>
              </div>
          </td>
          </tr>
        `
      )}
      </tbody>
      </table>

      <div> <h1 class="h1">List of Joomla's [hideable] Templates: </h1></div>
      <table class="rwd-table">
      <thead>
        <tr class="table100-head">
        <th class="column1">Name</th>
        <th class="column2">Client</th>
        <th class="column3">Enabled</th>
        </tr>
      </thead>
      <tbody>
      ${store.template.map(
        (tmpl, index) => HyperHTMLElement.wire(tmpl)`
        <tr tabindex="0" onclick="${this.onClick}" onkeydown="${this.onClick}" type="template" index="${index}" prop="enabled" value="${parseInt(tmpl.enabled,10) === 1 ? 0 : 1}">
            <td class="column1"><strong>${tmpl.name.toLowerCase()}</strong></td>
            <td class="column2">${parseInt(tmpl.clientId,10) === 1 ? 'admin' : 'site'}</td>
            <td class="column3">
              <div class="inputGroup">
                <input tabindex="-1" id="${tmpl.name + tmpl.clientId}" name="option1" type="checkbox" value="${tmpl.enabled}" checked="${parseInt(tmpl.enabled,10) === 1 ? true : false}"/>
                <label for="${tmpl.name + tmpl.clientId}">State:</label>
              </div>
            </td>
          </tr>
        `
      )}
      </tbody>
      </table>

      <div>
      ${GenButton}
      </div>
        `;
    }
  }

  RemoveFatElement.define('hide-joomla-junk');

  fetch('https://dgrammatiko.github.io/on-a-diet/js/json.json')
  .then(function(response) {
    return response.json();
  })
    .then(function (myJson) {

      myJson.data.forEach(el => {
        store[el.type].push({
          name: el.name,
          folder: el.folder,
          clientId: el.client_id,
          enabled: el.enabled,
        })
      });

      store.component = store.component.sort(compare)
      store.plugin = store.plugin.sort(compare)
      store.module = store.module.sort(compare)
      store.library = store.library.sort(compare)
      store.template = store.template.sort(compare)
      // store.language = store.language.sort(compare)
      // store.file = store.file.sort(compare)
      // store.package = store.package.sort(compare)

    const El = new RemoveFatElement(myJson)
    document.body.appendChild(El)
  });
