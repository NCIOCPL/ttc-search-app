//const nock = require('nock');
const getOTTData = require('../getOTTData');
const algoliasearch = require('algoliasearch');

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

describe('Get OTT Data', () => {
	it('should get data from OTT', async () => {
		//// It's too hard to tell what the algolia API is doing to use nock
		//// It complains about the key being invalid so it may be doing
		//// multiple calls and we would have to sniff them out to provide the correct responses
		//mockedResponse = await promises.readFile('./src/__tests__/__fixtures__/api-results.json', "utf-8")
		//nock(/.*/)
		//.get(/.*/)
		//.reply(200, mockedResponse);

		const mockSearchResults = require('./__fixtures__/api-results.json');

		const mockIndex = algoliasearch().initIndex();
		mockIndex.search.mockResolvedValue(mockSearchResults);

		const filters =
			'field_govdelivery:false AND field_ics:NCI AND (field_applications)'; // Add your desired facet filter fields here

		const results = await getOTTData(filters);

		expect(results).toEqual(mockSearchResults);
		expect(mockIndex.search).toHaveBeenCalledWith('', {
			filters: filters,
			hitsPerPage: 1000,
		});
	});
});
