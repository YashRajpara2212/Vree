

import { useRef, useEffect } from "react";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import { observer } from "mobx-react";
// import tailwindcss from "@tailwindcss/vite";
// import { vreeStore } from "../VreeStore";
import { vreeStore } from "../VreeStore";
// import { add } from "three/tsl";

const Labels = observer(({ addToScene }) => {
  // const [selected, setSelected] = useState(SpecMaterialStore.selectedElement); // Track selected button
  const frameRef = useRef(null);
  const templeRef = useRef(null);
  const lensesRef = useRef(null);

  const btnHandler = (label) => () => {
    vreeStore.selectedPart = label;
  };

  useEffect(() => {
    if (frameRef.current && templeRef.current && lensesRef.current) {
      const frameLabel = new CSS2DObject(frameRef.current);
      frameLabel.name = "frame";
      const templeLabel = new CSS2DObject(templeRef.current);
      templeLabel.name = "temple";
      const lensesLabel = new CSS2DObject(lensesRef.current);
      lensesLabel.name = "lenses";

      // Set positions
      frameLabel.position.set(0, -0.2, 0);
      templeLabel.position.set(1.2, -0.3, -1);
      lensesLabel.position.set(0.6, -0.35, 0);
      // Check if addToScene is a function and call it correctly
      //   if (addToScene && typeof addToScene.current === "function") {
      //     addToScene.current([frameLabel, templeLabel, lensesLabel]);
      //   } else {
      //     console.error("addToScene is not a function");
      //   }
      addToScene([frameLabel, templeLabel, lensesLabel]);
    }
  }, []);

  return (
    <div style={{ display: "none" }}>
      {["frame", "temple", "lenses"].map((label) => (
    
        <div
          key={label}
          ref={
            label === "frame"
              ? frameRef
              : label === "temple"
              ? templeRef
              : lensesRef
          }
          className={`label-button flex items-center gap-1 px-3 py-2 rounded-full border shadow-lg transition-all
            ${vreeStore.isDarkMode 
              ? (vreeStore.selectedPart === label 
                  ? "bg-purple-600 border-purple-300 text-black shadow-md"
                  : "bg-purple-900 border-purple-400 text-black")
              : (vreeStore.selectedPart === label 
                  ? "bg-gray-400 border-gray-300 text-black shadow-md"
                  : "bg-gray-200 border-gray-400 text-black")}
          `}
          style={{ pointerEvents: "auto", zIndex: 100 }}
          onClick={btnHandler(label)} // Update state on click
        >
          <input
            type="radio"
            name="label"
            id={label}
            className="h-5 w-5"
            // className="hidden"
            checked={vreeStore.selectedPart === label}
            readOnly
          />

          {/* Bigger radio button with thinner border */}
          {/* <div className="w-4 h-4 border-[1.5px] border-2 border-purple-300 rounded-full flex items-center justify-center">
            <div
              className={`w-2 h-2 rounded-full ${
                vreeStore.selectedPart === label ? "bg-white" : "bg-transparent"
              }`}
            ></div>
          </div> */}
          <span className={`${vreeStore.isDarkMode? "text-white font-medium " :"text-black font-medium "}`}>{label}</span>
        </div>
        
      ))}
    </div>
  );
});

export default Labels;
