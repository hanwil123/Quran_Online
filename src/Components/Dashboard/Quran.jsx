import React, { useEffect, useState } from "react";
import axios from "axios";

const Quran = ({ surah }) => {
  const [ayat, setAyat] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://equran.id/api/v2/surat/${surah.nomor}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const ayatData = response.data.data.ayat;
        setAyat(ayatData);
        console.log(ayatData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [surah]);

  return (
    <div className="flex flex-col h-full bg-green-100 shadow-xl">
      <div className="flex justify-center mt-10 bg-green-200 py-5">
        <h1 className="hyphens-auto break-all text-black">{surah.namaLatin}</h1>
      </div>
      <div className="flex justify-center mt-10  py-5">
        <h1 className="text-black text-3xl">بِسْــــــــــــــــــمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ</h1>
      </div>
      {ayat.map((ayatData) => (
        <div className="relative hyphens-auto" key={ayatData.nomorAyat}>
          <div className="flex justify-between mx-14 my-10 mt-20 ">
            <div>
              <h1 className="text-black">
                {surah.nomor}:{ayatData.nomorAyat}
              </h1>
            </div>

            <div className="ml-10">
              <h1 className="text-black text-3xl">{ayatData.teksArab}</h1>
            </div>
          </div>
          <div className="flex container px-28">
            <h1 className="hyphens-auto text-black">{ayatData.teksIndonesia}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Quran;
