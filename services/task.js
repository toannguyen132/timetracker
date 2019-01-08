import api from './service';
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

  fetchByProject(id) {
    return api.get(`/api/projects/${id}/tasks`)    
  },
  
  fetchAll() {

  },
  findOne(id) {

  },
  updateTime(id, time) {
    return new Promise((res, rej) => {
      taskRef.child(id).update({
        time
      }, error => {
        if (error) {
          rej("Cannot update task");
        } else {
          res();
        }
      })
    });
  },

  update(id, data) {
    taskRef.child(id).update(data);
  },

  addListener(id, cb) {
    taskRef.child(id).on('value', (snap) => {
      const data = snap.val();
      data.id = id;
      console.log('abc');
      console.log(cb);
      cb(data)
    })
  },

  removeListener(id) {
    console.log('remove listener');
    // remove all listener
    taskRef.child(id).off();
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