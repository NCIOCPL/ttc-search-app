const generateRSSFile = require('../generateRSSFile');
const mock = require('mock-fs');
const { promises } = require('fs');
const libxmljs = require('libxmljs');
const algoliasearch = require('algoliasearch');
const mockSearchResults = require('./__fixtures__/api-results.json');

// Mock the index.search() method
jest.mock('algoliasearch', () => {
	const mockSearch = jest.fn();
	const mockIndex = {
		search: mockSearch,
	};
	return jest.fn().mockReturnValue({
		initIndex: jest.fn().mockReturnValue(mockIndex),
	});
});

describe('Generate RSS File', () => {
	let rssFile;
	const { hits } = mockSearchResults;

	beforeEach(() => {
		mock({
			public: {
				rss: {},
			},
		});

		rssFile = {
			title: 'My File',
			description: 'My File Decsription',
			link: 'http://www.example.com',
			filters:
				'field_govdelivery:false AND field_ics:NCI AND (field_applications:Diagnostics)',
			xmlFilename: 'my-file.txt',
		};
	});

	afterEach(() => {
		mock.restore();
	});

	it('generates an RSS File', async () => {
		const mockIndex = algoliasearch().initIndex();
		mockIndex.search.mockResolvedValue(mockSearchResults);

		await generateRSSFile(rssFile);
		const file = await promises.readFile(
			`${process.cwd()}/public/rss/${rssFile.xmlFilename}.xml`,
			'utf8'
		);
		expect(file);

		const doc = libxmljs.parseXml(file);
		expect(doc.get('/rss/channel/title').text()).toBe(rssFile.title);
		expect(doc.get('/rss/channel/description').text()).toBe(
			rssFile.description
		);
		expect(doc.get('/rss/channel/link').text()).toBe(rssFile.link);
	});

	test.each(hits)('Check if result is in XML', async (hit) => {
		await generateRSSFile(rssFile);
		const file = await promises.readFile(
			`${process.cwd()}/public/rss/${rssFile.xmlFilename}.xml`,
			'utf8'
		);
		const doc = libxmljs.parseXml(file);
		const item = doc.get(`/rss/channel/item[title = "${hit.title}"]`);
		expect(item.get('title').text()).toBe(hit.title);
	});
});
