'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface TooltipProps {
  content: string
  children: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'bottom-end'
}

export default function Tooltip({ content, children, placement = 'right' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const updatePosition = () => {
    if (!triggerRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()
    const scrollX = window.scrollX
    const scrollY = window.scrollY

    let top = 0
    let left = 0

    // Gap between trigger and tooltip
    const GAP = 12

    switch (placement) {
      case 'top':
        top = rect.top + scrollY - GAP
        left = rect.left + scrollX + rect.width / 2
        break
      case 'bottom':
      case 'bottom-end':
        top = rect.bottom + scrollY + GAP
        left = rect.left + scrollX + rect.width / 2
        break
      case 'left':
        top = rect.top + scrollY + rect.height / 2
        left = rect.left + scrollX - GAP
        break
      case 'right':
        top = rect.top + scrollY + rect.height / 2
        left = rect.right + scrollX + GAP
        break
    }

    setCoords({ top, left })
  }

  const handleMouseEnter = () => {
    updatePosition()
    setIsVisible(true)
  }

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help inline-block"
      >
        {children}
      </div>
      {mounted && createPortal(
        <AnimatePresence>
          {isVisible && (
            <div
              className="absolute z-[9999] pointer-events-none"
              style={{
                top: coords.top,
                left: coords.left,
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className={`px-3 py-2 text-sm font-medium text-white bg-rgs-black/95 backdrop-blur-md border border-rgs-green/30 rounded-lg shadow-xl whitespace-nowrap max-w-xs relative
                  ${placement === 'top' ? '-translate-y-full -translate-x-1/2' : ''}
                  ${placement === 'bottom' ? '-translate-x-1/2' : ''}
                  ${placement === 'bottom-end' ? '-translate-x-[90%]' : ''}
                  ${placement === 'left' ? '-translate-x-full -translate-y-1/2' : ''}
                  ${placement === 'right' ? '-translate-y-1/2' : ''}
                `}
              >
                {content}
                {/* Arrow */}
                <div
                  className={`absolute w-3 h-3 bg-rgs-black/95 border-rgs-green/30 transform rotate-45
                    ${placement === 'top' ? 'top-full left-1/2 -ml-1.5 -mt-1.5 border-b border-r' : ''}
                    ${placement === 'bottom' ? 'bottom-full left-1/2 -ml-1.5 -mb-1.5 border-t border-l' : ''}
                    ${placement === 'bottom-end' ? 'bottom-full right-[10%] -mb-1.5 border-t border-l' : ''}
                    ${placement === 'left' ? 'left-full top-1/2 -mt-1.5 -ml-1.5 border-t border-r' : ''}
                    ${placement === 'right' ? 'right-full top-1/2 -mt-1.5 -mr-1.5 border-b border-l' : ''}
                  `}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
