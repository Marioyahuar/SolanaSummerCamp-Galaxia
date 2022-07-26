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

function App() {
  const endpoint = Web3.clusterApiUrl('devnet')
  const wallet = new PhantomWalletAdapter()

  return (
    <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[wallet]}>
                <WalletModalProvider>
                    <div className="App">
                      <BrowserRouter>
                        <ThemeProvider theme={darkTheme}>
                          <Header/>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                          <main>
                            <Routes>
                              <Route path="/" element={< Landing />} />
                              <Route path="/explore" element={< Explore />} />
                              <Route path="/sponsoring" element={< Explore />} />
                              <Route path="/:id" element={< Project />} />
                            </Routes>
                          </main>
                        </ThemeProvider>
                        <ThemeProvider theme={darkTheme}>
                          <Footer />
                        </ThemeProvider>
                      </BrowserRouter>
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    
  );
}

export default App;
