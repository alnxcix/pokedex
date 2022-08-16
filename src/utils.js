import axios from "axios";

export const getPokemonList = async () => {
  const response = await axios.get(
    "https://pokeapi.co/api/v2/pokemon-species?limit=905"
  );
  return response;
};

export const getPokemonDetails = async (name) => {
  const [pokemon, species] = await Promise.all([
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`),
  ]);
  return [pokemon, species];
};

export const getPokemon = async (name) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response;
};

export const getPokemonSpecies = async (name) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${name}`
  );
  return response;
};

export const getColorOfType = (type) => {
  return {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  }[type];
};

export const getShortenedStat = (stat) => {
  return {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SP. ATK",
    "special-defense": "SP. DEF",
    speed: "SPD",
  }[stat];
};
