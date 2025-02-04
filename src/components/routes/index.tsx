import { Routes, Route } from "react-router-dom";

import Scores from "../scores";
import EditScore from "../score/edit";
import AddScore from "../score/add";
import AddThoughts from "../thoughts";
import Genres from "../genres";
import EditGenre from "../genre/edit";
import AddGenre from "../genre/add";
import Platforms from "../platforms";
import EditPlatform from "../platform/edit";
import AddPlatform from "../platform/add";
import Search from "../search";
import NotFound from "../notFound";

export default function App() {
  return (
    <Routes>
      <Route index element={<Scores />} />
      <Route path="/score/add" element={<AddScore />} />
      <Route path="/score/thoughts/:scoreId" element={<AddThoughts />} />
      <Route path="/score/:scoreId" element={<EditScore />} />
      <Route path="/genres" element={<Genres />} />
      <Route path="/genre/add" element={<AddGenre />} />
      <Route path="/genre/:genreId" element={<EditGenre />} />
      <Route path="/platforms" element={<Platforms />} />
      <Route path="/platform/add" element={<AddPlatform />} />
      <Route path="/platform/:platformId" element={<EditPlatform />} />
      <Route path="/search/:searchText" element={<Search />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
