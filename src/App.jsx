import "./App.css";
import CanvasVree from "./Components/CanvasVree";
import TextureComponent from "./Components/TextureComponent";
import ColorComponent from "./Components/ColorComponent";
import ProgressBar from "./Components/ProgressBarComponent";
import FrameComponent from "./Components/FrameComponent";

function App() {
  return (
    <div className="">
      <CanvasVree />

      <FrameComponent />
      {/* <TextureComponent selectedSection="frame" /> */}
      {/* <ColorComponent selectedSection="frame" /> */}
      {/* <ProgressBar /> */}
    </div>
  );
}

export default App;
