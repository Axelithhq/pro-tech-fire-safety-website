'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Button from '@/components/ui/Button'
import CountUp from '@/components/ui/CountUp'
import RichText from '@/components/ui/RichText'


interface ScrollCanvasSequenceProps {
  totalFrames: number
  pathPrefix: string
  format?: string
  padLength?: number
  projectCount: number
}

const INITIAL_FRAMES = 10
const LOAD_CHUNK = 24

export default function ScrollCanvasSequence({
  totalFrames,
  pathPrefix,
  format = 'png',
  padLength = 3,
  projectCount,
}: ScrollCanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<(HTMLImageElement | null)[]>([])
  const currentFrameRef = useRef(0)
  const loadedRef = useRef(0)
  const [loaded, setLoaded] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const reduced = useReducedMotion()

  // Stream frames in chunks — a small initial batch makes the page render
  // almost instantly, then the rest load progressively in the background.
  useEffect(() => {
    let cancelled = false
    loadedRef.current = 0
    imagesRef.current = []

    const loadChunk = (start: number, end: number) =>
      Promise.all(
        Array.from({ length: end - start + 1 }, (_, k) => {
          const idx = start + k
          const padded = String(idx + 1).padStart(padLength, '0')
          const img = new Image()
          img.src = `${pathPrefix}${padded}.${format}`
          return new Promise<void>((resolve) => {
            img.onload = img.onerror = () => resolve()
            imagesRef.current[idx] = img
          })
        })
      )

    const pump = async () => {
      while (!cancelled && loadedRef.current < totalFrames) {
        const start = loadedRef.current
        const size = start === 0 ? INITIAL_FRAMES : LOAD_CHUNK
        const end = Math.min(start + size, totalFrames) - 1
        await loadChunk(start, end)
        loadedRef.current = end + 1
        setLoadProgress(loadedRef.current / totalFrames)
        if (loadedRef.current >= INITIAL_FRAMES) setLoaded(true)
      }
    }

    pump()
    return () => { cancelled = true }
  }, [totalFrames, pathPrefix, format, padLength])

  // Draw frame
  const drawFrame = (frame: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = imagesRef.current[frame]
    if (img && img.complete && img.naturalWidth > 0) {
      const w = canvas.clientWidth * devicePixelRatio
      const h = canvas.clientHeight * devicePixelRatio
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
      const cw = canvas.clientWidth
      const ch = canvas.clientHeight
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const sw = img.naturalWidth * scale
      const sh = img.naturalHeight * scale
      ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh)
    }
  }

  // Resize
  useEffect(() => {
    if (!loaded) return
    const onResize = () => drawFrame(currentFrameRef.current)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [loaded])

  // Scroll-triggered frame updates
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const rawFrame = useTransform(scrollYProgress, [0, 1], [0, totalFrames])

  useEffect(() => {
    if (reduced) return
    const unsub = rawFrame.on('change', (v) => {
      const frame = Math.min(Math.floor(v), totalFrames - 1)
      if (frame !== currentFrameRef.current) {
        currentFrameRef.current = frame
        drawFrame(frame)
      }
    })
    return unsub
  }, [rawFrame, totalFrames, reduced])

  useEffect(() => {
    if (!reduced) return
    let cancelled = false
    const tryDraw = () => {
      if (cancelled) return
      const img = imagesRef.current[totalFrames - 1]
      if (img && img.complete && img.naturalWidth > 0) {
        currentFrameRef.current = totalFrames - 1
        drawFrame(totalFrames - 1)
      } else {
        window.setTimeout(tryDraw, 150)
      }
    }
    tryDraw()
    return () => { cancelled = true }
  }, [reduced, totalFrames])

  // Scroll-driven text fade
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 0.75], [1, 1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.75], [0, -60])
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06, 0.12], [1, 1, 0])

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-navy-950">
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ imageRendering: 'auto' }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/40 to-transparent z-10" />

        <motion.div
          className="absolute inset-0 z-20 flex items-center"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-16 pt-24 md:pt-32">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-gold-400 uppercase backdrop-blur-sm">
                India&apos;s Trusted Turnkey Fire Protection Engineering Company
              </span>

              <h1 className="mt-6 font-heading text-5xl leading-[1.1] font-bold text-white md:text-7xl lg:text-8xl">
                Protecting Lives, Buildings & Businesses
              </h1>

              <RichText as="p" className="mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg"
                text="<<Design>>, <<Engineering>>, <<Manufacturing>>, <<Supply>>, <<Installation>>, {Testing} & {Commissioning} of complete Fire Protection, Safety and MEP Systems across India."
              />

              <motion.div
                className="mt-10 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Button href="/contact" variant="secondary" size="lg">
                  Request Consultation
                </Button>
                <Button
                  href="/services"
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white hover:text-navy-900"
                >
                  Explore Solutions
                </Button>
              </motion.div>

              <motion.div
                className="mt-16 flex items-center gap-6 text-white/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="flex -space-x-3">
                  <div className="h-10 w-10 rounded-full border-2 border-navy-900 bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg" />
                  <div className="h-10 w-10 rounded-full border-2 border-navy-900 bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg" />
                  <div className="h-10 w-10 rounded-full border-2 border-navy-900 bg-gradient-to-br from-emerald-400 to-cyan-600 shadow-lg" />
                  <div className="h-10 w-10 rounded-full border-2 border-navy-900 bg-gradient-to-br from-pink-400 to-rose-600 shadow-lg" />
                </div>
                <p className="text-sm">
                  <span className="font-semibold text-white/80">
                    <CountUp end={projectCount} />+
                  </span>{' '}
                  projects executed Pan India
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 z-20 h-0.5 bg-gradient-to-r from-gold-500 to-gold-400"
          style={{ scaleX: barScale, transformOrigin: 'left' }}
        />

        <motion.div
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
          style={{ opacity: hintOpacity }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-[10px] font-medium tracking-widest text-white/30 uppercase">
              Scroll
            </span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-gold-500/60 to-transparent" />
          </motion.div>
        </motion.div>

        {!loaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-navy-950">
            <div className="flex flex-col items-center gap-6">
              <div className="h-0.5 w-48 overflow-hidden rounded-full bg-navy-800">
                <motion.div
                  className="h-full rounded-full bg-gold-500"
                  initial={{ width: '0%' }}
                  animate={{ width: `${loadProgress * 100}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <p className="text-xs text-white/20">
                Loading experience… {Math.round(loadProgress * 100)}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
