import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// Notifix library npm installation: npm i notiflix
// Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
// Notiflix.Notify.failure('Oops, there is no country with that name');

const body = document.querySelector('body');
const countryList = document.querySelector('.country-list');
const input = document.querySelector('input#search-box');
const DEBOUNCE_DELAY = 300;

//STYLING
body.style.margin = '25px';
countryList.style.paddingLeft = '0';

input.addEventListener('input', event => {
  let searchingPhrasesTrimmed = input.value.trim();
  if (!searchingPhrasesTrimmed) {
    console.log('Empty input or only space/s');
  } else {
    console.log('JEST wpis w input');
    fetchCountries(searchingPhrasesTrimmed);
  }
});

function fetchCountries(countryName) {
  return fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log('jest odpowiedź then');
      if (data.length > 10) {
        countryList.textContent = '';
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        console.log(data.map(country => console.log(country)));
      } else if (data.length === 1) {
        console.log('tylko jeden kraj, dodać do jednego diva');
        countryList.textContent = '';
        console.log(data[0]);
      } else {
        console.log('dodać listę z państwami od 2 do 10');
        console.log(data.length);
        countryList.textContent = '';
        renderFilteredMatchingCountries(data);
      }

      // renderFilteredMatchingCountries(data);
    })
    .catch(error => {
      // Error handling
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderFilteredMatchingCountries(countries) {
  // console.log('JEST w funkcji renderFilteredMatchingCountries()');
  countryList.textContent = '';
  countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  console.log(countries[0]);
  const markup = countries
    .map(country => {
      return `<li class="country-list-element">
          <img class="country__flag" width="40" height="25" src="${country.flags.svg}"><p class="country-list-element__name">${country.name.common}</p>
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
    element.style.justifyContent = 'left';
    element.style.alignItems = 'center';

    element.style.margin = '0';
    // element.style.marginLeft = '0';
    // element.style.listStyleType = 'none';
  });

  countryElementName.forEach(element => {
    element.style.display = 'flex';
    element.style.fontSize = '30px';
    element.style.margin = '0';
  });
}
