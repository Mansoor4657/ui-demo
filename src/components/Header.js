import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Badge,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import Logo from './Logo.svg';
 
// Styled components for search functionality
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));
 
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
 
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
 
const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#d32f2f', // ProvenTech red color
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ paddingLeft: '0 !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <img
            src={Logo}
            alt="PrevenTech Logo"
            style={{
              height: '64px',
              width: 'auto',
              marginRight: '8px'
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            FMSO - Fleet Maintenance & Sourcing Orchestrator
          </Typography>
        </Box>
 
        {/* Spacer to push icons to the right */}
        <Box sx={{ flexGrow: 1 }} />
 
        {/* Right side icons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Search bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Equipment"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
 
          {/* Notifications */}
          <IconButton color="inherit">
            <Badge badgeContent={4} color="warning">
              <NotificationsIcon />
            </Badge>
          </IconButton>
 
          {/* Help */}
          <IconButton color="inherit">
            <HelpIcon />
          </IconButton>
 
          {/* User account */}
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
 
export default Header;