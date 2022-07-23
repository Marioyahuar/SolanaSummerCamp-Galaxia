import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Skeleton, Step, StepLabel, Stepper, Typography } from '@mui/material';

function Landing() {
  return (
  <>
    <section id="home" className='row cols-2'>
      <div>
        <img src="logo.svg" alt="logo" />
        <div className='row'>
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faTwitter} />
        <FontAwesomeIcon icon={faDiscord} />
        </div>
        <br/><br/>
        <Typography variant="h3" textTransform='uppercase'>
          Get to know GALAXIA
        </Typography>
        <p>
        Lorem ipsum dolor sit amet. Aut impedit nemo et quia perferendis eum atque sunt aut architecto magnam et quia incidunt et reiciendis galisum. Vel soluta ut aspernatur laboriosam ut minima ratione vel consequatur perferendis. Lorem ipsum dolor sit amet. Aut impedit nemo et quia perferendis eum atque sunt aut architecto magnam et quia incidunt et reiciendis galisum.
        </p>
        <Typography variant="h6" align='center' fontWeight='bold'>
          Lorem ipsum dolor sit amet. Aut impedit nemo et quia perferendis eum atque sunt
        </Typography>
      </div>
      <Skeleton variant="rectangular" width={480} height={360} />
    </section>


    <section className='paper'>
      <Typography variant='h2' align='center' color='var(--primary-dark)'>
        Investment process
      </Typography>
      <br /><br />
      <Stepper alternativeLabel  className="step-gradient">
        <Step completed={true} >
          <StepLabel>Connect Wallet</StepLabel>
          <p>Choose a Solana wallet</p>
        </Step>
        <Step completed={true}>
          <StepLabel>Explore projects</StepLabel>
          <p>Check the projects of your interest.</p>
        </Step>
        <Step completed={true}>
          <StepLabel>Patron a project</StepLabel>
          <p>Choose your reward and submit your payment.</p>
        </Step>
      </Stepper>
    </section>


    <section className='paper'>
      <Typography variant='h2' align='center' color='var(--primary-dark)'>
        Closing soon
      </Typography>

    </section>
  </>
  )
}

export default Landing