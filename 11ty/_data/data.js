import { readFile } from 'node:fs/promises';

export default async function() {
  return {
    files: {
      'removefat.xml': await readFile('src/plugin/removefat.xml', { encoding: 'utf8' }),
      'script.php': await readFile('src/plugin/script.php', { encoding: 'utf8' }),
    },
  };
}
