import axios from "axios";
import {
  GET_POKEMON_LIST,
  SEARCH_POKEMON,
  START_LOADER,
  STOP_LOADER,
} from "./app.types";

export const searchPokemonFunction = (pokemon_name) => async (dispatch) => {
  dispatch({ type: START_LOADER });
  let res = await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`)
    .then((res) => {
      dispatch({ type: SEARCH_POKEMON, payload: res.data });
      return "success";
    })
    .catch((err) => "error");

  return res;
};

export const getPokemonList = (page) => async (dispatch) => {

  try {
    // const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`);
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=10&&offset=${page * 10}`
    );
    const pokemonData = response.data.results;
    const pokemonPromises = pokemonData.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonDetails = await Promise.all(pokemonPromises);
    const formattedPokemonList = pokemonDetails.map(
      (response) => response.data
    );
    // setPl((prevList) => [...prevList, ...formattedPokemonList]);
    dispatch({ type: GET_POKEMON_LIST, payload: formattedPokemonList });
  } catch (error) {
    alert("Failed to fetch Pokemon. Please try again.");
  }
};
