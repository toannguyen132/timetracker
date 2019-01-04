import { observable, computed } from 'mobx';
import projectService from '../services/project';

class ProjectList {
  @observable projects = [];
  @observable currentProject = null;

  async fetchProjects() {
    const projects = await projectService.fetch();
    this.projects = Object.values(projects);
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