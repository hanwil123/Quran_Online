import React, { useEffect, useState } from "react";
import axios from "axios";

const Sidebars = ({ onSelectSurah, searchQuery }) => {
  const [isi, setIsi] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // New state for tracking search mode

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://equran.id/api/v2/surat", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const isiData = response.data.data;
        console.log(isiData);
        setIsi(isiData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSurahClick = (surah) => {
    onSelectSurah(surah);
  };

  useEffect(() => {
    setIsSearching(searchQuery !== ""); // Update isSearching state based on searchQuery
  }, [searchQuery]);

  return (
    <aside className="bg-green-200 h-auto flex flex-col items-center pb-2 space-y-7">
      <div className="w-full pr-3 flex flex-col gap-y-3 text-gray-500 fill-gray-500 text-sm">
        <a href="/Dashboard">
          <div className="font-QuicksandMedium text-center mb-3 text-black text-xs text-[11px] uppercase border border-solid rounded-lg h-8 pt-1 bg-green-200">
            <h1 className=" text-md">Menu</h1>
          </div>
        </a>
        {isSearching
          ? isi
              .filter((surah) =>
                surah.namaLatin
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((surah) => (
                <div
                  className="w-full flex items-center gap-x-1.5 group select-none"
                  key={surah.nomor}
                  onClick={() => handleSurahClick(surah)}
                >
                  <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
                  </div>
                  <div
                    className=" cursor-pointer group-hover:bg-white/10 w-full group-active:scale-95 self-stretch rounded flex items-center space-x-1 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
                    href={surah.ink}
                  >
                    <svg
                      className="h-5 w-5 group-hover:fill-red-600 dark:fill-gray-600 transition-colors duration-200"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      {/* SVG Path */}
                    </svg>
                    <span className="font-QuicksandMedium">{surah.nomor}</span>
                    <span className="font-QuicksandMedium">
                      {surah.namaLatin}
                    </span>
                  </div>
                </div>
              ))
          : isi.map((surah) => (
              <div
                className="w-full flex items-center gap-x-1.5 group select-none"
                key={surah.nomor}
                onClick={() => handleSurahClick(surah)}
              >
                <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
                </div>
                <div
                  className=" cursor-pointer group-hover:bg-white/10 w-full group-active:scale-95 self-stretch rounded flex items-center space-x-1 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
                  href={surah.ink}
                >
                  <svg
                    className="h-5 w-5 group-hover:fill-red-600 dark:fill-gray-600 transition-colors duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {/* SVG Path */}
                  </svg>
                  <span className="font-QuicksandMedium">{surah.nomor}</span>
                  <span className="font-QuicksandMedium">
                    {surah.namaLatin}
                  </span>
                </div>
              </div>
            ))}
      </div>
    </aside>
  );
};

export default Sidebars;
