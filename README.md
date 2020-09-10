# TrelloClone

## Requirements
To get started, you need NodeJs, npm and Docker installed.

Download the project from github and open the directory from terminal and navigate to the backend folder

```bash
git clone https://github.com/MelisseCabral/TrelloClone.git
```
```bash
cd TrelloClone/backend
```
Build the Docker container to run the backend server application 
```bash
sudo docker build -t trelloClone .
```
Start the container in the local enviroment
```bash
sudo docker run -p 3333:3333 -d trelloClone
```
See the list if the container is running
```bash
docker ps
```

Navigate to the frontend folder from terminal and download the dependencies :
```bash
cd ..
```
```bash
cd frontend
```
```bash
npm install
```
And start the application:
```bash
npm start
```
The application will be running in http://localhost:3000
