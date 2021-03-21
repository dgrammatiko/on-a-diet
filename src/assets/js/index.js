import {render, html} from 'uhtml';
import { resetStore, generateZip } from './utils.js';

class ComponentCreator extends HTMLElement {
  constructor() {
    super()

    this.jVersion = 4;
    this.store = {};
    this.renderEl = this.renderEl.bind(this);
    this.updState = this.updState.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  connectedCallback() {
    let files, data;
    const jsonEl = document.getElementById('data');
    const jsonEll = document.getElementById('db');
    if (!jsonEl || !jsonEll) {
      throw new Error('Data is missing...')
    }
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

    resetStore(this, this.data.data, `j${this.jVersion}`);
    this.renderEl();
    // console.log(this.data.data[`j${this.jVersion}`])
  }

  renderEl() {
    render(
      this,
      html`<div>
        <details>
          <summary class="h1">Online Joomla's fat-remover plugin creator</summary>
          <div>
            <p>A simple (client side exclusive) plugin generator. The plugin upon installation will disable (hide) all the extension you have disabled in the given list.
            The plugin will unistall itself after that. There is no unistalling of any extension, just disabling them.</p>
            </div>
        </details>
        <hr/>
        <label> Select you Joomla version
          <select value=${this.jVersion} oninput=${this.onSelectChange}>
            ${[4, 3].map(ver => html`<option value="${ver}" .selected="${this.jVersion === ver}">Version ${ver}.x</option>`)}
          </select>
      </div>

      <hr/>

      ${['component', 'plugin', 'module', 'template'].map(type => html`
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
              <tr tabindex="0" onclick="${this.onClick}" onkeydown="${this.onClick}" index="${index}" type="${type}" prop="enabled" value="${parseInt(com.enabled,10) === 1 ? 0 : 1}">
                <td class="column1"><strong>${com.name.toLowerCase()}</strong></td>
                ${type === 'plugin' ? html`<td class="column2">${com.folder}</td>` : (type === 'module' || type === 'template') ? html`<td class="column2">${parseInt(com.clientId, 10) !== 1 ? 'site' : 'admin'}</td>` : ''}
                <td class="column2">
                  <div class="inputGroup">
                    <input tabindex="-1" id="${com.name+com.clientId}" name="option1" type="checkbox" value="${parseInt(com.enabled,10)}" checked="${parseInt(com.enabled,10) === 1 ? true : null}"/>
                    <label for="${com.name+com.clientId}">${parseInt(com.enabled,10) === 1 ? 'Enabled' : 'Disabled'}</label>
                  </div>
                </td>
              </tr>`
          )}
          </tbody>
        </table>
      </details>`)}

      <hr/>
      <button onclick="${this.onCreate}">Computer, build me the plugin...</button>`)
  }

  updState(type, prop, value, index) {
    if (this.store[type] && this.store[type].length && this.store[type][index]) {
      this.store[type][index][prop] = parseInt(value, 10)
    }
  }

  onSelectChange(event) {
    const sel = event.target;
    this.jVersion = parseInt(sel.options[sel.selectedIndex].value, 10);

    resetStore(this, this.data.data, `j${this.jVersion}`);
    // console.log(this.data.data[`j${this.jVersion}`])
    this.renderEl();
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
}

customElements.define('create-joomla-fat-free-plugin', ComponentCreator);
