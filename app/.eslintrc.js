module.exports = {
	extends: "@nciocpl/eslint-config-vanilla-js",
	env: {
		browser: true,
		es6: true,
		node: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:prettier/recommended',
	],
	settings: {
	},
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 2016,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	// Plugins are configured by the recommended extensions above
	rules: {
	},
	globals: {
		cy: true,
		Cypress: true,
		getFixture: true,
	},
};
