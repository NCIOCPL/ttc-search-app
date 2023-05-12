/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import fs from 'fs';
import '../index.js'
// without importing these first sometimes JSDOM randomly throws errors
import { TextDecoder, TextEncoder } from 'util';
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('src/index.html', 'utf8');
const jsdom = new JSDOM(html, {runScripts: "dangerously", resources: "usable"});

global.window = jsdom.window;
global.document = jsdom.window.document;

const ttcParams = {
  rootId: 'app-root',
  basePath: '/',
  searchKey: 'abstract',
  src: 'https://www.techtransfer.nih.gov/modules/custom/nih_algolia/js/ott-search.js',
  title: 'TTC Abstract Search'
}

describe('search homepage', () => {

  // set up the app
  document.body.innerHTML = html;
  window.TTCSearchApp(ttcParams);
  const parent = screen.getByTestId('app-root');

  // beforeEach(() => {
  // });

  it('loads the OTT search form', async () => {
    const search = await screen.findByRole("search");
    expect(search);
  });

});
