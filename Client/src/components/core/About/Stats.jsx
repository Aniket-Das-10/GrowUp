import React from 'react'

const stats = [
    { count: "5K", label: "Active Students" },
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" },
];

const Stats = () => {
    return (
        <div className='bg-richblack-700 mx-auto'>
            <div className='flex flex-row justify-between w-11/12 max-w-maxContent mx-auto py-10'>
                {
                    stats.map((data, index) => {
                        return (
                            <div className='flex flex-col text-center' key={index}>
                                <h1 className='text-3xl font-bold text-white'>
                                    {data.count}
                                </h1>
                                <h2 className='text-richblack-400 font-semibold'>
                                    {data.label}
                                </h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Stats
