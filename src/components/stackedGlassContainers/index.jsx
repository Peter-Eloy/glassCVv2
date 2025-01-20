import React, { useState } from 'react'
import { Box } from '@mui/material'

const GlassContainerStacked = ({ children, isActive, onClick, index }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                position: 'absolute',
                width: '95%',
                padding: '20px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                transform: `translateY(${index * 5}px)`,
                zIndex: isActive ? 100 : 10 - index,
                opacity: isActive ? 1 : 0.7,
                '&:hover': {
                    opacity: 0.9,
                },
                '.dark &': {
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            }}
        >
            {children}
        </Box>
    )
}

const StackedGlassContainers = ({ containers }) => {
    const [containerOrder, setContainerOrder] = useState(containers)

    const handleContainerClick = () => {
        setContainerOrder((prevOrder) => {
            const newOrder = [...prevOrder]
            const firstElement = newOrder.shift()
            newOrder.push(firstElement)
            return newOrder
        })
    }

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '200px',
                marginTop: '20px',
                paddingBottom: `${containers.length * 20}px`,
            }}
        >
            {containerOrder.map((content, index) => (
                <GlassContainerStacked key={index} index={index} isActive={index === 0} onClick={handleContainerClick}>
                    {content}
                </GlassContainerStacked>
            ))}
        </Box>
    )
}

export default StackedGlassContainers
