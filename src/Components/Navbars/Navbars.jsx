import React, { useState } from "react";
import { BsSun } from 'react-icons/Bs';
import { BsMoonFill } from 'react-icons/Bs';

const Navbars = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleModeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
    // You can add more logic here to update the theme of your application based on the state.
    // For example, you might use CSS classes or set a class on the root element.
    // document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <div
        className={`navbar bg-${isDarkMode ? "gray" : "green"}-200 text-${
          isDarkMode ? "gray" : "blue"
        }-600`}
      >
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Quran Online</a>
        </div>
        <div className="flex-none gap-2">
          <button
            className="btn btn-ghost"
            onClick={handleModeToggle}
          >
            {isDarkMode ? <h2><BsMoonFill/></h2> : <BsSun/>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbars;
