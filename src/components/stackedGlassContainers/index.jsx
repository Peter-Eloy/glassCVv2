import React, { useState, useRef, useEffect } from 'react'
import { Box } from '@mui/material'

const GlassContainerStacked = ({ children, isActive, onClick, index, height }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                height: height ? `${height}px` : 'auto',
                padding: '0px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                '&:hover': {
                    transform: `translateY(${index * 5}px) translateY(-2px)`,
                    transition: 'transform 0.2s ease-in-out',
                },
                '.dark &': {
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
                transition: 'all 0.3s ease-in-out',
                transform: `translateY(${index * 5}px)`,
                zIndex: isActive ? 100 : 10 - index,
                opacity: isActive ? 1 : 0.7,
                // Added display flex for centering
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{ padding: '20px', width: '100%', textAlign: 'center' }}>{children}</Box>
        </Box>
    )
}

const StackedGlassContainers = ({ containers }) => {
    const [containerOrder, setContainerOrder] = useState(containers)
    const [maxHeight, setMaxHeight] = useState(0)
    const containerRefs = useRef([])

    useEffect(() => {
        containerRefs.current = containerRefs.current.slice(0, containers.length)

        const calculateMaxHeight = () => {
            const heights = containerRefs.current.map((ref) => ref?.offsetHeight || 0)
            const newMaxHeight = Math.max(...heights)
            if (newMaxHeight !== maxHeight) {
                setMaxHeight(newMaxHeight)
            }
        }

        calculateMaxHeight()

        window.addEventListener('resize', calculateMaxHeight)
        return () => window.removeEventListener('resize', calculateMaxHeight)
    }, [containers, containerOrder])

    const handleContainerClick = () => {
        setContainerOrder((prevOrder) => {
            const newOrder = [...prevOrder]
            const firstElement = newOrder.shift()
            newOrder.push(firstElement)
            return newOrder
        })
    }

    const stackingOffset = (containers.length - 1) * 5
    const totalHeight = maxHeight + stackingOffset

    return (
        <Box
            sx={{
                position: 'relative',
                height: totalHeight,
                margin: '16px',
                overflow: 'visible',
            }}
        >
            {/* Hidden containers for measurement */}
            <Box sx={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }}>
                {containerOrder.map((content, index) => (
                    <Box key={`measure-${index}`} ref={(el) => (containerRefs.current[index] = el)} sx={{ padding: '20px' }}>
                        {content}
                    </Box>
                ))}
            </Box>

            {/* Visible stacked containers */}
            {containerOrder.map((content, index) => (
                <GlassContainerStacked key={`container-${index}`} index={index} isActive={index === 0} onClick={handleContainerClick} height={maxHeight}>
                    {content}
                </GlassContainerStacked>
            ))}
        </Box>
    )
}

export default StackedGlassContainers
