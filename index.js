("use strict");

const APP_KEY = "846c421a229556d4caf48ba5b2325333";
const APP_ID = "02348ab9";
const searchURL = "https://api.edamam.com/search";

$(document).ready(function() {
  watchSubmitForm();
});

function watchSubmitForm() {
  console.log("watchSumbitForm works!");
  $("#js-form").submit(e => {
    e.preventDefault();
    getRecipe();
  });
}

function formatQueryParams(params) {
  console.log("formatQueryParams function works!");
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function getRecipe() {
  const params = {
    app_key: APP_KEY,
    app_id: APP_ID,
    q: $("#recipe-search").val()
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;
  fetch(url)
    .then(response => response.json())
    .then(function(data) {
      displayResults(data);
    })
    .catch(err => {
      console.log(err);
      alert("Something went wrong, try again!");
    });
}

function displayResults(data) {
  $("#results-list").empty();
  for (let i = 0; i < data.hits.length; i++) {
    $("#results-list").append(`
    <div class="panel">
    <div class="heading">
      <h3 class="title">${data.hits[i].recipe.label}</h3>
    </div>
    <div class="heading">
    <img class="image" src=${data.hits[i].recipe.image}     />
  </div>
    <div class="title">
    <ul class="calories">${data.hits[i].recipe.calories}</ul>
    </div>`);
  }
  $("#results").removeClass("hidden");
}
