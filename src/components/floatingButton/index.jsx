import React, { useState } from 'react'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined'
import SaveIcon from '@mui/icons-material/Save'
import PrintIcon from '@mui/icons-material/Print'
import ShareIcon from '@mui/icons-material/Share'
import EditIcon from '@mui/icons-material/Edit'

const FloatingButton = () => {
    const [open, setOpen] = useState(false)

    const actions = [
        { icon: <FileCopyIcon />, name: 'Copy' },
        { icon: <SaveIcon />, name: 'Save' },
        { icon: <PrintIcon />, name: 'Print' },
        { icon: <ShareIcon />, name: 'Share' },
    ]

    return (
        <SpeedDial
            ariaLabel='SpeedDial menu'
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
            }}
            icon={<SpeedDialIcon openIcon={<EditIcon />} />}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => {
                        setOpen(false)
                        // Add your action handlers here
                        console.log(`Clicked ${action.name}`)
                    }}
                />
            ))}
        </SpeedDial>
    )
}

export default FloatingButton
