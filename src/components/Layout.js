import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './Header';
import Sidebar from './Sidebar';
 
const theme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f', // ProvenTech red
    },
    secondary: {
      main: '#2c2c2c', // Dark gray for sidebar
    },
    background: {
      default: '#f5f5f5', // Light gray background for main content
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
 
const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            p: 3,
            minHeight: '100vh',
          }}
        >
          <Toolbar /> {/* This creates space for the fixed header */}
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
 
export default Layout;
 