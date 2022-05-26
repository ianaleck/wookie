import { Box, Stack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { BookMarked } from "../components/movies/BookMarked";

import Genres from "../components/movies/Genres";
import { Movie } from "../contexts/useMovies";
import { RootState } from "../utils/redux/store";

export default function HomePage() {
  const bookmark: Movie[] = useSelector(
    (state: RootState) => state.bookmark.value
  );
  return (
    <Stack>
      {bookmark.length > 0 && (
        <Box>
          <BookMarked bookmark={bookmark} />
        </Box>
      )}
      <Stack>
        <Genres />
      </Stack>
    </Stack>
  );
}
