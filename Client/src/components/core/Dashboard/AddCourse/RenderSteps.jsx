import React from "react"
import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"

export default function RenderSteps() {
    const { step } = useSelector((state) => state.course)

    const steps = [
        {
            id: 1,
            title: "Course Information",
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publishing Course",
        },
    ]

    return (
        <>
            <div className="relative mb-2 flex w-full select-none justify-between">
                {steps.map((item) => (
                    <div
                        className="flex flex-col items-center flex-1"
                        key={item.id}
                    >
                        <div className="relative flex items-center justify-center w-full mb-2">
                            {/* Left line */}
                            <div
                                className={`h-[calc(34px/2)] flex-1 border-b-2 border-dashed ${item.id === 1 ? 'invisible' : (step >= item.id ? 'border-yellow-50' : 'border-richblack-500')}`}
                            ></div>

                            {/* Circle */}
                            <button
                                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${step === item.id
                                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                                    } ${step > item.id && "bg-yellow-50 text-yellow-50"} `}
                            >
                                {step > item.id ? (
                                    <FaCheck className="font-bold text-richblack-900" />
                                ) : (
                                    item.id
                                )}
                            </button>

                            {/* Right line */}
                            <div
                                className={`h-[calc(34px/2)] flex-1 border-b-2 border-dashed ${item.id === steps.length ? 'invisible' : (step > item.id ? 'border-yellow-50' : 'border-richblack-500')}`}
                            ></div>
                        </div>

                        {/* Label */}
                        <div className="flex flex-col items-center mt-2">
                            <p
                                className={`text-sm ${step >= item.id ? "text-richblack-5" : "text-richblack-500"
                                    }`}
                            >
                                {item.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Render specific component based on current step */}
            {step === 1 && <CourseInformationForm />}
            {step === 2 && <CourseBuilderForm />}
            {step === 3 && <PublishCourse />}
        </>
    )
}
