import "./App.css";
import CanvasVree from "./Components/CanvasVree";
import TextureComponent from "./Components/TextureComponent";
import ColorComponent from "./Components/ColorComponent";

function App() {
  return (
    <div className="flex">
      <CanvasVree />

      <TextureComponent selectedSection="frame" />
      <ColorComponent selectedSection="frame" />
    </div>
  );
}

export default App;
