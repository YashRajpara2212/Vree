
import { useState, useEffect } from "react";
import LensesComponent from "./LensesComponent";
import FrameComponent from "./FrameComponent";
import TempleComponent from "./TempleComponent";
import { vreeStore } from "../VreeStore";
import { observer } from "mobx-react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { MdSave } from "react-icons/md";

const cards = [
  { name: "frame", component: <FrameComponent /> },
  { name: "lenses", component: <LensesComponent /> },
  { name: "temple", component: <TempleComponent /> },
];
const RightSideBar = observer(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const selectedIndex = cards.findIndex(
      (card) => card.name === vreeStore.selectedPart
    );
    if (selectedIndex !== -1) {
      setCurrentIndex(selectedIndex);
    }
  }, [vreeStore.selectedPart]);

  const getLeftIndex = () => (currentIndex - 1 + cards.length) % cards.length;
  const getRightIndex = () => (currentIndex + 1) % cards.length;
  //   const [selectedComponent, setSelectedComponent] = useState("frame");
  // // vreeStore.selectedPart = "frame"

  //   const handleButtonClick = (component) => {
  //     setSelectedComponent(component);
  //     vreeStore.selectedPart = component;
  //   };

  const handleReset = () => {
    vreeStore.resetAllProperty();
  };
const handleSave = () =>{
  vreeStore.saveAllProperty();
}
  return (
    // w-[35vw]
    <div
      className="w-[35vw] mt-[2vh] h-[82vh] border border-gray-600 rounded-lg ms-8"
      style={{
        backgroundImage: "url(/assets/background/sidebarbg.png)",
        backgroundSize: "cover",
      }}
    >
      {/* Button Controls */}
      <div className="flex justify-between w-full text-lg font-bold cursor-pointer border-b-1 border-[#A673FF] gap-4 mt-2 ">
        {/* Left button */}
        <div
          onClick={() => {
            const newIndex = getLeftIndex();
            setCurrentIndex(newIndex);
            vreeStore.selectedPart = cards[newIndex].name;
          }}
          //border-2 border-[#A673FF] hover:bg-[#A673FF]
          className={` px-4 py-2 bg-transparent flex text-gray-400 rounded-md  hover:scale-115  hover:text-white transition duration-300 ${vreeStore.isDarkMode ? "text-white" : "text-gray-900"}`} 
        >
          <div className="pt-1 me-2">
            
            <FaArrowLeftLong />
          </div>
          <div>{cards[getLeftIndex()].name}</div>
          {/* <span className="text-lg"> */}
          {/* ⏪ */}
          {/* {selectedComponent === "temple" ? " Temple" : "Temple"} */}
          {/* </span> */}
        </div>

        {/* Middle button (selected component) */}
        <div
          //border-2 border-[#A673FF] hover:bg-[#A673FF]
          className="px-4 py-2 bg-transparent  text-[#A673FF] rounded-md   transition duration-300"
          
        >
          
          {cards[currentIndex].name}
          {/* <span className="text-lg">
            {selectedComponent === "lenses" ? " Lenses" : "Lenses"}
          </span> */}
        </div>

        {/* Right button */}
        <div
          onClick={() => {
            const newIndex = getRightIndex();
            setCurrentIndex(newIndex);
            vreeStore.selectedPart = cards[newIndex].name;
          }}
          //border-2 border-[#A673FF] hover:bg-[#A673FF]
          className={`px-4 py-2 bg-transparent flex   text-gray-400 rounded-md  hover:scale-115 hover:text-white transition duration-300 ${vreeStore.isDarkMode ? "text-white" : "text-gray-900"}`}
        ><div>
          {cards[getRightIndex()].name}</div><div className="pt-1 ms-2"><FaArrowRightLong /></div>
          {/* <span className="text-lg">
            {selectedComponent === "frame" ? " Frame" : "Frame"}
          </span> */}
        </div>
      </div>

      {/* <div className="border-t-2 mt-2 mx-3 mb-1 border-[#A673FF]"></div> */}
      {/* Conditional Rendering of Components */}
      <div
        className="mt-8 h-[55vh] overflow-x-hidden overflow-auto ms-5 pe-5 scrollbar-thin scrollbar-thumb-[#A673FF] scrollbar-track-transparent"
        style={{
          scrollbarWidth: "thin", // Firefox specific
          scrollbarColor: "#A673FF transparent", // Firefox specific
        }}
      >
        {cards[currentIndex].component}
        {/* {selectedComponent === "frame" && <FrameComponent />}
        {selectedComponent === "lenses" && <LensesComponent />}
        {selectedComponent === "temple" && <TempleComponent />} */}
      </div>
      <div className="border-t-2 mt-2 mx-3 mb-1 border-[#FFFFFF]"></div>
      <div className="flex gap-5 p-4">
        <div
          className={`w-1/2 flex  text-xl text-center  rounded justify-center gap-2 ms-2 p-2  hover:scale-110 ${vreeStore.isDarkMode ? "bg-gray-600 text-gray-300 hover:text-white  hover:border-1   border-white" : "text-gray-900 bg-gray-200  hover:text-white hover:bg-black "} `}
          onClick={handleReset}
        >
         <div className="mt-1"><GrPowerReset /></div> <div>Reset</div>
        </div>
        <div className={`w-1/2  flex text-[#A673FF] text-xl  justify-center gap-2 text-center bg-transparent border-1    rounded me-2 p-2 hover:scale-110  ${vreeStore.isDarkMode ? " text-[#A673FF] hover:text-white  border-[#A673FF]   hover:border-white" : "text-[#A673FF] border-[#A673FF]   hover:text-white hover:bg-[#A673FF] "}`} onClick = {handleSave}>
         <div className="mt-1"><MdSave />
         </div> <div>Save</div>
        </div>
      </div>
    </div>
  );
});

export default RightSideBar;
