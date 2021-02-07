import {render, html} from 'uhtml';
import {
  // configure,
  ZipReader,
  ZipWriter,
  BlobReader,
  BlobWriter,
} from '@zip.js/zip.js/lib/zip.js';

import {removeFirstNum, alpha_numeric_filter, replaceAll, reservedNames } from './utils.js';

// configure({
//   workerScriptsPath: '/js/', // /com_frontpage/js/ for production or /js/ for local
// });

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

class ComponentCreator extends HTMLElement {
  constructor() {
    super()

    this.jVersion = 4;
    this.store = {
      component: [],
      plugin: [],
      module: [],
      library: [],
      template: [],
      language: [],
      file: [],
      package: [],
    };
    this.renderEl = this.renderEl.bind(this);
    this.updState = this.updState.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.generateZip = this.generateZip.bind(this);
    this.transform = this.transform.bind(this);
    this.addFile = this.addFile.bind(this);
  }

  connectedCallback() {
    let files, data;
    const jsonEl = document.getElementById('data');
    const jsonEll = document.getElementById('db');
    try {
      files = JSON.parse(jsonEl.innerText);
    } catch (err) {
      throw new Error('Malformed JSON...')
    }
    try {
      data = JSON.parse(jsonEll.innerText);
    } catch (err) {
      throw new Error('Malformed JSON...')
    }

    if (!files || !data) {
      throw new Error('Data is missing...')
    }

    this.data = {
      files: files.files,
      data: data,
    }

    data['j4'].forEach(el => {
      this.store[el.type].push({
        name: el.name,
        folder: el.folder,
        clientId: el.client_id,
        enabled: el.enabled,
      })
    });

    this.store.component = this.store.component.sort(compare)
    this.store.plugin = this.store.plugin.sort(compare)
    this.store.module = this.store.module.sort(compare)
    this.store.library = this.store.library.sort(compare)
    this.store.template = this.store.template.sort(compare)

    window.data = this.store; // Debug

    this.renderEl();
  }

  onInputChange(event) {
    let el = event.target;
    let value = el.value;
    value = alpha_numeric_filter(value);
    value = removeFirstNum(value);

    if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
      value = value.replace(value.charAt(0), value.charAt(0).toUpperCase());
    }

    if (!reservedNames.includes(value.toLowerCase())) {
      this.componentNameLowercase = value.toLowerCase();
      this.componentName = this.componentNameLowercase.charAt(0).toUpperCase() + this.componentNameLowercase.slice(1)
      el.value = value;
      this.disabled = false;
    } else {
      this.disabled = true;
    }

    if (!value) {
      this.disabled = true;
    }

