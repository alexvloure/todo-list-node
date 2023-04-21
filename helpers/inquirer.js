import inquirer from 'inquirer';
await import('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
      {
        value: '1',
        name: `${'1.'.magenta} Create task`,
      },
      {
        value: '2',
        name: `${'2.'.magenta} List tasks`,
      },
      {
        value: '3',
        name: `${'3.'.magenta} List completed tasks`,
      },
      {
        value: '4',
        name: `${'4.'.magenta} List pending tasks`,
      },
      {
        value: '5',
        name: `${'5.'.magenta} Complete task(s)`,
      },
      {
        value: '6',
        name: `${'6.'.magenta} Delete task`,
      },
      {
        value: '0',
        name: `${'0.'.magenta} Exit`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('=========================='.magenta);
  console.log('    Select an option'.white);
  console.log('==========================\n'.magenta);

  const { option } = await inquirer.prompt(questions);
  return option;
};

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Press ${'ENTER'.magenta} to continue`,
    },
  ];
  console.log('\n');
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please, write a value';
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const inquirerDeleteMenu = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    const i = `${index + 1}.`.magenta;
    return {
      value: task.id,
      name: `${i} ${task.desc}`,
    };
  });
  choices.unshift({ value: '0', name: `${'0.'.magenta} Cancel` });
  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Which task do you want to delete?',
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};

const inquirerCompleteMenu = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    const i = `${index + 1}.`.magenta;
    return {
      value: task.id,
      name: `${i} ${task.desc}`,
      checked: task.completedAt,
    };
  });
  const questions = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selections',
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(questions);
  return ids;
};

const confirm = async (message = '') => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

export {
  inquirerMenu,
  pause,
  readInput,
  inquirerDeleteMenu,
  inquirerCompleteMenu,
  confirm,
};
