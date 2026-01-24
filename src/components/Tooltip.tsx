'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface TooltipProps {
  content: string
  children: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
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

    // Tooltip dimensions (approximate for calculation, or could measure ref)
    // Assuming max-width 320px (xs)
    const OFFSET = 10

    switch (placement) {
      case 'top':
        top = rect.top + scrollY - OFFSET
        left = rect.left + scrollX + rect.width / 2
        break
      case 'bottom':
        top = rect.bottom + scrollY + OFFSET
        left = rect.left + scrollX + rect.width / 2
        break
      case 'left':
        top = rect.top + scrollY + rect.height / 2
        left = rect.left + scrollX - OFFSET
        break
      case 'right':
        top = rect.top + scrollY + rect.height / 2
        left = rect.right + scrollX + OFFSET
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
      {mounted && isVisible && createPortal(
        <div
          className="absolute z-[9999] pointer-events-none"
          style={{
            top: coords.top,
            left: coords.left,
          }}
        >
          <div
            className={`px-3 py-2 text-sm font-normal text-white bg-gray-900 rounded-lg shadow-xl whitespace-nowrap max-w-xs relative
              ${placement === 'top' ? '-translate-y-full -translate-x-1/2' : ''}
              ${placement === 'bottom' ? '-translate-x-1/2' : ''}
              ${placement === 'left' ? '-translate-x-full -translate-y-1/2' : ''}
              ${placement === 'right' ? '-translate-y-1/2' : ''}
            `}
          >
            {content}
            {/* Arrow */}
            <div
              className={`absolute border-4 border-transparent
                ${placement === 'top' ? 'top-full left-1/2 -translate-x-1/2 border-t-gray-900' : ''}
                ${placement === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900' : ''}
                ${placement === 'left' ? 'left-full top-1/2 -translate-y-1/2 border-l-gray-900' : ''}
                ${placement === 'right' ? 'right-full top-1/2 -translate-y-1/2 border-r-gray-900' : ''}
              `}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
