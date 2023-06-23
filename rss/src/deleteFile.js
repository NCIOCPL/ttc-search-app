const fs = require('fs');

async function deleteFile(filename) {
	try {
		await fs.promises.unlink(filename);
		console.log(`File '${filename}' deleted successfully.`);
	} catch (error) {
		console.error(`Error deleting file '${filename}':`, error);
		throw error; // Rethrow the error to propagate it to the caller
	}
}
module.exports = deleteFile;
