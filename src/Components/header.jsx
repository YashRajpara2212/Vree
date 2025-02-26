import { observer } from "mobx-react";
import { vreeStore } from "../VreeStore";

// import React from 'react'

const Header = observer(() => {
  const toggleMode = () => {
    vreeStore.toggleDarkMode();

    // // Change background image for body based on dark mode
    if (vreeStore.isDarkMode) {
      // If it's dark mode, set the background image to dark
      document.body.style.backgroundImage =
        "url('/assets/background/background.png')";
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
    } else {
      // If it's light mode, set the background image to light
      document.body.style.backgroundImage =
        "url('/assets/texture/light-background.jpg')";
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    }
  };

  return (
    <div className="flex justify-between">
      <div className="ms-3 mt-[1vh]">
        <img className="h-[8vh]" src="/assets/logo/logo.svg" alt="logo" />
      </div>
      <div className="mt-3">
        <img src="assets/icons/sun.png" alt="light" onClick={toggleMode} />
      </div>
    </div>
  );
});

export default Header;
