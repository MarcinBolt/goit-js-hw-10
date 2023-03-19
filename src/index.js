import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// Notifix library npm installation: npm i notiflix
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
  countryList.textContent = '';
  if (!searchingPhrasesTrimmed) {
    return;
  }
  fetchCountries(searchingPhrasesTrimmed)
    .then(data => {
      if (data.length > 10) {
        notifyAboutTooManyMatchesFound();
        return;
      }
      if (data.length === 1) {
        renderOneCountry(data);
        return;
      }
      renderFilteredMatchingCountries(data);
    })
    .catch(error => {
      // Error handling
      notifyAboutError();
      return;
    });
}

const notifyAboutTooManyMatchesFound = () =>
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );

const notifyAboutError = () => {
  countryList.textContent = '';
  Notiflix.Notify.failure('Oops, there is no country with that name');
};

function renderOneCountry(countries) {
  const markup = countries.map(country => {
    return `<p class="one-country-paragraph">
          <img class="one-country__flag" height="30" src="${
            country.flags.svg
          }" alt="${country.flags.alt}">${country.name.common}</p>
        <ul class="one-country-list">
        <li class="one-country-list-description"><span class="country-description-span">Capital: </span>${
          country.capital[0]
        }</li>
        <li class="one-country-list-description"><span class="country-description-span">Population: </span>${
          country.population
        }</li>
        <li class="one-country-list-description"><span class="country-description-span">Languages: </span>${Object.values(
          country.languages
        ).join(', ')}</li>
        </ul>`;
  });
  countryList.innerHTML = markup;

  const oneCountryListDescription = document.querySelectorAll(
    '.one-country-list-description'
  );
  const oneCountryParagraph = document.querySelectorAll(
    '.one-country-paragraph'
  );
  const oneCountryFlag = document.querySelector('.one-country__flag');
  const oneCountryList = document.querySelector('.one-country-list');
  const oneCountryDescriptionSpan = document.querySelectorAll(
    '.country-description-span'
  );

  //STYLING
  oneCountryList.style.paddingLeft = '0';
  oneCountryFlag.style.paddingRight = '10px';
  oneCountryListDescription.forEach(element => {
    element.style.display = 'flex';
    element.style.flexDirection = 'row';
    element.style.gap = '5px';
    element.style.justifyContent = 'left';
    element.style.alignItems = 'center';
    element.style.fontSize = '18px';
    element.style.marginBlock = '20px';
  });
  oneCountryParagraph.forEach(element => {
    element.style.display = 'flex';
    element.style.flexDirection = 'row';
    element.style.justifyContent = 'left';
    element.style.alignItems = 'center';
    element.style.fontSize = '35px';
    element.style.lineHeight = '1';
    element.style.fontWeight = '700';
    element.style.marginBlock = '20px';
  });
  oneCountryDescriptionSpan.forEach(element => {
    element.style.fontWeight = '700';
  });
  //STYLING
}

function renderFilteredMatchingCountries(countries) {
  countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  const markup = countries
    .map(country => {
      return `<li class="country-list-element">
          <img class="country__flag" width="30" src="${country.flags.svg}" alt="${country.flags.alt}"><p class="country-list-element__name">${country.name.common}</p>
        </li>`;
    })
    .join('');
  countryList.innerHTML = markup;

  const countryListElement = document.querySelectorAll('.country-list-element');
  const countryElementName = document.querySelectorAll(
    '.country-list-element__name'
  );

  //STYLING
  countryListElement.forEach(element => {
    element.style.display = 'flex';
    element.style.flexDirection = 'row';
    element.style.gap = '15px';
    element.style.fontSize = '20px';
    element.style.justifyContent = 'left';
    element.style.alignItems = 'center';
    element.style.margin = '0';
    element.style.lineHeight = '2';
  });
  countryElementName.forEach(element => {
    element.style.display = 'flex';
    element.style.margin = '0';
  });
  //STYLING
}

input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));
