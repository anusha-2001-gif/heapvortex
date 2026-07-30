import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Scene from "./components/Scene";
import JmxMemory from "./components/JmxMemory";
import "./styles/App.css";

function App() {
  return (
    <>
  <Navbar />

  <div className="container">
    <Sidebar />

    <div className="viewer">
      <Scene />
    </div>

    <JmxMemory />
  </div>
</>
  );
}

export default App;