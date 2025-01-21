export const glassStyles = {
    light: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        color: '#213547',
    },
    dark: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        color: '#fff',
    },
    shared: {
        borderRadius: '16px',
        transition: 'all 0.3s ease-in-out',
    },
    hover: {
        transform: 'translateY(-2px)',
        transition: 'transform 0.2s ease-in-out',
    },
}
