const createSitemap = require('../createSitemap');
const mockSearchResults = require('./__fixtures__/api-results.json');

describe('Create Sitemap', () => {
	const { hits, nbHits } = mockSearchResults;

	it('creates an XML document', async () => {
		const result = await createSitemap(hits);
		expect(result.constructor.name).toEqual('XMLDocument');
	});

	it('contains all the hits', async () => {
		const xmlDoc = await createSitemap(hits);
		const root = xmlDoc.root();

		const urlElements = root.find('url');
		expect(urlElements.length).toEqual(nbHits);
	});
});
