const deleteFile = require('./deleteFile');
const netStorageUpload = require('./netStorageUpload');
const zipFolder = require('./zipFolder');

async function uploadToAkamai(folder, destination_filename = '') {
	destination_filename =
		destination_filename === '' ? `${folder}.zip` : destination_filename;

	var file = await zipFolder(folder, destination_filename);
	console.log(file);

	const NetStorageResponse = await netStorageUpload(destination_filename);
	if (NetStorageResponse == 200) {
		deleteFile(destination_filename);
	}

	return;
}

module.exports = uploadToAkamai;
