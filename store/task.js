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

  /**
   * single Task
   */
  setCurrentTask(task) {
    if (task && task.id) {
      taskService.addListener(task.id, (newtask) => {
        this.currentTask = newtask;
      });
    } else if (this.currentTask.id){
      taskService.removeListener(this.currentTask.id);
    }

    this.currentTask = task
  }

  updateTaskTime(newTime) {
    taskService.updateTime(this.currentTask.id, newTime)
      .then(() => {
        this.currentTask.time = newTime;
      });
  }

}

const store = new TaskList();

export default store;