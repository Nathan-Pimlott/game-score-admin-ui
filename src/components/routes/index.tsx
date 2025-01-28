import { Routes, Route } from "react-router-dom";

import Scores from "../scores";
import EditScore from "../score/edit";
import AddScore from "../score/add";
import Genres from "../genres";
import EditGenre from "../genre";
import Platforms from "../platforms";
import EditPlatform from "../platform";
import Search from "../search";
import NotFound from "../notFound";

export default function App() {
  return (
    <Routes>
      <Route index element={<Scores />} />
      <Route path="/score/add" element={<AddScore />} />
      <Route path="/score/:scoreId" element={<EditScore />} />
      <Route path="/genres" element={<Genres />} />
      <Route path="/genre/:genreId" element={<EditGenre />} />
      <Route path="/platforms" element={<Platforms />} />
      <Route path="/platform/:platformId" element={<EditPlatform />} />
      <Route path="/search/:searchText" element={<Search />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
