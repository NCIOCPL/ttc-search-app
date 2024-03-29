import './index.scss';

/**
 * Initializes the  App.
 * @param {object} params - Configuration for the app
 */
const initialize = ({
	rootId = 'NCI-app-root',
	basePath = 'search',
	searchKey = 'key',
	src = 'https://www.techtransfer.nih.gov/modules/custom/nih_algolia/js/ott-search.js',
	title = 'TTC Abstract Search',
} = {}) => {
	const appRoot = document.getElementById(rootId);

	// create the settings
	const ottSettings = document.createElement('script');
	var code;

	// create an EDDL analytics object
	window.NCIDataLayer = window.NCIDataLayer || [];
	let pageInfo = {};

	// _satellite is defined by the CMS
	/* eslint-disable no-undef */
	if (typeof _satellite === 'object') {
		pageInfo = {
			name: _satellite.getVar('Fn:getPageName'),
			title: _satellite.getVar('DOM:Meta:OpenGraph:Title'),
			metaTitle: _satellite.getVar('DOM:Title'),
			language: _satellite.getVar('Fn:getNciPageLang'),
			type: _satellite.getVar('DOM:Meta:DCTerms:Type'),
			audience: _satellite.getVar('Fn:getNciAudience'),
			channel: _satellite.getVar('DOM:Meta:DCTerms:Subject'),
			contentGroup: _satellite.getVar('DOM:Meta:DCTerms:IsPartOf'),
			publishedDate: _satellite
				.getVar('DOM:Meta:DCTerms:Issued')
				.split(' - ')[0],
			additionalDetails: {},
		};

		var pageNum = parseInt(_satellite.getVar('Query:Page'));
		if (!isNaN(pageNum)) {
			pageInfo.additionalDetails['pageNum'] = pageNum;
		}
	}
	/* eslint-enable no-undef */

	const params = new Proxy(new URLSearchParams(window.location.search), {
		get: (searchParams, prop) => searchParams.get(prop),
	});
	let abstractId = params[searchKey];

	// determine if this is the search page or detail page
	if (abstractId === null) {
		// create the h1 title tag
		const pageTitle = document.createElement('h1');
		pageTitle.appendChild(document.createTextNode(title));
		appRoot.appendChild(pageTitle);

		// create search page settings
		code = `
		ottEmbedSettings = {
		selector: ".ott-embed",
		facetType: false, // hide Content Type facet
		sort: true,  // hide sort by dropdown
		pager: true,
		hitsPerPage: 25,
		filter: 'field_data_source:NCI',  // Limit to NCI abstracts
		searchResultTemplate:\`
				<article class="{{ type }}">
				<p class="'title'">
				<a href='${basePath}?${searchKey}={{ field_id }}'>{{#helpers.snippet}}{ "attribute": "title" }{{/helpers.snippet}}</a>
				</p>
				<p class="content-type">
					Technology <span class="field_id">{{#helpers.snippet}}{ "attribute": "field_id" }{{/helpers.snippet}}</span>
				</p>
				<p class="inventors">
					{{#helpers.snippet}}{ "attribute": "field_lead_inventors" }{{/helpers.snippet}}
				</p><noscript>Javascript must be enabled for the TTC Abstract Search Form to work.</noscript>

				<p class="desc body">
					{{#helpers.snippet}}{ "attribute": "rendered_item" }{{/helpers.snippet}}
				</p>
				</article>
				\`,
		};`;

		// register the page launch
		window.NCIDataLayer.push({
			type: 'PageLoad',
			event: 'AbstractSearchPageLoad',
			page: pageInfo,
		});
	} else {
		// detail page settings
		let hrefPath;

		if (document.referrer.indexOf(basePath) == -1) {
			hrefPath = basePath;
		} else {
			hrefPath =
				basePath +
				document.referrer.substring(
					document.referrer.indexOf(basePath) + basePath.length
				);
		}

		code = `
			ottEmbedSettings = {
				detailSelector: '.ott-embed',
				detailParameter: '${searchKey}',
				detailTitleTemplate: '\\\${title}',
				detailBreadcrumbSelector: '.usa-breadcrumb__list',
				detailBreadcrumbTemplate: \`
					<li class="usa-breadcrumb__list-item">
						<a href="/" class="usa-breadcrumb__link">
							<span>Home</span>
						</a>
					</li>
					<li class="usa-breadcrumb__list-item">
						<a href="${hrefPath}" class="usa-breadcrumb__link">
							<span>${title}</span>
							</a>
						</li>
					<li class="usa-breadcrumb__list-item usa-current" aria-current="page">
						<span>\\\${title}</span>
					</li>
					\`,
			};`;

		// _satellite is defined by the CMS
		/* eslint-disable no-undef */
		if (typeof _satellite === 'object') {
			console.log(pageInfo);
			pageInfo.additionalDetails['abstractId'] = abstractId;
		}
		/* eslint-enable no-undef */

		// register the page launch
		window.NCIDataLayer.push({
			type: 'PageLoad',
			event: 'AbstractDetailsPageLoad',
			page: pageInfo,
		});
	}

	// create the OTT embed div
	const ottEmbed = document.createElement('div');
	ottEmbed.setAttribute('class', 'ott-embed');
	appRoot.appendChild(ottEmbed);

	ottSettings.appendChild(document.createTextNode(code));
	appRoot.appendChild(ottSettings);

	// create the NIH script tag
	const ottScript = document.createElement('script');
	ottScript.src = src;
	ottScript.async = false;
	ottScript.setAttribute('onload', 'ott_embed(ottEmbedSettings);');
	var head = document.head || document.getElementsByTagName('head')[0];
	head.appendChild(ottScript);

	return appRoot;
};

export default initialize;

// Expose initialization function to window.
window.TTCSearchApp = initialize;
