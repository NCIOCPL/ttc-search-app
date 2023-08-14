const uploadToAkamai = require('../uploadToAkamai');
const deleteFile = require('../deleteFile');
const zipFolder = require('../zipFolder');
const netStorageUpload = require('../netStorageUpload');

jest.mock('../zipFolder');
jest.mock('../netStorageUpload');
jest.mock('../deleteFile');

describe('Upload to Akamai', () => {
	it('should take a filename', async () => {
		await uploadToAkamai('folder', 'filename');

		expect(zipFolder).toHaveBeenCalledWith('folder', 'filename');
		expect(netStorageUpload).toHaveBeenCalledWith('filename');
	});

	it('should call zipFolder and netStorageUpload functions', async () => {
		await uploadToAkamai('folder');

		expect(zipFolder).toHaveBeenCalledWith('folder', 'folder.zip');
		expect(netStorageUpload).toHaveBeenCalledWith('folder.zip');
	});

	it('should call the deleteFile function if successful', async () => {
		const mockUploadResponse = 200;
		netStorageUpload.mockResolvedValue(mockUploadResponse);

		await uploadToAkamai('folder', 'filename');
		expect(deleteFile).toHaveBeenCalledWith('filename');
	});
});
