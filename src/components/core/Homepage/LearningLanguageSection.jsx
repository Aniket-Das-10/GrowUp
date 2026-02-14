import React from 'react'
import img1 from '../../../assets/Images/Compare_with_others.png';
import img2 from '../../../assets/Images/Know_your_progress.png';
import img3 from '../../../assets/Images/Plan_your_lessons.png'
import HighLightText from './HighLightText';

import CTAButton from './Button';

const LearningLanguageSection = () => {
    return (
        <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-7 mx-auto  bg-white'>
            <div className="flex flex-col gap-3 items-center">
                <div className=' text-4xl mt-12 font-bold'>
                    Your swiss knife for
                    <HighLightText text={"learning any language"} />
                </div>
                <div className=" text-richblack-400 text-center mx-auto text-base w-[75%]">
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>
            </div>

            <div className="flex flex-row items-center justify-center mt-5">
                <img
                    src={img2}
                    alt="KnowYourProgress"
                    className='object-contain -mr-32 '
                />
                <img
                    src={img1}
                    alt="CompareWithOthers"
                    className='object-contain'
                />
                <img
                    src={img3}
                    alt="PlanYourLessons"
                    className='object-contain -ml-36'
                />
            </div>

            <div className='w-fit'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div>
                        Learn More
                    </div>
                </CTAButton>
            </div>

        </div>
    )
}

export default LearningLanguageSection
