'use client'

import { LazyMotion, domAnimation } from 'framer-motion'
import React from 'react'

export function AnimationProvider({ children }: { children: React.ReactNode }) {
    // Using domAnimation reduces bundle size significantly by excluding physics simulations 
    // and other heavy features not used in standard UI transitions.
    return (
        <LazyMotion features={domAnimation}>
            {children}
        </LazyMotion>
    )
}
