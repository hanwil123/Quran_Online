import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BiPin } from "react-icons/bi";
import Cookies from "js-cookie";


const Quran = ({ surah, bookmarkData, displaySurah, addScrollRef, scrollRefs }) => {
  const [ayat, setAyat] = useState([]);
  const [surahh, setSurahh] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState({});
  const [dataBookmark, setDataBookmark] = useState([]);
  const [surahhh, setSurahhh] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!surah) return; // Add this null check
        
        const response = await axios.get(
          `https://equran.id/api/v2/surat/${surah.nomor}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const ayatData = response.data.data.ayat;
        const surahNomorData = response.data.data;
        setAyat(ayatData);
        setSurahh(surahNomorData);
        console.log(ayatData);
      } catch (error) {
        console.log(error);
      }
    };
    
    const fetchBookmarkData = async () => {
      try {
        if (!bookmarkData || bookmarkData.id === null) return; // Add this null check
        
        // Fetch data based on bookmarkData.id
        const response = await axios.get(
          `https://go-quran-production.up.railway.app/bookmarks/${bookmarkData.id}`
        );
        const bookmarks = response.data;
        setDataBookmark(bookmarks);
        setSurahhh(bookmarks);
        console.log(bookmarks);

      } catch (error) {
        console.log(error);
      }
    };
    
    
    fetchData();
    fetchBookmarkData();
  }, [surah, displaySurah,bookmarkData]);

  const handleBookmarkClick = (ayatData) => {
    const surahNomorData = { nomor: surah.nomor };
    const surahNama = {namaSurah : surah.namaLatin}
    const bookmarkData = { ...ayatData, ...surahNomorData, ...surahNama };
    const tokenUser = Cookies.get('token-user');

    axios
      .post("https://go-quran-production.up.railway.app/bookmarks", bookmarkData, {
        headers: {
          "Authorizations": `${tokenUser}`,
        },
      }) 
      .then((response) => {
        console.log("Bookmark added:", response.data);

        // Update bookmark status to indicate bookmarked ayat
        setBookmarkStatus((prevStatus) => ({
          ...prevStatus,
          [ayatData.nomorAyat]: true,
        }));
      })
      scrollToAyat(ayatData.nomorAyat)
  };
  const scrollToAyat = (nomorAyat) => {
    const targetAyat = scrollRefs.current[nomorAyat - 1];
    if (targetAyat) {
      targetAyat.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col h-full bg-green-100 shadow-xl ip13:relative xl:relative">
      {displaySurah && surahh ? (
        <>
         <div className="flex justify-center mt-10 bg-green-200 py-5">
          <h1 className="hyphens-auto break-all text-black">
            {surahh.namaLatin}
          </h1>
        </div>
          {ayat.map((ayatData) => (
            <div
              className="relative hyphens-auto"
              key={ayatData.nomorAyat}
              id={ayatData.id}
              ref={(ref) => addScrollRef(ref)} // Menambahkan referensi scroll
            >
              <div className="flex justify-between mx-14 my-10 mt-20 ">
                <div className="flex flex-col gap-y-4">
                  <div>
                    <h1 className="text-black">
                      {surah.nomor}:{ayatData.nomorAyat}
                    </h1>
                  </div>
                  <div>
                    <button
                      onClick={() => handleBookmarkClick(ayatData)}
                      className={
                        bookmarkStatus[ayatData.nomorAyat] ? "text-red-500" : ""
                      }
                    >
                      <BiPin />
                    </button>
                  </div>
                </div>
                <div className="ml-10">
                  <h1 className="text-black text-3xl">{ayatData.teksArab}</h1>
                </div>
              </div>
              <div className="flex container px-28">
                <h1 className="hyphens-auto text-black">
                  {ayatData.teksIndonesia}
                </h1>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
         <div className="flex justify-center mt-10 bg-green-200 py-5">
          <h1 className="hyphens-auto break-all text-black">
            {surahhh.namaSurah}
          </h1>
        </div>
          <div key={dataBookmark.nomorAyat} id={dataBookmark.nomorAyat} className="relative hyphens-auto">
            <div className="flex justify-between mx-14 my-10 mt-20">
              <div className=" flex flex-col gap-y-4">
                <div>
                  <h1 className="text-black">
                    {dataBookmark.nomor}:{dataBookmark.nomorAyat}
                  </h1>
                </div>
                <div>
                  <button
                    onClick={() => handleBookmarkClick(dataBookmark)}
                    className={
                      bookmarkStatus[dataBookmark.nomorAyat]
                        ? "text-red-500"
                        : ""
                    }
                  >
                    <BiPin />
                  </button>
                </div>
              </div>
              <div className="ml-10">
                <h1 className="text-black text-3xl">{dataBookmark.teksArab}</h1>
              </div>
            </div>
            <div className="flex container px-28">
              <h1 className="hyphens-auto text-black">
                {dataBookmark.teksIndonesia}
              </h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Quran;
