const searchForm = document.querySelector("form");
const serachResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";

const APP_ID = "3e020a12";
const APP_KEY = "758fcce35a8403fd2a0f2c480752fdd6";

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = event.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const BASE_URL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const response = await fetch(BASE_URL);
  const data = await response.json();
  generateHTML(data.hits);
}

function generateHTML(results) {
  let generatedHtml = "";
  results.map((result) => {
    generatedHtml += `<div class="item">
        <img src="${result.recipe.image}" alt="" />
        <div class="flex-container">
          <div class="title">${result.recipe.label}</div>
          <a class="view-button" href="${
            result.recipe.url
          }" target="_blank">View recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet label: ${result.recipe.dietLabel}</p>
        <p class="item-data">Health label: ${result.recipe.healthLabel}</p>
      </div>
`;
  });

  serachResultDiv.innerHTML = generatedHtml;
}
