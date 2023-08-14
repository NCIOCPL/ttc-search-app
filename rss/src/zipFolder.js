const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

async function zipFolder(folder, zipName) {
	try {
		const zip = new AdmZip();
		const files = await fs.promises.readdir(folder);

		for (const file of files) {
			const filePath = path.join(folder, file);
			try {
				const stats = await fs.promises.stat(filePath);

				if (stats.isFile()) {
					zip.addLocalFile(filePath);
				} else if (stats.isDirectory()) {
					zip.addLocalFolder(filePath, file);
				}
			} catch (error) {
				console.error(`Error while processing file "${filePath}":`, error);
			}
		}

		zip.writeZip(zipName);

		return zipName;
	} catch (error) {
		console.error('Error while zipping folder:', error);
		throw error; // Rethrow the error to propagate it to the caller
	}
}

module.exports = zipFolder;
