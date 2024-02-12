import chalk from 'chalk'
import ora from 'ora';
import child_process from 'child_process';
import util from 'util'
import opener from 'opener';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const exec = util.promisify(child_process.exec)

const TASK_NAME_MAX_LENGTH = 3
class Task {
  static async forItem(task, item, taskFunc) {
    const paddedTask = chalk.green(task.padEnd(20, ' '))
    const spinner = ora({
      prefixText: chalk.green(` ${paddedTask}   ${chalk.cyan(item)}`),
      spinner: "arc",
      color: "green"
    }).start();

    try {
      await taskFunc()
      spinner.succeed()
    } catch (error) {
      spinner.fail();
      throw error
    }

  }

  static section(name) {
    const title = chalk.green(`${name} `);
    process.stdout.write(`${title} 
`)
  }

  static exit(code = 0) {
    process.exit(code);
  }
  static log(name = "") {
    process.stdout.write(`${chalk.green(name)}
`)
  }
}

const build = async () => {
  const createNetwork = async () => {
    try {
      await exec('docker network create seenit-network')
    } catch (error) {
    }
  }
  const createContainer = async (imageName, port) => {
    try {
      const handledPort = port ? `-p ${port}:${port}` : ''
      await exec(`docker run -d --network=seenit-network --name ${imageName}-container ${handledPort} ${imageName}`)
    } catch (error) {
      await deleteContainer()
    }
  }
  const deleteContainer = async (imageName) => {
    try {
      await exec(`docker rm $(docker stop $(docker ps -a -q --filter ancestor=${imageName} --format="{{.ID}}"))`)
    } catch (error) {

    }
  }

  const checkIfDockerRunning = async () => {
    try {
      await exec('docker ps')
      return true
    } catch (err) {
      return false
    }
  }

  Task.section(chalk.underline.yellow(`
Preparing Seenit test!
`))

  if (! await checkIfDockerRunning()) {
    Task.log(`${chalk.redBright('Docker is not running')}`)
    Task.exit(1)
  }


  await Task.forItem('creating network', 'docker network create', async () => {
    await createNetwork()
  });


  Task.section(`
Dependencies`)
  await Task.forItem('installing dependencies', 'npm i', async () => {
    await exec(`cd ${__dirname}/deploy/user && npm i`)
    await exec(`cd ${__dirname}/deploy/project && npm i`)
    await exec(`cd ${__dirname}/deploy/graphql && npm i`)
    await exec(`cd ${__dirname}/deploy/api-doc && npm i`)
    await exec(`cd ${__dirname}/deploy/frontend && npm i`)
  })

  Task.section(`
${chalk.green('Creating artfacts')}`)
  await Task.forItem('building user', 'tsc', async () => {
    await exec(`cd ${__dirname}/deploy/user && npm run build`)
  });
  await Task.forItem('building project', 'tsc', async () => {
    await exec(`cd ${__dirname}/deploy/project && npm run build`)
  });

  Task.section(`
Preparing docker image`)
  await Task.forItem('deploying gateway', 'docker build -t gateway', async () => {
    await exec(`docker build --no-cache -t gateway ${__dirname}/deploy/gateway/.`)
  });

  await Task.forItem('deploying user', 'docker build -t user', async () => {
    await exec(`docker build  -t user ${__dirname}/deploy/user/.`)
  });

  await Task.forItem('deploying project', 'docker build -t project', async () => {
    await exec(`docker build  -t project ${__dirname}/deploy/project/.`)
  });

  await Task.forItem('deploying graphql', 'docker build -t graphql', async () => {
    await exec(`docker build  -t graphql ${__dirname}/deploy/graphql/.`)
  });

  await Task.forItem('deploying swageer', 'docker build -t swageer', async () => {
    await exec(`docker build  -t swageer ${__dirname}/deploy/api-doc/.`)
  });

  await Task.forItem('deploying frontend', 'docker build -t frontend', async () => {
    await exec(`docker build --no-cache -t frontend ${__dirname}/deploy/frontend/.`)
  });

  Task.section(`
Running containers`)
  await Task.forItem('running user', 'docker run', async () => {
    await createContainer('user', '3000')
  });

  await Task.forItem('running project', 'docker run', async () => {
    await createContainer('project', '3001')
  });

  await Task.forItem('running gateway', 'docker run', async () => {
    await createContainer('gateway', '5050')
  });

  await Task.forItem('running graphql', 'docker run', async () => {
    await createContainer('graphql', '5051')
  });

  await Task.forItem('running swageer', 'docker run', async () => {
    await createContainer('swageer', '5052')
  });

  await Task.forItem('running frontend', 'docker run', async () => {
    await createContainer('frontend','5053')
  });

  Task.log(
    chalk.green(`
🥂  Successfully created`)
  );

  Task.log(
    `
${chalk.green('now you can open a simple Frontend')}   ${chalk.blue('http://127.0.0.1:5053')}
${chalk.green('now you can open API documentation on')}   ${chalk.blue('http://127.0.0.1:5052/api-docs')}
${chalk.green('now you can open GraphQL on')}   ${chalk.blue('http://127.0.0.1:5050/graphql')}

`

  );

  setTimeout(() => {
    opener('http://127.0.0.1:5052/api-docs')
    
  }, 500)
  setTimeout(() => {
    opener('http://127.0.0.1:5053')
    
  }, 1000)
  setTimeout(() => {
    opener('http://127.0.0.1:5050/graphql')
    
  }, 1500)
}

build()