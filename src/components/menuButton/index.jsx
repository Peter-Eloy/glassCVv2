import React, { useState } from 'react'
import './menuButton.css'

const MenuButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen((prev) => !prev) // Toggle the state
    }

    return (
        <div className={`menu-button ${isOpen ? 'open' : ''}`} onClick={handleClick}>
            <div className='triangle'></div>
            <div className='menu-options'>
                <div className='option'>Option 1</div>
                <div className='option'>Option 2</div>
            </div>
        </div>
    )
}

export default MenuButton
