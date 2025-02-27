import "./App.css";
import CanvasVree from "./Components/CanvasVree";

import RightSideBar from "./Components/RightSideBar";
import Header from "./Components/header";

function App() {
  return (
    <div>
      <div>
        
        <Header />
      </div>
      <div className="flex">
        <CanvasVree />

        <RightSideBar />
       
      </div>
    </div>
  );
}

export default App;
