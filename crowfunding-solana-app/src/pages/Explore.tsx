import { Pagination, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import ProjectCard from '../components/ProjectCard'
import { ProjectMin } from '../models/Project'


function Explore( p : { sponsoring: boolean } ) {

  let categories : string[] = [
    'Collections', 'P2E Games', 'Solutions'
  ]

  let projects: ProjectMin[] = [
    {
      id: 1,
      name: "Projectname1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas.",
      imgUrl: undefined,
      imgAlt: undefined,
      solRaised: 123,
      solGoal: 200,
      dateLimit: new Date('2022-10-10'),
      qPatrons: 123,
    },
    {
      id: 2,
      name: "Projectname2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas.",
      imgUrl: undefined,
      imgAlt: undefined,
      solRaised: 321,
      solGoal: 400,
      dateLimit: new Date('2022-09-10'),
      qPatrons: 8,
    },
    {
      id: 3,
      name: "Projectname3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas.",
      imgUrl: undefined,
      imgAlt: undefined,
      solRaised: 123,
      solGoal: 200,
      dateLimit: new Date('2022-10-10'),
      qPatrons: 123,
    },
    {
      id: 4,
      name: "Projectname4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas.",
      imgUrl: undefined,
      imgAlt: undefined,
      solRaised: 321,
      solGoal: 400,
      dateLimit: new Date('2022-09-10'),
      qPatrons: 8,
    },
    {
      id: 5,
      name: "Projectname4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas.",
      imgUrl: undefined,
      imgAlt: undefined,
      solRaised: 123,
      solGoal: 200,
      dateLimit: new Date('2022-10-10'),
      qPatrons: 123,
      rewards: [
        { name: 'Reward1', complete: false },
        { name: 'Reward2', complete: true },
      ]
    },
    {
      id: 6,
      name: "Projectname5",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas.",
      imgUrl: undefined,
      imgAlt: undefined,
      solRaised: 321,
      solGoal: 400,
      dateLimit: new Date('2022-09-10'),
      qPatrons: 8,
      rewards: [
        { name: 'Reward1', complete: false },
        { name: 'Reward2', complete: true },
      ]
    },
  ]
  
  const [selectedCat, setSelectedCat] = React.useState(0);
  const [listedProjects, setListedProjects] = React.useState(projects);
  const handleCatChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedCat(newValue);
    setListedProjects(
      newValue === 0 ?
      projects : 
        //si se listan todos solo basta esto
        projects.filter(
          p =>  p.category === categories[newValue-1]
        )
    );
  };

  return (
  <section className='column'>

    <Tabs value={selectedCat} onChange={handleCatChange} aria-label="categories">
      <Tab label="All projects" key={0} />
      {categories.map((c,i)=>
      <Tab label={c} key={i+1} />
      )}
    </Tabs>

    <div className='grid'>
    {
      listedProjects.length === 0 ? 
      <Typography align='center' paddingY="8em">0 projects yet.</Typography>
      : listedProjects.map((p,i )=><ProjectCard {...p} key={i}/>)
    }
    </div>

    <br />
    <Pagination count={10} />
  </section>
  )
}

export default Explore