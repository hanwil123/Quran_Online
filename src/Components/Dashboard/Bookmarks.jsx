import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsPinFill } from "react-icons/Bs";

const Bookmarks = ({bookmarkData}) => {
  const [surah, setSurah] = useState({});
  const [bookmarkStatus, setBookmarkStatus] = useState({});
  const [dataBookmark, setDataBookmark] = useState({});

  useEffect(() => {
    const fetchBookmarkData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/bookmarks/${bookmarkData.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const bookmarks = response.data;
        console.log("API response:", bookmarks);
        setDataBookmark(bookmarks);
        setSurah(bookmarks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookmarkData();
  }, [bookmarkData]);

  const handleBookmarkClick = (bookmark) => {
    const surahNomorData = { nomor: bookmark.nomor };

    const bookmarkData = { ...bookmark, ...surahNomorData };

    axios
      .post("http://localhost:8000/bookmarks", bookmarkData)
      .then((response) => {
        console.log("Bookmark added:", response.data);
        setBookmarkStatus((prevStatus) => ({
          ...prevStatus,
          [bookmark.nomorAyat]: true,
        }));
      })
      .catch((error) => {
        console.error("Error adding bookmark:", error);
      });
  };

  return (
    <div className="flex flex-col h-full bg-green-100 shadow-xl">
      {surah ? (
        <div className="flex justify-center mt-10 bg-green-200 py-5">
          <h1 className="hyphens-auto break-all text-black">{surah.id}</h1>
        </div>
      ) : (
        <>
          <h1>BLOGBLOGBLOG</h1>
        </>
      )}
      <div key={dataBookmark.nomorAyat} className="relative hyphens-auto">
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
                  bookmarkStatus[dataBookmark.nomorAyat] ? "text-red-500" : ""
                }
              >
                <BsPinFill />
              </button>
            </div>
          </div>
          <div className="ml-10">
            <h1 className="text-black text-3xl">{dataBookmark.teksArab}</h1>
          </div>
        </div>
        <div className="flex container px-28">
          <h1 className="hyphens-auto text-black">{dataBookmark.teksIndonesia}</h1>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
