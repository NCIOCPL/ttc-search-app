import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import fs from 'fs';
import '../index.js'

const html = fs.readFileSync('src/index.html', 'utf8');

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

  it('adds an H1 tag', () => {
    // Look for the H1
    const h1 = parent.querySelector('h1');
    expect(h1.innerHTML).toBe(ttcParams.title);
  });

  it('adds a <div> for the widget', () => {
    // Look for the embed div
    const child = parent.querySelector('.ott-embed');
    expect(child).toBeInTheDocument();

  });

  it('adds the script tags', () => {
    // Look for the script tag
    const scriptTag = parent.querySelector('script')
    expect(scriptTag.innerHTML).toContain(ttcParams.searchKey)
  });

  // to-do: look for the header script tag

});
