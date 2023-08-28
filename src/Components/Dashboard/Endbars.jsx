import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BsFillBookmarkPlusFill } from "react-icons/Bs";
import { MdDeleteForever } from "react-icons/Md";

const Endbars = ({ onBookmarkClick }) => {
  const [bookmarkDatas, setBookmarksDatas] = useState([]);
  const scrollRefs = useRef([]);

  const ambilBookmarks = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/bookmarks`);
      const datas = response.data;
      console.log(datas);
      setBookmarksDatas(datas);
    } catch (error) {
      console.error("Error getting bookmarks:", error);
    }
  };

  useEffect(() => {
    ambilBookmarks();
  }, []);

  const handleBookmarkClick = (surah) => {
    onBookmarkClick(surah);
    console.log(surah.id);
  };
  const deleteAllBookmarks = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/bookmarks`);
      const data = response.data; // Menggunakan response.data daripada response.d
      console.log(data);
      alert("Yakhin mau dihapus???");
      setBookmarksDatas([]); // Mengosongkan data setelah dihapus
    } catch (error) {
      console.error("Error hapus bookmarks", error);
    }
  };

  return (
    <>
      <aside className=" xl:bg-[#bcdec3]  h-auto flex flex-col items-center pb-2 space-y-7">
        <div className="w-full pr-3 flex flex-col gap-y-3 text-gray-500 fill-gray-500 text-sm">
          <button onClick={ambilBookmarks}>
            <div className="w-full flex items-center gap-x-1.5 group select-none bg-[#bcdec3]">
              <div className="w-1 rounded-xl h-8 transition-colors duration-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 translate-y-0 bg-red-600 transition-all duration-300"></div>
              </div>
              <div className="bg-white/10 text-gray-500 group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm">
                <h1>
                  <BsFillBookmarkPlusFill />
                </h1>

                <span className="font-QuicksandMedium">BOOKMARKS</span>
              </div>
            </div>
          </button>
          <button onClick={deleteAllBookmarks}>
            <div className="w-full flex items-center gap-x-1.5 group select-none bg-[#bcdec3]">
              <div className="w-1 rounded-xl h-8 transition-colors duration-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 translate-y-0 bg-red-600 transition-all duration-300"></div>
              </div>
              <div className="bg-white/10 text-gray-500 group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm">
                <h1>
                  <MdDeleteForever />
                </h1>

                <span className="font-QuicksandMedium">
                  HAPUS SEMUA BOOKMARKS
                </span>
              </div>
            </div>
          </button>
          {bookmarkDatas.map((surah) => (
            <>
              <div
                className="w-full flex items-center gap-x-1.5 group select-none bg-[#bcdec3]"
                key={surah.id}
                onClick={() => {
                  handleBookmarkClick(surah);
                }}
              >
                <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
                </div>
                <div className="bg-white/10 text-gray-500 group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm cursor-pointer">
                  <svg
                    className="h-5 w-5 group-hover:fill-red-600 dark:fill-gray-600 transition-colors duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <BsFillBookmarkPlusFill />
                  </svg>

                  <span className="font-QuicksandMedium">
                    Surah Ke : {surah.nomor}
                  </span>
                  <span className="font-QuicksandMedium">
                    Ayat : {surah.nomorAyat}
                  </span>
                </div>
              </div>
            </>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Endbars;
