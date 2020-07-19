# UNOG Carte de Legitimation

## Local Setup
- Install [Python 3](https://www.python.org/) for your OS.

- Install [Docker](https://docs.docker.com/engine/installation/) for your OS. 

- Checkout this repo. Please notice that, if your OS is Windows, then you need to have at least version 10 (otherwise Docker can raise some exceptions); moreover ,before doing the checkout, please be sure to run the following git command:
  ```
  git config --global core.autocrlf input
  ```
  This command avoids the EOL (End Of Line) replacement. The latter is due to git which automatically reformat the file based on the current OS. As a conseguence, Linux-style EOL are replaced with Windows-style EOL.

- Create a `.env` inside the `backend` folder and ask your team for its content

- Enter the Terminal or the Command Prompt at root level of the project

- Run `docker-compose up` to first build and then run the project (it tooks several minutes the first time you run the command).

- Run `fab reset_db` to populate the DB with fake data.

- Go to [http://127.0.0.1:3000/](http://127.0.0.1:3000/) to see the React app running.

- Go to [http://127.0.0.1:8000/api/admin/](http://127.0.0.1:8000/api/admin/) to see the Django Admin site, and login using the credentials admin@unicc.org/Passw0rd!.

## Fabric commands
For convenience some [Fabric3](http://www.fabfile.org/) commands are included. You can install it via `pip3 install Fabric3`. An example of such commands is to ssh into the frontend container:

```text
docker-compose up
fab ssh:frontend
```

For the most up-to-date reference just check `fabfile.py` in the repository root.

## Serve React application locally
To serve locally the React application, you need to first run the project and then execute the serve command through Fabric, i.e.,

```text
docker-compose up
fab serve
```

## Utils
There is a utils repository in which we store some useful files that needs to be versioned in a single branch environment (i.e., in the master branch). In this repo we can find:

### Mockups
A folder for sharing the mockups of the application (created by using `Adobe XD`)

### Postman
A folder in which we can find:
- `Microsoft Graph.postman_collection.json`: a collection for developers of the project. It contains calls related to the Microsoft Graph API
- `Microsoft Graph.postman_environment.json`: an environment for developers of the project. It contains the variables needed to perform the call within the collection above

### UML
A folder containing the diagrams (e.g., workflows, mind maps, DB relationships, etc) that have been developed in the application

### Documents
A folder for sharing files other than the above mentioned ones (e.g., you can find here the project requirements document).

