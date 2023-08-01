const libxmljs = require('libxmljs');

async function createSitemap(hits) {
	var sitemap = new libxmljs.Document();
	sitemap.node('urlset').attr({
		xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
		'xmlns:news': 'http://www.google.com/schemas/sitemap-news/0.9',
		'xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
		'xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
		'xmlns:video': 'http://www.google.com/schemas/sitemap-video/1.1',
	});

	var urlset = sitemap.get('//urlset');
	for (const hit of hits) {
		urlset
			.node('url')
			.node(
				'loc',
				'https://techtransfer.cancer.gov/_abstract/abstract/' +
					hit.field_data_source_id
			)
			.parent();
	}

	return sitemap;
}

module.exports = createSitemap;
