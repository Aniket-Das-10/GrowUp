import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateProfile } from "../../../../services/operations/profileAPI"
import IconBtn from "../../../common/IconBtn"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
        gender: user?.additionalDetails?.gender || "Male",
        contactNumber: user?.additionalDetails?.contactNumber || "",
        about: user?.additionalDetails?.about || "",
    })

    const [loading, setLoading] = useState(false)

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const submitProfileForm = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            dispatch(updateProfile(token, formData)).then(() => {
                setLoading(false)
            })
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

    return (
        <>
            <form onSubmit={submitProfileForm}>
                {/* Profile Information */}
                <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <h2 className="text-lg font-semibold text-richblack-5">
                        Profile Information
                    </h2>
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="firstName" className="lable-style">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="Enter first name"
                                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
                                onChange={handleOnChange}
                                value={formData.firstName}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="lastName" className="lable-style">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Enter last name"
                                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
                                onChange={handleOnChange}
                                value={formData.lastName}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="dateOfBirth" className="lable-style">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
                                onChange={handleOnChange}
                                value={formData.dateOfBirth}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="gender" className="lable-style">
                                Gender
                            </label>
                            <select
                                name="gender"
                                id="gender"
                                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
                                onChange={handleOnChange}
                                value={formData.gender}
                                required
                            >
                                {genders.map((ele, i) => {
                                    return (
                                        <option key={i} value={ele}>
                                            {ele}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="contactNumber" className="lable-style">
                                Contact Number
                            </label>
                            <input
                                type="tel"
                                name="contactNumber"
                                id="contactNumber"
                                placeholder="Enter Contact Number"
                                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
                                onChange={handleOnChange}
                                value={formData.contactNumber}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="about" className="lable-style">
                                About
                            </label>
                            <input
                                type="text"
                                name="about"
                                id="about"
                                placeholder="Enter Bio Details"
                                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600"
                                onChange={handleOnChange}
                                value={formData.about}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => {
                            navigate("/dashboard/my-profile")
                        }}
                        disabled={loading}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
                        Cancel
                    </button>
                    <IconBtn type="submit" text="Save" disabled={loading} />
                </div>
            </form>
        </>
    )
}
