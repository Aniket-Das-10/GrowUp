import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai"
import { Link } from 'react-router-dom'

export default function CartDropdown() {
    const { cart, totalItems } = useSelector((state) => state.cart)
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    return (
        <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <div className="relative cursor-pointer">
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                {totalItems > 0 && (
                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                        {totalItems}
                    </span>
                )}
            </div>
            {open && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-[118%] right-0 z-[1000] flex w-[300px] flex-col rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4"
                    ref={ref}
                >
                    <div className="flex flex-col gap-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
                        {cart.length > 0 ? (
                            cart.map((course, index) => (
                                <div key={index} className="flex items-center gap-x-4 border-b border-richblack-700 pb-2 last:border-none">
                                    <img 
                                        src={course?.thumbnail} 
                                        alt={course?.courseName} 
                                        className="h-[50px] w-[50px] rounded-lg object-cover" 
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium text-richblack-5 line-clamp-1">{course?.courseName}</p>
                                        <p className="text-xs text-yellow-100">₹ {course?.price}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-richblack-100">Your cart is empty</p>
                        )}
                    </div>
                    {cart.length > 0 && (
                        <Link 
                            to="/dashboard/cart" 
                            className="mt-4 w-full rounded-md bg-yellow-50 py-[8px] text-center font-semibold text-richblack-900 transition-all duration-200 hover:scale-95"
                            onClick={() => setOpen(false)}
                        >
                            Go to Cart
                        </Link>
                    )}
                </div>
            )}
        </div>
    )
}
