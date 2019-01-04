import { projectRef } from './service';

const services = {
  fetch() {
    return new Promise((res, rej) => {
      try {
        projectRef.on('value', (snap) => {
          res(snap.val());
        });
      } catch (e) {
        rej(e.message);
      }
    });
  },
  async findOne(id) {
    const project = new Promise((res, rej) => {
      try{
        projectRef.child(id).on('value', (snap) => {
          res(snap.val());
        });
      } catch (e) {
        rej(e.message);
      }
    });

    return project;
  },
  seed() {
    const names = ["Panda", "Dictionary", "Gigantic"];
    const categories = ["Progamming", "Design", "PM"];
    names.forEach(name => {
      const record = projectRef.push();
      const data = {
        id: record.key,
        name: name,
        categories: categories
      }
      record.set(data);
    });
  }
}

export default services;