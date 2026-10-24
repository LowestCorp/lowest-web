"use client"

import { NavButton } from "@/components/nav-button"
import { Command, FileText, MessageSquare, Radio, Share2, Shield, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { motion, useAnimationControls } from "framer-motion"
import { PageTransition } from "@/components/page-transition"
import { useEffect, useState, useRef } from "react"
import { AnimatedBackground } from "@/components/animated-background"
import { getShards, getTotalStats } from "@/lib/api/shards"
import { Button } from "@/components/ui/button"

// Testimonials section with Discord-style messages
const TestimonialSection = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const testimonialsPerPage = 6

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const testimonials = [
    {
      username: "dupression",
      content:
        "super awesome bot great community, active updates & fixes, bugs are caught within 5 minutes of contacting any support member",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      username: "aq.17d",
      content:
        "lowest is a very simple and easy to use bot especially its utilities and how those utilities doesn't need any sorts of documentations for their commands.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      username: "voidlifter",
      content: "I love lowest and wrath really good bots tbh",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      username: "vwka",
      content: "10 out of 10 ngl ts is fire and free thx for this",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      username: "74hk",
      content:
        "reed is an outstanding bot that has quickly become a favorite in our server. Its extensive range of commands covers everything from moderation to fun and utility, making it incredibly versatile and invaluable for server management.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      username: "Yoru",
      content: "The best free bot for moderation",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      username: "s6th",
      content: "I enjoy lowest and I hope lowest will last forever.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      username: "Theo",
      content: "Its a good bot, I would recommend for users with a little experience in using bots",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      username: "rexduct",
      content:
        "Great bot I really like it, helps alot great support and easy to use. Im currently using it in 10 of my servers",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage)
  const displayedTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  )

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section className="w-full py-16 relative z-10 bg-gradient-to-b from-transparent to-black/30 backdrop-blur-sm border-t border-white/5">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-center mb-10 text-white/90 drop-shadow-lg"
        >
          What Users Are Saying
        </motion.h2>

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${currentPage}-${index}`}
                initial={!hasAnimated ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: hasAnimated ? 0 : 0.5, delay: hasAnimated ? 0 : index * 0.1 }}
                className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-5 flex flex-col gap-3 border border-white/10 hover:border-purple-500/30 transition-colors shadow-xl hover:shadow-purple-500/10"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 border-2 border-purple-500 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-gray-300 font-medium">@{testimonial.username}</span>
                </div>
                <p className="text-gray-400 leading-relaxed">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                onClick={prevPage}
                size="icon"
                variant="ghost"
                className="bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white rounded-full border border-white/10 hover:border-purple-500/30 transition-all shadow-lg hover:shadow-purple-500/20"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="text-white/70 text-sm">
                {currentPage + 1} / {totalPages}
              </span>
              <Button
                onClick={nextPage}
                size="icon"
                variant="ghost"
                className="bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white rounded-full border border-white/10 hover:border-purple-500/30 transition-all shadow-lg hover:shadow-purple-500/20"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// Componente para escribir texto letra por letra (Typewriter)
const TypewriterText = ({
  text,
  speed = 30,
  delay = 0,
  onComplete,
}: {
  text: string
  speed?: number
  delay?: number
  onComplete?: () => void
}) => {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1))
          i++
        } else {
          clearInterval(interval)
          if (onComplete) onComplete()
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, speed, delay])

  return <span>{displayedText}</span>
}

// Contador numérico animado (Sube desde 0 hasta el número final de manera muy fluida)
const SlotMachineCounter = ({
  value,
  className,
  onComplete,
}: {
  value: number
  className?: string
  onComplete?: () => void
}) => {
  const prevValue = useRef(0)
  const [displayValue, setDisplayValue] = useState(0)
  const controls = useAnimationControls()
  const hasTriggeredComplete = useRef(false)

  useEffect(() => {
    const startValue = prevValue.current
    const endValue = value

    const duration = 1000 // Duración del conteo en ms
    const startTime = performance.now()

    const updateNumber = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Curva de desaceleración suave (easeOutCubic)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(startValue + (endValue - startValue) * easeOut)

      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(updateNumber)
      } else {
        prevValue.current = endValue
        controls.start({
          scale: [1.15, 1],
          y: [-2, 0],
          transition: { type: "spring", stiffness: 400, damping: 15 },
        })

        if (!hasTriggeredComplete.current) {
          hasTriggeredComplete.current = true
          if (onComplete) onComplete()
        }
      }
    }

    requestAnimationFrame(updateNumber)
  }, [value, controls])

  return (
    <motion.span animate={controls} className={`${className} inline-block font-semibold`}>
      {displayValue.toLocaleString()}
    </motion.span>
  )
}

// Componente que coordina la escritura del texto y los números animados en secuencia
const TypewrittenStats = ({ users, servers }: { users: number; servers: number }) => {
  const [stage, setStage] = useState(0)

  return (
    <span className="inline-flex flex-wrap items-center justify-center gap-x-1">
      {/* 1. Escribe "serving " */}
      <TypewriterText text="serving " speed={35} onComplete={() => setStage(1)} />

      {/* 2. Sube el contador de usuarios desde 0 */}
      {stage >= 1 && (
        <SlotMachineCounter
          value={users}
          className="text-white font-bold"
          onComplete={() => setStage(2)}
        />
      )}

      {/* 3. Escribe " users across " */}
      {stage >= 2 && (
        <TypewriterText text=" users across " speed={35} onComplete={() => setStage(3)} />
      )}

      {/* 4. Sube el contador de servidores desde 0 */}
      {stage >= 3 && (
        <SlotMachineCounter
          value={servers}
          className="text-white font-bold"
          onComplete={() => setStage(4)}
        />
      )}

      {/* 5. Escribe " servers" */}
      {stage >= 4 && <TypewriterText text=" servers" speed={35} />}
    </span>
  )
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [stats, setStats] = useState({ servers: 0, users: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)

    // Fetch shard data
    const fetchStats = async (skipCache = false) => {
      try {
        setError(null)
        const shards = await getShards(skipCache)
        const totalStats = getTotalStats(shards)
        setStats({
          servers: totalStats.servers,
          users: totalStats.users,
        })
      } catch (error) {
        setError("Failed to fetch stats")
        console.error("Failed to fetch stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Initial fetch
    fetchStats()

    // Set up periodic refresh (every 10 seconds)
    const refreshInterval = setInterval(() => {
      fetchStats(true) // Skip cache on refresh
    }, 10000)

    // Check if we're in a mobile view
    const checkMobile = (): void => {
      setIsMobileView(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobile)
      clearInterval(refreshInterval)
    }
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const statsText = isLoading ? (
    <motion.span
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
    >
      loading stats...
    </motion.span>
  ) : error ? (
    <motion.span className="text-red-400">{error}</motion.span>
  ) : (
    <TypewrittenStats users={stats.users} servers={stats.servers} />
  )

  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col items-center relative overflow-hidden">
        <AnimatedBackground
          particleCount={isMobileView ? 30 : 40}
          particleSize={[1, 2]}
          speed={0.2}
          connectParticles={true}
        />

        {/* Main hero section - centered vertically */}
        <div className="flex flex-col items-center justify-center z-10 px-4 py-8 w-full min-h-screen">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-6 md:mb-10 relative avatar-glow"
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 relative rounded-full overflow-hidden border border-white/10">
              <Image src="/lowest.png" alt="lowest Bot" width={176} height={176} className="object-cover" priority />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 md:mb-3 text-center tracking-tight"
          >
            lowest
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/60 mb-8 md:mb-14 text-center text-base md:text-lg min-h-[28px]"
          >
            {statsText}
          </motion.p>

          <motion.div
            variants={container}
            initial="hidden"
            animate={mounted ? "show" : "hidden"}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 max-w-xl w-full px-2"
          >
            <motion.div variants={item}>
              <NavButton href="/commands" icon={Command} label="cmds" />
            </motion.div>
            <motion.div variants={item}>
              <NavButton href="https://discord.gg/5vSJEVAUHj" icon={MessageSquare} label="discord" />
            </motion.div>
            <motion.div variants={item}>
              <NavButton href="/docs" icon={FileText} label="docs" />
            </motion.div>
            <motion.div variants={item}>
              <NavButton href="/status" icon={Radio} label="status" />
            </motion.div>
            <motion.div variants={item}>
              <NavButton href="/invite" icon={Share2} label="invite" />
            </motion.div>
            <motion.div variants={item}>
              <NavButton href="/tools/embed" icon={Shield} label="embed" />
            </motion.div>
          </motion.div>
        </div>

        {/* Testimonials section - separate full-width section below */}
        <TestimonialSection />
      </main>
    </PageTransition>
  )
}