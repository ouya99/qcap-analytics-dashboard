"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function SplashScreen() {
  const router = useRouter()
  const [isAnimating, setIsAnimating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [welcomeComplete, setWelcomeComplete] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateChartData = (length: number, volatility: number, baseValue = 50) => {
    const data = []
    let lastValue = baseValue + Math.random() * (baseValue * 0.2)

    for (let i = 0; i < length; i++) {
      const change = (Math.random() - 0.5) * volatility
      lastValue = Math.max(baseValue * 0.2, Math.min(baseValue * 2, lastValue + change))
      data.push(lastValue)
    }

    return data
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    const charts = [
      {
        data: generateChartData(100, 5, 75),
        color: "rgba(124, 58, 237, 0.2)",
        lineColor: "rgba(124, 58, 237, 0.5)",
        speed: 0.5,
        position: { x: 0, y: canvas.height * 0.3 },
        width: canvas.width,
        height: canvas.height * 0.15,
        label: "QCAP/USD",
      },
      {
        data: generateChartData(150, 8, 40),
        color: "rgba(236, 72, 153, 0.15)",
        lineColor: "rgba(236, 72, 153, 0.4)",
        speed: 0.7,
        position: { x: 0, y: canvas.height * 0.5 },
        width: canvas.width,
        height: canvas.height * 0.2,
        label: "Qu/USD",
      },
      {
        data: generateChartData(80, 12, 120),
        color: "rgba(59, 130, 246, 0.15)",
        lineColor: "rgba(59, 130, 246, 0.4)",
        speed: 0.3,
        position: { x: 0, y: canvas.height * 0.75 },
        width: canvas.width,
        height: canvas.height * 0.1,
        label: "QCAP/Qu",
      },
    ]

    const generateCandlesticks = (count: number) => {
      const sticks = []
      let lastClose = 50 + Math.random() * 20

      for (let i = 0; i < count; i++) {
        const open = lastClose
        const close = open + (Math.random() - 0.5) * 10
        const high = Math.max(open, close) + Math.random() * 5
        const low = Math.min(open, close) - Math.random() * 5

        sticks.push({ open, close, high, low })
        lastClose = close
      }

      return sticks
    }

    const candlesticks = generateCandlesticks(20)

    let animationFrame: number
    let offset = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      offset += 0.5

      charts.forEach((chart) => {
        const { data, color, lineColor, position, width, height, speed, label } = chart
        const chartOffset = (offset * speed) % (width / (data.length - 1))

        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.font = "12px sans-serif"
        ctx.fillText(label, position.x + 10, position.y + 15)

        ctx.beginPath()
        ctx.moveTo(position.x - chartOffset, position.y + height)

        data.forEach((value, index) => {
          const x = position.x + index * (width / (data.length - 1)) - chartOffset
          const y = position.y + height - (value / 100) * height

          if (index === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })

        ctx.lineTo(position.x + width - chartOffset, position.y + height)
        ctx.closePath()
        ctx.fillStyle = color
        ctx.fill()

        ctx.beginPath()
        data.forEach((value, index) => {
          const x = position.x + index * (width / (data.length - 1)) - chartOffset
          const y = position.y + height - (value / 100) * height

          if (index === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })

        ctx.strokeStyle = lineColor
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(position.x + width - chartOffset, position.y + height)

        data.forEach((value, index) => {
          const x = position.x + index * (width / (data.length - 1)) + (width - chartOffset)
          const y = position.y + height - (value / 100) * height

          if (index === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })

        ctx.lineTo(position.x + width * 2 - chartOffset, position.y + height)
        ctx.closePath()
        ctx.fillStyle = color
        ctx.fill()

        ctx.beginPath()
        data.forEach((value, index) => {
          const x = position.x + index * (width / (data.length - 1)) + (width - chartOffset)
          const y = position.y + height - (value / 100) * height

          if (index === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })

        ctx.strokeStyle = lineColor
        ctx.lineWidth = 2
        ctx.stroke()
      })

      const candlestickWidth = 15
      const candlestickSpacing = 25
      const candlestickAreaHeight = 120
      const candlestickAreaY = canvas.height * 0.15

      ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
      ctx.font = "12px sans-serif"
      ctx.fillText("QCAP/USD", canvas.width * 0.7, candlestickAreaY - 10)

      const candlestickOffset = (offset * 0.8) % candlestickSpacing

      candlesticks.forEach((stick, index) => {
        const x = canvas.width * 0.7 + index * candlestickSpacing - candlestickOffset

        if (x < canvas.width * 0.4 || x > canvas.width) return

        const isUp = stick.close >= stick.open
        const color = isUp ? "rgba(16, 185, 129, 0.7)" : "rgba(239, 68, 68, 0.7)"

        ctx.beginPath()
        ctx.moveTo(x, candlestickAreaY + (100 - stick.high) * (candlestickAreaHeight / 100))
        ctx.lineTo(x, candlestickAreaY + (100 - stick.low) * (candlestickAreaHeight / 100))
        ctx.strokeStyle = color
        ctx.lineWidth = 1
        ctx.stroke()

        const bodyTop = candlestickAreaY + (100 - Math.max(stick.open, stick.close)) * (candlestickAreaHeight / 100)
        const bodyHeight = Math.abs(stick.open - stick.close) * (candlestickAreaHeight / 100)

        ctx.fillStyle = color
        ctx.fillRect(x - candlestickWidth / 2, bodyTop, candlestickWidth, bodyHeight)
      })

      const tickerY = canvas.height * 0.9
      const tickerHeight = 20
      const tickerWidth = 120
      const tickerPairs = ["QCAP/USD", "Qu/USD", "QCAP/Qu", "Qu/QCAP", "USD/QCAP"]
      const tickerCount = tickerPairs.length
      const tickerSpacing = canvas.width / (tickerCount + 1)

      for (let i = 0; i < tickerCount; i++) {
        const x = (i + 1) * tickerSpacing - ((offset * 0.3) % (canvas.width + tickerSpacing))
        const pair = tickerPairs[i]

        if (x < -tickerWidth || x > canvas.width) continue

        let price, basePrice

        if (pair.includes("QCAP/USD")) {
          basePrice = 75
        } else if (pair.includes("Qu/USD")) {
          basePrice = 40
        } else if (pair.includes("QCAP/Qu")) {
          basePrice = 1.8
        } else if (pair.includes("Qu/QCAP")) {
          basePrice = 0.55
        } else {
          basePrice = 0.013
        }

        price = basePrice + Math.sin(i + offset * 0.01) * (basePrice * 0.05)
        const change = Math.floor(Math.sin(i * 3 + offset * 0.02) * 500) / 100
        const isPositive = change >= 0

        ctx.fillStyle = "rgba(17, 24, 39, 0.7)"
        ctx.fillRect(x, tickerY, tickerWidth, tickerHeight)

        ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
        ctx.font = "10px sans-serif"
        ctx.fillText(pair, x + 10, tickerY + 12)

        ctx.fillStyle = isPositive ? "rgba(16, 185, 129, 0.9)" : "rgba(239, 68, 68, 0.9)"
        ctx.font = "10px sans-serif"
        ctx.fillText(`$${price.toFixed(2)} ${isPositive ? "+" : ""}${change.toFixed(2)}%`, x + 10, tickerY + 24)
      }

      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      ctx.lineWidth = 1

      for (let i = 0; i < 10; i++) {
        const y = i * (canvas.height / 10)
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      for (let i = 0; i < 20; i++) {
        const x = i * (canvas.width / 20)
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(i * 0.5 + offset * 0.01) * 0.5 + 0.5) * canvas.width
        const y = (Math.cos(i * 0.3 + offset * 0.02) * 0.5 + 0.5) * canvas.height
        const size = Math.sin(i + offset * 0.03) * 2 + 3

        ctx.fillStyle = `rgba(139, 92, 246, ${Math.sin(i + offset * 0.01) * 0.2 + 0.3})`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  const handleClick = () => {
    setIsAnimating(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 500)
  }

  return (
    <div 
      className="relative min-h-screen w-full flex items-center justify-center bg-[#1a1625] overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />

      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-indigo-900/30"
        animate={{
          background: [
            "linear-gradient(to bottom right, rgba(88, 28, 135, 0.2), rgba(49, 46, 129, 0.2))",
            "linear-gradient(to bottom right, rgba(49, 46, 129, 0.2), rgba(88, 28, 135, 0.2))",
            "linear-gradient(to bottom right, rgba(88, 28, 135, 0.2), rgba(49, 46, 129, 0.2))",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <motion.div
          initial={{ scale: 1, opacity: 1 }}
          animate={isAnimating ? { scale: 1.2, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <Image
              src="/logo.gif"
              alt="QCAP Logo"
              width={190}
              height={190}
              className="mb-6"
            />
            <h1 className="text-4xl font-bold text-white mb-4 glow-text">
              {"Welcome to the Qubic Capital Analytics dashboard".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onAnimationComplete={() => {
                    if (i === "Welcome to the Qubic Capital Analytics dashboard".length - 1) {
                      setWelcomeComplete(true)
                    }
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </motion.div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: welcomeComplete ? 0 : 20, 
              opacity: welcomeComplete ? 1 : 0,
              color: welcomeComplete ? ['#ff0000', '#ff8c00', '#ff0000'] : '#ff0000'
            }}
            transition={{ 
              delay: welcomeComplete ? 0.4 : 0,
              color: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="text-sm tracking-wider"
          >
            Click anywhere to continue
          </motion.p>
        </motion.div>
      </div>

      
    </div>
  )
} 