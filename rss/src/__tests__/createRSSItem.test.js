var libxmljs = require('libxmljs');
const rssItem = require('../createRSSItem');
const result = require('./__fixtures__/single-result');

describe('Create RSS Item', () => {
	it('creates an RSS Item', async () => {
		// we need a blank document to work with
		var doc = new libxmljs.Document();
		const url = '/my/path/to/page';
		doc.node('root').node('channel');

		const item = await rssItem(result, url, doc);
		expect(item.get('/root/channel/item/title').text()).toEqual(result.title);
		expect(item.get('/root/channel/item/link').text()).toEqual(
			'https://' + process.env.DOMAIN + url + result.field_id
		);
		expect(item.get('/root/channel/item/description').text()).toEqual(
			result.body
		);
		expect(item.get('/root/channel/item/pubDate').text()).toEqual(
			new Date(result.field_date_published * 1000).toString()
		);
		expect(
			item.get('/root/channel/item/*[name()="dc:creator"]').text()
		).toEqual('Anonymous');
		expect(item.get('/root/channel/item/guid').text()).toEqual(
			url + result.field_id
		);
	});
});
