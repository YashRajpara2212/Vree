import "./App.css";
import CanvasVree from "./Components/CanvasVree";
import TextureComponent from "./Components/TextureComponent";
import ColorComponent from "./Components/ColorComponent";
import ProgressBar from "./Components/ProgressBarComponent";
import FrameComponent from "./Components/FrameComponent";
import TempleComponent from "./Components/TempleComponent";
import LensesComponent from "./Components/LensesComponent";
import RightSideBar from "./Components/RightSideBar";

function App() {
  return (
    <div className="flex">
      <CanvasVree />
      <RightSideBar />
      {/* <TempleComponent /> */}
      {/* <FrameComponent /> */}
      {/* <LensesComponent /> */}
      {/* <TextureComponent selectedSection="frame" /> */}
      {/* <ColorComponent selectedSection="frame" /> */}
      {/* <ProgressBar /> */}
    </div>
  );
}

export default App;
