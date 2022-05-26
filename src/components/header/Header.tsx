import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import MobileSearch from "./MobileSearch";
import SearchForm from "./SearchForm";

export default function Header() {
  return (
    <Box>
      <Flex
        color={"white"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.900"}
        align={"center"}
        position={"fixed"}
        zIndex={9}
        top={0}
        w="100%"
        bg="rgba(0,0,0,.7)"
      >
        <Flex flex={{ base: 1 }} justify={"start"} align={"center"}>
          <Link to="/">
            <Text
              textAlign={"left"}
              fontFamily={"heading"}
              fontWeight="700"
              color={"white"}
            >
              Wookie Logo
            </Text>
          </Link>

          <Flex
            flex={{ base: 1 }}
            mx={5}
            display={{ base: "none", md: "flex" }}
          >
            <SearchForm />
            {/* <DesktopNav /> */}
          </Flex>
        </Flex>
        {/* Mobile Search */}
        <MobileSearch />
      </Flex>
    </Box>
  );
}
