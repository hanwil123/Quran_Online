import React from "react";

const Home = () => {
  return (
    <>
      <div
        className="hero min-h-screen w-screen"
        style={{
          backgroundImage: "url(quran.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">AL QURAN</h1>
            <p className="mb-5">
              BACALAH AL QURAN WALAUPUN HANYA 1 AYAT INSYA ALLAH AKAN MEMBAWA
              KEBAIKAN
            </p>
            <a href="/Dashboard">
              <button className="btn btn-primary">MARI MEMBACA AL QURAN</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
