import React, { useState } from 'react'
import { Button, Typography, Box } from '@mui/material'
import BaseGlassDialog from './GlassDialog'

export const PrivacyPolicyDialog = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button variant='contained' onClick={() => setOpen(true)}>
                Privacy Policy
            </Button>
            <BaseGlassDialog open={open} onClose={() => setOpen(false)} title='Privacy Policy'>
                <Box sx={{ '& > *': { mb: 2 } }}>
                    <Typography variant='h6'>1. Information We Collect</Typography>
                    <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</Typography>

                    <Typography variant='h6'>2. How We Use Your Information</Typography>
                    <Typography>Sed do eiusmod tempor incididunt ut labore et dolore...</Typography>

                    <Typography variant='h6'>3. Data Security</Typography>
                    <Typography>Ut enim ad minim veniam, quis nostrud exercitation...</Typography>
                </Box>
            </BaseGlassDialog>
        </>
    )
}
