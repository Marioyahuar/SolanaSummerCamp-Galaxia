import React from 'react'
import { useParams } from 'react-router-dom';

function Project() {
  const {project} = useParams();
  console.log(project);

  return (
    <>
    <section id="summary" className='row cols-2'>


      <div className='slider'>
        <div className='imgs'>
          <img src="images/project_img.png" alt="img1" />
          <img src="images/project_img copy.png" alt="img2" />
          <img src="logo512.png" alt="img2" />
        </div>
      </div>

    </section>
    </>
  )
}

export default Project