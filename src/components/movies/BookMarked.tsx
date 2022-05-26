import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { BsCalendar4Range, BsClock } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { MdBookmarks } from "react-icons/md";

import { Link } from "react-router-dom";
import { Movie } from "../../contexts/useMovies";

export const BookMarked: React.FC<{ bookmark: Movie[] }> = ({ bookmark }) => {
  const [current, setCurrent] = useState<Movie>();

  useEffect(() => {
    setCurrent(bookmark[0]);
  }, [bookmark]);
  return (
    <Stack
      style={{ background: "black" }}
      position="relative"
      align="center"
      spacing={0}
    >
      <Image
        src={current?.backdrop}
        position="absolute"
        width={"100%"}
        height="100%"
        objectFit={"cover"}
        zIndex="0"
        opacity={0.3}
      />
      <Box
        position={"absolute"}
        zIndex="1"
        backgroundImage={
          "linear-gradient(to top,rgba(0,0,0,1) 0,rgba(0,0,0,0) 60%,rgba(0,0,0,.8) 100%);"
        }
        top="0"
        left="0"
        right="0"
        bottom="0"
      ></Box>
      <Container
        margin="0 auto"
        w="100%"
        maxW="1100px"
        pt={{ base: "100px", md: "300px" }}
        zIndex="3"
        pb="20px"
      >
        <Grid
          templateColumns={{ base: "100%", md: "8fr 5fr" }}
          gap="20px"
          justifyContent="end"
        >
          <Stack>
            <Box>
              <Badge fontSize="0.6em" variant="outline" colorScheme={"yellow"}>
                Favorite
              </Badge>
            </Box>

            <Heading size="2xl" maxW={"500px"}>
              {current?.title}
            </Heading>
            <HStack spacing={8}>
              <HStack color="yellow.500">
                <FaRegStar />
                <Text color="white" fontSize={"0.8em"}>
                  IMDB: {current?.imdb_rating}
                </Text>
              </HStack>
              <HStack color="yellow.500">
                <BsClock />
                <Text color="white" fontSize={"0.8em"}>
                  Dur: {current?.length}
                </Text>
              </HStack>
              <HStack color="yellow.500">
                <BsCalendar4Range />
                <Text color="white" fontSize={"0.8em"}>
                  Relased: {current?.released_on?.substring(0, 4)}
                </Text>
              </HStack>
            </HStack>
            <Text maxW="600px" fontSize={"0.8em"} noOfLines={2}>
              {current?.overview}
            </Text>
            <HStack>
              <Text>Genres:</Text>
              <Text opacity={0.7} fontSize="0.8em">
                {current?.genres?.map((genre) => genre).join(", ")}
              </Text>
              <Badge>{current?.classification}</Badge>
            </HStack>
            <Box>
              <Link to={`/movie/${current?.slug}`}>
                <Button colorScheme={"yellow"}>Watch Now</Button>
              </Link>
            </Box>
          </Stack>

          <Stack justifyContent={"end"}>
            <HStack>
              <MdBookmarks />
              <Heading size="sm">Your Favorites</Heading>
            </HStack>
            <Grid templateColumns={"1fr 1fr 1fr"} borderRadius="5">
              {/* {bookmark.slice(0, 6).map((movie, index) => (
                <Box
                  key={index}
                  cursor="pointer"
                  overflow={"hidden"}
                  onClick={() => {
                    setCurrent(movie);
                  }}
                >
                  <Image
                    transition={"all 0.35s ease-in-out"}
                    src={movie?.backdrop}
                    _hover={{ transform: "scale(1.2)" }}
                  />
                </Box>
              ))} */}
              <AvatarGroup size={"lg"} max={4}>
                {bookmark.slice(0, 6).map((movie, index) => (
                  <Avatar
                    key={index}
                    name="Ryan Florence"
                    src={movie?.backdrop}
                    _hover={{ transform: "scale(1.2)" }}
                    onClick={() => {
                      setCurrent(movie);
                    }}
                    transition="all 0.35s ease-in-out"
                    cursor={"pointer"}
                    // size={"lg"}
                  />
                ))}
              </AvatarGroup>
            </Grid>
          </Stack>
        </Grid>
      </Container>
    </Stack>
  );
};
