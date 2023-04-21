import { Task } from './task.js';

/**
 * _list:
 *    { 'uuid-123712-123123-2: { id:12, desc:asd, completedAt:10-12-2022'},
 */
class Tasks {
  _list = {};

  constructor() {
    this._list = {};
  }

  createTask(desc = '') {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  deleteTask(id = '') {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  updateTasksStatus(ids = []) {
    this.getTasks().forEach((task) => {
      if (!ids.includes(task.id)) {
        task.completedAt = null;
      } else if (!task.completedAt) {
        task.completedAt = new Date().toISOString();
      }
    });
  }

  loadTasksFromDB(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  getTasks() {
    return [...Object.values(this._list)];
  }

  getFormattedTasks() {
    console.log();
    const tasksArr = this.getTasks();
    tasksArr.forEach((task, index) => {
      const i = `${index + 1}`.magenta;
      const { desc, completedAt } = task;
      const status = completedAt ? 'Completed'.green : 'Pending'.red;
      console.log(`${i} ${desc} :: ${status}`);
    });
  }

  getFormattedTasksByStatus(completed = true) {
    console.log();
    const tasksArr = this.getTasks();
    let index = 0;
    tasksArr.forEach((task) => {
      const { desc, completedAt } = task;
      const status = completedAt ? 'Completed'.green : 'Pending'.red;
      if (completed && completedAt) {
        index += 1;
        const i = `${index}.`.magenta;
        console.log(`${i} ${desc} :: ${completedAt}`);
      } else if (!completed && !completedAt) {
        index += 1;
        const i = `${index}.`.magenta;
        console.log(`${i} ${desc} :: ${status}`);
      }
    });
  }
}

export { Tasks };
