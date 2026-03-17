import { FaShareSquare, FaRegPlayCircle, FaMobileAlt, FaCertificate } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { HiOutlineCursorClick } from "react-icons/hi"
import { addToCart } from "../../../slices/cartSlice"

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
  } = course

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === "Instructor") {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  return (
    <>
      <div
        className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
      >
        {/* Course Image */}
        <img
          src={ThumbnailImage}
          alt={course?.courseName}
          className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
        />

        <div className="px-4">
          <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {CurrentPrice}
          </div>
          <div className="flex flex-col gap-4">
            <button
               className="blackButton"
               onClick={handleAddToCart}
            >
               Add to Cart
            </button>
            <button
              className="yellowButton"
              onClick={
                user && course?.studentEnrolled?.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && course?.studentEnrolled?.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
          </div>
          <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
              30-Day Money-Back Guarantee
            </p>
          </div>

          <div className={``}>
            <p className={`my-2 text-xl font-semibold `}>
              This course includes:
            </p>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              <p className="flex items-center gap-2">
                <FaRegPlayCircle className="text-caribbeangreen-100" />
                <span className="text-richblack-5">8 hours on-demand video</span>
              </p>
              <p className="flex items-center gap-2">
                <HiOutlineCursorClick className="text-caribbeangreen-100" />
                <span className="text-richblack-5">Full Lifetime access</span>
              </p>
              <p className="flex items-center gap-2">
                <FaMobileAlt className="text-caribbeangreen-100" />
                <span className="text-richblack-5">Access on Mobile and TV</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCertificate className="text-caribbeangreen-100" />
                <span className="text-richblack-5">Certificate of completion</span>
              </p>
            </div>
          </div>
          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDetailsCard
