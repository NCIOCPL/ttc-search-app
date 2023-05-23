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

	// create the h1 title tag
	const pageTitle = document.createElement('h1');
	pageTitle.appendChild(document.createTextNode(title));
	appRoot.appendChild(pageTitle);

	// create the OTT embed div
	const ottEmbed = document.createElement('div');
	ottEmbed.setAttribute('class', 'ott-embed');
	appRoot.appendChild(ottEmbed);

	// create the settings
	const ottSettings = document.createElement('script');
	var code;

	const params = new Proxy(new URLSearchParams(window.location.search), {
		get: (searchParams, prop) => searchParams.get(prop),
	});
	let abstractId = params[searchKey];

	// determine if this is the search page or detail page
	if (abstractId === null) {
		// search page settings
		code = `
		ottEmbedSettings = {
		selector: ".ott-embed",
		facetType: false, // hide Content Type facet
		sort: true,  // hide sort by dropdown
		pager: true,
		hitsPerPage: 25,
		filter: 'field_ics:NCI',  // Limit to NCI abstracts
		searchResultTemplate:\`
				<article class="{{ type }}">
				<p class="content-type">
					Technology <span class="field_id">{{#helpers.snippet}}{ "attribute": "field_id" }{{/helpers.snippet}}</span>
				</p>
				<p class="'title'">
					<a href='${basePath}?${searchKey}={{ field_id }}'>{{#helpers.snippet}}{ "attribute": "title" }{{/helpers.snippet}}</a>
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
	} else {
		// detail page settings
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
					<a href="${basePath}${document.referrer.substring(
			document.referrer.indexOf(basePath) + basePath.length
		)}" class="usa-breadcrumb__link">
						<span>TTC Abstract
							Search</span>
						</a>
					</li>
				<li class="usa-breadcrumb__list-item usa-current" aria-current="page">
					<span>\\\${title}</span>
				</li>
				\`,
		};`;
	}

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
