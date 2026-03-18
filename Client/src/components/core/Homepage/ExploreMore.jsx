import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighLightText from './HighLightText';
import CourseCard from './CourseCard';

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  }

  return (
    <div className="flex flex-col items-center">

      {/* Section heading */}
      <div className="text-center mb-4">
        <h2 className="text-3xl lg:text-4xl font-black text-white">
          Unlock the <HighLightText text={"Power of Code"} />
        </h2>
        <p className="mt-4 text-gray-400 text-base max-w-lg mx-auto leading-relaxed">
          Browse courses by track and start building things you're proud of.
        </p>
      </div>

      {/* Tab Pills */}
      <div className="mt-8 flex flex-row flex-wrap justify-center gap-2 p-2 rounded-2xl
        border border-white/10 bg-white/4 backdrop-blur-sm mx-auto">
        {tabsName.map((element, index) => (
          <button
            key={index}
            onClick={() => setMyCards(element)}
            className={`relative text-sm font-semibold whitespace-nowrap rounded-xl px-5 py-2.5 transition-all duration-200 cursor-pointer overflow-hidden
              ${currentTab === element
                ? "text-white"
                : "text-gray-400 bg-transparent hover:bg-white/8 hover:text-white"
              }`}
            style={currentTab === element ? {
              background: "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)",
              boxShadow: "0 0 18px rgba(168,85,247,0.55)",
            } : {}}
          >
            {element}
          </button>
        ))}
      </div>

      {/* Course Cards */}
      <div className="mt-10 lg:mt-16 lg:h-[150px] w-full relative">
        <div className="lg:absolute gap-8 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full
          lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
          {courses.map((element, index) => (
            <CourseCard
              key={index}
              cardData={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExploreMore