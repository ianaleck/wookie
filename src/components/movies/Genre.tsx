import { Heading, HStack, Stack } from "@chakra-ui/react";
import { Splide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import React from "react";
import { Genre } from "../../contexts/useMovies";
import { MovieGridItem } from "./MovieGridItem";

export const SingleGenre: React.FC<{ genre: Genre; pos: number }> = ({
  genre,
  pos,
}) => {
  return (
    <Stack>
      <HStack>
        <Heading size="md">{genre.name}</Heading>
      </HStack>
      <Splide
        options={{
          perPage: 4,
          gap: "10px",
          type: genre.movies.length > 4 ? "loop" : "slide",
          arrows: genre.movies.length > 4 ? true : false,
          pagination: false,
          padding: "5rem",
          perMove: 1,
          autoplay: true,
          breakpoints: {
            975: { perPage: 3 },
            700: { perPage: 2 },
          },
        }}
      >
        {genre.movies.map((movie, index) => (
          <MovieGridItem movie={movie} key={index} index={pos} />
        ))}
      </Splide>
    </Stack>
  );
};
