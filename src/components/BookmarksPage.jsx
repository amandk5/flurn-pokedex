import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineDelete, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function BookmarksPage() {
  const [bookmarkedPokemon, setBookmarkedPokemon] = useState(
    JSON.parse(localStorage.getItem("bookmarkedPokemon")) || []
  );

  // set current hovered
  const [currentHovered, setCurrentHovered] = useState(null);
  // change icon
  const [isHoveredIcon, setHovered] = useState(false);
  // to store current clicked
  const [clicked, setClicked] = useState(0);

  // toggle hover
  // on mouse enter
  const setToFilled = (index) => {
    setHovered(true);
  };
  // on mouse leave
  const setToOutlined = (index) => {
    setHovered(false);
  };

  // remove bookmark
  const removeBookmark = (index) => {
    // filter bookmark array
    let filteredPokemon = bookmarkedPokemon.filter(
      (pokemon, indx) => index !== indx
    );
    // update state
    setBookmarkedPokemon(filteredPokemon);
    // update ls
    localStorage.setItem("bookmarkedPokemon", JSON.stringify(filteredPokemon));
  };

  return (
    <Box>
      <Heading textAlign="center">Bookmarks Page</Heading>
      <br />
      <Flex justifyContent={"center"} columnGap={"20px"}>
        <Text color="blue">
          <u>
            <Link to="/">Search Page</Link>
          </u>
        </Text>
      </Flex>
      <br />
      {/* bookmarks result shown here  */}
      {bookmarkedPokemon.length !== 0 ? (
        bookmarkedPokemon.map((pokemon, index) => (
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
            onMouseEnter={() => setCurrentHovered(index)}
          >
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <Box>{pokemon.name}</Box>
            <Box
              onMouseEnter={() => setToFilled()}
              onMouseLeave={() => setToOutlined()}
              onClick={() => removeBookmark(index)}
            >
              {isHoveredIcon && currentHovered === index ? (
                <AiFillDelete />
              ) : (
                <AiOutlineDelete />
              )}
            </Box>
          </Flex>
        ))
      ) : (
        <Text textAlign="center"> No Bookmarks Found</Text>
      )}
    </Box>
  );
}
