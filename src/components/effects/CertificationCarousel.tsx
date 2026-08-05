'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimate } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CertificationRow } from '@/lib/types'

interface CertificationCarouselProps {
  certifications: CertificationRow[]
}

function Card({ slide, pos, zIndex, isCenter = false, width, height, isMobile, onClick }: {
  slide: CertificationRow
  pos: { x: number; rotateY: number; scale: number; z: number; opacity: number }
  zIndex: number
  isCenter?: boolean
  width: number
  height: number
  isMobile: boolean
  onClick?: () => void
}) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(scope.current, {
      x: `${pos.x}px`,
      rotateY: pos.rotateY,
      scale: pos.scale,
      opacity: pos.opacity,
    }, {
      type: 'spring',
      stiffness: 180,
      damping: 22,
      mass: 1,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos.x, pos.rotateY, pos.scale, pos.opacity, animate])

  return (
    <div
      ref={scope}
      onClick={onClick}
      className={`car-card ${isCenter ? 'center' : 'side'}`}
      style={{
        width,
        height,
        zIndex,
      }}
      onMouseEnter={() => {
        if (isCenter) animate(scope.current, { scale: 1.12 }, { type: 'spring', stiffness: 300, damping: 15 })
      }}
      onMouseLeave={() => {
        if (isCenter) animate(scope.current, { scale: pos.scale }, { type: 'spring', stiffness: 300, damping: 15 })
      }}
    >
      {isCenter && (
        <>
          <div className="pointer-events-none absolute -inset-[2px] rounded-[24px] opacity-60"
            style={{ background: 'linear-gradient(135deg, rgba(200,164,92,0.3), transparent 40%, rgba(200,164,92,0.15))', zIndex: -1 }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-[22px] overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(200,164,92,0.06), transparent)' }} />
          </div>
        </>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className={`relative flex items-center justify-center ${
          isMobile 
            ? (isCenter ? 'h-16 w-16 mb-2' : 'h-11 w-11 mb-1') 
            : (isCenter ? 'h-24 w-24 mb-3' : 'h-16 w-16 mb-2')
        }`}>
          {slide.image_url ? (
            <Image
              src={slide.image_url}
              alt={slide.name}
              width={isMobile ? (isCenter ? 64 : 44) : (isCenter ? 96 : 64)}
              height={isMobile ? (isCenter ? 64 : 44) : (isCenter ? 96 : 64)}
              sizes={isCenter ? '96px' : '64px'}
              className="h-full w-full object-contain mix-blend-multiply"
            />
          ) : (
            <div className={`flex items-center justify-center rounded-full bg-navy-50 ${
              isMobile
                ? (isCenter ? 'h-14 w-14' : 'h-9 w-9')
                : (isCenter ? 'h-20 w-20' : 'h-12 w-12')
            }`}>
              <span className={`font-bold text-navy-400 ${
                isMobile
                  ? (isCenter ? 'text-sm' : 'text-[9px]')
                  : (isCenter ? 'text-xl' : 'text-xs')
              }`}>{slide.name.substring(0, 2)}</span>
            </div>
          )}
        </div>
        <h4 className={`text-center font-bold text-navy-900 leading-tight ${
          isMobile 
            ? (isCenter ? 'text-xs' : 'text-[8px]') 
            : (isCenter ? 'text-sm' : 'text-[10px]')
        }`}>
          {slide.name}
        </h4>
        <p className={`text-center font-medium uppercase tracking-wider ${
          isMobile 
            ? (isCenter ? 'mt-1 text-[8px] text-gold-600' : 'mt-0.5 text-[5px] text-navy-300') 
            : (isCenter ? 'mt-1.5 text-[10px] text-gold-600' : 'mt-1 text-[7px] text-navy-300')
        }`}>
          {slide.category}
        </p>
      </div>
    </div>
  )
}

export default function CertificationCarousel({ certifications }: CertificationCarouselProps) {
  const [[activeIdx, dir], setState] = useState([0, 0])
  const [isMobile, setIsMobile] = useState(false)
  const total = certifications.length

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goTo = useCallback((idx: number, direction: number) => {
    setState([((idx % total) + total) % total, direction])
  }, [total])

  const next = useCallback(() => goTo(activeIdx + 1, 1), [activeIdx, goTo])
  const prev = useCallback(() => goTo(activeIdx - 1, -1), [activeIdx, goTo])

  useEffect(() => {
    const timer = setInterval(next, 3500)
    return () => clearInterval(timer)
  }, [next])

  const getSlide = (offset: number) =>
    certifications[((activeIdx + offset) % total + total) % total]

  const cardWidth = isMobile ? 140 : 220
  const cardHeight = isMobile ? 190 : 260
  const cardOffset = isMobile ? 120 : 220

  return (
    <div className="relative mx-auto w-full max-w-3xl py-12 select-none">
      <style>{`
        .car-stage {
          perspective: 1400px;
          perspective-origin: center 45%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .car-card {
          position: absolute;
          border-radius: 22px;
          background: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 16px;
          cursor: pointer;
          backface-visibility: hidden;
          will-change: transform, opacity;
        }
        .car-card.center {
          box-shadow: 0 16px 56px rgba(200,164,92,0.18), 0 0 0 1px rgba(200,164,92,0.15);
        }
        .car-card.side {
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }
      `}</style>

      <div className="car-stage" style={{ height: isMobile ? 230 : 320 }}>
        <Card
          key={`l-${activeIdx}`}
          slide={getSlide(-1)}
          pos={{ x: -cardOffset, rotateY: 25, scale: 0.8, z: -80, opacity: 0.55 }}
          zIndex={5}
          width={cardWidth}
          height={cardHeight}
          isMobile={isMobile}
          onClick={prev}
        />
        <Card
          key={`c-${activeIdx}`}
          slide={getSlide(0)}
          pos={{ x: 0, rotateY: 0, scale: 1.05, z: 50, opacity: 1 }}
          zIndex={10}
          width={cardWidth}
          height={cardHeight}
          isMobile={isMobile}
          isCenter
        />
        <Card
          key={`r-${activeIdx}`}
          slide={getSlide(1)}
          pos={{ x: cardOffset, rotateY: -25, scale: 0.8, z: -80, opacity: 0.55 }}
          zIndex={5}
          width={cardWidth}
          height={cardHeight}
          isMobile={isMobile}
          onClick={next}
        />
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        {certifications.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx, idx > activeIdx ? 1 : -1)}
            className={`h-2 rounded-full transition-all duration-500 ${
              idx === activeIdx ? 'w-6 bg-gold-500' : 'w-2 bg-gold-200'
            }`}
          />
        ))}
      </div>

      <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg text-navy-700 hover:text-gold-600 transition-all duration-300 hover:shadow-xl z-20">
        <ChevronLeft size={18} />
      </button>
      <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg text-navy-700 hover:text-gold-600 transition-all duration-300 hover:shadow-xl z-20">
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
