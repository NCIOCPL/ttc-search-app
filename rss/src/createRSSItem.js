async function createRSSItem(result, itemLink, doc) {
	var channel = doc.get('//channel');

	const pubDate = new Date(result.field_date_published * 1000);

	channel
		.node('item')
		.node('title', result.title)
		.parent()
		.node('link', 'https://' + process.env.DOMAIN + itemLink + result.field_id)
		.parent()
		.node('description', result.body)
		.parent()
		.node('pubDate', pubDate.toString())
		.parent()
		.node('dc:creator', 'Anonymous')
		.parent()
		.node('guid', itemLink + result.field_id)
		.attr({ isPermaLink: 'true' })
		.parent();

	return channel;
}

module.exports = createRSSItem;
