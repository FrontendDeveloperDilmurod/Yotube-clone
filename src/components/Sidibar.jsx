import React, { useContext } from "react";
import { YoutubeContext } from "../context/YotubeContext";
import home from "../assets/home.png";
import game_icon from "../assets/game_icon.png";
import jack from "../assets/jack.png";
import simon from "../assets/simon.png";
import automobiles from "../assets/automobiles.png";
import sports from "../assets/sports.png";
import entertamen from "../assets/entertainment.png";
import teach from "../assets/tech.png";
import music from "../assets/music.png";
import blogs from "../assets/blogs.png";
import news from "../assets/news.png";
import developer from "../assets/ozim.jpg";
import { Link } from "react-router-dom";

const Sidibar = () => {
  const { sidebar, category, setCategory } = useContext(YoutubeContext);

  return (
    <div
      // className={` mt-16 pb-12 top-0 left-0 h-screen p-4  transition-transform transform ${sidebar ? 'w-60' : 'w-20'}`}
      className={`mt-16 pb-12 top-16 left-0 h-screen p-4 overflow-y-auto transition-transform transform sticky ${sidebar ? "w-60" : "w-20"
        } hover:scrollbar-thin hover:scrollbar-thumb-gray-400 hover:scrollbar-track-gray-100`}
    >
      <div
        className={`flex gap-4 items-center p-1 rounded-lg cursor-pointer  hover:bg-gray-200 first-line:${category === 12 ? " bg-gray-300" : ""
          }`}
        onClick={() => setCategory(12)}
      >
        <Link
          to="/"
          className="flex items-center gap-4"
          activeClassName="bg-gray-300" // Change this to your active class style
        >
          <img src={home} alt="home" className={`w-${sidebar ? "6" : "6"}`} />
          {sidebar && <p className="text-base font-semibold">Home</p>}
        </Link>
      </div>
      <div
        className={`flex gap-4 items-center p-1 mt-3 rounded-lg cursor-pointer hover:bg-gray-200 ${category === 31 ? " bg-gray-300" : ""
          }`}
        onClick={() => setCategory(31)}
      >
        <img
          src={game_icon}
          alt="game_icon"
          className={`w-${sidebar ? "6" : "8"}`}
        />
        {sidebar && <p className="text-base font-semibold">Gaming</p>}
      </div>
      <div
        className={`flex gap-4 items-center p-1 mt-3 rounded-lg cursor-pointer hover:bg-gray-200 ${category === 21 ? " bg-gray-300" : ""
          }`}
        onClick={() => setCategory(21)}
      >
        <img
          src={automobiles}
          alt="game_icon"
          className={`w-${sidebar ? "6" : "8"}`}
        />
        {sidebar && <p className="text-base font-semibold">Automobiles</p>}
      </div>
      <div
        className={`flex gap-4 items-center p-1 mt-3 rounded-lg cursor-pointer hover:bg-gray-200 ${category === 13 ? " bg-gray-300" : ""
          }`}
        onClick={() => setCategory(13)}
      >
        <img
          src={sports}
          alt="game_icon"
          className={`w-${sidebar ? "6" : "8"}`}
        />
        {sidebar && <p className="text-base font-semibold">Sports</p>}
      </div>
      <div
        className={`flex gap-4 items-center p-1 mt-3 rounded-lg cursor-pointer hover:bg-gray-200 ${category === 22 ? " bg-gray-300" : ""
          }`}
        onClick={() => setCategory(22)}
      >
        <img
          src={entertamen}
          alt="game_icon"
          className={`w-${sidebar ? "6" : "8"}`}
        />
        {sidebar && <p className="text-base font-semibold">Entertainment</p>}
      </div>
      <div
        className={`flex gap-4 items-center p-1 mt-3 rounded-lg cursor-pointer hover:bg-gray-200 ${category === 11 ? " bg-gray-300" : ""
          }`}
        onClick={() => setCategory(11)}
      >
        <img
          src={teach}
          alt="game_icon"
          className={`w-${sidebar ? "6" : "8"}`}
        />
        {sidebar && <p className="text-base font-semibold">Technology</p>}
      </div>
      <div
        className={`flex gap-4 items-center p-1 mt-3 rounded-lg cursor-pointer hover:bg-gray-200 ${category === 4 ? " bg-gray-300" : ""
          }`}
        onClick={() => setCategory(4)}
      >
        <img
          src={music}
          alt="game_icon"
          className={`w-${sidebar ? "6" : "8"}`}
        />
        {sidebar && <p className="text-base font-semibold">Music</p>}
      </div>
      <div
        className={`flex gap-4 items-center p-1 mt-3 rounded-lg cursor-pointer hover:bg-gray-200 ${category === 3 ? " bg-gray-300" : ""
          }`}
        onClick={() => setCategory(3)}
      >
        <img
          src={blogs}
          alt="game_icon"
          className={`w-${sidebar ? "6" : "8"}`}
        />
        {sidebar && <p className="text-base font-semibold">Blogs</p>}
      </div>

      <div
        className={`flex gap-4 items-center p-1 mt-3 rounded-lg cursor-pointer hover:bg-gray-200 ${category === 26 ? " bg-gray-300" : ""
          }`}
        onClick={() => setCategory(26)}
      >
        <img
          src={news}
          alt="game_icon"
          className={`w-${sidebar ? "6" : "8"}`}
        />
        {sidebar && <p className="text-base font-semibold">News</p>}
      </div>
      {/* Qo'shimcha bo'limlar */}
      <div className="mt-8">
        {sidebar && <p className="text-base font-bold">Suggested Channels</p>}
        <div className="mt-4">
          <Link to={'/channnels'}>
            <div className={`flex gap-4 items-center p-1 mt-3 rounded-lg cursor-pointer hover:bg-gray-200 ${category === 262 ? " bg-gray-300" : ""
              }`}
              onClick={() => setCategory(262)}>
              <img
                src={developer}
                alt="jack"
                className="w-10 h-10 rounded-full"
              />
              {sidebar && <p className="text-base font-semibold">Frontend_Developer</p>}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidibar;
