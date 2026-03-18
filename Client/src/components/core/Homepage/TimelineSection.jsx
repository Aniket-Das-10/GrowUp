import React from 'react'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import timelineimg from '../../../assets/Images/TimelineImage.png'

const timeline = [
  { logo: logo1, heading: "Leadership", Description: "Fully committed to the success of every student" },
  { logo: logo2, heading: "Responsibility", Description: "Students will always be our top priority" },
  { logo: logo3, heading: "Flexibility", Description: "The ability to switch is an important skill" },
  { logo: logo4, heading: "Solve the problem", Description: "Code your way to a solution" },
]

const TimelineSection = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-16 items-center">

      {/* Timeline list */}
      <div className="lg:w-[45%] flex flex-col gap-8">
        {timeline.map((element, index) => (
          <div key={index} className="group flex flex-row gap-5 items-start">
            {/* Icon */}
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100
              border border-violet-200 flex items-center justify-center shadow-md
              group-hover:shadow-violet-200 group-hover:scale-110 transition-all duration-300">
              <img src={element.logo} alt={element.heading} className="w-7 h-7 object-contain" />
            </div>
            {/* Text */}
            <div className="flex flex-col gap-1 pt-1">
              <h3 className="font-bold text-[18px] text-richblack-800 group-hover:text-violet-700 transition-colors duration-200">
                {element.heading}
              </h3>
              <p className="text-richblack-500 text-sm leading-relaxed">{element.Description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Image + badge */}
      <div className="lg:w-[55%] relative pb-12">
        {/* Glow */}
        <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-violet-400/20 to-fuchsia-400/15 blur-2xl" />
        <img
          src={timelineimg}
          alt="Timeline"
          className="relative rounded-2xl object-cover w-full shadow-2xl"
        />
        {/* Stats badge */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-row
          bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600
          text-white rounded-2xl shadow-2xl shadow-violet-500/40 overflow-hidden
          border border-white/20">
          <div className="flex flex-row gap-3 items-center border-r border-white/25 px-8 py-5">
            <p className="font-black text-3xl">10</p>
            <h2 className="text-white/75 text-xs uppercase leading-tight tracking-wide w-16">Years of<br />Experience</h2>
          </div>
          <div className="flex flex-row gap-3 items-center px-8 py-5">
            <p className="font-black text-3xl">250</p>
            <h2 className="text-white/75 text-xs uppercase leading-tight tracking-wide w-16">Types of<br />Courses</h2>
          </div>
        </div>
      </div>

    </div>
  )
}

export default TimelineSection
