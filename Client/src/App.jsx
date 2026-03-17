import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./Page/Home";
import Login from "./Page/Login";
import Signup from "./Page/Signup";
import VerifyEmail from "./Page/VerifyEmail";
import Navbar from "./components/common/Navbar";
import About from "./Page/About";
import Contact from "./Page/Contact";
import Catalog from "./Page/Catalog";
import CourseDetails from "./Page/CourseDetails";
import Dashboard from "./Page/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import Cart from "./components/core/Dashboard/Cart";
import MyCourses from "./components/core/Dashboard/MyCourses";
import AddCourse from "./components/core/Dashboard/AddCourse";
import EditCourse from "./components/core/Dashboard/EditCourse";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Footer from "./components/common/Footer";
import Error from "./Page/Error";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col ">
      <Navbar />
      <Routes>
        {/* Main Site Layout with Footer */}
        <Route
          element={
            <>
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="catalog/:catalogName" element={<Catalog />} />
          <Route path="courses/:courseId" element={<CourseDetails />} />
          <Route element={<Dashboard />}>
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/settings" element={<Settings />} />
            <Route path="dashboard/cart" element={<Cart />} />
            <Route path="dashboard/my-courses" element={<MyCourses />} />
            <Route path="dashboard/add-course" element={<AddCourse />} />
            <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
            <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </Route>
        </Route>

        {/* Error Page without Footer */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
