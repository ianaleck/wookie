import { Container, Stack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useMovies } from "../../contexts/useMovies";
import { RootState } from "../../utils/redux/store";
import { SingleGenre } from "./Genre";

export default function Genres() {
  const { genres } = useMovies();

  const bookmark = useSelector((state: RootState) => state.bookmark.value);

  return (
    <Container maxW="1100px">
      <Stack pt={bookmark.length === 0 ? "100px" : "50px"} spacing="10">
        {genres.map((genre, index) => (
          <SingleGenre genre={genre} key={index} pos={index} />
        ))}
      </Stack>
    </Container>
  );
}
