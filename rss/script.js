const algoliasearch = require('algoliasearch');
var libxmljs = require('libxmljs');
var fs = require('fs');

const client = algoliasearch('WEXCESI5EU', '3986149b687b8f20e2468432f329f08c');
// let url = new URL('https://wexcesi5eu-dsn.algolia.net/1/indexes/ott_updated_idx?x-algolia-api-key=3986149b687b8f20e2468432f329f08c&x-algolia-application-id=WEXCESI5EU&hitsPerPage=1&facetFilters=field_ics:NCI');

const index = client.initIndex('ott_updated_idx');

const rssFiles = [
  {
    title: "Medical Devices",
    link: "http://www.example.com",
    facetFilerFields: ["field_ics:NCI", ["field_applications:Medical Devices", "field_applications:Non-Medical Devices"]]
  },
  {
    title: "Diagnostics",
    link: "http://www.example.com",
    facetFilerFields: ["field_ics:NCI", "field_applications:Diagnostics"]
  },
  {
    title: "Research Materials",
    link: "http://www.example.com",
    facetFilerFields: ["field_ics:NCI", "field_applications:Research Materials"]
  },
  {
    title: "Therapeutics",
    link: "http://www.example.com",
    facetFilerFields: ["field_ics:NCI", "field_applications:Therapeutics"]
  },
  {
    title: "Software and Apps",
    link: "http://www.example.com",
    facetFilerFields: ["field_ics:NCI", "field_applications:Software / Apps"]
  },
  {
    title: "Vaccines",
    link: "http://www.example.com",
    facetFilerFields: ["field_ics:NCI", "field_applications:Vaccines"]
  },
]
/*
const facetFilterFields = [
    ["field_ics:NCI", ["field_applications:Medical Devices", "field_applications:Non-Medical Devices"]],
    ["field_ics:NCI", "field_applications:Diagnostics"],
    ["field_ics:NCI", "field_applications:Research Materials"],
    ["field_ics:NCI", "field_applications:Therapeutics"],
    ["field_ics:NCI", "field_applications:Software / Apps"],
    ["field_ics:NCI", "field_applications:Vaccines"]
];
*/

// creating xml files
for (let i = 0; i < rssFiles.length; i++) {
    var results;
    index.search('', {
        facetFilters: rssFiles[i].facetFilerFields,
        hitsPerPage: 10
      }).then(({ hits }) => {
        results = hits;
        var doc = new libxmljs.Document();
        //console.log(results);
        // creating xml
        doc.node('rss').attr({version: "2.0", 'xml:base': "https://techtransfer.cancer.gov/rss/diagnostics/abstracts.xml", 'xmlns:dc': "http://purl.org/dc/elements/1.1/",
                'xmlns:atom': "http://www.w3.org/2005/Atom", 'xmlns:content': "http://purl.org/rss/1.0/modules/content/", 'xmlns:foaf': "http://xmlns.com/foaf/0.1/",
                'xmlns:og': "http://ogp.me/ns#", 'xmlns:rdfs': "http://www.w3.org/2000/01/rdf-schema#", 'xmlns:sioc': "http://rdfs.org/sioc/ns#",
                'xmlns:sioct': "http://rdfs.org/sioc/types#", 'xmlns:skos': "http://www.w3.org/2004/02/skos/core#", 'xmlns:xsd': "http://www.w3.org/2001/XMLSchema#"})
            .node('channel')
                .node('title', rssFiles[i].title)
                .parent()
                .node('link', rssFiles[i].link)
                .parent()
                .node('description', 'Available Technologies from the Technology Transfer Center.')
                .parent()
                .node('language', rssFiles[i].search_api_language)
                .parent()
                .node('atom:link').attr({href: rssFiles[i].link, rel: "self", type: "application/rss+xml"})
        // creating rss items
        for (let x = 0; x < results.length; x++) {

                var channel = doc.get('//channel');
                channel.node('item')
                    .node('title', results[x].title)
                    .parent()
                    .node('link', results[x].url)
                    .parent()
                    .node('description', results[x].body)
                    .parent()
                    .node('pubDate', results[x].field_date_published)
                    .parent()
                    .node('dc:creator', 'Anonymous')
                    .parent()
                    .node('guid', rssFiles[i].link + "/" + results[x].field_id).attr({isPermaLink: "false"})
                    .parent()
        }

        // write out the XML to files
        const toWrite = libxmljs.parseXml(doc.toString());
        fs.writeFile('./public/' + rssFiles[i].title + '.xml', toWrite.toString(), function(err) {
            if (err) throw err;
            console.log("XML successfully written");
        })

      }).catch(function (e) {
          console.log("Promise Rejected");
          console.log(e);
      });

      // console.log(doc.toString());
}
