const libxmljs = require('libxmljs');
const writeFile = require('../writeRSSFile');
const mockFS = require('mock-fs');
const { promises } = require('fs');

describe('Write files', () => {
	let doc;

	beforeAll(() => {
		doc = new libxmljs.Document();
		doc.node('root', 'data');
	});

	afterAll(() => {
		mockFS.restore();
	});

	it('should create the public folder if it does not exist', async () => {
		const filename = 'test-filename';
		const mockAccess = jest.spyOn(promises, 'access').mockImplementation(() => {
			throw new Error('Folder does not exist');
		});
		const mockMkdir = jest
			.spyOn(promises, 'mkdir')
			.mockImplementation(() => {});
		const mockWriteFile = jest
			.spyOn(promises, 'writeFile')
			.mockImplementation(() => {});
		await writeFile(doc, filename);
		expect(mockAccess).toHaveBeenCalled();
		expect(mockMkdir).toHaveBeenCalled();
		mockAccess.mockRestore();
		mockMkdir.mockRestore();
		mockWriteFile.mockRestore();
	});

	it('should write a file to the filesystem', async () => {
		mockFS({
			public: {},
		});
		const filename = 'test-filename';
		await writeFile(doc, filename);
		const result = await promises.readFile(
			`${process.cwd()}/public/${filename}.xml`,
			'utf8'
		);
		expect(result).toEqual(doc.toString());
	});

	it('should throw an error if there is a problem writing', async () => {
		mockFS({
			public: {},
		});
		// explicitly don't mock the public folder
		const filename = 'path/to/non/folder/test-filename2';

		await expect(writeFile(doc, filename)).rejects.toThrow();
	});
});
