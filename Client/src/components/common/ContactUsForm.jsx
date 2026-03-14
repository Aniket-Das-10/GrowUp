import React, { useState } from 'react'
import countrycode from "../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phoneno: "",
        message: ""
    })

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const submitContactForm = async (e) => {
        e.preventDefault();
        console.log("Logging Data", formData);
        setLoading(true);
        // api call logic here
        setLoading(false);
    }

    return (
        <form onSubmit={submitContactForm}>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col md:flex-row gap-5'>
                    {/* firstName */}
                    <div className='flex flex-col gap-2 md:w-[48%]'>
                        <label htmlFor='firstname' className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name</label>
                        <input
                            type='text'
                            name='firstname'
                            id='firstname'
                            placeholder='Enter first name'
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600'
                            onChange={handleOnChange}
                            value={formData.firstname}
                            required
                        />
                    </div>

                    {/* lastName */}
                    <div className='flex flex-col gap-2 md:w-[48%]'>
                        <label htmlFor='lastname' className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name</label>
                        <input
                            type='text'
                            name='lastname'
                            id='lastname'
                            placeholder='Enter last name'
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600'
                            onChange={handleOnChange}
                            value={formData.lastname}
                        />
                    </div>
                </div>

                {/* email */}
                <div className='flex flex-col gap-2'>
                    <label htmlFor='email' className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter email address'
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600'
                        onChange={handleOnChange}
                        value={formData.email}
                        required
                    />
                </div>

                {/* phoneNo */}
                <div className='flex flex-col gap-2'>
                    <label htmlFor='phoneno' className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Phone Number</label>

                    <div className='flex flex-row gap-5'>
                        {/* dropdown */}
                        <div className='flex flex-col gap-2 w-[15%]'>
                            <select
                                name='dropdown'
                                id="dropdown"
                                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600'
                                onChange={handleOnChange}
                            >
                                {
                                    countrycode.map((element, index) => {
                                        return (
                                            <option key={index} value={element.code}>
                                                {element.code} -{element.country}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='flex flex-col gap-2 w-[calc(100%-90px)]'>
                            <input
                                type='number'
                                name='phoneno'
                                id='phoneno'
                                placeholder='12345 67890'
                                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600'
                                onChange={handleOnChange}
                                value={formData.phoneno}
                            />
                        </div>
                    </div>
                </div>

                {/* message */}
                <div className='flex flex-col gap-2'>
                    <label htmlFor='message' className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Message</label>
                    <textarea
                        name='message'
                        id='message'
                        cols="30"
                        rows="7"
                        placeholder='Enter Your message here'
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px] border-richblack-600'
                        onChange={handleOnChange}
                        value={formData.message}
                        required
                    />
                </div>

                <button
                    disabled={loading}
                    type='submit'
                    className={`rounded-md bg-yellow-50 text-center px-6 py-3 text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                    transition-all duration-200 hover:scale-95 hover:shadow-none ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
                    {loading ? "Sending..." : "Send Message"}
                </button>
            </div>
        </form>
    )
}

export default ContactUsForm
