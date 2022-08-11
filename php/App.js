import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
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

const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(
      connection, window.solana, opts.preflightCommitment,
    );
    return provider;
  }

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