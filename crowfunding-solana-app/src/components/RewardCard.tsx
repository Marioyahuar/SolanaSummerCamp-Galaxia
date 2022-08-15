import React from 'react'
import { Button, Divider, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material'
import { Reward } from '../models/Reward'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClock, faCreditCard, faSpinner, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import * as web3 from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import * as buffer from "buffer";

function RewardCard( p: { projectId:number, reward?:Reward } ) {

  const [ state, setState ] = React.useState({label:'Patron', icon: faCheck });
  const handleConnect = (event: React.SyntheticEvent) => {
    setState({label:'Connecting...', icon: faSpinner });
  };

  const testF = () =>{ 
    console.log("testing reward button")
  }

  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  const [amountToSend, setAmountToSend] = React.useState(0)
  const [addresToSend, setAddressToSend] = React.useState('4sgJSUKJLBpnw7kUdNFWCK6EZqtkB3MXooHcFJYbPY8v')

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setAmountToSend(value as any)
    console.log(event.target, value)
  }

  const sendSol = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (!connection || !publicKey) { return }
    const transaction = new web3.Transaction()
    const recipientPubKey = new web3.PublicKey(addresToSend)

    const sendSolInstruction = web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientPubKey,
        lamports: LAMPORTS_PER_SOL * amountToSend
    })

    transaction.add(sendSolInstruction);
    sendTransaction(transaction, connection).then(sig => {
        console.log(sig)
    })
  }
  

  return (
  <Paper className={"reward-card "} >
    {/* + (p.reward ? '' : "border-gradient") */}

    {p.reward ?
    <>
    <div>
      <Typography variant='h3' align='center'>
        {p.reward.name}
      </Typography>
      <Typography variant='h5' align='center'>
        {p.reward.minPrice} SOL +
      </Typography>
    </div>
    <Typography variant="body2" color="text.secondary">
      {p.reward.description}
    </Typography>
    <ul>
      <Typography variant="body2" fontWeight="bold">
        Includes
      </Typography>
      {p.reward.perksIncluded.map((perk,i)=>
      <Typography key={i} variant="body2" component="li">
        {perk}
      </Typography>
      )}
    </ul>
    <Stack
      direction="row"
      justifyContent="space-between"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={1}
    >
      <div>
        <Typography variant="body2" fontWeight="bold">
          Estimated deliver date
        </Typography>
        <Typography component="span" className="row f-fill">
          <FontAwesomeIcon icon={faClock} />
          {moment(p.reward.estimatedDeliverDate).format("YYYY/MM/DD")}
        </Typography>
      </div>
      <div>
        <Typography variant="body2" fontWeight="bold">
          Patrons
        </Typography>
        <Typography component="span" className="row f-fill">
          <FontAwesomeIcon icon={faUserGroup} />
          {p.reward.patronsQuantity}
        </Typography>
      </div>
    </Stack>
    </>

    :

    <>
    <Typography variant="h3" className='gradient' align='center'>
      Free will
    </Typography>
    <Typography variant="body2" color="text.secondary" align='center'>
      Just because you believe in it.
    </Typography>
    </>
    }


    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={1}
    >
      <TextField variant="filled"
        label="Contribute (SOL)"
        name="SOL"
        onChange={handleChange}
        InputProps={{
          endAdornment:
          <InputAdornment position="end">
            <FontAwesomeIcon icon={faCreditCard} />
          </InputAdornment>
        }}
      />
      <Button variant="contained" className='f-fill' onClick={sendSol}
        startIcon={<FontAwesomeIcon icon={state.icon} />}>
        {state.label}
      </Button>
    </Stack>

  </Paper>
  )
}

export default RewardCard