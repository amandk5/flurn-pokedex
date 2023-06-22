// import { Box, Flex, Heading } from "@chakra-ui/react";
// import React, { useEffect, useRef, useState } from "react";
// import "./ListingPage.css";
// import { useDispatch, useSelector } from "react-redux";
// import { GET_POKEMON_LIST } from "../redux/app/app.types";
// import { getPokemonList } from "../redux/app/app.action";
// import axios from "axios";

// export default function ListingPage() {
//   const dispatch = useDispatch();

//   const { searchedPokemon, pokemonList } = useSelector((store) => store.app);

//   const containerRef = useRef(null);
//   const [isBottom, setIsBottom] = useState(false);

//   const handleIntersection = (entries) => {
//     const [entry] = entries;
//     setIsBottom(entry.isIntersecting);
//   };

//   // const fetchPokemonList = async () => {
//   //   try {
//   //     const response = await axios.get(
//   //       `https://pokeapi.co/api/v2/pokemon?limit=10`
//   //     );
//   //     const pokemonData = response.data.results;
//   //     const pokemonPromises = pokemonData.map((pokemon) =>
//   //       axios.get(pokemon.url)
//   //     );
//   //     const pokemonDetails = await Promise.all(pokemonPromises);
//   //     const formattedPokemonList = pokemonDetails.map(
//   //       (response) => response.data
//   //     );
//   //     setPl((prevList) => [...prevList, ...formattedPokemonList]);
//   //   } catch (error) {
//   //     alert("Failed to fetch Pokemon. Please try again.");
//   //   }
//   // };

//   useEffect(() => {
//     dispatch(getPokemonList());
//   }, []);

//   useEffect(() => {
//     console.log(pokemonList);
//     // console.log(pl);
//   }, [pokemonList]);

//   // useEffect(() => {
//   //   fetchPokemonList();
//   // }, []);

//   // scroll bottom trigger fn code

//   useEffect(() => {
//     const options = {
//       root: containerRef.current,
//       threshold: 1.0,
//     };

//     const observer = new IntersectionObserver(handleIntersection, options);

//     if (containerRef.current) {
//       observer.observe(containerRef.current);
//     }

//     return () => {
//       if (containerRef.current) {
//         observer.unobserve(containerRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (isBottom) {
//       // Trigger your function or alert here
//       console.log("Reached bottom");
//       // Call onLoadMore or any other function
//       // onLoadMore();
//     }
//   }, [
//     isBottom,
//     // onLoadMore
//   ]);

//   return (
//     <Box textAlign={"center"} className="listingPage">
//       <Heading>ListingPage</Heading>
//       <br />
//       <Box className="displayResults" ref={containerRef}>
//         {searchedPokemon.name !== undefined && (
//           <>
//             <Flex
//               margin="auto"
//               width="400px"
//               justifyContent="space-around"
//               alignItems={"center"}
//               gap="10px"
//               marginBottom="20px"
//               border="1px solid gainsboro"
//               borderRadius="0.5rem"
//             >
//               <img
//                 src={searchedPokemon.sprites.front_default}
//                 alt={searchedPokemon.name}
//               />
//               <Box>{searchedPokemon.name}</Box>
//             </Flex>
//           </>
//         )}
//         {/* pokemon lists  */}
//         {pokemonList.length !== 0 &&
//           pokemonList.map((pokemon) => (
//             <Flex
//               margin="auto"
//               width="400px"
//               justifyContent="space-around"
//               alignItems={"center"}
//               gap="10px"
//               marginBottom="20px"
//               border="1px solid gainsboro"
//               borderRadius="0.5rem"
//               key={pokemon.name}
//             >
//               <img src={pokemon.sprites.front_default} alt={pokemon.name} />
//               <Box>{pokemon.name}</Box>
//             </Flex>
//           ))}
//       </Box>
//     </Box>
//   );
// }

// new code

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
