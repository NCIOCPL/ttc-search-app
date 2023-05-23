
const defaultPath = 'http://localhost:8080'
const path = process.env.BACKSTOP_BASE_URL ? process.env.BACKSTOP_BASE_URL : defaultPath;

module.exports = {
  "id": "backstop_default",
  "viewports": [
    {
      "label": "phone",
      "width": 320,
      "height": 480
    },
    {
      "label": "tablet",
      "width": 1024,
      "height": 768
    }
  ],
  "onBeforeScript": "puppet/onBefore.js",
  "onReadyScript": "puppet/onReady.js",
  "scenarios": [
    {
      "label": "Search Homepage",
      "cookiePath": "backstop_data/engine_scripts/cookies.json",
      "url": path,
      "referenceUrl": "",
      "readyEvent": "",
      "readySelector": "",
      "delay": 10000,
      "hideSelectors": [".hits"],
      "removeSelectors": [],
      "hoverSelector": "",
      "clickSelector": "",
      "postInteractionWait": 0,
      "selectors": [],
      "selectorExpansion": true,
      "expect": 0,
      "misMatchThreshold" : 0.5,
      "requireSameDimensions": true
    },
    {
      "label": "Abstract Page",
      "cookiePath": "backstop_data/engine_scripts/cookies.json",
      "url": path + "/?abstract=NCI-E-029-2021",
      "referenceUrl": "",
      "readyEvent": "",
      "readySelector": "",
      "delay": 10000,
      "hideSelectors": [],
      "removeSelectors": [],
      "hoverSelector": "",
      "clickSelector": "",
      "postInteractionWait": 0,
      "selectors": [],
      "selectorExpansion": true,
      "expect": 0,
      "misMatchThreshold" : 0.5,
      "requireSameDimensions": true
    }
  ],
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "backstop_data/engine_scripts",
    "html_report": "backstop_data/html_report",
    "ci_report": "backstop_data/ci_report"
  },
  "report": ["browser"],
  "engine": "puppeteer",
  "engineOptions": {
    "args": ["--no-sandbox"]
  },
  "asyncCaptureLimit": 5,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
}