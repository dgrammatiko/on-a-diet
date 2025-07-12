import {render, html} from 'uhtml';
import { generateZip } from './utils.js';

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

    this._store = {};
    this.renderEl = this.renderEl.bind(this);
    this.updState = this.updState.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.reset = this.reset.bind(this);
    this.reset(this);
  }

  set store(val) {
    this._store = val;
  }
  get store() {
    return this._store;
  }

  connectedCallback() {
    this.renderEl();
  }

  renderEl() {
    render(
					this,
					html`<div>
            <p>A simple (client side exclusive) plugin generator. The plugin upon installation will disable (hide) all the extensions you have disabled in the given list.
            The plugin will uninstall itself after that. No extension is uninstalled they are just disabled.</p>
        <hr/>
      </div>

      <hr/>

      ${['component', 'plugin', 'module', 'template'].map(
				(type) => html`
      <details>
        <summary class="h1">List of Joomla's ${type}s:</summary>
        <table class="rwd-table">
          <thead>
            <tr class="table100-head">
            <th class="column1">Name</th>
            ${type === 'plugin' ? html`<th class="column2">Type</th>` : (type === 'module' || type === 'template') ? html`<th class="column2">Client</th>` : ''}
            <th class="column3">State</th>
            </tr>
          </thead>
          <tbody>
          ${this.store[type].map(
						(com, index) => html`
              <tr tabindex="0" onclick="${this.onClick}" onkeydown="${this.onClick}" index="${index}" type="${type}" prop="enabled" value="${Number.parseInt(com.enabled, 10) === 1 ? 0 : 1}">
                <td class="column1"><strong>${com.name.toLowerCase()}</strong></td>
                ${type === 'plugin' ? html`<td class="column2">${com.folder}</td>` : (type === 'module' || type === 'template') ? html`<td class="column2">${Number.parseInt(com.clientId, 10) !== 1 ? 'site' : 'admin'}</td>` : ''}
                <td class="column2">
                  <div class="inputGroup">
                    <input tabindex="-1" id="${com.name + com.clientId}" name="option1" type="checkbox" value="${Number.parseInt(com.enabled, 10)}" ?checked=${Number.parseInt(com.enabled, 10) === 1} />
                    <label for="${com.name + com.clientId}">${Number.parseInt(com.enabled, 10) === 1 ? 'Enabled' : 'Disabled'}</label>
                  </div>
                </td>
              </tr>`,
					)}
          </tbody>
        </table>
      </details>`,
			)}

      <hr/>
      <button onclick="${this.onCreate}">Computer, build me the plugin...</button>`,
  );
  }

  updState(type, prop, value, index) {
    if (this.store[type]?.length && this.store[type][index]) {
      this.store[type][index][prop] = Number.parseInt(value, 10)
    }
  }

  onClick(event) {
    if (event.key && [32, 13].indexOf(event.keyCode) < 0) return;

    let el = event.target;
    if (el.tagName.toLowerCase() !== 'tr') {
      el = el.closest('tr'); // this.findAncestorByTagName(el, 'tr')
    }

    this.updState(el.getAttribute('type'), el.getAttribute('prop'), el.getAttribute('value'), el.getAttribute('index'))
    event.preventDefault();
    event.stopPropagation()
    this.renderEl()
  }

  async onCreate(ev) {
    ev.preventDefault;
    generateZip(this);
  }

  reset(that) {
    // // Hard reset
    // this.store = {
    //   component: [],
    //   plugin: [],
    //   module: [],
    //   template: [],
    // };

    const dataElement = document.getElementById('data');
    const dbElement = document.getElementById('db');

    console.log({
      files: dataElement.innerText,
      ext: dbElement.innerText,
    });
    if (!dataElement || !dbElement) {
      throw new Error("Data is missing...");
    }
    try {
      this.files = JSON.parse(dataElement.innerText);
    } catch (err) {
      throw new Error('Malformed Files JSON...')
    }
    try {
      this.ext = JSON.parse(dbElement.innerText);
    } catch (err) {
      throw new Error('Malformed DB JSON...')
    }

    if (!this.files || !this.ext) {
      throw new Error('Data is missing...')
    }

    this.data = {
      files: this.files.files,
      data: this.ext,
    };

    const tempStore = {
      component: [],
      plugin: [],
      module: [],
      template: [],
    };
    for (const el of this.data.data) {
      if (el.locked && el.locked === 1) {
        return;
      }
      if (el.protected === 0) {
        tempStore[el.type].push({
          name: el.name,
          folder: el.folder,
          clientId: el.client_id,
          enabled: el.enabled,
        })
      }
    }

    tempStore.component = tempStore.component.sort(compare)
    tempStore.plugin = tempStore.plugin.sort(compare)
    tempStore.module = tempStore.module.sort(compare)
    tempStore.template = tempStore.template.sort(compare)

    this.store = tempStore;
  }
}

customElements.define('create-joomla-fat-free-plugin', ComponentCreator);
