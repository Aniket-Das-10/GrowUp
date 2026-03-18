import { useEffect, useState, useRef } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi"
import { FaGraduationCap, FaArrowRight, FaBolt } from "react-icons/fa6"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo_growup.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import ProfileDropdown from "../core/Auth/ProfileDropDown"
import CartDropdown from "./CartDropdown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [bannerHidden, setBannerHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (e) {
        console.log("Could not fetch Categories.", e)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    if (!route) return false
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <>
      {/* ── ANNOUNCEMENT BANNER ──────────────────────────────────────────-- */}
      {!bannerHidden && (
        <div
          className="relative flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium text-white overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #4c1d95, #7c3aed, #a855f7, #ec4899, #7c3aed, #4c1d95)",
            backgroundSize: "300% 100%",
            animation: "bannerShimmer 5s linear infinite",
          }}
        >
          <FaBolt className="text-yellow-300 text-xs animate-pulse shrink-0" />
          <span className="text-center">
            🎓 New courses live — <span className="font-bold underline decoration-yellow-300">Get 40% off</span> this week only
          </span>
          <Link to="/signup" className="hidden sm:inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 rounded-full px-3 py-0.5 text-xs font-semibold transition-colors duration-200 ml-2">
            Claim offer <FaArrowRight className="text-[10px]" />
          </Link>
          <button
            onClick={() => setBannerHidden(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-lg leading-none transition-colors duration-200"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}

      {/* ── FLOATING PILL NAVBAR ─────────────────────────────────────────── */}
      <div className={`sticky top-0 z-50 flex justify-center px-4 transition-all duration-300 ${scrolled ? "pt-2" : "pt-4"}`}>
        <nav
          className={`w-full transition-all duration-500 ${
            scrolled
              ? "max-w-4xl rounded-2xl shadow-[0_8px_60px_rgba(0,0,0,0.6)]"
              : "max-w-6xl rounded-none shadow-none"
          }`}
          style={scrolled ? {
            // Floating pill state — glass with glowing border
            background: "rgba(8,8,16,0.90)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(139,92,246,0.35)",
            boxShadow: "0 0 0 1px rgba(139,92,246,0.15), 0 8px 60px rgba(0,0,0,0.6), 0 0 40px rgba(139,92,246,0.1)",
          } : {
            // Expanded top state — subtle
            background: "rgba(8,8,16,0.7)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex h-14 items-center justify-between px-5 gap-4">

            {/* ── Logo ─────────────────────────────────────────── */}
            <Link to="/" className="shrink-0 flex items-center gap-2">
              <img src={logo} alt="Grow-Up" width={130} height={28} loading="lazy"
                className="transition-all duration-200 hover:opacity-80" />
            </Link>

            {/* ── Nav Links (center) ────────────────────────────── */}
            <ul className="hidden md:flex items-center gap-0.5 text-sm font-medium">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="group relative">
                      <button
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                      style={{
                        color: matchRoute("/catalog/:catalogName") ? "#ffffff" : "#e2e8f0",
                        background: matchRoute("/catalog/:catalogName") ? "rgba(255,255,255,0.1)" : "transparent",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = matchRoute("/catalog/:catalogName") ? "#ffffff" : "#e2e8f0"; e.currentTarget.style.background = matchRoute("/catalog/:catalogName") ? "rgba(255,255,255,0.1)" : "transparent"; }}
                      >
                        {link.title}
                        <BsChevronDown className="text-[10px] transition-transform duration-300 group-hover:rotate-180" />
                      </button>

                      {/* Dropdown */}
                      <div
                        className="invisible absolute left-1/2 top-[calc(100%+10px)] z-50 w-60 -translate-x-1/2
                          rounded-2xl p-2 opacity-0 shadow-2xl
                          transition-all duration-200
                          group-hover:visible group-hover:opacity-100 group-hover:top-[calc(100%+6px)]"
                        style={{
                          background: "rgba(10,10,20,0.97)",
                          backdropFilter: "blur(24px)",
                          border: "1px solid rgba(139,92,246,0.3)",
                          boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 30px rgba(139,92,246,0.15)",
                        }}
                      >
                        {/* Pointer arrow */}
                        <div
                          className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45"
                          style={{ background: "rgba(10,10,20,0.97)", border: "1px solid rgba(139,92,246,0.3)", borderBottom: "none", borderRight: "none" }}
                        />
                        <p style={{ color: "#9ca3af", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 12px 8px" }}>Categories</p>
                        {loading ? (
                          <div className="flex items-center gap-2 px-3 py-3 text-sm" style={{ color: "#9ca3af" }}>
                            <div className="w-3.5 h-3.5 border-2 border-violet-500/50 border-t-violet-500 rounded-full animate-spin" />
                            Loading…
                          </div>
                        ) : subLinks?.length ? (
                          subLinks.map((subLink, i) => (
                            <Link
                              key={i}
                              to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                              className="group/item flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all duration-150"
                              style={{ color: "#e2e8f0" }}
                              onMouseEnter={e => { e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                              onMouseLeave={e => { e.currentTarget.style.color = "#e2e8f0"; e.currentTarget.style.background = "transparent"; }}
                            >
                              <span className="flex w-7 h-7 items-center justify-center rounded-lg bg-violet-500/15 group-hover/item:bg-violet-500/25 transition-colors duration-150">
                                <FaGraduationCap className="text-violet-400 text-xs" />
                              </span>
                              {subLink.name}
                            </Link>
                          ))
                        ) : (
                          <p className="text-center text-gray-600 py-4 text-xs">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link.path}>
                      <button
                        className="relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                        style={{
                          color: matchRoute(link.path) ? "#ffffff" : "#e2e8f0",
                          background: matchRoute(link.path) ? "rgba(255,255,255,0.1)" : "transparent",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = matchRoute(link.path) ? "#ffffff" : "#e2e8f0"; e.currentTarget.style.background = matchRoute(link.path) ? "rgba(255,255,255,0.1)" : "transparent"; }}
                      >
                        {link.title}
                        {/* Active dot */}
                        {matchRoute(link.path) && (
                          <span
                            className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                            style={{ background: "linear-gradient(90deg, #a855f7, #ec4899)" }}
                          />
                        )}
                      </button>
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* ── Right: Search + Auth ───────────────────────────── */}
            <div className="hidden md:flex items-center gap-2.5">
              {/* Compact icon search */}
              <SearchWidget />

              {token === null ? (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <button
                      className="px-4 py-1.5 rounded-xl text-sm font-medium text-white hover:text-white transition-all duration-200"
                      style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "transparent"; }}
                    >
                      Log in
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.04]"
                      style={{
                        background: "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)",
                        boxShadow: "0 0 18px rgba(168,85,247,0.4)",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 30px rgba(168,85,247,0.7)"; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 18px rgba(168,85,247,0.4)"; }}
                    >
                      Get Started
                      <FaArrowRight className="text-[10px]" />
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  {user && <CartDropdown />}
                  <ProfileDropdown />
                </div>
              )}
            </div>

            {/* ── Mobile Hamburger ─────────────────────────────── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/8 transition-all duration-200"
            >
              {mobileOpen ? <HiX fontSize={20} /> : <HiOutlineMenuAlt3 fontSize={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* ── MOBILE DRAWER ────────────────────────────────────────────────── */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${mobileOpen ? "visible" : "invisible"}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setMobileOpen(false)}
        />
        {/* Panel */}
        <div
          className={`absolute top-0 left-0 right-0 transition-transform duration-300 ${mobileOpen ? "translate-y-0" : "-translate-y-full"}`}
          style={{
            background: "rgba(10,10,18,0.98)",
            backdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(139,92,246,0.3)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 h-14 border-b border-white/6">
            <img src={logo} alt="Grow-Up" width={110} loading="lazy" />
            <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/8 transition-colors">
              <HiX fontSize={18} />
            </button>
          </div>

          {/* Search */}
          <div className="px-5 py-3 border-b border-white/6">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <AiOutlineSearch className="text-gray-500 text-base shrink-0" />
              <input type="text" placeholder="Search courses…"
                className="bg-transparent text-white placeholder-gray-500 outline-none flex-1 text-sm" />
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col px-3 py-3">
            {NavbarLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path || "#"}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  matchRoute(link.path)
                    ? "text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/6"
                }`}
                style={matchRoute(link.path) ? { background: "rgba(139,92,246,0.15)", color: "#fff" } : { color: "#f3f4f6" }}
              >
                {matchRoute(link.path) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                )}
                {link.title}
              </Link>
            ))}
          </div>

          {/* CTA */}
          {token === null && (
            <div className="flex gap-3 px-5 pt-2 pb-6">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1">
                <button className="w-full py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                  Log in
                </button>
              </Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)} className="flex-1">
                <button className="w-full py-3 rounded-xl text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)", boxShadow: "0 0 20px rgba(168,85,247,0.4)" }}>
                  Get Started
                </button>
              </Link>
            </div>
          )}
          {token !== null && (
            <div className="flex items-center gap-3 px-5 pt-2 pb-6">
              {user && <CartDropdown />}
              <ProfileDropdown />
            </div>
          )}
        </div>
      </div>

      {/* CSS for banner shimmer animation */}
      <style>{`
        @keyframes bannerShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  )
}

// ── Inline expanding search widget ─────────────────────────────────────────
function SearchWidget() {
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  return (
    <div className="relative flex items-center">
      <div
        className="flex items-center overflow-hidden transition-all duration-300"
        style={{
          width: open ? "180px" : "36px",
          background: open ? "rgba(255,255,255,0.06)" : "transparent",
          border: open ? "1px solid rgba(139,92,246,0.5)" : "1px solid transparent",
          borderRadius: "12px",
          boxShadow: open ? "0 0 18px rgba(139,92,246,0.25)" : "none",
        }}
      >
        <button
          onClick={() => setOpen(!open)}
          className="shrink-0 w-9 h-9 flex items-center justify-center transition-colors duration-200"
          style={{ color: open ? "#a78bfa" : "#e2e8f0" }}
          onMouseEnter={e => { e.currentTarget.style.color = "#ffffff"; }}
          onMouseLeave={e => { e.currentTarget.style.color = open ? "#a78bfa" : "#e2e8f0"; }}
        >
          <AiOutlineSearch style={{ fontSize: "18px" }} />
        </button>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search courses…"
          onBlur={() => setOpen(false)}
          className="outline-none text-sm pr-3 w-full"
          style={{ background: "transparent", color: "#ffffff", opacity: open ? 1 : 0 }}
        />
      </div>
    </div>
  )
}

export default Navbar