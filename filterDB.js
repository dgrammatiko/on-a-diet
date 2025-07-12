import { writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';

/**
 * db_j3.json and db_j4.json expected to be the JSON export of all the entries
 * of the table extensions on a vanilla Joomla instalation.
 * (Obviously j3 === Joomla v3, j4 === Joomla v4)
 * The JSON files are expected to be created using Sequel Pro
 *
 * @todo use the standard .sql files from the repo to create the JSON files
 */
const dbJson3 = JSON.parse(readFileSync('./db_j3.json', 'utf8'));
const dbJson4 = JSON.parse(readFileSync('./db_j4.json', 'utf8'));

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
	return Object.fromEntries(
		Object.entries(obj).filter(
			([key, value]) => keysToKeep.includes(key) === true,
		),
	);
};

(async () => {
	const dataJ3 = dbJson3.data.map((ext) => clean(ext));
	const dataJ4 = dbJson4.data.map((ext) => clean(ext));

	const newData = {
		j3: dataJ3,
		j4: dataJ4,
	};

	await writeFile('db.json', JSON.stringify(newData, '', 2), {
		encoding: 'utf8',
	});
})();
