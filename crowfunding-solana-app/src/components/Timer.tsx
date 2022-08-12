import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import moment, { duration } from 'moment'
import { Paper, Stack, Typography } from '@mui/material'

interface Duration {
  dd: number,
  hh: number,
  mm: number,
  ss: number,
}

function Timer( p: {dateLimit?: Date} ) {
  // const p: {dateLimit?: Date} = {dateLimit: new Date('2022-08-13')};
  const [timeToDay , setTimeToDay] = React.useState<Duration>();
  
  const getTimeDiff = () => {
    if(p.dateLimit != undefined){
      let now = new Date().getTime();
      const msDateLimit = new Date(p.dateLimit).getTime();
      let timeDiff : number = msDateLimit - now;
      console.log(p.dateLimit, msDateLimit, now, timeDiff);
      setTimeToDay({
        dd: Math.floor( timeDiff / 1000 / 60 / 60 / 24 ),
        hh: Math.floor((timeDiff / 1000 / 60 / 60) % 24),
        mm: Math.floor((timeDiff / 1000 / 60) % 60),
        ss: Math.floor((timeDiff / 1000) % 60)
      })
    }
    
  };

  React.useEffect(()=>{
    setInterval(getTimeDiff, 1000);
  });
 //, [timeToDay.dd > -2]
  // const dateLimit = moment(p.dateLimit);
  // const [diffTime , setDiffTime] = React.useState(
  //   moment.duration( dateLimit.diff(new Date(), 'milliseconds') )
  // );
  // const handleTick = (event: React.SyntheticEvent) => {
  //   let msLeft = dateLimit.diff(new Date(), 'milliseconds');
  //   setDiffTime( moment.duration(msLeft) );
  // };
  // React.useEffect(()=>{
  //   setInterval(handleTick, 1000);
  // }, [diffTime.asMilliseconds() > -1]);

  return (
    <div className='timer border-gradient'>

      <div className="row">
        <span className='f-fill'>
          Goal date: &nbsp;
          <strong>{moment(p.dateLimit).format("YYYY/MM/DD")}</strong>
        </span>
        <Typography color="text.secondary" className="row">
          <FontAwesomeIcon icon={faClock} />
          <small>Time left:</small>
        </Typography>
      </div>

      {
        (timeToDay === undefined || timeToDay.dd < 0) ?
        <Typography variant="h3">
          Time over!
        </Typography>
        :
        <Stack direction="row" spacing={1} flexWrap="nowrap">
          <Paper elevation={2}>
            <Typography variant="h3" component="span">{ timeToDay.dd }</Typography>
            <Typography variant="body2" color="text.secondary">days</Typography>
          </Paper>
          <Paper elevation={2}>
            <Typography variant="h3" component="span">{ timeToDay.hh }</Typography>
            <Typography variant="body2" color="text.secondary">hours</Typography>
          </Paper>
          <Paper elevation={2}>
            <Typography variant="h3" component="span">{ timeToDay.mm }</Typography>
            <Typography variant="body2" color="text.secondary">mins.</Typography>
          </Paper>
          <Paper elevation={2}>
            <Typography variant="h3" component="span">{ timeToDay.ss }</Typography>
            <Typography variant="body2" color="text.secondary">secs.</Typography>
          </Paper>
        </Stack>
      }


    </div>
  )
}

export default Timer