import React from 'react'
import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa6";
import HighLightText from '../components/core/Homepage/HighLightText';
import CTAButton from '../components/core/Homepage/Button';
import Banner from '../assets/Images/banner.mp4';
import CodeBlock from '../components/core/Homepage/codeBlock';
import TimelineSection from '../components/core/Homepage/TimelineSection';
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection';
import Instructor from '../assets/Images/Instructor.png';


const Home = () => {
    return (
        <div>
            {/* section 1 */}
            <div className=" relative mx-auto max-w-maxContent flex flex-col items-center w-11/12 justify-between text-white">
                <Link to="/signup">
                    <div className=' mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 group'>
                        <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>


                <div className=" text-center text-4xl mt-7">
                    Empower Your Future With<HighLightText text={"Coding Skills"} />
                </div>

                <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className="flex flex-row gap-7 mt-8">
                    <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                    <CTAButton active={false} linkto={"/login"}>Book Demo</CTAButton>
                </div>

                <div className='mx-3 my-12 shadow-blue-200'>
                    <div className='flex flex-col gap-5 relative'>
                        <div className='absolute -top-3 -left-3 w-[110%] h-[110%] bg-white rounded-full blur-[100px] -z-10 opacity-30'></div>
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white rounded-full blur-[100px] -z-10 opacity-20'></div>
                        <video muted loop autoPlay className="shadow-[20px_20px_0px_0px_rgba(255,255,255,1)] z-10 w-full max-w-[1035px] h-auto">
                            <source src={Banner} type='video/mp4' />
                        </video>
                    </div>
                </div>
                <div>
                    <CodeBlock
                        position={"lg:flex-row"}
                        heading={
                            <div className=' text-4xl font-semibold'>
                                Unlock your
                                <HighLightText text={"coding potential"} />
                                with our online courses.
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }

                        ctaButton1={
                            {
                                btnText: "Try it Yourself",
                                linkto: "/signup",
                                active: true
                            }
                        }
                        ctaButton2={
                            {
                                btnText: "Learn More",
                                linkto: "/login",
                                active: false
                            }
                        }
                        codeblock={
                            `<!DOCTYPE html>
                        <html>
                        <head><title>Example</title><link rel="stylesheet" href="styles.css">
                        </head>
                        <body>
                        <h1><a href="/">Header</a>
                        </h1>
                        <nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>
                        </nav>`
                        }
                        codeColor={"text-yellow-25"}
                        backgroundGradient={<div className="codeblock1 absolute"></div>}
                    />
                </div>
                {/*codesection 2*/}
                <div>
                    <CodeBlock
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className=' text-4xl font-semibold'>
                                Start
                                <HighLightText text={"Coding in second"} />

                            </div>
                        }
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }

                        ctaButton1={
                            {
                                btnText: "Continu Lesson",
                                linkto: "/signup",
                                active: true
                            }
                        }
                        ctaButton2={
                            {
                                btnText: "Learn More",
                                linkto: "/login",
                                active: false
                            }
                        }
                        codeblock={
                            `<!DOCTYPE html>
                        <html>
                        <head><title>Example</title><link rel="stylesheet" href="styles.css">
                        </head>
                        <body>
                        <h1><a href="/">Header</a>
                        </h1>
                        <nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>
                        </nav>`
                        }
                        codeColor={"text-yellow-25"}
                        backgroundGradient={<div className="codeblock2 absolute"></div>}
                    />
                </div>
            </div>

            {/*codesection 1*/}
            {/* section 2 */}
            <div className="bg-pure-greys-5 text-richblack-700">
                <div className="homepage_bg h-[310px]">
                    <div className="w-11/12 max-w-maxContent flex flex-col mx-auto gap-5 items-center justify-center">
                        <div className='h-[150px]'></div>
                        <div className="flex flex-row gap-7 text-white">
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className="flex gap-5 items-center">
                                    Explore Full Category
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/signup"}>
                                Learn More
                            </CTAButton>
                        </div>

                    </div>
                </div>

                <div className="w-11/12 max-w-maxContent flex flex-col mx-auto gap-5 items-center justify-center">
                    <div className="flex flex-row items-center gap-5 justify-between mb-[50px] mt-[110px]">
                        <div className='text-4xl font-bold w-[45%]'>
                            Get the skills you need for a
                            <HighLightText text={"job that is in demand."} />
                        </div>

                        <div className="flex flex-col gap-5 w-[40%] items-start">
                            <div className='tex-[16px] font-semibold'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>

                            <CTAButton active={true} linkto={"/signup"}>
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                    <TimelineSection />
                    <div className="h-[100px]"></div>
                </div>

                <div className="w-11/12 max-w-maxContent flex flex-col mx-auto gap-5 items-center justify-between">
                    <LearningLanguageSection />
                </div>
            </div>
            {/* section 3 */}
            <div className='w-11/12 mx-auto max-w-maxContent flex-col flex items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>

                <div className='flex flex-col lg:flex-row gap-20 items-center mt-[110px]'>

                    <div className='lg:w-[50%]'>
                        <img
                            src={Instructor}
                            alt=""
                            className='shadow-white'
                        />
                    </div>

                    <div className='lg:w-[50%] flex flex-col gap-10'>
                        <div className='text-4xl font-semibold w-[50%]'>
                            Become an
                            <HighLightText text={"Instructor"} />
                        </div>

                        <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
                            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                        </p>

                        <div className='w-fit'>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex flex-row gap-2 items-center'>
                                    Start Teaching Today
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                        </div>
                    </div>

                </div>
            </div>

            {/* section 4 */}
        </div>
    )
}

export default Home