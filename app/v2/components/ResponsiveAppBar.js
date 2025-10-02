'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function ResponsiveAppBar() {
  const router = useRouter();

  const NAV_MENU_ID = 'menu-appbar-nav';
  const USER_MENU_ID = 'menu-appbar-user';

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // close then navigate (prevents stuck-open menus)
  const go = (href) => {
    handleCloseNavMenu();
    handleCloseUserMenu();
    router.push(href);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            VMS
          </Typography>

          {/* Mobile: burger */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="main navigation"
              aria-controls={NAV_MENU_ID}
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id={NAV_MENU_ID}
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem onClick={() => go('/v2/product')}>
                <Typography sx={{ textAlign: 'center' }}>Products</Typography>
              </MenuItem>
              <MenuItem onClick={() => go('/v2/category')}>
                <Typography sx={{ textAlign: 'center' }}>Categories</Typography>
              </MenuItem>
              <MenuItem onClick={() => go('/v2/customer')}>
                <Typography sx={{ textAlign: 'center' }}>Customers</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Mobile logo */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            VMS
          </Typography>

          {/* Desktop nav */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={() => go('/v2/product')} sx={{ my: 2, color: 'white', display: 'block' }}>
              Products
            </Button>
            <Button onClick={() => go('/v2/category')} sx={{ my: 2, color: 'white', display: 'block' }}>
              Categories
            </Button>
            <Button onClick={() => go('/v2/customer')} sx={{ my: 2, color: 'white', display: 'block' }}>
              Customers
            </Button>
          </Box>

          {/* User menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* Make sure this image exists in /public (or drop src to use initials) */}
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id={USER_MENU_ID}
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
