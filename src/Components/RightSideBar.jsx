

import { useState } from "react";
import LensesComponent from "./LensesComponent";
import FrameComponent from "./FrameComponent";
import TempleComponent from "./TempleComponent";

const RightSideBar = () => {
  const [selectedComponent, setSelectedComponent] = useState("frame");

  const handleButtonClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    // w-[35vw]
    <div className="w-[35vw]">
      {/* Button Controls */}
      <div className="flex gap-4 mt-5">
        {/* Left button */}
        <div
          onClick={() => handleButtonClick("temple")}
          //border-2 border-[#A673FF] hover:bg-[#A673FF]
          className="flex items-center gap-2 px-4 py-2 bg-transparent  text-[#A673FF] rounded-md  hover:text-white transition-all duration-300"
        >
          <span className="text-lg">
            {/* ⏪ */}
            {selectedComponent === "temple" ? " Temple" : "Temple"}
          </span>
        </div>

        {/* Middle button (selected component) */}
        <div
          onClick={() => handleButtonClick("lenses")}
          //border-2 border-[#A673FF] hover:bg-[#A673FF]
          className="flex items-center gap-2 px-4 py-2 bg-transparent  text-[#A673FF] rounded-md  hover:text-white transition-all duration-300"
        >
          <span className="text-lg">
            {selectedComponent === "lenses" ? " Lenses" : "Lenses"}
          </span>
        </div>

        {/* Right button */}
        <div
          onClick={() => handleButtonClick("frame")}
          //border-2 border-[#A673FF] hover:bg-[#A673FF]
          className="flex items-center gap-2 px-4 py-2 bg-transparent  text-[#A673FF] rounded-md  hover:text-white transition-all duration-300"
        >
          <span className="text-lg">
            {selectedComponent === "frame" ? " Frame" : "Frame"}
          </span>
        </div>
      </div>

      {/* Conditional Rendering of Components */}
      <div className="mt-8">
        {selectedComponent === "frame" && <FrameComponent />}
        {selectedComponent === "lenses" && <LensesComponent />}
        {selectedComponent === "temple" && <TempleComponent />}
      </div>
    </div>
  );
};

export default RightSideBar;
