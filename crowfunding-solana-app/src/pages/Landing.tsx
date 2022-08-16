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
      title: "Connect Phantom Wallet",
      text: "Choose a Solana wallet"
    },
    {
      title: "Explore Projects",
      text: "Check the projects of your interest and find your favourite."
    },
    {
      title: "Patron a Project",
      text: "Choose your reward, submit your payment and patronize it!"
    },
    {
      title: "Find your Sponsorships",
      text: "You'll be able to check your sponsored projects on the 'sponsored' tab."
    },
  ]

  const faqs: TitleText[] = [
    {
      title: "Who uses Galaxia?",
      text: "Galaxia is the perfect platform for any person who want to know and sponsor innovative Solana projects."
    },
    {
      title: "What is crowdfunding?",
      text: "Is a kind of crowd financing with the purpose of obtain money or other resources for a project."
    },
    {
      title: "How can I be part?",
      text: "You can join the Galaxia community by giving donations to a project as investor. You only need a Solana Phantom wallet."
    },
    {
      title: "How can I start a campaign?",
      text: "You can contact us to be a enterpeneur at contact@galaxia.com."
    },
    {
      title: "How much is the commission?",
      text: "The commission per campaign is 5% of the amount raised. It's discounted when the campaing ends and before sending the ammount raised to the entrepreneur."
    },
    {
      title: "Which currency uses?",
      text: "The donations currency is SOL to patron projects on Galaxia."
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
          FIND IT FIRST ON GALAXIA
          </Typography>
          <Typography>
          Galaxia is a crowdfunding platform for <strong>Solana</strong> projects. Find games, NFT collections, metaverses and more.
          </Typography>
          <Typography>
          Galaxia will support innovative projects, avoiding the pressure of the current funding options' opening sells (IDO's and ICO's).
          </Typography>
        </div>
        <Typography variant="h6" align='center' fontWeight='bold'>
          Become an early investor, be part of awesome projects and obtain rewards!
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
      <br/>
      <Typography align='center'>
        With Galaxia you'll have the chance to support the next top projects of Solana network.
        <br/>
        Search projects, know their history, follow their development and lend your support to make it successful.
      </Typography>
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