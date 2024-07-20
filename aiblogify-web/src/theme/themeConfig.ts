'use client'
import { createTheme } from '@mui/material/styles';

const basicConfig = {
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.2rem',
        },
        h2: {
            fontSize: '2rem',
        },
        body1: {
            fontSize: '1rem',
        },
        button: {
            textTransform: 'none',
        },
    },
    spacing: 8,
    shape: {
        borderRadius: 4,
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    zIndex: {
        appBar: 1100,
        drawer: 1200,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                },
            },
        },
    },
};

const themeBasic = {
    ...basicConfig,
    palette: {
        primary: {
            main: '#fc5185',
        },
        secondary: {
            main: '#f5f5f5',
        },
        error: {
            main: '#f44336',
        },
        background: {
            default: '#fff',
        },
    }
}
const theme = createTheme(themeBasic);

export default theme;