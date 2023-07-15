import React, { useEffect, useState } from "react";
import axios from "axios";

const Sidebars = ({ onSelectSurah }) => {
  const [isi, setIsi] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://equran.id/api/v2/surat", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const isiData = response.data.data;
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

  return (
    <aside className="w-48 bg-[#bcdec3] min-h-full h-screen flex flex-col items-center pt-5 pb-2 space-y-7 overflow-auto px-5">
      <div className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm">
        <div className="font-QuicksandMedium pl-4 text-gray-400/60 text-xs text-[11px] uppercase">
          Menu
        </div>
        {isi.map((surah) => (
          <div
            className="w-full flex items-center gap-x-1.5 group select-none"
            key={surah.nomor}
            onClick={() => handleSurahClick(surah)}
          >
            <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
            </div>
            <div
              className="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
              href={surah.ink}
            >
              <svg
                className="h-5 w-5 group-hover:fill-red-600 dark:fill-gray-600 transition-colors duration-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                {/* SVG Path */}
              </svg>
              <span className="font-QuicksandMedium">{surah.namaLatin}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebars;
