import React from 'react'
import { Button, Chip, Divider, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material'
import { Reward } from '../models/Reward'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClock, faCreditCard, faSpinner, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import * as web3 from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import * as buffer from "buffer";

const states = [
  {label:'Patron', icon: faCheck },
  {label:'Connecting...', icon: faSpinner },
  {label:'Patronized', icon: faCheck }
]

function RewardCard( p: { projectId:number, reward?:Reward } ) {

  const [ state, setState ] = React.useState(states[0]);

  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  const [amountToSend, setAmountToSend] = React.useState( p.reward ? p.reward.minPrice : 0 );
  const [addresToSend, setAddressToSend] = React.useState('')

  React.useEffect(() => {
    async function getProject() {
      const respuesta = await fetch(`http://localhost/obtenerProjectOwner.php?id=${p.projectId}`);
      const owner = await respuesta.json();
      setAddressToSend(owner.ProjectOwner);
      //detectar si ya ha sido patrocinado por user. si lo es:
      if (false) setState(states[2]);
    }
    if ( p.projectId!== undefined ) {
      getProject();
    }
  }, [p.projectId])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setAmountToSend(value as any)
  }

  const sendSol = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (!connection || !publicKey) {
      alert('To support, a wallet is needed.');
      return
    }
    setState(states[1]);
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
        if(p.reward !== undefined){
          const newDonation = {
            User: publicKey.toString(),
            TxHash: sig.toString(),
            ProjectId: p.projectId,
            RewardId: p.reward.id
          }
          sendDonation(newDonation)
        }
    })
  }
  
  const sendDonation = async (input: any) => {
    const cargaUtil = JSON.stringify(input);
    const respuesta = await fetch(`http://localhost/crearPatrocinio.php`, {
        method: "POST",
        body: cargaUtil,
    });
    const exitoso = await respuesta.json();
    setState(states[2]);
    console.log(exitoso)
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
        {p.reward.minPrice} SOL
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
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        spacing={1}
      >
        <div>
          <Typography component="span" className="row f-fill">
            <FontAwesomeIcon icon={faUserGroup} />
            {p.reward.patronsQuantity}
            <Chip label={p.reward.stock ?
              (p.reward.stock - p.reward.patronsQuantity) + ' left'
              : ' Unlimited'
            } />
          </Typography>
        </div>
        {state === states[2] ?
        <>
          <Chip label={state.label} color="success"
          avatar={<FontAwesomeIcon icon={state.icon} />}/>
        </>
        :
        <Button variant="contained" className={'f-fill'}
          onClick={sendSol} disabled={state === states[2]}
          startIcon={<FontAwesomeIcon icon={state.icon} />}>
          {state.label}
        </Button>
        }
      </Stack>
    </div>
    </>

    :

    <>
    <Typography variant="h3" className='gradient' align='center'>
      Free will
    </Typography>
    <Typography variant="body2" color="text.secondary" align='center'>
      Just because you believe in it.
    </Typography>
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
        }}/>

      <Button variant="contained" className='f-fill' onClick={sendSol}
        startIcon={<FontAwesomeIcon icon={state.icon} />}>
        {state.label}
      </Button>
    </Stack>
    </>
    }

  </Paper>
  )
}

export default RewardCard