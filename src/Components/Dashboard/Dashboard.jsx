import React, { useState, useEffect, useRef, useCallback } from "react";
import Sidebars from "./Sidebars";
import Navbars from "../Navbars/Navbars";
import Endbars from "./Endbars";

import { BiRightArrow } from "react-icons/Bi";
import Quran from "./Qurans";

const Dashboard = () => {
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBookmarkSelected, setIsBookmarkSelected] = useState(false);
  const [isSelectedSurah, setIsSelectedSurah] = useState(false);
  const scrollRefs = useRef([]);

  const handleSurahSelect = (surah) => {
    setIsLoading(true);

    setTimeout(() => {
      setSelectedSurah(surah);
      setIsLoading(false);
      setIsSelectedSurah(true);
      setSelectedBookmark(null); // Reset selectedBookmark when a surah is selected
    }, 1000);
  };

  const handleBookmarkClick = (surah) => {
    setSelectedBookmark(surah);
    setSelectedSurah(null); // Reset selectedSurah when a bookmark is selected
    setIsBookmarkSelected(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsBookmarkSelected(false);
    setIsSelectedSurah(false);
  };
  const addScrollRef = useCallback((ref) => {
    scrollRefs.current.push(ref);
  }, []);

  // Determine whether to display surah or bookmark
  const displaySurah =
    selectedSurah !== null ||
    (selectedBookmark !== null && !isBookmarkSelected);

  return (
    <div className=" max-w-full overflow-x-hidden">
      <Navbars OnSurahChange={handleSearch} />
      <div className="flex flex-grow justify-between max-h-full min-h-screen">
        <div className="xl:flex lg:flex flex-grow relative xl:w-auto md:flex sm:hidden ip5:hidden">
          <Sidebars
            onSelectSurah={handleSurahSelect}
            searchQuery={searchQuery}
          />
        </div>
        <details className="dropdown xl:hidden md:hidden flex bg-[#bcdec3]">
          <summary className=" bg-[#bcdec3] cursor-pointer"></summary>
          <Sidebars
            onSelectSurah={handleSurahSelect}
            searchQuery={searchQuery}
          />
        </details>
        <div className="flex-grow xl:w-full md:w-full sm:min-w-[60px] ip13:min-w-[190px] ipx:min-w-[125px] ipx:w-[375px] ip5:w-[120px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full bg-green-200">
              <div className="animate-spin rounded-full border-t-4 border-gray-900 h-12 w-12"></div>
            </div>
          ) : (
            <Quran
              surah={selectedSurah}
              bookmarkData={selectedBookmark}
              scrollRefs={scrollRefs}
              displaySurah={displaySurah}
              addScrollRef={addScrollRef} // Menambahkan ini
            />
          )}
        </div>
        <div className="xl:flex lg:flex flex-grow relative xl:w-auto md:flex sm:hidden ip5:hidden">
          <Endbars onBookmarkClick={handleBookmarkClick} />
        </div>
        <details className="dropdown xl:hidden md:hidden flex bg-[#bcdec3]">
          <summary className=" bg-[#bcdec3] cursor-pointer"></summary>
          <Endbars onBookmarkClick={handleBookmarkClick} />
        </details>
      </div>
    </div>
  );
};

export default Dashboard;
