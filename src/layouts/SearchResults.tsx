import {
  Container,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MovieGridItem } from "../components/movies/MovieGridItem";
import { Movie, useMovies } from "../contexts/useMovies";

export default function SearchResults() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const { search } = useMovies();

  let s = window.location.search;
  let params = new URLSearchParams(s);
  let q = params.get("q");

  const startSearch = useCallback(
    async (query: string) => {
      let movieList = await search(query);
      setMovies(movieList);
    },
    [search]
  );

  useEffect(() => {
    if (q) {
      startSearch(q);
    } else {
      navigate("/");
    }
  }, [q, navigate, startSearch]);
  return (
    <Stack>
      <Container maxW="1100px" pt="100px">
        <Heading>Search Results</Heading>
        <HStack>
          <Text fontWeight="bold">
            Showing {movies.length} result(s) for: '{q}'
          </Text>
        </HStack>
        <Grid
          templateColumns={{
            base: "1fr 1fr",
            md: "1fr 1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr 1fr",
          }}
          pt="10"
          gap="10px"
        >
          {movies.map((movie) => (
            <MovieGridItem movie={movie} key={movie?.id} index={0} />
          ))}
        </Grid>
      </Container>
    </Stack>
  );
}
