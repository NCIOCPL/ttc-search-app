const Netstorage = require('netstorageapi');
const fs = require('fs');

async function readConfigFile(filePath) {
	try {
		const configContent = fs.readFileSync(filePath, 'utf8');
		return JSON.parse(configContent);
	} catch (error) {
		console.error('Error reading config file:', error);
		throw error; // Rethrow the error to propagate it to the caller
	}
}

function uploadWithStatus(config, local_source) {
	return new Promise((resolve, reject) => {
		const ns = new Netstorage(config);
		const netstorage_destination = `/${config.cpCode}/`;
		ns.upload(
			local_source,
			netstorage_destination,
			true,
			(error, response, body) => {
				if (error) {
					console.log(`Got error: ${error.message}`);
					reject(error.message);
				} else {
					if (response.statusCode !== 200) {
						console.log(body);
						reject(response.statusCode);
					}
					resolve(response.statusCode);
				}
			}
		);
	});
}

async function netStorageUpload(local_source) {
	let config = {};
	try {
		config = await readConfigFile('akamai-config.json');
	} catch (error) {
		console.error('Error obtaining config, skipping upload');
	}

	if (Object.keys(config).length !== 0) {
		try {
			const uploadStatus = await uploadWithStatus(config, local_source);

			console.log(uploadStatus);
			return uploadStatus;
		} catch (error) {
			console.error('Error during upload:', error);
			throw error;
		}
	}
}

module.exports = netStorageUpload;
