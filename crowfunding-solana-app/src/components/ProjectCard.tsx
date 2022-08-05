import React from 'react'
import { ProjectMin } from '../models/Project'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardActionArea, CardContent, CardMedia, Chip, Divider, Stack, Typography } from '@mui/material'
import { faCheck, faClock, faEllipsis, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import Progress from './Progress'

function ProjectCard( p: ProjectMin ) {
  return (
    <Card className='project-card'>
      <CardActionArea href={'/project/'+p.id}>

        <CardMedia
          component="img"
          image={p.images ? p.images[0].url : process.env.PUBLIC_URL + "/images/project_" + (p.id%3+1) + ".png"}
          alt={p.images ? p.images[0].alt : "project image"}
        />
        {p.images ? <></> :
        <div className='acronym'>{p.name.split(" ").map(s=>s.charAt(0)).join('')}</div>}

        <CardContent className='column'>
          <div>
            <Typography gutterBottom variant="h3" component="h5" align='center'>
              {p.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {p.description}
            </Typography>
          </div>

          <Progress reached={p.solRaised} goal={p.solGoal} />

          <Stack
            direction="row"
            justifyContent="space-between"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}
          >
            <span className='row' key={1}>
              <FontAwesomeIcon icon={faClock} />
              <strong>
                { moment(p.dateLimit).diff(moment(), 'days') }
              </strong>
              <small>days left</small>
            </span>
            <span className='row' key={2}>
              <FontAwesomeIcon icon={faUserGroup} />
              <strong>{p.qPatrons}</strong>
              <small>patrons</small>
            </span>
          </Stack>

          { (p.userRewards !== undefined && p.userRewards.length > 0) ? 
            <Stack className='column c-short'>
              {p.userRewards.map((r,i)=>{return(
                <Typography className='row'>
                  <FontAwesomeIcon icon={r.complete ? faCheck : faEllipsis} />
                  <Typography className='f-fill' component='span'>{r.name}</Typography>
                  <Chip size="small"
                    label={r.complete?'DONE':'WAITING'}
                    color={r.complete?"success":"warning"} />
                </Typography>
              )})}
            </Stack>
          : <></>}
          
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProjectCard