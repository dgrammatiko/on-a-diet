const { readFile } = require('fs').promises;

module.exports = async function() {
  let cssContents = await readFile('node_modules/naf-css/css/vars.min.css', { encoding: 'utf8' });
  cssContents += await readFile('node_modules/naf-css/css/base.min.css', { encoding: 'utf8' });
  cssContents += await readFile('node_modules/naf-css/css/forms.min.css', { encoding: 'utf8' });
  cssContents += await readFile('src/assets/css/css.min.css', { encoding: 'utf8' });

  return {
    css: cssContents
  };
}
