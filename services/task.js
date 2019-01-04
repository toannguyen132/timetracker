import { taskRef } from './service';
import projectService from './project';
import faker from 'faker';

const services = {
  async _process(tasks) {
    const projects = await Promise.all(tasks.map(task => {
      return projectService.findOne(task.projectId);
    }))
  
    return tasks.map((task, index) => {
      task.project = projects[index];
      return task;
    });
  },
  async fetchByProject(id) {
    const tasks = await new Promise((res, rej) => {
      try {
        taskRef.on('value', (snap) => {
          const data = snap.val()
          const tasks = Object.keys(data).map(key => {
            return {
              id: key,
              ...data[key]
            }
          });
          res(tasks);
        });
      } catch (e) {
        rej(e.message);
      }
    });

    const filteredTasks = tasks.filter(task => task.projectId == id);

    const results = await this._process(filteredTasks);

    return results;
  },
  fetchAll() {

  },
  findOne(id) {

  },
  seed() {
    const projects = ['-LVKbssiCoblBWvjaTQC', '-LVKbssm2fIFg-Qr5ksx', '-LVKbssm2fIFg-Qr5ksy'];
    const categories = ["Progamming", "Design", "PM"];
    projects.forEach((id) => {
      for (let i = 0; i < 5; i++) {
        taskRef.push().set({
          name: faker.commerce.product(),
          time: faker.random.number({ 'min': 3600, 'max': 7200 }),
          date: faker.date.between('2018-10-30', '2018-12-31').toISOString(),
          projectId: id,
          category: categories[faker.random.number({ 'min': 0, 'max': 2 })]
        });
      }
    });
  }
}

export default services;