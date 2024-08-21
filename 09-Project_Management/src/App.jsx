import { useState } from "react";

import NewProject from "./components/NewProject";
import ProjectsSidebar from "./components/ProjectSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects:[]
    });
  
    function handleStartAddProject() {
      setProjectsState(prevState => {
        return {
          ...prevState,
          selectedProjectId: null,
        }
    });
    }

    function handleCancelAddProject() {
      setProjectsState(prevState => {
        return {
          ...prevState,
          selectedProjectId: undefined,
        }
    });
    }

    function handleSelectProject(id) {
      setProjectsState(prevState => {
        return {
          ...prevState,
          selectedProjectId: id,
        }
    });
    }

    function handleAddProject(projectData) {
      
      setProjectsState(prevState => {

        const newProject = {
          ... projectData,
          id: Math.random ()
        }

        return {
          ...prevState,
          selectedProjectId: undefined,
          projects: [...prevState.projects, newProject]
        }
    });
    }
    

    function handleProjectDelete(){
      setProjectsState(prevState => {
        return {
          ...prevState,
          selectedProjectId: undefined,
          projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
        }
    });
    }
    console.log(projectsState);
    
    const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);
    let content=<SelectedProject project={selectedProject} onDelete={handleProjectDelete}/>;

    if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
    } else if (projectsState. selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
    }
    return (
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar onStartAddProject={handleStartAddProject} 
        projects={projectsState.projects} 
        onSelectProject={handleSelectProject}/> 
        {content}
      </main>
    );
}

export default App;
