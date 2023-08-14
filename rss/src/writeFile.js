const { promises } = require('fs');
const { join } = require('path');

async function writeFile(doc, filename, path) {
	const segments = path ? path.split('/') : ['public'];

	let currentPath = process.cwd();
	for (const segment of segments) {
		currentPath = join(currentPath, segment);
		try {
			await promises.access(currentPath);
		} catch (error) {
			await promises.mkdir(currentPath);
		}
	}

	return promises.writeFile(`${currentPath}/${filename}`, doc.toString(), {
		flag: 'w+',
		encoding: 'utf-8',
	});
}

module.exports = writeFile;
