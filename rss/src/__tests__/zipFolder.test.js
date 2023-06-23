const zipFolder = require('../zipFolder');
const mockFS = require('mock-fs');
const AdmZip = require('adm-zip');
const { promises } = require('fs');

describe('Zip folder', () => {
	afterEach(() => {
		mockFS.restore();
	});

	it('should zip the provided folder', async () => {
		mockFS({
			public: {
				'some-file.txt': 'file content here',
				'some-other-file.txt': 'file content here',
			},
		});
		await zipFolder('public', 'my-zip.zip');
		const result = await promises.readFile(`${process.cwd()}/my-zip.zip`);
		expect(result);
	});

	it('should zip an entire directory structure', async () => {
		const files = {
			public: {
				'some-file.txt': 'file content here',
				'a-folder': {
					'some-other-file.txt': 'file content here',
				},
			},
		};
		mockFS(files);
		await zipFolder('public', 'my-zip.zip');
		const result = await promises.readFile(`${process.cwd()}/my-zip.zip`);
		const zip = new AdmZip(result);
		const entries = zip.getEntries();
		expect(entries[1].name).toEqual('some-file.txt');
		expect(entries[0].name).toEqual('some-other-file.txt');
	});

	it('should throw an error if the folder does not exist', async () => {
		const files = {
			public: {
				'a-folder/some-file.txt': 'file content here',
			},
		};
		mockFS(files);
		await expect(zipFolder('public2', 'my-zip.zip')).rejects.toThrow();
	});
});
