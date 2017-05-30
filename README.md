## AWS POLICY SIMULATOR
### Overview

The following instructions assumes that the repo is cloned, node and git are installed.

### Dependencies
Install dependencies within the policy_advisor_node/ folder via the following command:
` npm install `

### Setting up local development environment:
` cd policy_advisor_node/`

#### Client: 
Below command will transpile all the client React files in client/ directory to the dist/ directory. All the client JS files will be bundled in the bundle.js file within dist/. Moreover, any changes in the client files will be reflected to the bundle.js (hot reloading).

` npm run devClient `

#### Server: 
The following command will start the server from the localhost:3000
` npm start `

### Accessing the API endpoints:
Please refer to the tests/routes-spec.js test file to see the interface of the API endpoints.
1. /api/all 
2. /api/group
3. /api/policy
4. /api/role

### Setting up the production environment environment: 
` cd policy_advisor_node/`
` npm install `
` npm run buildClient `
` npm run buildServer `

### Git workflow: 
To pull all the changes in the master branch:
` git pull --rebase origin master `

Pushing code to github master branch (not recommended):
` git push origin master ` 

Pushing code to github branch: 
` git branch ASPA-XX `
` git push origin ASPA-XX ` 

Pulling code and running it within the remote server:
1. Clone the repo to the remote server. 

2. To get the latest changes in the git, cd to the clouddezk/ and 
` git pull --rebase origin master `

3. Run the app in production (follow the instructions about production above -assuming the remote has node and git installed).













