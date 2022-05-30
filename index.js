const pokemonNum = 151;
let all_results = [];

const colors = {
  fire: "#FBA54C",
  grass: "#5FBD58",
  electric: "#FCF7DE",
  water: "#539DDF",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#92BC2C",
  dragon: "#0C69C8",
  psychic: "#FA8581",
  flying: "#A1BBEC",
  fighting: "#D3425F",
  normal: "#A0A29F",
  ghost: "#5F6DBC",
  ice: "#75D0C1",
};
const pokemonTypes = Object.keys(colors);

const paintPokemons = (pokemonsToPaint) => {
  const pokedex$$ = document.querySelector("#poke-container");
  pokedex$$.innerHTML = "";

  pokemonsToPaint.forEach((pokemon) => {
    const pokemonContainers$$ = document.createElement("div");
    pokemonContainers$$.className = "pokemonContainer";
    const pokemonType = pokemon.types.map((type) => type.type.name);
    const type = pokemonType.find((type) => pokemonType.indexOf(type) > -1);
    const colorType = colors[type];
    pokemonContainers$$.style.backgroundColor = colorType;

    let html = `
        <div class="pokemonContainer__id">#${pokemon.id}</div>
        <div class="pokemonContainer__name">${pokemon.name}</div>
        <img class="pokemonContainer__img" src=${pokemon.sprites.front_default} alt=${pokemon.name}>
        <div class="pokemonContainer__types">
        <span class="pokemonContainer__types--type1">${pokemonType[0]}</span>
    `;
    let html2 = `
        <div class="pokemonContainerBack__id">#${pokemon.id}</div>
        <div class="pokemonContainerBack__name">${pokemon.name}</div>
        <img class="pokemonContainerBack__img" src=${pokemon.sprites.back_default} alt=${pokemon.name}>
        <div class="pokemonContainerBack__types">
        <span class="pokemonContainerBack__types--type1">${pokemonType[0]}</span>
        `;
    if (pokemon.types[1]) {
      let type2 = pokemon.types[1].type.name;
      html = `
      <div class="pokemonContainer__id">#${pokemon.id}</div>
      <div class="pokemonContainer__name">${pokemon.name}</div>
      <img class="pokemonContainer__img" src=${pokemon.sprites.front_default} alt=${pokemon.name}>
      <div class="pokemonContainer__types">
      <span class="pokemonContainer__types--type1">${pokemonType[0]}</span>
      <span class="pokemonContainer__types--type2">${type2}</span>
  `;
      html2 = `
        <div class="pokemonContainerBack__id">#${pokemon.id}</div>
        <div class="pokemonContainerBack__name">${pokemon.name}</div>
        <img class="pokemonContainerBack__img" src=${pokemon.sprites.back_default} alt=${pokemon.name}>
        <div class="pokemonContainerBack__types">
        <span class="pokemonContainerBack__types--type1">${pokemonType[0]}</span>
        <span class="pokemonContainerBack__types--type2">${type2}</span>
        `;
    }
    handleClick = () => {
      if (pokemonContainers$$.className === "pokemonContainer") {
        pokemonContainers$$.className = "pokemonContainerBack";
        pokemonContainers$$.innerHTML = html2;
      } else {
        pokemonContainers$$.className = "pokemonContainer";
        pokemonContainers$$.innerHTML = html;
      }
    };
    pokemonContainers$$.addEventListener("click", handleClick);
    pokemonContainers$$.innerHTML = html;
    pokedex$$.appendChild(pokemonContainers$$);
  });
};

const getOnePokemonFromApi = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  all_results.push(pokemon);
};

const getAllPokemons = async () => {
  for (let id = 1; id <= pokemonNum; id++) {
    await getOnePokemonFromApi(id);
  }

  paintPokemons(all_results);
};
const filterPokemons = (event) => {
  const userInput = event.target.value.toLowerCase().trim();
  const filtered = all_results.filter((pokemon) => {
    const matchId = pokemon.id === Number(userInput);
    const matchName = pokemon.name.toLowerCase().includes(userInput);
    return matchId || matchName;
  });
  paintPokemons(filtered);
};

const filterPokemonsByType = (type) => {
  if (type === "all") {
    return paintPokemons(all_results);
  }
  const filteredByType = all_results.filter((pokemon) => {
    let matchFirstType = false;
    let matchSecondType = false;

    if (pokemon.types[1]) {
      matchSecondType = pokemon.types[1].type.name === type;
    }
    if (pokemon.types[0]) {
      matchFirstType = pokemon.types[0].type.name === type;
    }

    return matchFirstType || matchSecondType;
  });

  paintPokemons(filteredByType);
};

document.getElementById("search-input").addEventListener("input", (event) => {
  filterPokemons(event);
});

document.querySelectorAll(".type__selector").forEach((button) => {
  button.addEventListener("click", (event) => {
    filterPokemonsByType(event.target.classList[1]);
    console.log(event.target.classList);
  });
});

handleClick = () => {
  console.log("ok");
  pokemonContainers$$.innerHTML = html2;
};

getAllPokemons();
