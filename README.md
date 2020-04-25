
## Install [Python 3](https://www.python.org/) for your OS.

## Install [Docker](https://docs.docker.com/engine/installation/) for your OS. 

## Checkout this repo. Please notice that, if your OS is Windows, then you need to have at least version 10 (otherwise Docker can raise some exceptions); moreover ,before doing the checkout, please be sure to run the following git command:
  ```
  git config --global core.autocrlf input
  ```
  This command avoids the EOL (End Of Line) replacement. The latter is due to git which automatically reformat the file based on the current OS. As a conseguence, Linux-style EOL are replaced with Windows-style EOL.

## Enter the Terminal or the Command Prompt at root level of the project

### Create .env files on root directory 

ENV=dev
POSTGRES_DB=<dbname>
POSTGRES_USER=<db_user>
POSTGRES_PASSWORD=<db_user>
POSTGRES_HOST=<host>
POSTGRES_SSL_MODE=off
NODE_ENV=dev
  
  
### Create .env files inside the djnago-backend directory 

ENV=dev
POSTGRES_DB=<dbname>
POSTGRES_USER=<db_user>
POSTGRES_PASSWORD=<db_user>
POSTGRES_HOST=<host>
POSTGRES_SSL_MODE=off
NODE_ENV=dev  

## Run `docker-compose up` to first build and then run the project (it tooks several minutes the first time you run the command).

## Go to [http://127.0.0.1:3001/](http://127.0.0.1:3001/) to see the React app running.


## Go to [http://127.0.0.1:3001/](http://127.0.0.1:8081/) to see the Django app running.


