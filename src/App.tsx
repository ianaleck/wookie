import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./layouts/HomePage";
import { MovieDetailed } from "./layouts/MovieDetailed";
import SearchResults from "./layouts/SearchResults";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Routes Here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:slug" element={<MovieDetailed />} />
        <Route path="/search" element={<SearchResults />} />
        {/*<Route path="/favorites" element={<HomePage />} /> */}
      </Routes>
    </>
  );
}

export default App;
