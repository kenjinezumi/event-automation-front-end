import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
          <Typography variant="h6" style={{ cursor: 'pointer',  flexGrow: 1, marginRight: '10em' }}>
          <Link href="/" style={{ cursor: 'pointer', color:'white' }}>

            Event Automation App
            </Link>

          </Typography>

        <Link href="/dashboard" style={{ marginLeft: '1rem'}}>
          <Typography variant="h6" style={{ cursor: 'pointer', color:'white'  }}>
            Dashboard
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
