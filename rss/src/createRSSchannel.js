var libxmljs = require('libxmljs');

async function createRSSchannel(title, description, link, search_api_language) {
	var doc = new libxmljs.Document();

	// creating xml
	doc
		.node('rss')
		.attr({
			version: '2.0',
			'xml:base':
				'https://techtransfer.cancer.gov/rss/diagnostics/abstracts.xml',
			'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
			'xmlns:atom': 'http://www.w3.org/2005/Atom',
			'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
			'xmlns:foaf': 'http://xmlns.com/foaf/0.1/',
			'xmlns:og': 'http://ogp.me/ns#',
			'xmlns:rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
			'xmlns:sioc': 'http://rdfs.org/sioc/ns#',
			'xmlns:sioct': 'http://rdfs.org/sioc/types#',
			'xmlns:skos': 'http://www.w3.org/2004/02/skos/core#',
			'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema#',
		})
		.node('channel')
		.node('title', title)
		.parent()
		.node('link', link)
		.parent()
		.node('description', description)
		.parent()
		.node('language', search_api_language)
		.parent()
		.node('atom:link')
		.attr({
			href: link,
			rel: 'self',
			type: 'application/rss+xml',
		});

	return doc;
}

module.exports = createRSSchannel;
