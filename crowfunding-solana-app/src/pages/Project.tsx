import React from 'react'
import { useParams } from 'react-router-dom';
import { ProjectFull } from '../models/Project';
import Slider from '../components/Slider';
import { Button, Chip, Grid, IconButton, Link, Stack, Tab, Tabs, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faDiscord, faFacebook, faMedium } from '@fortawesome/free-brands-svg-icons';
import Progress from '../components/Progress';
import { faCheck, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import Timer from '../components/Timer';
import RewardCard from '../components/RewardCard';

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
  const {id} = useParams();
  //console.log("Project ID: " + id)
  
  const [proyecto, setProyecto] = React.useState({
    ID: 0,
    Category: '',
    ProjectName: '',
    Description: '',
    Images:'',
    SolGoal: 0,
    DateLimit: new Date(),
    Twitter: '',
    Discord: '',
    Facebook:'',
    Medium:'',
    ReasonsToInvest:'',
    LongDescription: '',
    Team:'',
    Risks:'',
    Terms:'',
    Rewards:''
  });
  
  React.useEffect(() => {
    async function getProject() {
      const respuesta = await fetch(`http://localhost/obtenerProyectoPorID.php?id=${id}`);
      const getProyecto = await respuesta.json();
      setProyecto(getProyecto)
    }
    getProject();
  }, [id])

  React.useEffect(() =>{  
      changeListedProject() 
  },[proyecto])

  function changeListedProject(){
    let newProject: ProjectFull = {
      id: proyecto.ID,
      category: proyecto.Category,
      name: proyecto.ProjectName,
      description: proyecto.Description,
      images: undefined, //Obtenerarreglo de imágenes y dividirlo
      solRaised: 0, //Leer desde smart contract
      solGoal: proyecto.SolGoal,
      dateLimit: proyecto.DateLimit,
      qPatrons: 1, //Leer desde smart contract
      socialMedia:[
        { media: 'TWITTER', url: proyecto.Twitter},
        { media: 'DISCORD', url: proyecto.Discord},
        { media: 'FACEBOOK', url: proyecto.Facebook},
        { media: 'MEDIUM', url: proyecto.Medium},
      ], //obtenerarreglo de urls y dividirlo
      reasonsToInvest: proyecto.ReasonsToInvest.split(","), //obtener arreglo de strings y dividirlo
      descriptionFull: proyecto.LongDescription, 
      team: proyecto.Team? JSON.parse(proyecto.Team) : {},
      risks: proyecto.Risks,
      termsAndConditions: proyecto.Terms,
      rewards: proyecto.Rewards? JSON.parse(proyecto.Rewards) : []
    }
    //console.log(newProject.dateLimit)
    setListedProject(newProject)
    //console.log((proyecto.Rewards))
  }

  let initializeProject : ProjectFull = {
    category: 'COLLECTION',
    id: 1,
    name: 'ProjectName',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas.',
    solRaised: 123,
    solGoal: 200,
    dateLimit: undefined,
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
        name: 'Reward1',
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

  const [project, setListedProject] = React.useState(initializeProject);

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
          url: process.env.PUBLIC_URL + "/images/project_"+ (project.id%3 + 1) +".png",
          alt:"project image"
        }] } />
      </Grid>

      <Grid item lg={3} md={8} className="column">

        <div className='column c-short'>
          <Link href={'/explore?category='+project.category} underline="none">
            <Chip size="small" label={project.category}/>
          </Link>
          <Typography variant="h2">{project.name}</Typography>
          <Typography variant="body2" color="text.secondary">{project.description}</Typography>
          {
          project.socialMedia ?
          <Stack direction="row" spacing={0}>
            {
            project.socialMedia?.map((sm, i)=> sm.url? 
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
            :"")}
          </Stack>
          : ''
          }
        </div>

        <Progress reached={project.solRaised} goal={project.solGoal} />

        <Timer dateLimit={project.dateLimit}/>

        <div className='row'>
          <Typography component="span" className="row f-fill">
            <FontAwesomeIcon icon={faUserGroup} />
            <strong>{project.qPatrons}</strong>
            patrons
          </Typography>
          <Button variant="contained" className='gradient' href='#support'
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
          <Typography>{project.termsAndConditions}</Typography>
        </TabPanel>

      </Grid>

      <Grid item lg={3} md={6} sm={8} id="support" component="aside" className='column'>
        <Typography variant="caption">SUPPORT</Typography>
        <RewardCard projectId={parseInt(id??'') ?? 0} key={0}/>
        { project.rewards?.map((r, i)=>
        <RewardCard projectId={parseInt(id??'') ?? 0} reward={r} key={i+1} />
        ) }
      </Grid>

    </Grid>
  </>
  )
}

export default Project