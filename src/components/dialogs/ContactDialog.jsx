import React, { useState } from 'react'
import { Button, TextField, Box, Stack } from '@mui/material'
import BaseGlassDialog from './GlassDialog'

export const ContactDialog = () => {
    const [open, setOpen] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        // Add your form submission logic here
    }

    return (
        <>
            <Button variant='contained' onClick={() => setOpen(true)}>
                Contact
            </Button>
            <BaseGlassDialog open={open} onClose={() => setOpen(false)} title='Contact Us'>
                <Box component='form' onSubmit={handleSubmit} noValidate>
                    <Stack spacing={3}>
                        <TextField
                            required
                            fullWidth
                            id='name'
                            label='Name'
                            name='name'
                            autoComplete='name'
                            sx={{
                                '& .MuiInputBase-root': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        />
                        <TextField
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            sx={{
                                '& .MuiInputBase-root': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        />
                        <TextField
                            required
                            fullWidth
                            name='message'
                            label='Message'
                            multiline
                            rows={4}
                            sx={{
                                '& .MuiInputBase-root': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        />
                        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                            Send Message
                        </Button>
                    </Stack>
                </Box>
            </BaseGlassDialog>
        </>
    )
}
