import { useState } from "react";
import LensesComponent from "./LensesComponent";
import FrameComponent from "./FrameComponent";
import TempleComponent from "./TempleComponent";
import { vreeStore } from "../VreeStore";
import { observer } from "mobx-react";

const RightSideBar = observer(() => {
  const [selectedComponent, setSelectedComponent] = useState("frame");
// vreeStore.selectedPart = "frame"
  
  const handleButtonClick = (component) => {
    setSelectedComponent(component);
    vreeStore.selectedPart = component;
  };

  const handleReset = () => {
    vreeStore.resetAllProperty();
  };

  return (
    // w-[35vw]
    <div
      className="w-[35vw] mt-[10vh] h-[82vh] border border-[#FFFFFF] rounded-lg "
      style={{
        backgroundImage: "url(/assets/background/sidebarbg.png)",
        backgroundSize: "cover",
      }}
    >
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

      <div className="border-t-2 mt-2 mx-3 mb-1 border-[#A673FF]"></div>
      {/* Conditional Rendering of Components */}
      <div
        className="mt-8 h-[55vh] overflow-x-hidden overflow-auto ms-5 pe-5 scrollbar-thin scrollbar-thumb-[#A673FF] scrollbar-track-transparent"
        style={{
          scrollbarWidth: "thin", // Firefox specific
          scrollbarColor: "#A673FF transparent", // Firefox specific
        }}
      >
        {selectedComponent === "frame" && <FrameComponent />}
        {selectedComponent === "lenses" && <LensesComponent />}
        {selectedComponent === "temple" && <TempleComponent />}
      </div>
      <div className="border-t-2 mt-2 mx-3 mb-1 border-[#FFFFFF]"></div>
      <div className="flex gap-5 p-4">
        <div
          className="w-1/2 text-white text-xl text-center bg-gray-600 rounded  ms-2 p-2  hover:scale-110"
          onClick={handleReset}
        >
          Reset
        </div>
        <div className="w-1/2 text-white text-xl text-center bg-gray-600 rounded me-2 p-2 hover:scale-110">
          Save
        </div>
      </div>
    </div>
  );
});

export default RightSideBar;
