import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import Footer from "./components/core/Homepage/Footer";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col ">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
