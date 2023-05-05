const config = require('../rss-files-config.js');

describe('Configuration file validation', () => {
	it('is an array', () => {
		expect(Array.isArray(config)).toBe(true);
	});

	it('has all the required elements', () => {
		expect(Array.isArray(config)).toBe(true);

		config.forEach((item) => {
			expect(item).toHaveProperty('title');
			expect(item).toHaveProperty('description');
			expect(item).toHaveProperty('link');
			expect(item).toHaveProperty('facetFilterFields');

			expect(Array.isArray(item.facetFilterFields)).toBe(true);
		});
	});
});
