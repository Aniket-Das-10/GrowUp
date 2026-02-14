import React from 'react'
import CTAButton from './Button';
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';

const CodeBlock = ({
    position, heading, subheading, ctaButton1, ctaButton2, codeblock, backgroundGradient, codeColor
}) => {
    return (
        <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10 max-w-maxContentTab lg:max-w-maxContent mx-auto items-center text-white`}>
            {/*section 1*/}
            <div className='w-[100%] lg:w-[50%] flex flex-col gap-8'>
                {heading}
                <div className='text-richblack-300 font-bold'>
                    {subheading}
                </div>

                <div className="flex gap-7 mt-7">
                    <CTAButton active={ctaButton1.active} linkto={ctaButton1.linkto} >
                        <div className="flex gap-2 items-center">
                            {ctaButton1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                    <CTAButton active={ctaButton2.active} linkto={ctaButton2.linkto} >
                        {ctaButton2.btnText}
                    </CTAButton>
                </div>
            </div>

            {/*section*/}

            <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
                {backgroundGradient}
                {/* Indexing */}
                <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold ">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                {/* Codes */}
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
                    <TypeAnimation
                        sequence={[codeblock, 1000, ""]}
                        cursor={true}
                        repeat={Infinity}
                        style={{
                            whiteSpace: "pre-line",
                            display: "block",
                        }}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>

        </div>

    )
}

export default CodeBlock
