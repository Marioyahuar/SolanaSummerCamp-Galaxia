import { Pagination, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import ProjectCard from '../components/ProjectCard'
import { ProjectMin } from '../models/Project'


function Explore( p : { sponsoring: boolean } ) {

  let categories : string[] = [
    'Collections', 'P2E Games', 'Solutions'
  ]

  let projects: ProjectMin[] = []

  const [proyectos, setProyectos] = React.useState([{
    id: 0,
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
        id: proyectos[i].id,
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
    console.log("Changing listed projects")
  }

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

/*
import React from 'react';
//import Constantes from "./Constantes";
//import { ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import FilaDeTablaDeVideojuego from './FilaDeTablaDeVideojuego';
class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            proyectos: [],
        };
    }
    async componentDidMount() {
        const respuesta = await fetch(`http://localhost/obtenerProyectos.php`);
        const proyectos = await respuesta.json();
        console.log(proyectos)
        this.setState({
            proyectos: proyectos,
        });
    }
    render() {
        return (
            <div>
                <div className="column">
                    <h1 className="is-size-3">Ver videojuegos</h1>
                    
                </div>
                <div className="table-container">
                    <table className="table is-fullwidth is-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Calificación</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.proyectos.map(proyecto => {
                                return <FilaDeTablaDeVideojuego key={proyecto.id} proyectos={proyecto}></FilaDeTablaDeVideojuego>;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Explore;*/