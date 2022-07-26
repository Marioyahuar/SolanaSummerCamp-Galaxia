import { LinearProgress, Typography } from '@mui/material'
import React from 'react'

function Progress( p:{reached:number, goal:number} ) {

  const pprog = (p.reached/p.goal) * 100;

  return (
  <div className='column c-short'>
    <LinearProgress variant="determinate" value={pprog} className="gradient" />
    <Typography className='row'>
      <Typography variant="h4" component='span' color='primary'>
        {p.reached} SOL
      </Typography>
      of
      <strong> {p.goal} SOL </strong>
      reached
    </Typography>
  </div>
  )
}

export default Progress