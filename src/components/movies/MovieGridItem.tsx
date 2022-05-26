import {
  Avatar,
  Box,
  HStack,
  Image,
  Stack,
  Text,
  useToast,
  Wrap,
} from "@chakra-ui/react";
import { SplideSlide } from "@splidejs/react-splide";
import React from "react";
import { Movie } from "../../contexts/useMovies";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/redux/store";
import { setBookMark } from "../../utils/redux/bookmarkSlice";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export const MovieGridItem: React.FC<{ movie: Movie; index: number }> = ({
  movie,
  index,
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const bookmark = useSelector((state: RootState) => state.bookmark.value);

  const toggleBookmark = () => {
    let newBookmark = [...bookmark];
    if (newBookmark.find((m) => m.id === movie?.id)) {
      newBookmark = newBookmark.filter((m) => m.id !== movie?.id);
    } else {
      newBookmark = [{ ...movie }, ...newBookmark];
      toast({
        render: () => (
          <HStack color="white" p="0" bg={"orange.300"} borderRadius={"50px"}>
            <Avatar src={movie?.backdrop} size="lg" />
            <Stack spacing="0" fontSize={"0.8em"}>
              <Text color="black" pr="2">
                <Text as="span" fontWeight={600}>{`${movie?.title}`}</Text> was
                added to your bookmarks
              </Text>
            </Stack>
          </HStack>
        ),
        position: "bottom-right",
      });
    }
    dispatch(setBookMark(newBookmark));
  };
  return (
    <SplideSlide>
      <Stack h="100%" role="group">
        <Link to={"/movie/" + movie?.slug}>
          <Box height="100%" position={"relative"} cursor="pointer">
            <Image
              borderRadius={8}
              shadow="md"
              src={index % 2 === 0 ? movie?.backdrop : movie?.poster}
              height="100%"
              objectFit={"cover"}
              transition="all 0.3s ease"
              _hover={{ transform: "scale(1.02)" }}
            />
          </Box>
        </Link>

        <Text noOfLines={1} py="1">
          {movie?.title}
        </Text>
        <HStack>
          <HStack color="yellow.500">
            <FaStar />
            <Text>{movie?.imdb_rating}</Text>
          </HStack>
          <Wrap
            opacity={bookmark.find((m: Movie) => m?.id === movie?.id) ? 1 : 0.2}
            transition="opacity 0.5s"
            _groupHover={{ opacity: 1 }}
            cursor="pointer"
            color={
              bookmark.find((m: Movie) => m?.id === movie?.id)
                ? "red.500"
                : "white"
            }
            onClick={toggleBookmark}
          >
            {bookmark.find((m: Movie) => m?.id === movie?.id) ? (
              <BsHeartFill />
            ) : (
              <BsHeart />
            )}
          </Wrap>
        </HStack>
      </Stack>
    </SplideSlide>
  );
};
