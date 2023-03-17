import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries.js';

const body = document.querySelector('body');
const countryList = document.querySelector('.country-list');
const input = document.querySelector('input#search-box');
const DEBOUNCE_DELAY = 300;

//STYLING
body.style.margin = '20px';
countryList.style.paddingLeft = '0';
input.style.minWidth = '300px';
input.style.marginBottom = '0';
input.style.borderRadius = '2px';
input.addEventListener('focus', event => {
  event.target.style.borderColor = '#0066cc';
  event.target.style.outline = 'none';
});
input.addEventListener('blur', event => {
  event.target.style.borderColor = 'black';
});
//STYLING

function handleInput() {
  let searchingPhrasesTrimmed = input.value.trim();
  if (!searchingPhrasesTrimmed) {
    countryList.textContent = '';
  } else {
    countryList.textContent = '';
    fetchCountries(searchingPhrasesTrimmed);
  }
}

input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));
