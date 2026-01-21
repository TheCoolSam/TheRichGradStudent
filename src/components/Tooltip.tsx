'use client'

import React, { useState } from 'react'

interface TooltipProps {
  content: string
  children: React.ReactNode
}

export default function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 px-3 py-2 text-sm font-normal text-white bg-gray-900 rounded-lg shadow-lg -top-2 left-full ml-2 whitespace-nowrap max-w-xs">
          {content}
          <div className="absolute top-1/2 right-full -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
        </div>
      )}
    </div>
  )
}
