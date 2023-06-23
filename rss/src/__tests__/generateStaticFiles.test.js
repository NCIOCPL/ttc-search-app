const generateStaticFiles = require('../generateStaticFiles');
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

describe('Generate Static Files', () => {
	const { hits } = mockSearchResults;

	beforeEach(() => {
		mock({
			public: {
				html: {},
			},
		});
	});

	afterEach(() => {
		mock.restore();
	});

	it('generates the sitemap', async () => {
		const mockIndex = algoliasearch().initIndex();
		mockIndex.search.mockResolvedValue(mockSearchResults);

		await generateStaticFiles();
		const file = await promises.readFile(
			`${process.cwd()}/public/html/sitemap-abstracts.xml`,
			'utf8'
		);
		expect(file);
	});

	it('generates each required file', async () => {
		const mockIndex = algoliasearch().initIndex();
		mockIndex.search.mockResolvedValue(mockSearchResults);

		await generateStaticFiles();
		for (const hit of hits) {
			const file = await promises.readFile(
				`${process.cwd()}/public/html/abstract/${
					hit.field_data_source_id
				}.html`,
				'utf8'
			);
			expect(file);
		}
	});
});
