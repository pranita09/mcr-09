import { Link } from "react-router-dom";
import { GrCirclePlay, GrSearch } from "react-icons/gr";

export const Header = () => {
  return (
    <div className="bg-white py-4 flex items-center justify-around sticky top-0 z-20">
      <Link to="/" className="flex items-center gap-0.5 text-2xl">
        <GrCirclePlay className="text-2xl text-primaryColor" />
        <h1>
          <span className="text-primaryColor">Crafty</span>Creations
        </h1>
      </Link>
      <div className="border rounded flex items-center px-1 gap-2">
        <GrSearch className="text-lg text-[lightGray]" />
        <input
          type="text"
          placeholder="Search videos..."
          className="outline-none py-1 rounded text-sm"
        />
      </div>
    </div>
  );
};
