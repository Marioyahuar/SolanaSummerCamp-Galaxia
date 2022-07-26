import React, {MouseEventHandler, useCallback} from 'react';
import { useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button, Chip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons"
import { WalletMultiButton, useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
require('@solana/wallet-adapter-react-ui/styles.css');

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Header() {
  const { connection } = useConnection();
  const { publicKey, wallet, connect, connecting, connected, disconnect, disconnecting } = useWallet();
  const { setVisible } = useWalletModal();

  const location = useLocation();
  // console.log(location.pathname);
  const currpage = location.pathname === '/explore'? 0
                : location.pathname === '/sponsoring' ? 1 : false;
  
  const [isLogged, setIsLogged] = React.useState(false);

  const handleLogin = (event: React.SyntheticEvent) => {
    //setIsLogged(true);
    if(!wallet){
      setVisible(true);
    }
    if(!publicKey){
      connect();
    }
  };
  const handleLogout = (event: React.SyntheticEvent) => {
    disconnect();
    setIsLogged(false);
  }
  //let wallet = 'Pepito';
  //this.user.ID.slice(0, 5) + "..." + this.user.ID.slice(-4);
  const content = React.useMemo(() => {
    //if (children) return children;
    if (connecting) return 'Connecting ...';
    if (connected) {setIsLogged(true); return `${publicKey?.toString().slice(0,4) + "..." + publicKey?.toString().slice(-4)}`;}
    if (disconnecting) return 'Disconnecting ...';
    if (wallet) return 'Connect';
    return 'Connect Wallet';
}, [ connecting, connected, wallet]);

  return (
    <header className='row dark-mode'>
      <a href="/"> <img src={process.env.PUBLIC_URL + "/logo.svg"} alt="logo"/> </a>
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
        label={content}
        onDelete={handleLogout}
        deleteIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
      />
      :
      <Button variant="contained"
        onClick={handleLogin}
        startIcon={<FontAwesomeIcon icon={faArrowRightToBracket} />}>
        {wallet ? 'Connect' : 'Select Wallet'}
      </Button> 
      }
    </header>
  )
}

export default Header

/*
<Button variant="contained"
        onClick={handleLogin}
        startIcon={<FontAwesomeIcon icon={faArrowRightToBracket} />}>
        Connect Wallet
      </Button> 
*/