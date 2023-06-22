import {
  ADD_POKEMON_INFO,
  GET_POKEMON_LIST,
  REACHED_BOTTOM,
  SEARCH_POKEMON,
  START_LOADER,
  STOP_LOADER,
} from "./app.types";

const initialState = {
  pokemonInfo: JSON.parse(localStorage.getItem("pokemonInfo")) || {},
  searchedPokemon: {},
  pokemonList: [],
  loader: false,
  page: 1,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_POKEMON:
      return {
        ...state,
        searchedPokemon: action.payload,
      };
    case START_LOADER:
      return {
        ...state,
        loader: true,
      };
    case STOP_LOADER:
      return {
        ...state,
        loader: false,
      };
    case GET_POKEMON_LIST:
      return {
        ...state,
        pokemonList: [...state.pokemonList, ...action.payload],
      };
    case REACHED_BOTTOM:
      return {
        ...state,
        page: state.page + 1,
      };
    case ADD_POKEMON_INFO:
      // add to ls named pokemonInfo
      localStorage.setItem("pokemonInfo", JSON.stringify(action.payload));
      return {
        ...state,
        pokemonInfo: action.payload,
      };
    default:
      return state;
  }
};
