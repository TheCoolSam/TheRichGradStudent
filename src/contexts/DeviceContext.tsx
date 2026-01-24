'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface DeviceContextType {
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
}

const DeviceContext = createContext<DeviceContextType>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
})

export function DeviceProvider({ children }: { children: ReactNode }) {
    const [device, setDevice] = useState<DeviceContextType>({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
    })

    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth
            setDevice({
                isMobile: width < 640,
                isTablet: width >= 640 && width < 1024,
                isDesktop: width >= 1024,
            })
        }

        checkDevice()
        window.addEventListener('resize', checkDevice)
        return () => window.removeEventListener('resize', checkDevice)
    }, [])

    return (
        <DeviceContext.Provider value={device}>
            {children}
        </DeviceContext.Provider>
    )
}

export const useDevice = () => useContext(DeviceContext)
