"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Lightning() {
  const [enabled, setEnabled] = useState(false)
  const [strike, setStrike] = useState(false)
  const [strikeCount, setStrikeCount] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('/sounds/thunder.mp3')
    audioRef.current.preload = 'auto'
  }, [])

  useEffect(() => {
    const schedule = () => {
      const delay = 5000 + Math.floor(Math.random() * 10000) // 5-15s
      timerRef.current = window.setTimeout(() => {
        doStrike()
        schedule()
      }, delay)
    }
    schedule()
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  const doStrike = () => {
    setStrike(true)
    setStrikeCount(c => c + 1)
    if (enabled && audioRef.current) {
      audioRef.current.currentTime = 0
      void audioRef.current.play().catch(() => { })
    }
    setTimeout(() => setStrike(false), 400)
  }

  const handleEnable = () => {
    setEnabled(true)
    if (audioRef.current) {
      void audioRef.current.play().then(() => {
        audioRef.current?.pause()
      }).catch(() => { })
    }
  }

  return (
    <div style={{ zIndex: 5 }} className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {strike && (
          <>
            {/* intense white flash */}
            <motion.div
              key={`flash-${strikeCount}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.4, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, times: [0, 0.1, 0.5, 1] }}
              className="absolute inset-0 bg-white"
            />
          </>
        )}
      </AnimatePresence>

      {/* multiple lightning bolts */}
      {strike && (
        <div className="absolute inset-0">
          <Bolt x={20} y={10} angle={-15} width={180} height={280} delay={0} />
          <Bolt x={50} y={0} angle={5} width={200} height={320} delay={40} />
          <Bolt x={75} y={20} angle={-8} width={160} height={260} delay={80} />
          <Bolt x={85} y={5} angle={12} width={140} height={240} delay={20} />
        </div>
      )}

      {/* enable sound button */}
      {!enabled && (
        <div className="absolute bottom-6 left-4 z-50 pointer-events-auto">
          <button
            onClick={handleEnable}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200"
          >
            🔊 Activer le son
          </button>
        </div>
      )}
    </div>
  )
}

function Bolt({
  x,
  y,
  angle,
  width,
  height,
  delay,
}: {
  x: number
  y: number
  angle: number
  width: number
  height: number
  delay: number
}) {
  return (
    <motion.svg
      key={`bolt-${x}-${y}`}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width,
        height,
        transform: `rotate(${angle}deg)`,
      }}
      viewBox="0 0 100 200"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.6, 0] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, delay: delay / 1000 }}
      className="drop-shadow-2xl"
    >
      {/* main bolt */}
      <path
        d="M 50 0 L 35 60 L 45 60 L 20 200 L 50 140 L 40 140 L 65 20 Z"
        fill="url(#grad)"
        stroke="rgba(255,255,255,1)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* glow */}
      <path
        d="M 50 0 L 35 60 L 45 60 L 20 200 L 50 140 L 40 140 L 65 20 Z"
        fill="none"
        stroke="rgba(100, 200, 255, 0.5)"
        strokeWidth="6"
        opacity="0.4"
        filter="blur(4px)"
      />
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="40%" stopColor="#d4f1ff" stopOpacity="1" />
          <stop offset="70%" stopColor="#64c8ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#2da3d5" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}
