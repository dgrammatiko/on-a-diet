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


  }

 RemoveFatElement.define('hide-joomla-junk');


const xhr = new XMLHttpRequest();

xhr.onreadystatechange = () => {
  // Request not finished
  if (xhr.readyState !== 4) {
    return;
  }

  // Request finished and response is ready
  if (xhr.status === 200) {
    let response;

    try {
      response = JSON.parse(xhr.responseText);
    } catch (error) {
      throw new Error('Failed to parse JSON')
    }

    if (!response) {
      throw new Error('Ajax gone wrong')
    } else {
      response.data.forEach(el => {
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

      const El = new RemoveFatElement(response)
      document.body.appendChild(El)
    }
  } else {
    throw new Error('Failed to parse JSON')
  }
};

xhr.open('GET', 'js/json.json');
xhr.send();


// fetch('https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg')
//   .then(res => res.blob()) // Gets the response and returns it as a blob
//   .then(blob => {
//     // Here's where you get access to the blob
//     // And you can use it for whatever you want
//     // Like calling ref().put(blob)

//     // Here, I use it to make an image appear on the page
//     let objectURL = URL.createObjectURL(blob);
//     let myImage = new Image();
//     myImage.src = objectURL;
//     document.getElementById('myImg').appendChild(myImage)
// });
