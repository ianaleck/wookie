import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosInstance from "../utils/axios";

export type Movie = {
  backdrop?: string;
  cast?: string[];
  classification?: string;
  director?: string;
  genres?: string[];
  id?: string;
  imdb_rating?: number;
  length?: string;
  overview?: string;
  poster?: string;
  released_on?: string;
  slug?: string;
  title?: string;
} | null;
export type Genre = {
  name: string;
  movies: Movie[];
};

type Props = {
  children: React.ReactNode;
};

interface AppContextInterface {
  genres: Genre[];
  loading: boolean;
  search(query: string): Promise<Movie[]>;
  getMovie(id: string): Promise<Movie>;
  randomMovies(): Movie[];
  // ramdomMovies(): Movie[];
}

const MoviesContext = createContext<AppContextInterface>(
  {} as AppContextInterface
);

export const useMovies = () => {
  return useContext(MoviesContext);
};

export const MoviesProvider: React.FC<Props> = ({ children }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [all, setAll] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(false);

  const getMovies = useCallback(async () => {
    setLoading(true);
    await axiosInstance
      .get(process.env.REACT_APP_MOVIES as string)
      .then((res) => res.data)
      .then((data) => {
        let newGenres: Genre[] = [];
        setAll(data.movies);
        data.movies.map((movie: Movie) => {
          let genresString = movie?.genres;
          genresString?.map((genre: string, index) => {
            if (!newGenres.find((g) => g.name === genre)) {
              newGenres.push({
                name: genre,
                movies: [movie],
              });
            } else {
              if (!newGenres[index].movies.find((m) => m?.id === movie?.id)) {
                newGenres[index].movies.push(movie);
              }
            }
            return genre;
          });
          return movie;
        });
        setGenres(newGenres);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  const search = async (query: string) => {
    let movies = [] as Movie[];

    await axiosInstance
      .get(process.env.REACT_APP_MOVIES + `?q=${query}`)
      .then((res) => res.data)
      .then((data) => {
        movies = data.movies;
      })
      .catch((err) => {
        console.log(err);
      });

    return Promise.resolve(movies);
  };

  const getMovie = async (slug: string) => {
    let movie: Movie = null;
    await axiosInstance
      .get(process.env.REACT_APP_MOVIES + `/${slug}`)
      .then((res) => res.data)
      .then((data) => {
        movie = data;
      })
      .catch((err) => {
        console.log(err);
      });
    return Promise.resolve(movie);
  };

  const randomMovies = () => {
    //random 5 movies
    let randomMoviesList = [];
    let randomMovie = all[Math.floor(Math.random() * all.length)];
    randomMoviesList.push(randomMovie);
    for (let i = 0; i < 4; i++) {
      let randomMovie = all[Math.floor(Math.random() * all.length)];
      if (!randomMoviesList.find((movie) => movie?.id === randomMovie?.id)) {
        randomMoviesList.push(randomMovie);
      }
    }
    return randomMoviesList;
  };

  const values = { loading, genres, search, getMovie, randomMovies };

  return (
    <MoviesContext.Provider value={values}>{children}</MoviesContext.Provider>
  );
};
