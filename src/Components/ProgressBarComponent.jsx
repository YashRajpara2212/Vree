

import {  useEffect, useState } from "react";
import { observer } from "mobx-react";
import { vreeStore } from "../VreeStore";

// import { div } from "three/tsl";

const ProgressBarComponent = observer(({ name,value, onChange }) => {
  const values = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
  const evenValues = [0, 0.2, 0.4, 0.6, 0.8, 1.0]; // Points where circles will appear

  // Convert value to index
  const valueIndex = values.indexOf(value);
  const [selectedIndex, setSelectedIndex] = useState(
    valueIndex !== -1 ? valueIndex : 2
  );
  const [hover, setHover] = useState(false); // Hover state for label

  useEffect(() => {
  console.log(value,"value");
    setSelectedIndex(valueIndex !== -1 ? valueIndex : 2);
console.log(valueIndex,"valueIndex");
  }, [value]);

  const setSelected = (index) => {
    setSelectedIndex(index);
    if (onChange) {
      onChange(values[index]);
    }
  };

  const decreaseValue = () => {
    if (selectedIndex > 0) setSelected(selectedIndex - 1);
  };

  const increaseValue = () => {
    if (selectedIndex < values.length - 1) setSelected(selectedIndex + 1);
  };

  return (
    // items-center
    <div className="flex">
        <div className={` text-lg ms-5 mt-5 me-10 ${vreeStore.isDarkMode ? "text-white" : "text-gray-900"}`}>{name}</div>
    <div className="flex flex-col  w-full flex-grow gap-4 mt-10 px-2">
      <div className="relative flex items-center w-full max-w-lg">
        <div className="absolute left-0 right-0 h-1 bg-gray-500 rounded-full " />
        <div
          className="absolute h-1 bg-[#A673FF] rounded-full transition-all duration-300"
          style={{
            left: "0%",
            width: `${(selectedIndex / (values.length - 1)) * 100}%`,
          }}
        />
        {values.map((val, index) => (
          <div key={val} className="relative flex items-center w-full">
            {index > 0 && (
              <div
                className="absolute h-1 cursor-pointer transition bg-transparent hover:bg-[#A673FF]/50"
                style={{ left: "0%", width: "50%" }}
                onClick={() => setSelected(index)}
              />
            )}
            {evenValues.includes(val) && (
              <div
                className="absolute w-2.5 h-2.5 rounded-full bg-[#A673FF] z-10"
                style={{
                  left: `${(index / (values.length - 1)) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              />
            )}
            {index === selectedIndex && (
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-sm text-[#A673FF] font-semibold transition-all duration-300 z-10"
                style={{ left: `${(index / (values.length - 1)) * 100}%` }}
              >
                <div
                  className="relative flex items-center rounded-full transition-all duration-300"
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  {hover && index > 0 && (
                    <button
                      className="text-[#A673FF] font-bold border p-1 rounded-full border-[#A673FF] bg-[#ffffff] w-6 h-6 flex items-center justify-center"
                      onClick={decreaseValue}
                    >
                      ➖
                    </button>
                  )}
                  {/* z-10 */}
                  <span className="border border-[#A673FF] px-4 rounded-full p-1 py-2 bg-[#4c0080] relative  hover:bg-[#ffffff]">
                    {val}
                  </span>
                  {hover && index < values.length - 1 && (
                    <button
                      className="text-[#A673FF] font-bold border p-1 rounded-full  border-[#A673FF] bg-[#ffffff] w-6 h-6 flex items-center justify-center"
                      onClick={increaseValue}
                    >
                      ➕
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
});

export default ProgressBarComponent;

