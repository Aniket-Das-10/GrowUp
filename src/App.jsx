import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import Login from "./Page/Login";
import Signup from "./Page/Signup";
import VerifyEmail from "./Page/VerifyEmail";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </div>
  );
}

export default App;
