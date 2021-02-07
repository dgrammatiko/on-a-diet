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

const resetStore = (elClass, data) => {
  // Hard reset
  elClass.store = {
    component: [],
    plugin: [],
    module: [],
    template: [],
  };

  data['j4'].forEach(el => {
    if (el.locked && el.locked === 1) {
      return;
    }
    if (el.protected === 0) {
      elClass.store[el.type].push({
        name: el.name,
        folder: el.folder,
        clientId: el.client_id,
        enabled: el.enabled,
      })
    }
  });

  elClass.store.component = elClass.store.component.sort(compare)
  elClass.store.plugin = elClass.store.plugin.sort(compare)
  elClass.store.module = elClass.store.module.sort(compare)
  elClass.store.template = elClass.store.template.sort(compare)
}

// const transform = (el, data, files) => {
//   if (el === 'script.php') {
//     files[el] = data[el].replace('/**{{replacement}}**/', makeDastscript(data[el]));
//     return;
//   }

//   files[el] = data[el];
// }

const addFile = async(fileName, contents, elClass, BlobReader) => {
  const theBlob = new Blob([contents], { type: "text/plain" });
  await elClass.ZipWriter.add(fileName, new BlobReader(theBlob));
}

const generateZip = async(elClass) => {
  const {configure, BlobReader, BlobWriter, ZipReader, ZipWriter} = await import('@zip.js/zip.js/lib/zip.js');

  configure({
    workerScriptsPath: '/js/',
  });

  console.log(BlobReader, BlobWriter, ZipReader, ZipWriter)
  elClass.writer = new BlobWriter("application/zip");
  elClass.ZipWriter = new ZipWriter(elClass.writer);
  let blobURL;
  const queue = [];
  const files = {};
  const data = elClass.data.files;//[`v${elClass.jVersion}`]
  console.log(elClass.data.files)
  Object.keys(data).map(el => files[el] = data[el]);
  const replacement = makeDastscript(elClass.store)
  files['script.php'] = elClass.data.files['script.php'].replace('/**{{replacement}}**/', replacement);
  console.log(files)
  Object.keys(files).map(el => queue.push(addFile(`${el}`, files[el], elClass, BlobReader)));
  await Promise.all(queue);
  const zipReader = new ZipReader(new BlobReader(await elClass.ZipWriter.close()));

  try {
    await zipReader.close();
    blobURL = URL.createObjectURL(await elClass.writer.getData());
    elClass.ZipWriter = null;
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

const makeDastscript = (data) => {
  let txt = `$useless = array(`;

  ['component', 'plugin', 'module', 'template'].forEach(type => {
    // data =this.store
    data[type].forEach(el => {
      txt += `'${el.name}' => array(`;

      if (type === 'component') {
        txt +=`'type' => 'component',`
      }
      if (type === 'module') {
        txt +=`'type' => 'module', 'client_id' => ${parseInt(el.clientId, 10)},`
      }
      if (type === 'module') {
        txt +=`'type' => 'plugin', 'folder' => '${el.folder}'`;
      }

      txt +=`'enabled' => ${el.enabled}`
      txt +=`),`
    });
  });

  txt += `);`;
  console.log(txt)
  return txt;
}

export { resetStore, generateZip };
