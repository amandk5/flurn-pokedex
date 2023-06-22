import { Box, Flex, Progress, Text } from "@chakra-ui/react";
import React from "react";

export default function BaseStats({ stats }) {
  return (
    <Box>
      {/* <Flex marginBottom={"20px"}>
        <Text width="30%" fontWeight="bold">
          Species
        </Text>
        <Box>{name}</Box>
      </Flex> */}
      {stats.map((s,index) => (
        <Flex marginBottom={"10px"} key={index} alignItems="center">
          <Text width="40%" fontWeight="bold">
            {s.stat.name} 
          </Text>
          <Box width="60%">
          <Progress value={s.base_stat} size='xs' colorScheme='pink' />
          </Box>
          
          {/* <Progress value={Number(s.base_stat)} /> */}
        </Flex>
      ))}
    </Box>
  );
}
