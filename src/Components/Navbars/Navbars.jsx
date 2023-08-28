import React, { useState } from "react";
import { BsSun } from "react-icons/Bs";
import { BsMoonFill } from "react-icons/Bs";
import { BiSearch } from "react-icons/Bi";

const Navbars = ({ OnSurahChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [quranName, setQuranName] = useState("");

  const handleQuranChange = (e) => {
   setQuranName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    OnSurahChange(quranName);
   setQuranName('')
  };

  const handleModeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

 

  return (
    <>
      <div
        className={` navbar bg-${isDarkMode ? "gray" : "green"}-200 text-${
          isDarkMode ? "gray" : "blue"
        }-600`}
      >
        <div className="justify-between w-screen">
          <div className="flex justify-start">
            <a className="btn btn-ghost normal-case xl:text-xl sm:text-xs">
              <img className=" w-14 h-10" src="../../public/quran1.jpg" alt="quranlogo" />
            </a>
          </div>
          <div className=" flex">
            <form onSubmit={handleSubmit}>
              <label
              htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="relative xl:w-[500px] md:w-[300px] sm:w-[200px] p-4 pl-10 text-sm sm:text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Surah"
                  value={quranName}
                  onChange={handleQuranChange}
                  required
                />
                <button
                  type="submit"
                  className=" sm:w-[40px] text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <BiSearch/>
                </button>
              </div>
            </form>
          </div>
          <div className="flex-none gap-2">
            <button className="btn btn-ghost" onClick={handleModeToggle}>
              {isDarkMode ? (
                <h2>
                  <BsMoonFill />
                </h2>
              ) : (
                <BsSun />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbars;
