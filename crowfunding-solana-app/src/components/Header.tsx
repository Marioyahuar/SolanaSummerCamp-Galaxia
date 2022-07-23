import React from 'react';
import { useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button, Chip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons"

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
  const handleLogin = (event: React.SyntheticEvent) => {
    setIsLogged(true);
  };
  const handleLogout = (event: React.SyntheticEvent) => {
    setIsLogged(false);
  }
  let wallet = 'Pepito';

  return (
    <header className='row dark-mode'>
      <a href="/"> <img src="logo.svg" alt="logo"/> </a>
      <Tabs  value={currpage} aria-label="nav" className="f-fill">
        <Tab label="Explore" {...a11yProps(0)}    href="/explore" />
        { isLogged ?
          <Tab label="Sponsoring" {...a11yProps(1)} href="/sponsoring" />
          : ''
        }
      </Tabs>
      {
      isLogged ?
      <Chip
        label={wallet}
        onDelete={handleLogout}
        deleteIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
      />
      :
      <Button variant="contained"
        onClick={handleLogin}
        startIcon={<FontAwesomeIcon icon={faArrowRightToBracket} />}>
        Connect Wallet
      </Button> 
      }
    </header>
  )
}

export default Header