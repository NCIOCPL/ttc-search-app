const deleteFile = require('../deleteFile');
const mockFS = require('mock-fs');
const { promises } = require('fs');

describe('Delete file', () => {
	afterEach(() => {
		mockFS.restore();
	});

	it('should delete the file from the filesystem', async () => {
		mockFS({
			public: {
				'some-file.txt': 'file content here',
			},
		});
		await deleteFile('public/some-file.txt');
		let result = false;
		try {
			await promises.stat('public/some-file.txt');
		} catch (error) {
			if (error.code === 'ENOENT') {
				result = true;
			}
		}
		expect(result).toEqual(true);
	});

	it('should throw an error if the file does not exist', async () => {
		mockFS({
			public: {
				'some-file.txt': 'file content here',
			},
		});
		await expect(deleteFile('public/some-other-file.txt')).rejects.toThrow();
	});
});
