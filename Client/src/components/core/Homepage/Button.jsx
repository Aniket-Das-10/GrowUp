import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      {active ? (
        <div
          className="group relative inline-flex items-center justify-center
            text-[14px] sm:text-[15px] px-7 py-3.5 rounded-xl font-bold text-white overflow-hidden
            transition-all duration-300 hover:scale-[1.05] cursor-pointer select-none"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)",
            boxShadow: "0 0 30px rgba(168, 85, 247, 0.6), 0 4px 15px rgba(236, 72, 153, 0.4)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = "0 0 50px rgba(168, 85, 247, 0.85), 0 6px 20px rgba(236, 72, 153, 0.6)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = "0 0 30px rgba(168, 85, 247, 0.6), 0 4px 15px rgba(236, 72, 153, 0.4)";
          }}
        >
          <span className="relative z-10">{children}</span>
          {/* shimmer sweep */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent
            -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </div>
      ) : (
        <div
          className="inline-flex items-center justify-center
            text-[14px] sm:text-[15px] px-7 py-3.5 rounded-xl font-bold transition-all duration-300
            hover:scale-[1.05] cursor-pointer select-none"
          style={{
            color: "#c084fc",
            border: "2px solid rgba(168, 85, 247, 0.55)",
            background: "rgba(139, 92, 246, 0.12)",
            boxShadow: "0 0 18px rgba(139, 92, 246, 0.25)",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.9)";
            e.currentTarget.style.background = "rgba(139, 92, 246, 0.25)";
            e.currentTarget.style.boxShadow = "0 0 30px rgba(139, 92, 246, 0.45)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = "#c084fc";
            e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.55)";
            e.currentTarget.style.background = "rgba(139, 92, 246, 0.12)";
            e.currentTarget.style.boxShadow = "0 0 18px rgba(139, 92, 246, 0.25)";
          }}
        >
          {children}
        </div>
      )}
    </Link>
  )
}

export default Button

