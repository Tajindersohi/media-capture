import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  AppBar,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InventoryIcon from '@mui/icons-material/Inventory';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useLocation, useParams } from 'react-router-dom';
import icons from '../Assets/Icons/Icons';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const drawerWidth = 220;

export default function GeneralLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'My Account', route: '/user-account', icon: <AccountBoxIcon /> },
    { name: 'Media', route: '/user-media', icon: <InventoryIcon /> },
    { name: 'Logout', route: '/logout', icon: <ExitToAppIcon /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ width: drawerWidth, overflow: 'unset' }}>
      <Toolbar >
        <Box>
            {icons.justBuy}
        </Box>
      </Toolbar>

      <Divider />
      <List>
        {menuItems.map((item, idx) => (
          <ListItem
            button
            key={item.name}
            component={Link}
            to={item.route}
            sx={{
              color:(location.pathname == item.route ? 'primary.contrastText' : '#000'),
              backgroundColor:(location.pathname == item.route ? '#0C8342' : 'none'),
              '&:hover': {
                backgroundColor: '#0C8342',
                color: 'primary.contrastText',
              },
              borderRadius: 1,
              margin: 1,
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar for Mobile Toggle */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: { sm: 'none' },
          backgroundColor: '#fff',
        }}
      >
        <Toolbar>
          <IconButton
            color="#fff"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Box width={'100%'} sx={{textAlign:'center'}}>
              {icons.justBuy}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Improve performance on mobile
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', overflow: 'hidden' },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        {/* <Toolbar /> */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <Toolbar />
        </Box>
        {children}
      </Box>
    </Box>
  );
}