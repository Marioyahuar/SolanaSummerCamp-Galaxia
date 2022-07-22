import React from 'react';
import { useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button, Chip } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Header() {
  
    const location = useLocation();
    // console.log(location.pathname);
    const currpage = location.pathname === '/explore'? 0
                  : location.pathname === '/sponsoring' ? 1 : false;
  
  const [isLogged, setIsLogged] = React.useState(false);
  // const handleChange = (event: React.SyntheticEvent, newValue: boolean) => {
  //   setValue(newValue);
  // };
  let wallet = 'Pepito';

  return (
    <header>
      <img src="" alt="logo" />
      <Tabs  value={currpage} aria-label="nav" className="f-row">
        <Tab label="Explore" {...a11yProps(0)}    href="#" />
        { isLogged ?
          <Tab label="Sponsoring" {...a11yProps(1)} href="#" />
          : ''
        }
      </Tabs>
      {
      isLogged?
      <Button variant="contained"
        startIcon={<LoginIcon />}>
        Connect Wallet
      </Button>
      : 
      <Chip
        label={wallet}
        // onDelete={handleDelete}
        deleteIcon={<LogoutIcon />}
      />
      }
    </header>
  )
}

export default Header