import { observable, computed } from 'mobx';
import projectService from '../services/project';

class ProjectList {
  @observable projects = [];
  @observable currentProject = null;

  fetchProjects() {
    projectService.fetch()
      .then((projects) => {
        console.log(projects);
        this.projects = Object.values(projects);
        return projects
      })
  }

  setCurrentProject(id) {
    const project = this.projects.find((project) => id === project.id);
    if (!project) throw new Error("Project not found!");

    this.currentProject = project;
  }

  fetchProject(projectId) {

  }

  addProject(project) {

  }

  addCategory(projectId, category) {

  }

}

const store = new ProjectList();

export default store;