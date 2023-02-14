import "./css/styles.css";

import debounce from "lodash.debounce";
import Notiflix from "notiflix";
import { fetchCountries } from "./fetchCountries";

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector("#search-box");

inputEl.addEventListener("input", debounce(takeValue, DEBOUNCE_DELAY));

function takeValue(e) {
  listEl.innerHTML = "";
  const valueIn = e.target.value.trim();
  if (valueIn && !"")
    fetchCountries(valueIn)
      .then((obj) => {
        scheckQuantity(obj);
      })
      .catch((error) =>
        Notiflix.Notify.failure("Oops, there is no country with that name")
      );
}

function scheckQuantity(obj) {
  if (obj.length > 10) {
    Notiflix.Notify.info(
      "Too many matches found. Please enter a more specific name."
    );
    return "";
  }

  if (obj.length >= 2 && obj.length < 10) {
    createListCountries(obj);
    return "";
  }

  const markupEl = createListOneCountry(obj[0]);
  rendorHtml(markupEl);
}

function createListOneCountry({ name, capital, population, flags, languages }) {
  if (languages.length > 1) {
    let langArr = languages.map((item) => {
      return item.name;
    });

    return `
        <li class="item"><img class="list-img" src="${flags.svg}" width=40" height="20"><span class="top-text">${name}<span></li> 
        <li class="item"><span class="list-text">Capital:</span>${capital}</li>
        <li class="item"><span class="list-text">Population:</span>${population}</li>
        <li class="item"><span class="list-text">Languages:</span>${langArr}</li>
        `;
  } else
    return `
    <li class="item"><img class="list-img" src="${flags.svg}" width=40" height="20"><span class="top-text">${name}<span></li> 
    <li class="item"><span class="list-text">Capital:</span>${capital}</li>
    <li class="item"><span class="list-text">Population:</span>${population}</li>
    <li class="item"><span class="list-text">Languages:</span>${languages[0].name}</li>
    `;
}

function createListCountries(obj) {
  const newObj = obj.map(({ name, flags }) => {
    return `
      <li class="item"><img class="list-img" src="${flags.svg}" width=40" height="20">${name}</li> `;
  });
  rendorHtml(newObj.join(""));
}

const listEl = document.querySelector(".country-list");

function rendorHtml(el) {
  listEl.innerHTML = "";
  listEl.style.listStyle = "none";
  listEl.insertAdjacentHTML("afterbegin", el);
}

