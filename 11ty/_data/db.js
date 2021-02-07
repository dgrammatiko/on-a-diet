const { readFile } = require('fs').promises;

module.exports = async function() {
  return JSON.parse(await readFile('src/db.json', { encoding: 'utf8' }));
}
