import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Link, Skeleton, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import ProjectCard from '../components/ProjectCard';
import { ProjectBD, ProjectMin } from '../models/Project';

interface TitleText {
  title: string,
  text: string
};

function Landing() {

  const [proyectos, setProyectos] = React.useState<ProjectMin[]>([]);
  
  React.useEffect(() => {
    async function getProjects() {
      const respuesta = await fetch(`http://localhost/obtenerUltimosProyectos.php?limite=${2}`);
      const allProyectos = await respuesta.json();
      //console.log(allProyectos)
      let newProjects: ProjectMin[] = allProyectos.map((p:ProjectBD)=>{ return {
        id: p.ID,
        name: p.ProjectName,
        description: "First Description",
        images: undefined,
        solRaised: 0, //Leer desde smart contract
        solGoal: p.SolGoal,
        dateLimit: p.DateLimit,
        qPatrons: 1, //Leer desde smart contract
      }});
      setProyectos(newProjects);
    }
    getProjects();
  }, []);

  const procSteps: TitleText[] = [
    {
      title: "Connect Wallet",
      text: "Choose a Solana wallet"
    },
    {
      title: "Explore projects",
      text: "Check the projects of your interest."
    },
    {
      title: "Patron a project",
      text: "Choose your reward and submit your payment."
    },
  ]

  const faqs: TitleText[] = [
    {
      title: "Question1?",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
    },
    {
      title: "Question2?",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
    },
    {
      title: "Question3?",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
    },
    {
      title: "Question4?",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
    },
  ];


  return (
  <>
    <section id="home" className='row cols-2'>
      <div className='column'>
        <div className='column c-short'>
          <img src="logo.svg" alt="logo"/>
          <div className='row'>
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faDiscord} />
          </div>
        </div>
        <div className='column c-short'>
          <Typography variant="h3" textTransform='uppercase'>
            Get to know GALAXIA
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet. Aut impedit nemo et quia perferendis eum atque sunt aut architecto magnam et quia incidunt et reiciendis galisum. Vel soluta ut aspernatur laboriosam ut minima ratione vel consequatur perferendis. Lorem ipsum dolor sit amet. Aut impedit nemo et quia perferendis eum atque sunt aut architecto magnam et quia incidunt et reiciendis galisum.
          </Typography>
        </div>
        <Typography variant="h6" align='center' fontWeight='bold'>
          Lorem ipsum dolor sit amet. Aut impedit nemo et quia perferendis eum atque sunt
        </Typography>
      </div>
      {/* <Skeleton variant="rectangular" width={480} height={360} /> */}
      <img src="/images/cover.png" alt="cover" />
    </section>


    <section className='column paper'>
      <Typography variant='h2' align='center' color='primary'>
        Investment process
      </Typography>
      <br />
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height='0px'>
        <defs>
          <linearGradient id="gradient" x2="0.35" y2="1">
            <stop offset="0%" stopColor="var(--middle)" />
            <stop offset="100%" stopColor="var(--secondary-main)" />
          </linearGradient>
        </defs>
      </svg>
      <Stepper className="step-gradient all-active">
        {procSteps.map((s,i)=>{ return (
        <Step key={i}>
          <StepLabel>{s.title}</StepLabel>
          <Typography paddingTop='0.5em'>{s.text}</Typography>
        </Step>
        ) })}
      </Stepper>
    </section>


    <section className='column'>
      <Typography variant='h2' align='center' color='secondary'>
        Closing soon
      </Typography>
      <div className='grid'>
        {proyectos.map((p,i )=><ProjectCard {...p} key={i} />)}
      </div>
      <Link href="/explore" fontWeight='bold' align='center'>
        Find more &nbsp;
        <FontAwesomeIcon icon={faAngleRight} />
      </Link>
    </section>


    <section id="faq" className='row cols-2'>
      <img src="images/question_closing.svg" alt="closing question sign" />
      <div className='column'>
        <Typography variant='h2' align='center' paddingBottom='1em'>
          FAQ
        </Typography>

        {faqs.map((q, i)=>{ return (
          <Accordion variant='outlined' key={i}>
            <AccordionSummary
              expandIcon={<FontAwesomeIcon icon={faAngleDown} />}
              aria-controls={"panel"+i+"-content"}
              id={"panel"+i+"-header"}
            >
              {q.title}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{q.text}</Typography>
            </AccordionDetails>
          </Accordion>
        )})}

      </div>
    </section>
  </>
  )
}

export default Landing