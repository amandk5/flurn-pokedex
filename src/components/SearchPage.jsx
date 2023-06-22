import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { searchPokemonFunction } from "../redux/app/app.action";
import { Spinner } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { STOP_LOADER } from "../redux/app/app.types";

export default function SearchPage() {
  const { searchedPokemon, loader } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pokemonName, setPokemonName] = useState("");

  // runs when user click on search button or press enter key in input field
  const handleClick = () => {
    if (pokemonName !== "") {
      dispatch(searchPokemonFunction(pokemonName)).then((res) => {
        if (res === "success") {
          setTimeout(() => {
            dispatch({ type: STOP_LOADER });
            navigate("/listing-page");
          }, 1000);
        } else {
          setTimeout(() => {
            alert("not found");
            dispatch({ type: STOP_LOADER });
          }, 1000);
        }
      });
    }
  };

  useEffect(() => {
    console.log(searchedPokemon);
  }, [searchedPokemon]);

  return (
    <Box textAlign={"center"}>
      <Heading>Search Page</Heading>
      <br />
      <Input
        value={pokemonName}
        onChange={({ target }) => setPokemonName(target.value)}
        w={"400px"}
        placeholder="enter pokemon name ex - pikachu"
        onKeyDown={(e) => {
          if (e.key === "Enter" && pokemonName !== "") {
            // Call your desired function here
            handleClick();
          }
        }}
      />
      <br />
      <br />
      <Button onClick={handleClick} bgColor="green" color="white">
        Search
      </Button>
      <br />
      <br />
      {loader ? <Spinner /> : null}
      <br />
      <br />
      <Flex justifyContent={"center"} columnGap={"20px"}>
        <Text color="blue">
          <u>
            <Link to="/bookmarks">Show Bookmarks</Link>
          </u>
        </Text>
      </Flex>
    </Box>
  );
}
