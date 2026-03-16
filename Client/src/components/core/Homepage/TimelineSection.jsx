import React from 'react'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import timelineimg from '../../../assets/Images/TimelineImage.png'

const timeline = [
    {
        logo: logo1,
        heading: "Leadership",
        Description: "Fully committed to the success of the company"

    },
    {
        logo: logo2,
        heading: "Responsibility",
        Description: "Students will always be our top priority"

    },
    {
        logo: logo3,
        heading: "Flexibility",
        Description: "The ability to switch is an important skill"

    },
    {
        logo: logo4,
        heading: "Solve the problem",
        Description: "Code your way to a solution"

    },
]

const TimelineSection = () => {
    return (
        <div className='flex flex-col lg:flex-row gap-20 items-center'>
            <div className='lg:w-[45%] flex flex-col gap-14 lg:gap-3'>

                {
                    timeline.map((element, index) => {
                        return (
                            <div className="flex flex-row gap-5 " key={index}>
                                <div className="w-[50px] h-[50px] bg-white flex items-center">
                                    <img src={element.logo} alt={element.heading} />
                                </div>
                                <div className="flex flex-col gap-1 ">
                                    <h2 className=' font-semibold text-[18px]'>{element.heading}</h2>
                                    <p className=' text-base'>{element.Description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="relative shadow-blue-200">
                <img src={timelineimg} alt="timelineImage" className='shadow-white object-cover h-fit' />

                <div className=" absolute flex flex-col lg:flex-row bg-caribbeangreen-700 text-white uppercase py-5 lg:py-10 left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <div className="flex flex-row gap-5 items-center lg:border-r border-caribbeangreen-100 px-7 lg:px-14">
                        <p className=' font-bold text-3xl w-[75px]'>10</p>
                        <h2 className='text-caribbeangreen-100 text-sm w-[75px]'>YEARS OF EXPERIENCE</h2>
                    </div>
                    <div className="flex flex-row gap-5 items-center lg:px-14 px-7">
                        <p className=' font-bold text-3xl w-[75px]'>250</p>
                        <h2 className='text-caribbeangreen-100 text-sm w-[75px]'>TYPES OF COURSES</h2>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default TimelineSection
