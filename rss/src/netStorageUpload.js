const Netstorage = require('netstorageapi');

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
	let config = {
		hostname: process.env.AKAMAI_HOSTNAME,
		keyName: process.env.AKAMAI_KEYNAME,
		key: process.env.AKAMAI_KEY,
		cpCode: process.env.AKAMAI_CPCODE,
		ssl: true,
	};

	try {
		const uploadStatus = await uploadWithStatus(config, local_source);

		console.log(uploadStatus);
		return uploadStatus;
	} catch (error) {
		console.error('Error during upload:', error);
		throw error;
	}
}

module.exports = netStorageUpload;
