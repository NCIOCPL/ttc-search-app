## Vanilla JS Site

### Requirements
* Node 16 & NPM 8
* Be logged in to the @nciocpl github registry with a valid github token

### Install
1. Clone the repo
2. `npm ci`

### How can I use it?
* `./src/index.html` is your web page
* `./src/index.js` is the entrypoint, so put your JS there
* `./src/index.scss` is the sass for your styles. It must be imported in `./src/index.js` for your css to work.
* Put static assets into `./public` and they will be copied into the `./dist/assets` folder upon building. (they should also work for `npm start`)

When you do a `npm run build` or `npm start` the html will automatically be injected with the location of the JS file and the CSS.

>_**NOTE 1:**_ when doing `npm start` it uses the `style-loader` module and does not make a real .css file. This is the only way that using the webpack watch function will automatically rebuild + reload modules upon changes. 	Your css should work as you expect it to.

>_**NOTE 2:**_ if you need to publish the example page with a base url other than /, use `EXAMPLE_SITE_PUBLIC_PATH=/<new_root_here> npm run build`. One might do this if you want to preview the page/app on react-app-dev.cancer.gov.

#### How can I add more pages?
Meh, you can, but it is a pain in the rear. you need to add each .html file as an instance of `HtmlWebpackPlugin`. Something like the following.
```
htmlFiles = ['index.html', 'folder/page1.html'];
...htmlFiles.map(
	(htmlFile) =>
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.src + `/{htmlFile}`,
			filename: htmlFile,
			minify: false,
			meta: {
				charset: { charset: 'UTF-8' },
			},
		})
),
```

### What is included??
* Webpack 5 for your building needs
  * run `npm run build` to publish your site to `./dist`
* Webpack Dev Server for your development needs
  * run `npm start` to run the dev server.
* Dart Sass (npm module named `sass`) for your sass needs
  * This includes postcss
* Babel 7 for all your transpiling needs
* Eslint 7 with [@nciocpl/eslint-config-vanilla-js](https://github.com/NCIOCPL/cgov-standards-xt/tree/develop/packages/eslint-config-vanilla-js) lint rules
	* run `npm run lint` to lint. Run `npm run lint:fix` to fix any automatically fixed errors.
* Our common `.editorconfig`

>_**NOTE:**_ NOTE: This has Jest, but it is not configured.
