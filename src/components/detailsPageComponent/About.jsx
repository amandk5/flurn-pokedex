import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function About({ species, height, weight, abilities }) {
  return (
    <Box>
      <Flex marginBottom={"20px"}>
        <Text width="30%" fontWeight="bold">Species</Text> <Box>{species.name}</Box>
      </Flex>
      <Flex marginBottom={"20px"}>
        <Text width="30%" fontWeight="bold">Height</Text> <Box>{height}</Box>
      </Flex>
      <Flex marginBottom={"20px"}>
        <Text width="30%" fontWeight="bold">Weight</Text> <Box>{weight}</Box>
      </Flex>
      <Flex marginBottom={"20px"}>
        <Text width="30%" fontWeight="bold">Abilities</Text>
        <Box>
          {abilities.map((ab,index) => ( 
            <span key={index}>{ab.ability.name} &nbsp;</span>
          ))}
        </Box>
      </Flex>
    </Box>
  );
}
