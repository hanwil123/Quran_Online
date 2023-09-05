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
            <div className=" flex-row flex gap gap-x-4 justify-center">
              <div>
                <a href="/Dashboard">
                  <button className="btn btn-primary">
                    Mulai Membaca Al Quran
                  </button>
                </a>
              </div>
              <div>
                <a href="/Register">
                  <button className="btn btn-primary">
                    Sign Up
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
