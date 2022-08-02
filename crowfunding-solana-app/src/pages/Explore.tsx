import { Pagination, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import ProjectCard from '../components/ProjectCard'
import { ProjectMin } from '../models/Project'


function Explore( p : { sponsoring: boolean } ) {

  let categories : string[] = [
    'Collections', 'P2E Games', 'Solutions'
  ]

  //Leer algo de una base de datos:
  
  /*constructor(props) {
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
  }*/
  

  let projects: ProjectMin[] = [
    {
      id: 1,
      name: "Projectname1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas.",
      images: undefined,
      solRaised: 123,
      solGoal: 200,
      dateLimit: new Date('2022-10-10'),
      qPatrons: 123,
    }
  ]

  const [proyectos, setProyectos] = React.useState([]);
  let test = true;
  React.useEffect(() => {
    async function getProjects() {
      const respuesta = await fetch(`http://localhost/obtenerProyectos.php`);
      const allProyectos = await respuesta.json();
      setProyectos(allProyectos)
      console.log(allProyectos)
      
    }
    getProjects();
}, [])

function changetest(){

  test = !test;
  console.log(test);
  console.log(proyectos)
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
    <button onClick={changetest}> TEST </button>
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