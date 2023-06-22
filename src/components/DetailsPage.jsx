import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./detailsPage.css";
import About from "./detailsPageComponent/About";
import BaseStats from "./detailsPageComponent/BaseStats";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function DetailsPage() {
  const { pokemonInfo } = useSelector((store) => store.app);

  // to store current selected
  const [current, setCurrent] = useState("about");
  // change icon
  const [isHoveredIcon, setHovered] = useState(false);
  // to check if it is bookmarked or not
  const [isBookmarked, setBookmarked] = useState(false);

  // toggle hover
  // on mouse enter
  const setToFilled = () => {
    if (isBookmarked === false) {
      setHovered(true);
    }
  };
  // on mouse leave
  const setToOutlined = () => {
    if (isBookmarked === false) {
      setHovered(false);
    }
  };

  const handleBookmark = () => {
    if (isBookmarked === false) {
      setBookmarked(true);
      // add to ls
      // first get pokemon arr from ls if it exist
      let pokemonArr =
        JSON.parse(localStorage.getItem("bookmarkedPokemon")) || [];
      // then add to pokemonArr
      pokemonArr.push(pokemonInfo);
      // add to localStorage
      localStorage.setItem("bookmarkedPokemon", JSON.stringify(pokemonArr));
    } else {
      setBookmarked(false);
      // remove from ls
      let pokemonArr = JSON.parse(localStorage.getItem("bookmarkedPokemon"));
      // filter current pokemonInfo from pokemonArr
      pokemonArr = pokemonArr.filter(
        (pokemon) => pokemon.id !== pokemonInfo.id
      );
      // update ls
      localStorage.setItem("bookmarkedPokemon", JSON.stringify(pokemonArr));
    }
  };

  useEffect(() => {
    // console.log(pokemonInfo);
    // check if pokemon is bookmarked or not in the ls
    let pokemonBookmarkedArr =
      JSON.parse(localStorage.getItem("bookmarkedPokemon")) || [];
    let pokemonPresent = false;
    pokemonBookmarkedArr = pokemonBookmarkedArr.filter(
      (pokemon) => pokemon.id === pokemonInfo.id
    );
    if (pokemonBookmarkedArr.length !== 0) {
      // means it is bookmarked , set bookmark status to true else false
      pokemonPresent = true;
      setBookmarked(pokemonPresent);
      setHovered(true);
    } else {
      pokemonPresent = false;
      setBookmarked(pokemonPresent);
    }
  }, []);

  return (
    <Box className="detailsPage">
      <Heading textAlign="center">DetailsPage</Heading>
      <br />
      <Flex justifyContent={"center"} columnGap={"20px"}>
        <Text color="blue">
          <u>
            <Link to="/bookmarks">Show Bookmarks</Link>
          </u>
        </Text>
        <Text color="blue">
          <u>
            <Link to="/">Search Page</Link>
          </u>
        </Text>
        <Text color="blue">
          <u>
            <Link to="/listing-page">Listing Page</Link>
          </u>
        </Text>
      </Flex>
      <br />
      {pokemonInfo.name !== undefined && (
        <Box
          sx={{
            width: "450px",
            margin: "auto",
            height: "100%",
            backgroundColor: "yellow",
            borderTopRadius: "2rem",
          }}
        >
          <Flex
            fontSize={"40px"}
            fontWeight={"bold"}
            marginBottom={"10px"}
            p="20px"
            justifyContent="space-between"
          >
            <Text>{pokemonInfo.name}</Text>
            <Box
              onMouseEnter={setToFilled}
              onMouseLeave={setToOutlined}
              onClick={() => handleBookmark()}
            >
              {!isHoveredIcon ? <BsBookmark /> : <BsFillBookmarkFill />}
              {/* {!isHoveredIcon || !isBookmarked ? (
                <BsBookmark />
              ) : (
                (isHoveredIcon || isBookmarked) && <BsFillBookmarkFill />
              )} */}
            </Box>
          </Flex>
          {/* type  */}
          <Box textAlign={"left"} p="10px">
            {pokemonInfo.types.map((item, index) => (
              <span
                key={index}
                style={{
                  marginRight: "10px",
                  border: "1px solid black",
                  borderRadius: "1rem",
                  padding: "5px 10px",
                }}
              >
                {item.type.name}
              </span>
            ))}
            <span style={{ float: "right" }}>#{pokemonInfo.id}</span>
          </Box>
          <Box sx={{ position: "relative" }}>
            <Flex
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                zIndex: 1,
                justifyContent: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <img
                src={pokemonInfo.sprites.front_default}
                alt={pokemonInfo.name}
                width={"300px"}
                sx={{ margin: "auto" }}
              />
            </Flex>
            <Box
              sx={{
                position: "absolute",
                border: "1px solid gainsboro",
                height: "500px",
                width: "100%",
                top: "190px",
                padding: "10px 10px",
                backgroundColor: "white",
                borderTopRadius: "2rem",
                borderBottomRadius: "2rem",
              }}
            >
              <br />
              <br />
              <br />
              <Flex justifyContent={"space-between"}>
                <Box
                  className="links"
                  style={{
                    width: "15%",
                    borderBottom: current === "about" && "5px solid black",
                  }}
                  onClick={() => setCurrent("about")}
                >
                  About
                </Box>
                <Box
                  className="links"
                  style={{
                    width: "30%",
                    borderBottom: current === "base_stats" && "5px solid black",
                  }}
                  onClick={() => setCurrent("base_stats")}
                >
                  Base Stats
                </Box>
                <Box
                  className="links"
                  style={{
                    width: "25%",
                    borderBottom: current === "evolution" && "5px solid black",
                  }}
                  onClick={() => setCurrent("evolution")}
                >
                  Evolution
                </Box>
                <Box
                  className="links"
                  style={{
                    width: "20%",
                    borderBottom: current === "moves" && "5px solid black",
                  }}
                  onClick={() => setCurrent("moves")}
                >
                  Moves
                </Box>
              </Flex>
              <br />
              {/* components here  */}
              {current === "about" && (
                <About
                  species={pokemonInfo.species}
                  height={pokemonInfo.height}
                  weight={pokemonInfo.weight}
                  abilities={pokemonInfo.abilities}
                />
              )}
              {current === "base_stats" && (
                <BaseStats stats={pokemonInfo.stats} />
              )}
              {current === "evolution" && <h1>In progress</h1>}
              {current === "moves" && <h1>In progress</h1>}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
