import React, { useState } from "react";
import { CiLight } from "react-icons/ci";
import { FaLocationArrow, FaSearch, FaTwitter } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoIosLink } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";

const Card = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lightMode, setLightMode] = useState(false); // Theme toggle state

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://api.github.com/users/${value}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle light/dark mode
  const toggleTheme = () => {
    setLightMode((prevMode) => !prevMode);
  };

  return (
    <div className={`flex flex-col gap-4 items-center h-screen justify-center ${lightMode ? "bg-white text-black" : "bg-blue-800 text-white"}`}>
      <div className={`flex justify-between p-5 rounded-xl w-[800px] ${lightMode ? "bg-gray-200" : "bg-blue-950"} text-${lightMode ? "black" : "white"}`}>
        <div>DevFinder</div>
        <div className="flex gap-1 items-center uppercase font-bold cursor-pointer" onClick={toggleTheme}>
          {lightMode ? "Dark" : "Light"} <CiLight />
        </div>
      </div>
      <div className={`flex items-center justify-between p-5 rounded-xl w-[800px] ${lightMode ? "bg-gray-200" : "bg-blue-950"}`}>
        <div className="flex items-center">
          <div className={`text-2xl mr-4 ${lightMode ? "text-black" : "text-blue-600"}`}>
            <FaSearch />
          </div>
          <input
            className="border-none bg-transparent outline-none text-xl"
            type="text"
            placeholder="Search Github username..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button
          className={`p-4 rounded-xl text-2xl font-bold ${lightMode ? "bg-black text-white" : "bg-blue-800 text-white"}`}
          type="button"
          onClick={fetchData}
        >
          Search
        </button>
      </div>
      
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <div className={`p-5 rounded-xl h-fit flex w-[800px] ${lightMode ? "bg-gray-200" : "bg-blue-950"}`}>
          <div>
            <img src={data.avatar_url} alt="Profile" className="w-32 h-32 rounded-full" />
          </div>
          <div className="w-full ml-4">
            <div className="flex flex-wrap w-full justify-between items-center">
              <div className="font-bold text-4xl">{data.name || "No Name"}</div>
              <div className="font-bold">Joined {new Date(data.created_at).toLocaleDateString()}</div>
            </div>
            <div className="mt-6 text-yellow-500 text-lg">@{data.login}</div>
            <div className="mt-4 text-2xl mb-4">{data.bio || "This profile has no bio"}</div>
            <div className={`flex flex-wrap items-center justify-between w-[500px] p-5 rounded-xl ${lightMode ? "bg-gray-300" : "bg-gray-800"}`}>
              <div>
                <p>Repos</p>
                <p className="font-bold text-2xl">{data.public_repos}</p>
              </div>
              <div>
                <p>Followers</p>
                <p className="font-bold text-2xl">{data.followers}</p>
              </div>
              <div>
                <p>Following</p>
                <p className="font-bold text-2xl">{data.following}</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between w-[600px] mt-4">
              <div className="flex items-center gap-4 text-2xl">
                <IoLocationSharp />
                <div>{data.location || "Not Available"}</div>
              </div>
              <div className="flex items-center gap-4 text-2xl">
                <FaTwitter />
                <div>{data.twitter_username || "Not Available"}</div>
              </div>
              <div className="flex items-center gap-4 text-2xl">
                <IoIosLink />
                <div>{data.blog ? <a href={data.blog} target="_blank" rel="noopener noreferrer">{data.blog}</a> : "Not Available"}</div>
              </div>
              <div className="flex items-center gap-4 text-2xl">
                <HiOutlineBuildingOffice2 />
                <div>{data.company || "Not Available"}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
