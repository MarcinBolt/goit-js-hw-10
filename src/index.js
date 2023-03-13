import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// Notifix library npm installation: npm i notiflix
// Notiflix.Notify.info('Too many matches found. Please enter a more specific name.);
// Notiflix.Notify.failure('Oops, there is no country with that name');

const countryList = document.querySelector('country-list');
const input = document.querySelector('input#search-box');
const DEBOUNCE_DELAY = 300;
const urlFilter = 'https://restcountries.com/v2/all?fields=name.official,capital,population,flags.svg,languages';

// `https://restcountries.com/v3.1/name/name`

// fetchCountries(name);


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
  return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
    //   console.log(response.json());
        
        let odp = response.json();
        console.log(odp);
        return odp;
    })
    .then(countries => {
      // Data handling
      console.log('jest odpowiedź then');
    //   renderFilteredMatchingCountries(countries);
    })
    .catch(error => {
      // Error handling
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

//   function fetchCountries(name) {
//   return fetch(`https://restcountries.com/v3.1/name/${name}`).then(
//     (response) => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     }
//   );
// }

function renderFilteredMatchingCountries(countries) {
    const markup = countries
      .map(country => {
          return `<li>
          <p><b>Country</b>: ${country.name.official}</p>
        </li>`;
      })
      .join('');
      countryList.innerHTML = markup;
}
