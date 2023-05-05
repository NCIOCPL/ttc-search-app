const libxmljs = require('libxmljs');
const writeFile = require('../writeRSSFile');
const mock = require('mock-fs');
const { promises } = require('fs');

describe('Write files', () => {
	let doc;

	beforeAll(() => {
		mock({
			public: {},
		});
		doc = new libxmljs.Document();
		doc.node('root', 'data');
	});

	afterAll(() => {
		mock.restore();
	});

	it('should write a file to the filesystem', async () => {
		const filename = 'test-filename';
		await writeFile(doc, filename);
		const result = await promises.readFile(
			`${process.cwd()}/public/${filename}.xml`,
			'utf8'
		);
		expect(result).toEqual(doc.toString());
	});

	it('should throw an error if there is a problem writing', async () => {
		// explicitly don't mock the public folder
		const filename = 'path/to/non/folder/test-filename2';

		await expect(writeFile(doc, filename)).rejects.toThrow();
	});
});
