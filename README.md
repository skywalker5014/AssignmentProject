## Instructions to run the project on local machine 
**for backend** 
- create .env and add "SERVER_PORT" and "MONGODB_URL" attributes and assign them the appropriate connection information (for server port preferably 5050 or change in frontend aswell)
- install all the dependencies required using "npm install"
- to run in dev mode, run "npm run dev" (make sure your mongodb instance is also running)
- to run in production mode, run "npm run build" and after the build process, run "npm run start"

**for frontend**
- install all the dependencies by running "npm install"
- build the project using "npm run build"
- either run it using nginx or use the vite server by running "npm run preview"
- run in development server mode by "running npm run dev"
