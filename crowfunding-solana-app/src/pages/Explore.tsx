import { Pagination, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import ProjectCard from '../components/ProjectCard'
import { ProjectBD, ProjectMin } from '../models/Project'
import { useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletReadyState } from '@solana/wallet-adapter-base';

function Explore( p : { sponsoring: boolean } ) {

  //const { publicKey, wallet, connect, connecting, connected, disconnect, disconnecting } = useWallet(); //Leer publicKey en cualquier instancia
  //sponsoring? exploreSponsored : exploreNormal
  const { publicKey, sendTransaction } = useWallet()
  const [proyectos, setProyectos] = React.useState<ProjectMin[]>([]);
  const [filteredProjects, setFilteredProjects] = React.useState(proyectos);
  const [projectIds, setProjectIds] = React.useState<number[]>([]);

  async function getProjects(url:string) {
    const respuesta = await fetch(url);
    const allProyectos = await respuesta.json();
    let newProjects = allProyectos.map( (p:ProjectBD) => { return {
      id: p.ID,
      category: p.Category,
      name: p.ProjectName,
      description: "First Description",
      images: undefined,
      solRaised: 0, //Leer desde smart contract
      solGoal: p.SolGoal,
      dateLimit: p.DateLimit,
      qPatrons: 1, //Leer desde smart contract
    }});
    setProyectos(newProjects);
    setFilteredProjects(newProjects);
  }

  async function getProjectIds(url:string){
    const respuesta = await fetch(url)
    const allids = await respuesta.json()
    setProjectIds(allids.map((i:{ProjectId:number}) => i.ProjectId))
    //console.log(projectIds)
  }
  //${publicKey.toString()}

  React.useEffect(() => {
    //console.log(`hola${publicKey?.toString()}`)
    getProjects(`http://localhost/obtenerProyectos.php`)

    if(publicKey !== null){
      let user = publicKey.toString()
      if (p.sponsoring) {
        getProjectIds(`http://localhost/obtenerProyectosPatrocinados.php?user='${user}'`).then( ()=>{
          console.log(projectIds,proyectos,filteredProjects)
          let newProjects: ProjectMin[] = proyectos.filter( p => {return projectIds.includes(p.id)} );
          setProyectos(newProjects);
          setFilteredProjects(newProjects);
        })
      }
      //obtenerProyectosPatrocinados.php?user=
    }   
  }, [publicKey, p.sponsoring])

  const [selectedCat, setSelectedCat] = React.useState(0);
  let categories : string[] = [
    'Collections', 'P2E Games', 'Solutions'
  ]
  const handleCatChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedCat(newValue);
    setFilteredProjects(
      newValue === 0 ?
      proyectos : 
      //si se listan todos solo basta esto
      proyectos.filter(
        p => { console.log("nuevo valor: " + p.category,newValue,categories[newValue-1]);
          return p.category === categories[newValue-1]
        })
    );
  };

  //Leer public key en cualquier instancia
  /*
  React.useEffect(() => {
    console.log(publicKey?.toString())
  }, [publicKey])*/

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