import { observable, computed } from 'mobx';
import taskService from '../services/task';

const mockTasks = [
  {
    id: 1,
    name: "Landing page design",
    time: 80,
    project: {
      id: 1,
      name: "Project B"
    },
    category: {
      id: 2,
      name: "Design"
    }
  },
  {
    id: 2,
    name: "Layout Frontend",
    time: 281,
    project: {
      id: 1,
      name: "project B"
    },
    category: {
      id: 3,
      name: "Programming"
    }
  }
]

class TaskList {
  @observable tasks = [];
  @observable currentTask = null;

  fetchTasks(id = null) {
    if ( id ) {
      taskService.fetchByProject(id).then(tasks => {
        this.tasks = tasks
      })
    } else {
      taskService.fetchAll();
    }
  }

  setCurrentTask(task) {
    this.currentTask = task
  }

}

const store = new TaskList();

export default store;