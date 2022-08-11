import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { Paper, Stack, Typography } from '@mui/material'

function Timer( p: {dateLimit: Date} ) {

  const dateLimit = moment(p.dateLimit);
  const [diffTime , setDiffTime] = React.useState(
    moment.duration( dateLimit.diff(new Date(), 'milliseconds') )
  );
  const handleTick = (event: React.SyntheticEvent) => {
    let msLeft = dateLimit.diff(new Date(), 'milliseconds');
    setDiffTime( moment.duration(msLeft) );
  };
  React.useEffect(()=>{
    setInterval(handleTick, 1000);
  }, [diffTime.asMilliseconds() > -1]);

  return (
    <div className='timer border-gradient'>

      <div className="row">
        <span className='f-fill'>
          Goal date: &nbsp;
          <strong>{dateLimit.format("YYYY/MM/DD")}</strong>
        </span>
        <Typography color="text.secondary" className="row">
          <FontAwesomeIcon icon={faClock} />
          <small>Time left:</small>
        </Typography>
      </div>

      {
        diffTime.asDays() < 0 ?
        <Typography variant="h3">
          Time over!
        </Typography>
        :
        <Stack direction="row" spacing={1} flexWrap="nowrap">
          <Paper elevation={2}>
            <Typography variant="h3" component="span">{ diffTime.asDays().toFixed() }</Typography>
            <Typography variant="body2" color="text.secondary">days</Typography>
          </Paper>
          <Paper elevation={2}>
            <Typography variant="h3" component="span">{ diffTime.hours() }</Typography>
            <Typography variant="body2" color="text.secondary">hours</Typography>
          </Paper>
          <Paper elevation={2}>
            <Typography variant="h3" component="span">{ diffTime.minutes() }</Typography>
            <Typography variant="body2" color="text.secondary">mins.</Typography>
          </Paper>
          <Paper elevation={2}>
            <Typography variant="h3" component="span">{ diffTime.seconds() }</Typography>
            <Typography variant="body2" color="text.secondary">secs.</Typography>
          </Paper>
        </Stack>
      }


    </div>
  )
}

export default Timer