import React from 'react';
import Navbar from './Navbar';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
    <AppBar position="static" className="bg-white shadow-md">
      <Toolbar>
        <Typography variant="h6" className="flex-1">
          <Navbar />
        </Typography>
        <Button color="inherit" className="mr-4">Log Out</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
