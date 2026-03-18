import React from 'react'
import img1 from '../../../assets/Images/Compare_with_others.png';
import img2 from '../../../assets/Images/Know_your_progress.png';
import img3 from '../../../assets/Images/Plan_your_lessons.png'
import HighLightText from './HighLightText';
import CTAButton from './Button';

const LearningLanguageSection = () => {
  return (
    <div className="flex flex-col items-center gap-10 py-4">

      {/* Heading */}
      <div className="text-center max-w-3xl">
        <h2 className="text-3xl lg:text-4xl font-bold text-richblack-900">
          Your swiss knife for
          <HighLightText text={"learning any language"} />
        </h2>
        <p className="mt-4 text-richblack-500 text-base leading-relaxed max-w-2xl mx-auto">
          With 20+ coding languages, realistic voice-over, real-time progress tracking, custom
          schedules, and more — we make mastering any language effortless.
        </p>
      </div>

      {/* Overlapping screenshots */}
      <div className="flex flex-col lg:flex-row items-center justify-center mt-4 lg:mt-2">
        <img
          src={img2}
          alt="Know your progress"
          className="object-contain lg:-mr-32 drop-shadow-xl"
        />
        <img
          src={img1}
          alt="Compare with others"
          className="object-contain -mt-12 lg:-mt-0 drop-shadow-xl"
        />
        <img
          src={img3}
          alt="Plan your lessons"
          className="object-contain lg:-ml-36 -mt-16 lg:-mt-0 drop-shadow-xl"
        />
      </div>

      {/* CTA */}
      <div className="mt-2">
        <CTAButton active={true} linkto={"/signup"}>
          Explore All Courses
        </CTAButton>
      </div>

    </div>
  )
}

export default LearningLanguageSection
