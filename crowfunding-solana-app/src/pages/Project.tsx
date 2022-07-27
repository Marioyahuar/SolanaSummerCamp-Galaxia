import React from 'react'
import { useParams } from 'react-router-dom';
import { ProjectFull } from '../models/Project';
import Slider from '../components/Slider';
import { Button, Chip, Grid, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faDiscord, faFacebook, faMedium } from '@fortawesome/free-brands-svg-icons';
import Progress from '../components/Progress';
import { faCheck, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import Timer from '../components/Timer';

// TAB PANEL CONTROL START
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}
// TAB PANEL CONTROL END


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
    images: undefined,
    // [
    //   {url:"images/project_img.png", alt:"img1"},
    //   {url:"images/project_img copy.png", alt:"img2"},
    //   {url:"logo512.png", alt:"img3"},
    // ]
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
      <Grid item lg={8}>
        <Slider images={project.images ?? [{
          url: process.env.PUBLIC_URL + "/images/project_img.png",
          alt:"project image"
        }] } />
      </Grid>

      <Grid item lg={3} md={8}>
        <Chip size="small" label={project.category}/>

        <Typography variant="h2">{project.name}</Typography>
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
        <Timer dateLimit={project.dateLimit}/>
        <br />

        <div className='row'>
          <Typography component="span" className="row f-fill">
            <FontAwesomeIcon icon={faUserGroup} />
            <strong>{project.qPatrons}</strong>
            patrons
          </Typography>
          <Button variant="contained" className='gradient'
            startIcon={<FontAwesomeIcon icon={faCheck} />}>
            Patron this project!
          </Button>
        </div>
      </Grid>
    </Grid>

    <Grid container spacing={2} component="section">
      <Grid item lg={5} md={8}>
        <Typography variant="caption">PROJECT DETAILS</Typography>

        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="categories">
          <Tab label="Overview" />
          <Tab label="Team" />
          <Tab label="Risks" />
          <Tab label="Terms" />
        </Tabs>

        <TabPanel value={selectedTab} index={0}>
          <Typography variant="h4">Reasons to Invest</Typography>
          <ul>
            {project.reasonsToInvest.map((r,i) =>
            <Typography key={i} component="li">{r}</Typography>
            )}
          </ul>
          <br/>
          <Typography variant="h4">Description</Typography>
          <Typography>{ project.description }</Typography>
        </TabPanel>

        <TabPanel value={selectedTab} index={1}>
          <Typography variant="h4">{project.team.name}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <img src={project.team.imgUrl} alt={project.team.name} />
            </Grid>
            <Grid item xs={8}>
              <Typography>{project.team.description}</Typography>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={selectedTab} index={2}>
          <Typography variant="h4">Risks</Typography>
          <Typography>{project.risks}</Typography>
        </TabPanel>

        <TabPanel value={selectedTab} index={3}>
          <Typography variant="h4">Terms and conditions</Typography>
          <Typography>{project.risks}</Typography>
        </TabPanel>

      </Grid>

      <Grid item lg={3} md={6} sm={8} component="aside">
        <Typography variant="caption">SUPPORT</Typography>
      </Grid>

    </Grid>
  </>
  )
}

export default Project