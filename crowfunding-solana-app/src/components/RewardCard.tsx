import React from 'react'
import { Button, Divider, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material'
import { Reward } from '../models/Reward'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClock, faCreditCard, faSpinner, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

function RewardCard( p: { projectId:number, reward?:Reward } ) {

  const [ state, setState ] = React.useState({label:'Patron', icon: faCheck });
  const handleConnect = (event: React.SyntheticEvent) => {
    setState({label:'Connecting...', icon: faSpinner });
  };


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
        InputProps={{
          endAdornment:
          <InputAdornment position="end">
            <FontAwesomeIcon icon={faCreditCard} />
          </InputAdornment>
        }}
      />
      <Button variant="contained" className='f-fill'
        startIcon={<FontAwesomeIcon icon={state.icon} />}>
        {state.label}
      </Button>
    </Stack>

  </Paper>
  )
}

export default RewardCard