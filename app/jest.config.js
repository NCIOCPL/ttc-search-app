module.exports = {
	testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        resources: 'usable',
        runScripts: 'dangerously',
    },
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': "<rootDir>src/__mocks__/styleMock.js",
	},
	globals: {
		 TextEncoder: require("util").TextEncoder,
		 TextDecoder: require("util").TextDecoder
	 }
};