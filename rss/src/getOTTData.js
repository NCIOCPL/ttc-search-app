const algoliasearch = require('algoliasearch');
const client = algoliasearch('WEXCESI5EU', '3986149b687b8f20e2468432f329f08c');
// let url = new URL('https://wexcesi5eu-dsn.algolia.net/1/indexes/ott_updated_idx?x-algolia-api-key=3986149b687b8f20e2468432f329f08c&x-algolia-application-id=WEXCESI5EU&hitsPerPage=1&facetFilters=field_ics:NCI');

const index = client.initIndex('ott_updated_idx');

async function getOTTData(filters) {
	const results = index.search('', {
		filters: filters,
		hitsPerPage: 1000,
	});
	return results;
}

module.exports = getOTTData;
