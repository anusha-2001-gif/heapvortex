import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Scene from "./components/Scene";
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
      </div>
    </>
  );
}

export default App;