    this.renderEl()
  }

  onSelectChange(event) {
    const sel = event.target;
    this.jVersion = parseInt(sel.options[sel.selectedIndex].value, 10);

    this.renderEl();
  }

  transform(el, data, files) {
    let curData = replaceAll(data[el], '{{componentName}}', this.componentName);
    curData = replaceAll(curData, '{{componentNameLowercase}}', this.componentName.toLowerCase());
    if (el === 'empty.xml') {
      el = `com_${this.componentNameLowercase}.xml`
    }

    files[el] = curData;
  }

  async addFile(fileName, contents) {
    const theBlob = new Blob([contents], { type: "text/plain" });
    await this.ZipWriter.add(fileName, new BlobReader(theBlob));
  }

  async generateZip() {
    this.writer = new BlobWriter("application/zip");
    this.ZipWriter = new ZipWriter(this.writer);
    let blobURL;
    const queue = [];
    const files = {};
    const data = this.data[`v${this.jVersion}`].files;
    Object.keys(data).map(el => this.transform(el, data, files));
    Object.keys(files).map(el => queue.push(this.addFile(`${el}`, files[el], {})));
    await Promise.all(queue);
    const zipReader = new ZipReader(new BlobReader(await this.ZipWriter.close()));

    try {
      await zipReader.close();
      blobURL = URL.createObjectURL(await this.writer.getData());
      this.ZipWriter = null;
      let a = document.createElement('a');
      a.href = blobURL;
      a.download = `com_remove_joomla_fat.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      alert(error);
    }
  }

  renderEl() {
    render(
      this,
      html`
      <div> <h1 class="h1">List of Joomla's [hideable] Components: </h1></div>
      <table class="rwd-table">
      <thead>
        <tr class="table100-head">
        <th class="column1">Name</th>
        <th class="column2">State</th>
        </tr>
      </thead>
      <tbody>
      ${this.store.component.map(
        (com, index) => html`
          <tr tabindex="0" onclick="${this.onClick}" onkeydown="${this.onClick}" index="${index}" type="component" prop="enabled" value="${parseInt(com.enabled,10) === 1 ? 0 : 1}">
            <td class="column1"><strong>${com.name.toLowerCase()}</strong></td>
            <td class="column2">
              <div class="inputGroup">
                <input tabindex="-1" id="${com.name+com.clientId}" name="option1" type="checkbox" value="${parseInt(com.enabled,10)}" checked="${parseInt(com.enabled,10) === 1 ? true : null}"/>
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
        <th class="column3">State</th>
        </tr>
      </thead>
      <tbody>
      ${this.store.plugin.map(
        (plg, index) =>
          html`
        <tr tabindex="0" onclick="${this.onClick}" onkeydown="${this.onClick}" type="plugin" index="${index}" prop="enabled" value="${parseInt(plg.enabled, 10) === 1 ? 0 : 1}">
            <td class="column1"><strong>${plg.name.toLowerCase()}</strong></td>
            <td class="column2">${plg.folder}</td>
            <td class="column3">
              <div class="inputGroup">
                <input tabindex="-1" id="${plg.name + plg.clientId}" name="option1" type="checkbox" value="${plg.enabled}" checked="${parseInt(plg.enabled, 10) === 1 ? true : null}"/>
                <label for="${plg.name+plg.clientId}">${parseInt(plg.enabled,10) === 1 ? 'Enabled' : 'Disabled'}</label>
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
        <th class="column3">State</th>
        </tr>
      </thead>
      <tbody>
      ${this.store.module.map(
        (mod, index) =>
          html`
        <tr tabindex="0" onclick="${this.onClick}" onkeydown="${this.onClick}" type="module" index="${index}" prop="enabled" value="${parseInt(mod.enabled, 10) === 1 ? 0 : 1}">
            <td class="column1"><strong>${mod.name.toLowerCase()}</strong></td>
            <td class="column2">${parseInt(mod.clientId, 10) !== 1 ? 'site' : 'admin'}</td>
            <td class="column3">
              <div class="inputGroup">
                <input tabindex="-1" id="${mod.name+mod.clientId}" name="option1" type="checkbox" value="${mod.enabled}" checked="${parseInt(mod.enabled, 10) === 1 ? true : null}"/>
                <label for="${mod.name+mod.clientId}">${parseInt(mod.enabled,10) === 1 ? 'Enabled' : 'Disabled'}</label>
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
        <th class="column3">State</th>
        </tr>
      </thead>
      <tbody>
      ${this.store.template.map(
        (tmpl, index) => html`
        <tr tabindex="0" onclick="${this.onClick}" onkeydown="${this.onClick}" type="template" index="${index}" prop="enabled" value="${parseInt(tmpl.enabled,10) === 1 ? 0 : 1}">
            <td class="column1"><strong>${tmpl.name.toLowerCase()}</strong></td>
            <td class="column2">${parseInt(tmpl.clientId,10) === 1 ? 'admin' : 'site'}</td>
            <td class="column3">
              <div class="inputGroup">
                <input tabindex="-1" id="${tmpl.name + tmpl.clientId}" name="option1" type="checkbox" value="${tmpl.enabled}" checked="${parseInt(tmpl.enabled,10) === 1 ? true : null}"/>
                <label for="${tmpl.name+tmpl.clientId}">${parseInt(tmpl.enabled,10) === 1 ? 'Enabled' : 'Disabled'}</label>
              </div>
            </td>
          </tr>
        `
      )}
      </tbody>
      </table>

      <div>
      <button> Generate me a plugin</button>
      </div>
        `)
  }

  updState(type, prop, value, index) {
    if (this.store[type] && this.store[type].length && this.store[type][index]) {
      this.store[type][index][prop] = parseInt(value, 10)
    }
  }

  onClick(event) {
    if (event.key && [32, 13].indexOf(event.keyCode) < 0) {
      return;
    }

    let el = event.target;

    if (el.tagName.toLowerCase() !== 'tr') {
      el = el.closest('tr'); // this.findAncestorByTagName(el, 'tr')
    }

    this.updState(el.getAttribute('type'), el.getAttribute('prop'), el.getAttribute('value'), el.getAttribute('index'))

    event.preventDefault();
    event.stopPropagation()

    this.renderEl()
  }

  makeDastscript() {
    let txt = `$useless = [
        `;

    this.store.component.forEach(el => {
        txt += `'${el.name}' => [
          'type' => 'component',
          'enabled' => ${el.enabled},
        ],
        `
    });

    this.store.module.forEach(el => {
        txt += `'${el.name}' => [
          'type' => 'module',
          'client_id' => ${parseInt(el.clientId, 10)},
          'enabled' => ${el.enabled},
        ],
        `
    });

    this.store.plugin.forEach(el => {
        txt += `'${el.name}' => [
          'type' => 'plugin',
          'folder' => '${el.folder}',
          'enabled' => ${el.enabled},
        ],
      `
    });

    this.store.template.forEach(el => {
        txt += `'${el.name}' => [
          'type' => 'template',
          'client_id' => ${parseInt(el.clientId, 10)},
          'enabled' => ${el.enabled},
        ],
      `
    });

    txt += `];`;
    // console.log(txt)
    return txt; //dataScript.replace('/**{{replacement}}**/', txt)
  }
}

customElements.define('create-joomla-fat-free-plugin', ComponentCreator);
