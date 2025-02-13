import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Button, Divider, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Login from '../../Pages/Login';
import icons from '../../Assets/Icons/Icons';

function Header() {
  return (
    <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none', padding: '20px 0px', top: 0,
      zIndex: 1100,  }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
            <Link to={'/admin/dashboard'}>
              {icons.justBuy}
            </Link>
          </Box>
        </Box>

        <Box sx={{ flex: 1, maxWidth: '700px' }}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
        <Login/>
        </Box>
      </Box>
    </AppBar>

  );
}
export default Header;
