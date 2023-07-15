import React, { useState } from "react";
import Sidebars from "./Sidebars";
import Navbars from "../Navbars/Navbars";
import Endbars from "./Endbars";
import Quran from "./quran";

const Dashboard = () => {
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSurahSelect = (surah) => {
    setIsLoading(true);

    // Introduce a delay of 1 second to simulate loading
    setTimeout(() => {
      setSelectedSurah(surah);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className="w-full">
        <Navbars />
        <div className="flex flex-grow">
          <div className="flex flex-grow relative">
            <Sidebars onSelectSurah={handleSurahSelect} />
          </div>
          <div className="flex-grow relative w-screen">
            {isLoading ? (
              <div className="flex items-center justify-center h-full bg-green-200">
                <div className="animate-spin rounded-full border-t-4 border-gray-900 h-12 w-12"></div>
              </div>
            ) : (
              <>
                {selectedSurah ? (
                  <Quran surah={selectedSurah} />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p>Silahkan Pilih Surah nya disamping kiri</p>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="flex flex-grow relative">
            <Endbars />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
