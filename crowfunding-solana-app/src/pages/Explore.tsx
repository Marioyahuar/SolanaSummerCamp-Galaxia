import { Pagination, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import ProjectCard from '../components/ProjectCard'
import { ProjectMin } from '../models/Project'


function Explore( p : { sponsoring: boolean } ) {

  //sponsoring? exploreSponsored : exploreNormal
  let categories : string[] = [
    'Collections', 'P2E Games', 'Solutions'
  ]

  let projects: ProjectMin[] = []

  const [proyectos, setProyectos] = React.useState([{
    ID: 0,
    Category: '',
    ProjectName: '',
    SolGoal: 0,
    DateLimit: new Date(),
  }]);
  
  React.useEffect(() => {
    async function getProjects() {
      const respuesta = await fetch(`http://localhost/obtenerProyectos.php`);
      const allProyectos = await respuesta.json();
      setProyectos(allProyectos)
    }
    getProjects();
  }, [])

  React.useEffect(() =>{  
      changeListedProjects() 
  },[proyectos])

  function changeListedProjects(){
    
    let newProjects: ProjectMin[] = []
    for(let i = 0; i < proyectos.length; i++){
      newProjects.push({
        id: proyectos[i].ID,
        category: proyectos[i].Category,
        name: proyectos[i].ProjectName,
        description: "First Description",
        images: undefined,
        solRaised: 0, //Leer desde smart contract
        solGoal: proyectos[i].SolGoal,
        dateLimit: proyectos[i].DateLimit,
        qPatrons: 1, //Leer desde smart contract
        }) 
    }
    
    setListedProjects(newProjects)
    setFilteredProjects(newProjects)
    //console.log(listedProjects[0])
  }

  const [selectedCat, setSelectedCat] = React.useState(0);
  const [listedProjects, setListedProjects] = React.useState(projects);
  const[filteredProjects, setFilteredProjects] = React.useState(projects);
  const handleCatChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedCat(newValue);
    //changeListedProjects();
    //console.log(listedProjects)
    setFilteredProjects(
      newValue === 0 ?
      listedProjects : 
      //si se listan todos solo basta esto
      listedProjects.filter(
        p => { console.log("nuevo valor: " + p.category,newValue,categories[newValue-1]);
          return p.category === categories[newValue-1]
        })
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
      filteredProjects.length === 0 ? 
      <Typography align='center' paddingY="8em">0 projects yet.</Typography>
      : filteredProjects.map((p,i )=><ProjectCard {...p} key={i}/>)
    }
    </div>

    <br />
    {/* <Pagination count={10} /> */}
  </section>
  )
}

export default Explore