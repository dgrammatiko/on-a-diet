import { readFile, writeFile } from 'node:fs/promises';

const keysToKeep = [
  'package_id',
  'name',
  'type',
  'element',
  'folder',
  'client_id',
  'enabled',
  'access',
  'protected',
];

const clean = (obj) => {
  return Object.fromEntries(Object.entries(obj).filter(([key, value]) => keysToKeep.includes(key) === true));
}

(async () => {
  /**
   * db_j3.json and db_j4.json expected to be the JSON export of all the entries
   * of the table extensions on a vanilla Joomla instalation.
   * (Obviously j3 === Joomla v3, j4 === Joomla v4)
   * The JSON files are expected to be created using Sequel Pro
   *
   * @todo use the standard .sql files from the repo to create the JSON files
   */
  let dbJson = await readFile('./db.json');

  dbJson = JSON.parse(dbJson);
  await writeFile('./11ty/_data/db.json', JSON.stringify(dbJson.data.map(ext => clean(ext)), '', 2), {encoding: 'utf8'});
})();
