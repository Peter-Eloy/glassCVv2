// src/components/dialogs/GlassDialog.jsx
import React from 'react'
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'

const GlassDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '16px',
        padding: theme.spacing(2),
        maxWidth: '600px',
        width: '100%',
        margin: theme.spacing(2),
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    },
    '& .MuiDialogTitle-root': {
        padding: theme.spacing(2),
        position: 'relative',
    },
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
}))

const BaseGlassDialog = ({ open, onClose, title, children }) => {
    return (
        <GlassDialog open={open} onClose={onClose} maxWidth='md'>
            <DialogTitle>
                {title}
                <IconButton
                    aria-label='close'
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
        </GlassDialog>
    )
}

BaseGlassDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default BaseGlassDialog
