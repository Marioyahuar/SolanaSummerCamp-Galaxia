import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { darkTheme, theme } from './assets/css/theme';
import Header from './components/Header';
import Footer from './components/Footer';
import Explore from './pages/Explore';
import Project from './pages/Project';
import Landing from './pages/Landing';
import * as Web3 from '@solana/web3.js'
import {PhantomWalletAdapter} from '@solana/wallet-adapter-phantom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {AutoConnectProvider} from  './components/AutoConnectProvider';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { AnchorError, AnchorProvider, Program, Provider, web3 } from '@project-serum/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import idl from './crowdfunding.json';

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

function App() {
  const endpoint = Web3.clusterApiUrl('devnet')
  const wallet = new PhantomWalletAdapter()
  /*
  const owallet = useWallet()
  
  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment as any);
    const provider = new AnchorProvider(
      connection, owallet as any, opts.preflightCommitment as any,
    )
    return provider;
  }

  const createAccount = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl as any, programID, provider);
      console.log("ping")
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

  console.log(getProvider())
  createAccount()*/

  return (
    <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[wallet]}>
          <WalletModalProvider>
            {/* <div className="App"> */}
            <BrowserRouter>
              <ThemeProvider theme={darkTheme}>
                <Header/>
              </ThemeProvider>
              <ThemeProvider theme={theme}>
                <main>
                  <Routes>
                    <Route path="/" element={< Landing />} />
                    <Route path="/explore" element={< Explore sponsoring={false} />} />
                    <Route path="/sponsoring" element={< Explore sponsoring={true} />} />
                    <Route path="/project/:id" element={< Project />} />
                  </Routes>
                </main>
              </ThemeProvider>
              <ThemeProvider theme={darkTheme}>
                <Footer />
              </ThemeProvider>
            </BrowserRouter>
            {/* </div> */}
          </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
    
  );
}

export default App;
