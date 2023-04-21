import { saveData, readData } from './helpers/dbInteractions.js';
import {
  inquirerMenu,
  pause,
  readInput,
  inquirerDeleteMenu,
  inquirerCompleteMenu,
  confirm,
} from './helpers/inquirer.js';
import { Tasks } from './models/tasks.js';

const main = async () => {
  let opt = '';
  const tasks = new Tasks();
  const dbTasks = readData();
  if (dbTasks) {
    tasks.loadTasksFromDB(dbTasks);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case '1':
        const desc = await readInput('Description: ');
        tasks.createTask(desc);
        break;
      case '2':
        tasks.getFormattedTasks();
        break;
      case '3':
        tasks.getFormattedTasksByStatus(true);
        break;
      case '4':
        tasks.getFormattedTasksByStatus(false);
        break;
      case '5':
        const ids = await inquirerCompleteMenu(tasks.getTasks());
        tasks.updateTasksStatus(ids);
        break;
      case '6':
        const id = await inquirerDeleteMenu(tasks.getTasks());
        if (id !== '0') {
          const responseOk = await confirm(
            'Are you sure you want to delete this task?'
          );
          if (responseOk) {
            tasks.deleteTask(id);
            console.log(`\nTask ${'deleted'.red}`);
          }
        }
        break;
    }
    saveData(tasks.getTasks());
    if (opt !== '0') await pause();
  } while (opt !== '0');
};

main();
