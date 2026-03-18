import React from 'react'
import { Link } from "react-router-dom"
import { FaArrowRight, FaPlay, FaStar, FaUsers, FaBookOpen, FaAward, FaCircleCheck, FaBolt } from "react-icons/fa6"
import HighLightText from '../components/core/Homepage/HighLightText'
import CTAButton from '../components/core/Homepage/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlock from '../components/core/Homepage/codeBlock'
import TimelineSection from '../components/core/Homepage/TimelineSection'
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection'
import Instructor from '../assets/Images/Instructor.png'
import ExploreMore from '../components/core/Homepage/ExploreMore'

const stats = [
  { icon: <FaUsers />, value: "50K+", label: "Active Learners", color: "from-violet-500 to-purple-600" },
  { icon: <FaBookOpen />, value: "250+", label: "Expert Courses", color: "from-fuchsia-500 to-pink-600" },
  { icon: <FaAward />, value: "10+", label: "Years of Excellence", color: "from-purple-500 to-indigo-600" },
  { icon: <FaStar />, value: "4.9", label: "Average Rating", color: "from-pink-500 to-rose-600" },
]

const features = [
  "Learn at your own pace, anytime anywhere",
  "Industry expert-led live & recorded sessions",
  "Hands-on projects and real-world challenges",
  "Personalized feedback and mentorship",
]

