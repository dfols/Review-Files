// Select the container element from the DOM where Pokemon will be displayed.
let container = document.getElementById("container");

/**
 * Fetch a list of Pokemon from the PokeAPI.
 * @returns {Array} An array of Pokemon up to the limit of 151.
 */
async function getAllPokemon() {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  if (response.ok) {
    let data = await response.json();
    return data.results;
  }
}

/**
 * Fetch sprites (images) of a Pokemon using its specific URL.
 * @param {string} url - The URL of the specific Pokemon.
 * @returns {Object} The sprites object containing URLs for different images.
 */
async function getPokemonSprites(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data.sprites;
}

/**
 * Display all Pokemon on the page. This function fetches each Pokemon's data,
 * creates a card for each one, and appends it to the main container.
 */
async function displayPokemon() {
  let allPokemon = await getAllPokemon();
  for (let pokemon of allPokemon) {
    // Fetch the sprites for this specific Pokemon.
    let sprites = await getPokemonSprites(pokemon.url);

    // Create a card element for the Pokemon.
    let card = document.createElement("div");
    card.classList.add("pokemon");

    // Create and set the Pokemon's name.
    let name = document.createElement("span");
    name.innerText = pokemon.name;

    // Create an image element and set its source to the default sprite.
    let image = document.createElement("img");
    image.src = sprites.front_default;
    let imageContainer = document.createElement("div");
    imageContainer.classList.add("img-container");

    // Create a button to flip the Pokemon image.
    let flipButton = document.createElement("button");
    flipButton.innerText = "flip";
    flipButton.addEventListener("click", () => {
      // Toggle between different sprite views based on current view.
      if (image.src === sprites.back_shiny) {
        image.src = sprites.front_shiny;
      } else if (image.src === sprites.back_default) {
        image.src = sprites.front_default;
      } else if (image.src === sprites.front_shiny) {
        image.src = sprites.back_shiny;
      } else {
        image.src = sprites.back_default;
      }
    });

    // Create a button to toggle between shiny and regular sprites.
    let shinyButton = document.createElement("button");
    shinyButton.innerText = "show/hide shiny";
    shinyButton.addEventListener("click", () => {
      // Toggle between shiny and default views based on current view.
      if (image.src === sprites.back_shiny) {
        image.src = sprites.back_default;
      } else if (image.src === sprites.back_default) {
        image.src = sprites.back_shiny;
      } else if (image.src === sprites.front_shiny) {
        image.src = sprites.front_default;
      } else {
        image.src = sprites.front_shiny;
      }
    });

    // Append the elements to the card.
    card.appendChild(name);
    imageContainer.appendChild(image);
    card.appendChild(imageContainer);
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(flipButton);
    buttonContainer.appendChild(shinyButton);
    card.appendChild(buttonContainer);

    // Append the card to the main container.
    container.appendChild(card);
  }
}

// Call the function to display Pokemon when the script runs.
displayPokemon();
