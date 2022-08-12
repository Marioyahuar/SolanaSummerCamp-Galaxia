import React, {MouseEventHandler, useCallback, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button, Chip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons"
import { WalletMultiButton, useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { AnchorError, AnchorProvider, Program, Provider, web3 } from '@project-serum/anchor';
//import idl from '../myepicproject.json';
//import idl from '../crowdfunding.json';
import idl from '../crowdfunding_basic.json';
import './use-wallet.ts'
import { WalletReadyState } from '@solana/wallet-adapter-base';
import { Buffer } from 'buffer';
window.Buffer = Buffer;
require('@solana/wallet-adapter-react-ui/styles.css');


// SystemProgram is a reference to the Solana runtime!
const { SystemProgram, Keypair } = web3;

// Create a keypair for the account that will hold the GIF data.
let baseAccount = Keypair.generate();

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devnet.
const network = clusterApiUrl('devnet');

// Controls how we want to acknowledge when a transaction is "done".
const opts = {
  preflightCommitment: "processed"
}

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
  const [ locWallet, setLocWallet ] = React.useState(localStorage.getItem('solWallet'));

  const location = useLocation();
  // console.log(location.pathname);
  const currpage = location.pathname === '/explore'? 0
                : location.pathname === '/sponsoring' ? 1 : false;
  
  //const [isLogged, setIsLogged] = React.useState(false);

  /*React.useEffect(() => {
    //console.log(isLogged)
    //console.log(connected)
    //console.log(publicKey?.toString())
  }, [isLogged])*/

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
    setLocWallet(null);
    localStorage.removeItem('solWallet')
}
  
  const content = React.useMemo(() => {
    //if (children) return children;
    if (locWallet) { return locWallet };
    if (connecting) return 'Connecting ...';
    if (connected) {
      let w = `${publicKey?.toString().slice(0,4) + "..." + publicKey?.toString().slice(-4)}`;
      setLocWallet(w);
      localStorage.setItem('solWallet', w);
      return w;
    }
    if (disconnecting) return 'Disconnecting ...';
    //if (wallet) {try{connect()}catch{console.log("error")};return 'Connect'};
    return 'Connect Wallet';
  }, [ connecting, connected, wallet]);

  React.useEffect(() => {
    if (wallet) { try{connect()}catch{console.log("error connecting")}; }
  }, [wallet?.readyState === WalletReadyState.Installed])

  const endpoint = web3.clusterApiUrl('devnet')
  //const wallet = new PhantomWalletAdapter()
  const anchorwallet = useAnchorWallet()
  
  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment as any);
    const provider = new AnchorProvider(
      connection, anchorwallet as any, opts.preflightCommitment as any,
    )
    /*if (publicKey && anchorwallet && connection) {
      const provider = new Provider(connection, anchorwallet, {
        preflightCommitment: "processed",
      });*/
    return provider;
  }

  const showProvider = async() => {
    console.log(getProvider())
  }
  
  const createAccount = async () => {
    try {
      const provider =  getProvider();
      console.log(provider)
      //const program = new Program(idl as any, programID, provider);
      const program = new Program(idl as any, programID, provider);
      console.log("ping: ", programID.toString())
      //console.log(SystemProgram.programId.toString())
      console.log(program.programId.toString())
      await program.rpc.initialize({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount]
      });
      console.log("Created a new BaseAccount w/ address:", baseAccount.publicKey.toString())
  
    } catch(error) {
      console.log("Error creating BaseAccount account:", error)
    }
  }

  const GetAccount = async() => {
    try{
      const provider = getProvider();
      const program = new Program(idl as any, programID, provider);
      const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
      console.log("Got the account", account)
    } catch(error){
      console.log(error)
    }
  }

  const SendGif = async() => {
    let inputValue = 'https://educacion30.b-cdn.net/wp-content/uploads/2019/06/homer.gif'
    try {
      const provider = getProvider();
      const program = new Program(idl as any, programID, provider);
  
      await program.rpc.addGif(inputValue, {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        },
      });
      console.log("GIF successfully sent to program", inputValue)
  
      //await getGifList();
    } catch (error) {
      console.log("Error sending GIF:", error)
    }
  }  

  return (
    <header className='row dark-mode'>
      <Button onClick={SendGif}>GetAndShowProvider</Button>
      <Button onClick={createAccount}>CreateAccount</Button>
      <a href="/"> <img src={process.env.PUBLIC_URL + "/logo.svg"} alt="logo"/> </a>
      <Tabs  value={currpage} aria-label="nav" className="f-fill">
        <Tab label="Explore" {...a11yProps(0)}    href="/explore" />
        {  locWallet ?
          <Tab label="Sponsoring" {...a11yProps(1)} href="/sponsoring" />
          : ''
        }
      </Tabs>  
      
      {
       locWallet ?
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