const Home = () => {
  return (
    <div className="bg-[#0a0a0f] text-white overflow-x-hidden font-sans">

      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-20 overflow-hidden">

        {/* Background: layered radial blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full bg-violet-700/30 blur-[160px]" />
          <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-fuchsia-700/25 blur-[140px]" />
          <div className="absolute bottom-[-5%] left-[40%] w-[500px] h-[500px] rounded-full bg-purple-800/20 blur-[120px]" />
          {/* Grid overlay */}
          <div className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)`,
              backgroundSize: "60px 60px"
            }}
          />
        </div>

        {/* Floating badge */}
        <Link to="/signup">
          <div className="group mb-10 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5
            border border-violet-500/50 bg-violet-500/10 text-violet-300 text-sm font-medium
            hover:bg-violet-500/20 hover:border-violet-400 hover:text-white
            transition-all duration-300 shadow-lg shadow-violet-500/10 backdrop-blur-sm">
            <FaBolt className="text-yellow-400 animate-pulse" />
            Become an Instructor — Now Open
            <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </Link>

        {/* Main Heading */}
        <h1 className="max-w-5xl text-center text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
          Empower Your Future
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            With Coding Skills
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-center text-lg text-gray-400 leading-relaxed">
          World-class online courses crafted by industry experts. Build real projects,
          land dream jobs, and grow faster than you ever thought possible.
        </p>

        {/* Feature bullets */}
        <div className="mt-7 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {features.map((f, i) => (
            <span key={i} className="flex items-center gap-2 text-sm text-gray-300">
              <FaCircleCheck className="text-violet-400 shrink-0" />
              {f}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
          {/* Primary — hot neon gradient */}
          <Link to="/signup">
            <button className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl
              font-bold text-base text-white overflow-hidden transition-all duration-300 hover:scale-[1.05]"
              style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)", boxShadow: "0 0 35px rgba(168,85,247,0.65), 0 4px 15px rgba(236,72,153,0.4)" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 55px rgba(168,85,247,0.9), 0 6px 20px rgba(236,72,153,0.65)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 35px rgba(168,85,247,0.65), 0 4px 15px rgba(236,72,153,0.4)"; }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Learning Free
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </Link>

          {/* Secondary — outlined glass */}
          <Link to="/login">
            <button className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl
              font-bold text-base transition-all duration-300 hover:scale-[1.05]"
              style={{ color: "#c084fc", border: "2px solid rgba(168,85,247,0.55)", background: "rgba(139,92,246,0.12)", boxShadow: "0 0 20px rgba(139,92,246,0.3)", backdropFilter: "blur(8px)" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(139,92,246,0.25)"; e.currentTarget.style.borderColor = "rgba(168,85,247,0.9)"; e.currentTarget.style.boxShadow = "0 0 35px rgba(139,92,246,0.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#c084fc"; e.currentTarget.style.background = "rgba(139,92,246,0.12)"; e.currentTarget.style.borderColor = "rgba(168,85,247,0.55)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(139,92,246,0.3)"; }}
            >
              <FaPlay className="text-xs" />
              Watch Demo
            </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
          {stats.map((s, i) => (
            <div key={i}
              className="group relative flex flex-col items-center gap-2 rounded-2xl border border-white/8
              bg-white/4 backdrop-blur-sm p-6 text-center
              hover:border-violet-500/40 hover:bg-violet-500/8
              transition-all duration-300 overflow-hidden cursor-default">
              {/* Top gradient bar */}
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <span className={`text-2xl bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>
                {s.icon}
              </span>
              <span className="text-3xl font-black text-white">{s.value}</span>
              <span className="text-xs text-gray-400 font-medium">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Hero Video */}
        <div className="relative mt-20 w-full max-w-5xl">
          {/* Neon glow ring */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 opacity-40 blur-2xl animate-pulse" />
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-600 opacity-60" />
          <div className="relative rounded-2xl overflow-hidden border border-violet-500/20 shadow-2xl bg-[#0a0a0f]">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 bg-[#111117] px-4 py-3 border-b border-white/8">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_6px_rgba(234,179,8,0.8)]" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
              <div className="ml-4 flex-1 rounded-full bg-white/6 px-4 py-1 text-xs text-gray-500 text-center">
                growup.io/learn
              </div>
            </div>
            <video muted loop autoPlay playsInline className="w-full h-auto">
              <source src={Banner} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ─── CODE BLOCKS ───────────────────────────────────────── */}
      <section className="py-24 px-4 max-w-maxContent mx-auto">
        <CodeBlock
          position={"lg:flex-row"}
          heading={
            <div className="text-3xl lg:text-4xl font-black">
              Unlock your <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">coding potential</span> with online courses.
            </div>
          }
          subheading="Courses crafted by industry experts with years of real experience — passionate about helping you go from zero to hired."
          ctaButton1={{ btnText: "Try it Yourself", linkto: "/signup", active: true }}
          ctaButton2={{ btnText: "Learn More", linkto: "/login", active: false }}
          codeblock={`<!DOCTYPE html>
<html>
<head><title>Example</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1><a href="/">Header</a>
</h1>
<nav><a href="one/">One</a>
<a href="two/">Two</a>
<a href="three/">Three</a>
</nav>`}
          codeColor={"text-yellow-25"}
          backgroundGradient={<div className="codeblock1 absolute" />}
        />

        <CodeBlock
          position={"lg:flex-row-reverse"}
          heading={
            <div className="text-3xl lg:text-4xl font-black">
              Start <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">coding in seconds</span>
            </div>
          }
          subheading="Zero setup. Our hands-on coding environment lets you write real code from your very first lesson, right in the browser."
          ctaButton1={{ btnText: "Continue Lesson", linkto: "/signup", active: true }}
          ctaButton2={{ btnText: "Learn More", linkto: "/login", active: false }}
          codeblock={`<!DOCTYPE html>
<html>
<head><title>Example</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1><a href="/">Header</a>
</h1>
<nav><a href="one/">One</a>
<a href="two/">Two</a>
<a href="three/">Three</a>
</nav>`}
          codeColor={"text-blue-25"}
          backgroundGradient={<div className="codeblock2 absolute" />}
        />
      </section>

      {/* ─── EXPLORE MORE ──────────────────────────────────────── */}
      <section className="py-24 px-4 max-w-maxContent mx-auto">
        <ExploreMore />
      </section>

      {/* ─── CTA BANNER ────────────────────────────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Gradient mesh bg */}
        <div className="absolute inset-0 -z-10">
          <div className="homepage_bg h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-transparent to-[#0a0a0f]/80" />
        </div>

        <div className="relative z-10 w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-center gap-7 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300 text-sm font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
            JOIN 50,000+ LEARNERS
          </span>

          <h2 className="text-4xl sm:text-5xl font-black text-white max-w-2xl leading-tight">
            Ready to build your <span style={{ background: "linear-gradient(135deg, #a78bfa, #e879f9, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>dream career?</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-xl">
            Explore 250+ courses across coding, design, and more — start for free today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-3">
            <Link to="/signup">
              <button className="group relative inline-flex items-center gap-2.5 px-9 py-4 rounded-xl font-bold text-base text-white overflow-hidden transition-all duration-300 hover:scale-[1.05]"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)", boxShadow: "0 0 35px rgba(168,85,247,0.65), 0 4px 15px rgba(236,72,153,0.4)" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 55px rgba(168,85,247,0.9), 0 6px 20px rgba(236,72,153,0.65)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 35px rgba(168,85,247,0.65), 0 4px 15px rgba(236,72,153,0.4)"; }}
              >
                <span className="relative z-10 flex items-center gap-2">Explore All Courses <FaArrowRight /></span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </Link>
            <Link to="/signup">
              <button className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-[1.05]"
                style={{ color: "#c084fc", border: "2px solid rgba(168,85,247,0.55)", background: "rgba(139,92,246,0.12)", boxShadow: "0 0 20px rgba(139,92,246,0.3)", backdropFilter: "blur(8px)" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(139,92,246,0.25)"; e.currentTarget.style.boxShadow = "0 0 35px rgba(139,92,246,0.55)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#c084fc"; e.currentTarget.style.background = "rgba(139,92,246,0.12)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(139,92,246,0.3)"; }}
              >
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SKILLS / TIMELINE ───────────────────────────────────── */}
      <section className="bg-white text-richblack-700 py-20 px-4">
        <div className="w-11/12 max-w-maxContent mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 mb-16">
            <h2 className="text-3xl lg:text-4xl font-black w-full lg:w-[45%] leading-tight">
              Get the skills you need for a{" "}
              <span style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                job that is in demand.
              </span>
            </h2>
            <div className="flex flex-col gap-5 w-full lg:w-[45%]">
              <p className="text-richblack-600 text-base leading-relaxed">
                The modern professional dictates their own terms. Continuous learning and adaptability
                are the most powerful skills you can have in today's market.
              </p>
              <div className="w-fit">
                <CTAButton active={true} linkto={"/signup"}>
                  Start Learning Now
                </CTAButton>
              </div>
            </div>
          </div>
          <TimelineSection />
        </div>
      </section>

      {/* ─── LEARNING TOOLS ──────────────────────────────────────── */}
      <section className="bg-white py-10 pb-24 px-4">
        <div className="w-11/12 max-w-maxContent mx-auto">
          <LearningLanguageSection />
        </div>
      </section>

      {/* ─── BECOME INSTRUCTOR ─────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#0a0a0f] relative overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-[-10%] -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-700/20 blur-[140px]" />
          <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-fuchsia-700/15 blur-[120px]" />
        </div>

        <div className="w-11/12 max-w-maxContent mx-auto">
          {/* Outer glow border */}
          <div className="relative p-[2px] rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 shadow-[0_0_80px_rgba(139,92,246,0.35)]">
            <div className="rounded-[22px] bg-[#0f0f1a] border border-white/5 overflow-hidden">
              <div className="relative flex flex-col lg:flex-row items-center gap-12 p-10 lg:p-16">

                {/* Inner gradient shimmer background */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-pink-900/15 pointer-events-none" />

                {/* Image */}
                <div className="lg:w-[48%] relative z-10">
                  <div className="relative p-[2px] rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500">
                    <img
                      src={Instructor}
                      alt="Become an Instructor"
                      className="rounded-2xl w-full object-cover"
                    />
                  </div>
                  {/* Floating stat badge */}
                  <div className="absolute -bottom-5 -right-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl px-5 py-3 shadow-2xl shadow-violet-500/40 border border-violet-400/30">
                    <div className="text-2xl font-black">$2K+</div>
                    <div className="text-xs text-violet-200 font-medium">Avg. Monthly Earning</div>
                  </div>
                </div>

                {/* Text content */}
                <div className="lg:w-[52%] flex flex-col gap-6 text-center lg:text-left relative z-10">
                  <span className="inline-flex items-center gap-2 text-fuchsia-400 text-sm font-bold uppercase tracking-widest">
                    <span className="h-px w-8 bg-fuchsia-400 hidden lg:block" />
                    For Experts & Professionals
                  </span>

                  <h2 className="text-4xl lg:text-5xl font-black leading-tight text-white">
                    Become an{" "}
                    <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                      Instructor
                    </span>
                  </h2>

                  <p className="text-gray-400 text-base leading-relaxed">
                    Join thousands of expert instructors teaching on Grow-Up. We give you the tools,
                    platform, audience, and support to turn your expertise into a thriving online business.
                  </p>

                  <ul className="flex flex-col gap-3 text-sm text-gray-300">
                    {[
                      "Create & sell your courses with full creative control",
                      "Reach a global audience of 50,000+ eager learners",
                      "Get paid monthly — no caps on your earnings",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <FaCircleCheck className="text-fuchsia-400 text-base shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-2">
                    <Link to="/signup">
                      <button className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-white overflow-hidden transition-all duration-300 hover:scale-[1.05]"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)", boxShadow: "0 0 30px rgba(168,85,247,0.6), 0 4px 15px rgba(236,72,153,0.4)" }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 50px rgba(168,85,247,0.85), 0 6px 20px rgba(236,72,153,0.65)"; }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 30px rgba(168,85,247,0.6), 0 4px 15px rgba(236,72,153,0.4)"; }}
                      >
                        <span className="relative z-10 flex items-center gap-2">Start Teaching Today <FaArrowRight /></span>
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      </button>
                    </Link>
                    <Link to="/login">
                      <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-[1.05]"
                        style={{ color: "#c084fc", border: "2px solid rgba(168,85,247,0.5)", background: "rgba(139,92,246,0.12)", boxShadow: "0 0 18px rgba(139,92,246,0.25)", backdropFilter: "blur(8px)" }}
                        onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(139,92,246,0.25)"; e.currentTarget.style.boxShadow = "0 0 32px rgba(139,92,246,0.5)"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "#c084fc"; e.currentTarget.style.background = "rgba(139,92,246,0.12)"; e.currentTarget.style.boxShadow = "0 0 18px rgba(139,92,246,0.25)"; }}
                      >
                        Learn More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home