require('dotenv').config();
const rssChannel = require('../createRSSchannel');

describe('Create RSS Channel', () => {
	let title, description, channelLink, language;

	beforeEach(() => {
		title = 'My title';
		description = 'My description of the channel';
		channelLink = '/rss/my_channel.xml';
		language = 'en';
	});

	it('creates an XML document', async () => {
		const result = await rssChannel(title, description, channelLink, language);
		expect(result.constructor.name).toEqual('XMLDocument');
	});

	it('populates the correct data', async () => {
		const result = await rssChannel(title, description, channelLink, language);
		expect(result.get('/rss/channel/title').text()).toEqual(title);
		expect(result.get('/rss/channel/link').text()).toEqual(
			'https://' + process.env.DOMAIN + channelLink
		);
		expect(
			result
				.get('/rss/channel/*[name()="atom:link"]')
				.getAttribute('href')
				.value()
		).toEqual('https://' + process.env.DOMAIN + channelLink);
		expect(result.get('/rss/channel/description').text()).toEqual(description);
		expect(result.get('/rss/channel/language').text()).toEqual(language);
	});
});
