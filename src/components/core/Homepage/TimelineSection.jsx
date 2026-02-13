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
        Description: "Fully committed to the success company"

    },
    {
        logo: logo2,
        heading: "Responsibility",
        Description: "Students will always be our top priority"

    },
    {
        logo: logo3,
        heading: "Flexibility",
        Description: "The ability to switch is an important skills"

    },
    {
        logo: logo4,
        heading: "Solve the problem",
        Description: "Code your way to a solution"

    },
]

const TimelineSection = () => {
    return (
        <div className='flex flex-row gap-7 '>
            <div className=' w-[45%] flex flex-col gap-5'>

                {
                    timeline.map((element, index) => {
                        return (
                            <div className="flex flex-row gap-5 " key={index}>
                                <div className="w-[50px] h-[50px] bg-white flex items-center">
                                    <img src={element.logo} />
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

                <div className=" absolute flex flex-row bg-caribbeangreen-700 text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-100 px-7">
                        <p className=' font-bold text-3xl'>10</p>
                        <h2 className='text-caribbeangreen-100 text-sm'>YEARS EXPERIENCES</h2>
                    </div>
                    <div className="flex flex-row gap-5 items-center border-l border-caribbeangreen-100 px-7">
                        <p className=' font-bold text-3xl'>250</p>
                        <h2 className='text-caribbeangreen-100 text-sm'>TYPES OF COURSES</h2>
                    </div>
                    
                </div>

            </div>

        </div>
    )
}

export default TimelineSection
