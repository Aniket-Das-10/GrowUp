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
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }


    return (
        <div>

            <div className='text-3xl lg:text-4xl font-semibold text-center'>
                Unlock the
                <HighLightText text={"Power of Code"} />
            </div>

            <p className='text-center text-richblack-300 text-sm text-[16px] mt-3'>
                Learn to Build Anything You Can Imagine
            </p>
            <div className="lg:h-[50px]"></div>

            <div className='flex flex-row rounded-full bg-richblack-800 mb-5 border border-richblack-700
      px-1 py-1 w-max max-w-full mx-auto md:w-fit shadow-[0_1.5px_rgba(255,255,255,0.25)] overflow-x-auto scrollbar-hide'>
                {
                    tabsName.map((element, index) => {
                        return (
                            <div
                                className={`text-[16px] flex flex-row items-center gap-2 whitespace-nowrap
                ${currentTab === element
                                        ? "bg-richblack-900 text-richblack-5 font-medium shadow-[0_1px_rgba(255,255,255,0.2)]"
                                        : "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer
                hover:bg-richblack-700 hover:text-richblack-5 px-5 lg:px-7 py-2`}
                                key={index}
                                onClick={() => setMyCards(element)}
                            >
                                {element}
                            </div>
                        )
                    })
                }

            </div>

            <div className='lg:h-[150px]'></div>

            {/* course card group */}

            <div className='lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3'>
                {
                    courses.map((element, index) => {
                        return (
                            <CourseCard
                                key={index}
                                cardData={element}
                                currentCard={currentCard}
                                setCurrentCard={setCurrentCard}
                            />
                        )
                    })
                }
            </div>


        </div>
    )
}

export default ExploreMore