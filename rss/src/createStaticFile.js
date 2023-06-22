async function createStaticFile(hit) {
	var description = hit.body.replace(/<[^>]+>/g, '').slice(0, 200);
	const lastPeriodIndex = description.lastIndexOf('.');
	if (lastPeriodIndex !== -1) {
		description = description.slice(0, lastPeriodIndex + 1);
	}

	const doc = `<!DOCTYPE html><html><head><title>${hit.title}</title><meta name="description" content="${description}" /></head > <body>${hit.rendered_item_embed}</body></html>`;

	return doc;
}

module.exports = createStaticFile;
