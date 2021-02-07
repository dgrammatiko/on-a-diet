const { readFile } = require('fs').promises;

module.exports = async function() {
  return {
    files: {
      'removefat.xml': await readFile('src/plugin/removefat.xml', { encoding: 'utf8' }),
      'removefat.php': await readFile('src/plugin/removefat.php', { encoding: 'utf8' }),
      'script.php': await readFile('src/plugin/script.php', { encoding: 'utf8' }),
    },
  };
}
