const fs = require('fs');
const Netstorage = require('netstorageapi');
const netStorageUpload = require('../netStorageUpload');

jest.mock('fs');
jest.mock('netstorageapi');

const mockedConfig = {
	hostname: 'hostname.akamaihd.net',
	keyName: 'user',
	key: 'abc123',
	cpCode: '1234567',
	ssl: true,
};

describe('NetStorage Upload', () => {
	it('should upload file with status 200', async () => {
		const mockedResponse = {
			statusCode: 200,
		};

		fs.readFileSync.mockReturnValue(JSON.stringify(mockedConfig));
		Netstorage.mockImplementation(() => ({
			upload: jest.fn((local_source, netstorage_destination, _, callback) => {
				callback(null, mockedResponse, 'Success');
			}),
		}));

		const uploadStatus = await netStorageUpload('file.txt');

		expect(fs.readFileSync).toHaveBeenCalledWith('akamai-config.json', 'utf8');
		expect(Netstorage).toHaveBeenCalledWith(mockedConfig);
		expect(uploadStatus).toBe(200);
	});
});
