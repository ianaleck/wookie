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
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";

import { useCallback, useEffect, useState } from "react";
import { BsCalendar4Range, BsClock } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { MdBookmarks } from "react-icons/md";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Movie, useMovies } from "../contexts/useMovies";

export const MovieDetailed = () => {
  const [movie, setMovie] = useState<Movie>();
  const [randomList, setRandomList] = useState<Movie[]>([]);

  const { randomMovies, genres, getMovie } = useMovies();
  const [loading, setLoading] = useState<boolean>(false);

  const { slug } = useParams();
  const router = useNavigate();

  const loadMovie = useCallback(async () => {
    const movieObj = await getMovie(String(slug));
    if (movieObj) setMovie(movieObj);
    setLoading(false);
  }, [getMovie, slug]);

  useEffect(() => {
    if (genres.length > 0) {
      let randomMoviesList = randomMovies();
      setRandomList(randomMoviesList);
    }

    if (slug) {
      setLoading(true);
      loadMovie();
    }
  }, [slug, genres, randomMovies, loadMovie]);
  return (
    <Stack
      style={{ background: "black" }}
      position="relative"
      align="center"
      spacing={0}
    >
      <Image
        src={movie?.backdrop}
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
        pt={{ base: "100px", md: "200px" }}
        zIndex="3"
        pb="20px"
      >
        <Grid templateColumns={{ base: "100%", md: "3fr 9fr" }} gap="20px">
          <Skeleton isLoaded={!loading}>
            <Image src={movie?.poster} />
          </Skeleton>

          <Stack>
            <Skeleton isLoaded={!loading && movie ? true : false}>
              <Heading size="2xl" maxW={"500px"}>
                {movie?.title || "Loading"}
              </Heading>
            </Skeleton>

            <HStack spacing={8}>
              <HStack color="yellow.500">
                <FaRegStar />
                <Skeleton isLoaded={!loading && movie ? true : false}>
                  <Text color="white" fontSize={"0.8em"}>
                    IMDB: {movie?.imdb_rating}
                  </Text>
                </Skeleton>
              </HStack>
              <HStack color="yellow.500">
                <BsClock />
                <Skeleton isLoaded={!loading && movie ? true : false}>
                  <Text color="white" fontSize={"0.8em"}>
                    Dur: {movie?.length}
                  </Text>
                </Skeleton>
              </HStack>
              <HStack color="yellow.500">
                <BsCalendar4Range />
                <Skeleton isLoaded={!loading && movie ? true : false}>
                  <Text color="white" fontSize={"0.8em"}>
                    Relased: {movie?.released_on?.substring(0, 4)}
                  </Text>
                </Skeleton>
              </HStack>
            </HStack>
            <Text fontSize={"0.8em"}>{movie?.overview}</Text>
            <HStack>
              <Skeleton isLoaded={!loading && movie ? true : false}>
                <Text>Genres:</Text>
              </Skeleton>
              <Text opacity={0.7} fontSize="0.8em">
                {movie?.genres?.map((genre) => genre).join(", ")}
              </Text>
              <Badge>{movie?.classification}</Badge>
            </HStack>
            <Box>
              <Link to={`#`}>
                <Skeleton isLoaded={!loading && movie ? true : false}>
                  <Button colorScheme={"yellow"}>Watch Now</Button>
                </Skeleton>
              </Link>
            </Box>
            <Stack justifyContent={"end"} pt="12">
              <HStack>
                <MdBookmarks />
                <Skeleton isLoaded={randomList.length > 0 ? true : false}>
                  <Heading size="sm">Other Movies</Heading>
                </Skeleton>
              </HStack>
              <AvatarGroup size={"lg"} max={5}>
                {randomList.slice(0, 6).map((movie, index) => (
                  <Avatar
                    key={index}
                    name="Ryan Florence"
                    src={movie?.backdrop}
                    _hover={{ transform: "scale(1.2)" }}
                    onClick={() => {
                      router(`/movie/${movie?.slug}`);
                    }}
                  />
                ))}
              </AvatarGroup>
            </Stack>
          </Stack>
        </Grid>
      </Container>
    </Stack>
  );
};
