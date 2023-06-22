import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import "./listingPage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_POKEMON_INFO,
  GET_POKEMON_LIST,
  REACHED_BOTTOM,
} from "../redux/app/app.types";
import { getPokemonList } from "../redux/app/app.action";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function ListingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchedPokemon, pokemonList, page } = useSelector(
    (store) => store.app
  );
  const containerRef = useRef(null);
  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = () => {
    const container = containerRef.current;
    const { scrollTop, clientHeight, scrollHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    dispatch(getPokemonList(page));
  }, [page]);

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isBottom) {
      console.log("Reached bottom", page);
      // Call onLoadMore or any other function
      // onLoadMore();
      dispatch({ type: REACHED_BOTTOM });
    }
  }, [isBottom]);

  return (
    <Box textAlign="center" className="listingPage">
      <Heading>ListingPage</Heading>
      <br />
      <Flex justifyContent={"center"} columnGap={"30px"}>
        <Text color="blue">
          <u>
            <Link to="/">Search Page</Link>
          </u>
        </Text>
        <Text color="blue">
          <u>
            <Link to="/bookmarks">Show Bookmarks</Link>
          </u>
        </Text>
      </Flex>
      <br />
      <Box className="displayResults" ref={containerRef}>
        {searchedPokemon.name && (
          <>
            <Text>Searched Pokemon</Text>
            <Flex
              margin="auto"
              width="400px"
              justifyContent="space-around"
              alignItems="center"
              gap="10px"
              marginBottom="20px"
              border="1px solid gainsboro"
              borderRadius="0.5rem"
              onClick={() => {
                dispatch({ type: ADD_POKEMON_INFO, payload: searchedPokemon });
                navigate("/details-page");
              }}
            >
              <img
                src={searchedPokemon.sprites.front_default}
                alt={searchedPokemon.name}
              />
              <Box>{searchedPokemon.name}</Box>
            </Flex>
          </>
        )}
        <Text>Other Pokemons</Text>
        <br />
        {pokemonList.length !== 0 &&
          pokemonList.map((pokemon, index) => (
            <Flex
              margin="auto"
              width="400px"
              justifyContent="space-around"
              alignItems="center"
              gap="10px"
              marginBottom="20px"
              border="1px solid gainsboro"
              borderRadius="0.5rem"
              key={index}
              onClick={() => {
                dispatch({ type: ADD_POKEMON_INFO, payload: pokemon });
                navigate("/details-page");
              }}
            >
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <Box>{pokemon.name}</Box>
            </Flex>
          ))}
      </Box>
    </Box>
  );
}
