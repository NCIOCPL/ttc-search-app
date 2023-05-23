module.exports = {
	extends: "@nciocpl/eslint-config-vanilla-js",
	env: {
		es6: true,
		node: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended',
	],
	settings: {
	},
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 2016,
		sourceType: 'module',
	},
	// Plugins are configured by the recommended extensions above
	rules: {
	},
};
