import { Header, SideBar } from "../components";

export const Playlists = () => {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-[12.5rem_1fr]">
        <SideBar />
        <h1>Playlists</h1>
      </div>
    </div>
  );
};