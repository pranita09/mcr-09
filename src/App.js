import { Toaster } from "react-hot-toast";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  CategoryVideos,
  Explore,
  Home,
  Playlists,
  SingleVideo,
  WatchLater,
} from "./pages";
import { Header } from "./components";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/category/:categoryName" element={<CategoryVideos />} />
        <Route path="/video/:videoId" element={<SingleVideo />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: "4rem",
        }}
      />
    </div>
  );
}

export default App;
