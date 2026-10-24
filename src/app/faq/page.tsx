"use client"

import { PageTransition } from "@/components/page-transition"
import { AnimatedBackground } from "@/components/animated-background"
import { useState, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { ChevronUp, HelpCircle } from "lucide-react"

interface FaqSection {
  id: string
  title: string
  content: React.ReactNode
}

export default function FaqPage() {
  const [isMobileView, setIsMobileView] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    if (!mounted) {
      setMounted(true)

      const checkMobile = () => setIsMobileView(window.innerWidth < 768)

      const handleBasicScroll = () => setShowScrollTop(window.scrollY > 300)

      checkMobile()
      window.addEventListener("resize", checkMobile, { passive: true })
      window.addEventListener("scroll", handleBasicScroll, { passive: true })

      return () => {
        window.removeEventListener("resize", checkMobile)
        window.removeEventListener("scroll", handleBasicScroll)
      }
    }
  }, [mounted])

  const sections: FaqSection[] = [
    {
      id: "what-is",
      title: "What is lowest?",
      content: (
        <p className="text-white/80 leading-relaxed">
          lowest is an all-in-one Discord bot designed to handle moderation, voice channel management, music, and more. It aims to be the only bot your community needs.
        </p>
      )
    },
    {
      id: "free",
      title: "Is it free to use?",
      content: (
        <p className="text-white/80 leading-relaxed">
          Yes! All core features of lowest are completely free. We may offer premium enhancements in the future to support development, but essential tools will always remain accessible.
        </p>
      )
    },
    {
      id: "add",
      title: "How do I add the bot?",
      content: (
        <p className="text-white/80 leading-relaxed">
          You can add lowest by clicking the <strong>"Add to Discord"</strong> button on our home page. Make sure you have the <strong>"Manage Server"</strong> permission in the server you wish to add it to.
        </p>
      )
    },
    {
      id: "support",
      title: "Where can I get support?",
      content: (
        <p className="text-white/80 leading-relaxed">
          If you need help or have questions, join our{" "}
          <a
            href="https://discord.gg/XR3FJfHYxc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 hover:underline transition-colors font-medium"
          >
            Support Server
          </a>{" "}
          where our staff is ready to assist you.
        </p>
      )
    }
  ]

  const scrollToTop = () => window.scrollTo(0, 0)

  const StaticSection = ({ section }: { section: FaqSection }) => (
    <section id={section.id} className="py-6 border-b border-white/10 last:border-b-0">
      <h2 className="text-xl md:text-2xl font-semibold mb-3 flex items-center gap-2 group">
        <HelpCircle className="h-6 w-6 text-blue-400/80 shrink-0" />
        <span>{section.title}</span>
        <span className="ml-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity text-lg">#</span>
      </h2>
      <div className="pl-8">{section.content}</div>
    </section>
  )

  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col items-center justify-start relative overflow-x-hidden">
        <AnimatedBackground
          particleCount={isMobileView ? 30 : 40}
          particleSize={[1, 2]}
          speed={0.2}
          connectParticles={true}
        />

        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50 origin-left"
          style={{ scaleX }}
        />

        <div className="z-10 w-full max-w-4xl mx-auto px-4 py-12 md:py-16">
          <div className="mb-8 md:mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Frequently Asked <span className="italic">Questions</span>
            </h1>
            <p className="text-white/60">Everything you need to know about lowest bot</p>
          </div>

          {/* TOC */}
          {!isMobileView && mounted && (
            <div className="hidden md:block mb-8 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-3">Table of Contents</h3>
              <div className="grid grid-cols-2 gap-2">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="text-sm py-1 px-2 rounded hover:bg-white/5 transition-colors text-white/70 hover:text-blue-400"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 md:p-8">
            {sections.map((section) => (
              <StaticSection key={section.id} section={section} />
            ))}
          </div>

          <div className="mt-8 text-center text-white/40 text-sm">
            &copy; 2024-2026 lowest. All Rights Reserved.
          </div>
        </div>

        {showScrollTop && (
          <button
            className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-500/80 backdrop-blur-sm text-white shadow-lg z-50 hover:bg-blue-500 transition-colors"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ChevronUp size={20} />
          </button>
        )}
      </main>
    </PageTransition>
  )
}