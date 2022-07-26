import React from 'react'
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from '../assets/css/theme';
import { IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Slider( p:{images:{url:string,alt:string}[]} ) {

  const [currImg, setCurrImg] = React.useState(0);
  const handleChange = (event: React.MouseEvent<HTMLElement>, newCurrImg: number) => {
    setCurrImg(newCurrImg);
  };


  return (
    <>
  {/* <ThemeProvider theme={darkTheme}> */}
    <div className='slider dark-mode'>
      <div className='imgs'>
        {p.images.map((img, i)=>
        <img src={img.url} alt={img.alt} key={i}/>
        )}
      </div>
      <IconButton aria-label="previous">
        <FontAwesomeIcon icon={faCircleChevronLeft} />
      </IconButton>
      <IconButton aria-label="next">
        <FontAwesomeIcon icon={faCircleChevronRight} />
      </IconButton>
      
      <ToggleButtonGroup
        size="small"
        value={currImg}
        exclusive
        onChange={handleChange}
      >
        {p.images.map((img, i)=>{ return (
        <ToggleButton value={i} key={i}>
        </ToggleButton>
        )})}
      </ToggleButtonGroup>
    </div>
  {/* </ThemeProvider> */}
  </>
  )
}

export default Slider