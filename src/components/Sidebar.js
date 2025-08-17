import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Toolbar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Warning as WarningIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  DirectionsCar as DirectionsCarIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
 
const drawerWidth = 80;
 
const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, active: true },
];
 
const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'white', // White background to match the design
          color: '#333',
          borderRight: '1px solid #e0e0e0',
        },
      }}
    >
      <Toolbar /> {/* This creates space for the header */}
     
      <Box sx={{ overflow: 'auto', mt: 1 }}>
        <List sx={{ padding: 0 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                sx={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: '#333',
                  backgroundColor: item.active ? 'rgba(211, 47, 47, 0.1)' : 'transparent',
                  borderLeft: item.active ? '4px solid #d32f2f' : '4px solid transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  },
                  py: 2,
                  px: 1,
                  minHeight: '80px',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: item.active ? 'white' : '#666',
                    minWidth: 'auto',
                    mb: 1,
                    backgroundColor: item.active ? '#d32f2f' : 'transparent',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& .MuiSvgIcon-root': {
                      fontSize: '1.5rem',
                    },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    textAlign: 'center',
                    margin: 0,
                    '& .MuiListItemText-primary': {
                      fontSize: '0.75rem',
                      fontWeight: item.active ? 'bold' : 'normal',
                      lineHeight: 1.2,
                      color: item.active ? '#d32f2f' : '#666',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
 
export default Sidebar;