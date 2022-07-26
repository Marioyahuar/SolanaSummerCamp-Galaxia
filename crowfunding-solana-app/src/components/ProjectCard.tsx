import React from 'react'
import { ProjectMin } from '../models/Project'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardActionArea, CardContent, CardMedia, Chip, Typography } from '@mui/material'
import { faCheck, faClock, faEllipsis, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import Progress from './Progress'

function ProjectCard( p: ProjectMin ) {
  return (
    <Card className='project-card'>
      <CardActionArea href={'/project/'+p.id}>
        <CardMedia
          component="img"
          image={p.imgUrl ?? "images/project_img.png"}
          alt={p.imgAlt ?? "project image"}
        >
          {/* {p.imgUrl ? '' : p.name.split(" ").map(s=>s[0]).join('') } */}
        </CardMedia>
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
          <Typography className="row">
            <span className='row'>
              <FontAwesomeIcon icon={faClock} />
              <strong>
                { moment(p.dateLimit).diff(moment(), 'days') }
              </strong>
              days left.
            </span>
            |
            <span className='row'>
              <FontAwesomeIcon icon={faUserGroup} />
              <strong>{p.qPatrons}</strong>
              Patrons
            </span>
          </Typography>
          { (p.rewards !== undefined && p.rewards.length > 0) ? 
            <ul className='column c-short'>
              {p.rewards.map((r,i)=>{return(
                <li className='row'>
                  <FontAwesomeIcon icon={r.complete ? faCheck : faEllipsis} />
                  <Typography className='f-fill' component='span'>{r.name}</Typography>
                  <Chip size="small"
                    label={r.complete?'DONE':'WAITING'}
                    color={r.complete?"success":"warning"} />
                </li>
              )})}
            </ul>
          : <></>}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProjectCard