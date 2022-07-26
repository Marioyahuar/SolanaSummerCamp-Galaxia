import React from 'react'
import { useParams } from 'react-router-dom';
import { ProjectFull } from '../models/Project';
import Slider from '../components/Slider';
import { Button, Chip, Grid, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faDiscord, faFacebook, faMedium } from '@fortawesome/free-brands-svg-icons';
import Progress from '../components/Progress';
import { faCheck, faUserGroup } from '@fortawesome/free-solid-svg-icons';

function Project() {
  //id del proyecto
  const {projectId} = useParams();

  let project : ProjectFull = {
    category: 'COLLECTION',
    id: 1,
    name: 'ProjectName',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas.',
    solRaised: 123,
    solGoal: 200,
    dateLimit: new Date('2022-10-25'),
    qPatrons: 80,
    images: [
      {url:"images/project_img.png", alt:"img1"},
      {url:"images/project_img copy.png", alt:"img2"},
      {url:"logo512.png", alt:"img3"},
    ],
    socialMedia: [
      { media: 'TWITTER', url: '#'},
      { media: 'DISCORD', url: '#'},
      { media: 'FACEBOOK', url: '#'},
      { media: 'MEDIUM', url: '#'},
    ],
    reasonsToInvest: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas.',
      'Quisque pharetra pellentesque sapien elementum ipsum euismod diam eget ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Rutrum lectus dictum risus enim egestas. Quisque pharetra pellentesque sapien elementum ipsum euismod diam eget ut.',
    ],
    descriptionFull: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas. Quisque pharetra pellentesque sapien elementum ipsum euismod diam eget ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas. Quisque pharetra pellentesque sapien elementum ipsum euismod diam eget ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas. Quisque pharetra pellentesque sapien elementum ipsum euismod diam eget ut.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas. Quisque pharetra pellentesque sapien elementum ipsum euismod diam eget ut',
    team: {
      name: 'Team Name',
      imgUrl: undefined,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas. Quisque pharetra pellentesque sapien elementum ipsum euismod diam eget ut'
    },
    risks: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas. Quisque pharetra pellentesque sapien elementum ipsum euismod diam eget ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas. Quisque pharetra pellentesque sapien elementum ipsum euismod diam eget ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas.',
    termsAndConditions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas. Quisque pharetra pellentesque sapien elementum ipsum euismod diam eget ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas. Quisque pharetra pellentesque sapien elementum ipsum euismod diam eget ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas. Quisque pharetra pellentesque sapien elementum ipsum euismod diam eget ut.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas. Quisque pharetra pellentesque sapien elementum ipsum euismod diam eget ut.',
    rewards: [
      {
        id: 0,
        minPrice: 150,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas.',
        perksIncluded: [
          'Lorem ipsum dolor sit amet.'
        ],
        estimatedDeliverDate: new Date('2022-11-25'),
        patronsQuantity: 45
      }
    ]
  };

  //TABS
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
  <>
    <Grid container spacing={2} component="section">
      <Grid item xs={8}>
        {
        project.images ?
          <Slider images={project.images} /> :
          <img src="images/project_img.png" alt="project image"/>
        }
      </Grid>

      <Grid item xs={4}>
        <Chip size="small" label={project.category}/>

        <Typography variant="h1">{project.name}</Typography>
        <Typography variant="body2" color="text.secondary">{project.description}</Typography>

        {
        project.socialMedia ?
        <Stack direction="row" spacing={1}>
          {
          project.socialMedia?.map((sm, i)=>
          <IconButton aria-label={sm.media} href={sm.url} target="_blank" key={i} color="inherit">
            {
            sm.media === 'TWITTER' ?
            <FontAwesomeIcon icon={faTwitter} />
            : sm.media === 'DISCORD' ?
            <FontAwesomeIcon icon={faDiscord} />
            : sm.media === 'FACEBOOK' ?
            <FontAwesomeIcon icon={faFacebook} />
            : sm.media === 'MEDIUM' ?
            <FontAwesomeIcon icon={faMedium} />
            : ''
            }
          </IconButton>
          )}
        </Stack>
        : ''
        }

        <br />
        <Progress reached={project.solRaised} goal={project.solGoal} />
        <br />

        <div className='row'>
          <span className='row' key={2}>
            <FontAwesomeIcon icon={faUserGroup} />
            <strong>{project.qPatrons}</strong>
            <small>patrons</small>
          </span>
          <Button variant="contained"
            startIcon={<FontAwesomeIcon icon={faCheck} />}>
            Patron this project!
          </Button>
        </div>
      </Grid>
    </Grid>

    <Grid container spacing={2} component="section">
      <Grid item xs={6}>
        <Typography variant="caption">PROJECT DETAILS</Typography>
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="categories">
          <Tab label="Overview" />
          <Tab label="Team" />
          <Tab label="Risks" />
          <Tab label="Terms" />
        </Tabs>

        <Typography variant="h4">Reasons to Invest</Typography>
        <ul>
          { project.reasonsToInvest.map((r,i) => <li key={i}>{r}</li>) }
        </ul>

        <Typography variant="h4">Description</Typography>
        { project.description }

        <Typography variant="h4">Team</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <img src={project.team.imgUrl} alt={project.team.name} />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5">{project.team.name}</Typography>
            <Typography>{project.team.description}</Typography>
          </Grid>
        </Grid>

        <Typography variant="h4">Risks</Typography>
        <Typography>{project.risks}</Typography>

        <Typography variant="h4">Terms and conditions</Typography>
        <Typography>{project.risks}</Typography>
      </Grid>


      <Grid item xs={4} component="aside">
        <Typography variant="caption">SUPPORT</Typography>
      </Grid>

    </Grid>
  </>
  )
}

export default Project