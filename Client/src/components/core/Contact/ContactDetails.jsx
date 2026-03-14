import React from 'react'
import { BiChat, BiWorld, BiPhone } from "react-icons/bi"

const contactDetails = [
    {
        icon: BiChat,
        heading: "Chat on us",
        description: "Our friendly team is here to help.",
        details: "aniketdas810144@mail address",
    },
    {
        icon: BiWorld,
        heading: "Visit us",
        description: "Come and say hello at our office HQ.",
        details: "Kolkata, West Bengal,kol-28",
    },
    {
        icon: BiPhone,
        heading: "Call us",
        description: "Mon - Fri From 8am to 5pm",
        details: "+91 8101773934",
    },
]

const ContactDetails = () => {
    return (
        <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
            {contactDetails.map((ele, i) => {
                let Icon = ele.icon
                return (
                    <div
                        className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200"
                        key={i}
                    >
                        <div className="flex flex-row items-center gap-3">
                            <Icon size={25} fill="#AFB2BF" />
                            <h1 className="text-lg font-semibold text-richblack-5">
                                {ele.heading}
                            </h1>
                        </div>
                        <p className="font-medium">{ele.description}</p>
                        <p className="font-semibold">{ele.details}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default ContactDetails
