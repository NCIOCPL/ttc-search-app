const createStaticFile = require('../createStaticFile');
const result = require('./__fixtures__/single-result');

describe('Create Static File', () => {
	it('creates a document', async () => {
		const staticFile = await createStaticFile(result);
		expect(staticFile);
	});

	it('inserts the title', async () => {
		const staticFile = await createStaticFile(result);
		const title = staticFile.match(/<title>([\s\S]*)<\/title>/)[1];
		expect(title).toEqual(result.title);
	});

	it('renders out the body content', async () => {
		const staticFile = await createStaticFile(result);
		const bodyContent = staticFile.match(/<body>([\s\S]*)<\/body>/)[1];
		expect(bodyContent).toEqual(result.rendered_item_embed);
	});
});
