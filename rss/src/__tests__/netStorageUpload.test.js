const Netstorage = require('netstorageapi');
const netStorageUpload = require('../netStorageUpload');

jest.mock('fs');
jest.mock('netstorageapi');

describe('NetStorage Upload', () => {
	it('should upload file with status 200', async () => {
		const mockedResponse = {
			statusCode: 200,
		};

		Netstorage.mockImplementation(() => ({
			upload: jest.fn((local_source, netstorage_destination, _, callback) => {
				callback(null, mockedResponse, 'Success');
			}),
		}));

		const uploadStatus = await netStorageUpload('file.txt');

		expect(Netstorage).toHaveBeenCalled();
		expect(uploadStatus).toBe(200);
	});
});
