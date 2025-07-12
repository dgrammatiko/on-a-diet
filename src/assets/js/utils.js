const generateZip = async(scoped) => {
  const addFile = async (fileName, contents, BlobReader) => {
    const theBlob = new Blob([contents], { type: "text/plain" });
    await scoped.ZipWriter.add(fileName, new BlobReader(theBlob));
  };

  const {configure, BlobReader, BlobWriter, ZipReader, ZipWriter} = await import('@zip.js/zip.js');

  configure({
    workerScriptsPath: '/js/',
  });

  // console.log(BlobReader, BlobWriter, ZipReader, ZipWriter)
  scoped.writer = new BlobWriter("application/zip");
  scoped.ZipWriter = new ZipWriter(scoped.writer);
  let blobURL;
  const queue = [];
  const files = {};
  const data = scoped.data.files;// @todo add different versions [`v${scoped.jVersion}`]
  Object.keys(data).map((el) => {
    files[el] = data[el];
  });
  const replacement = makeDastscript(scoped.store)
  files['script.php'] = scoped.data.files['script.php'].replace('/**{{replacement}}**/', replacement);

  Object.keys(files).map(el => queue.push(addFile(`${el}`, files[el], scoped, BlobReader)));
  await Promise.all(queue);
  const zipReader = new ZipReader(new BlobReader(await scoped.ZipWriter.close()));

  try {
    await zipReader.close();
    blobURL = URL.createObjectURL(await scoped.writer.getData());
    scoped.ZipWriter = null;
    const a = document.createElement('a');
    a.href = blobURL;
    a.download = 'remove_joomla_fat.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    alert(error);
  }
}

const makeDastscript = (data) => {
  let txt = `        private $useless = [`;

  for (const type of ['component', 'plugin', 'module', 'template']) {
    for (const el of data[type]) {
      txt += `
      '${el.name}' => [`;
      if (type === 'component') {
        txt +=`'type' => 'component',`
      }
      if (type === 'module') {
        txt +=`'type' => 'module', 'client_id' => ${Number.parseInt(el.clientId, 10)},`
      }
      if (type === 'plugin') {
        txt +=`'type' => 'plugin', 'folder' => '${el.folder}'`;
      }
      if (type === 'template') {
        txt +=`'type' => '"template"', 'client_id' => ${Number.parseInt(el.clientId, 10)},`;
      }

      txt +=`'enabled' => ${el.enabled}`
      txt +=`],`;
    }
  }

  txt += `
  ];`;

  return txt;
}

export { generateZip };
