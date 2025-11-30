# Team #2 
## Group Members: Avni Israni, Devansh Sharma, Kevin Volkov

Tech Stack: React, NestJS, MySQL
# DEMO
## All Demos
Google Drive Link: https://drive.google.com/drive/folders/1YQDuTkvDccavkgMqA2UeAZAwxHxITO4-?usp=sharing
## Phase 2
YouTube Link: https://www.youtube.com/watch?v=e-CFJsqHejQ
## Phase 1
YouTube Link: https://youtu.be/iD_Y5PVsSac
# How To Run
### 1. Clone the repository
        git clone --branch KevinPhase3 --single-branch https://github.com/AvniIsrani1/react-440.git
        cd react-440

### 2. Update database credentials
#### Inside the file backend\src\bootstrap.ts, find the following code:
        const connection = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',//set to your actual MySQL username
            password: 'comp440',//set to your actual MySQL password
        });
#### Change the above credentials to your own.

### 3. Set Up Environment Variables
#### Inside of backend, create a .env file and put the following:
        
        DATABASE_URL="mysql://<USER>:<PASSWORD>@localhost:3306/react440_phase1"
        JWT_SECRET = "YOUR_SECRET_KEY"

#### Inside of frontend, create a .env file and put the following:

        REACT_APP_API_BASE=http://localhost:3000 

### 4. Start Frontend and Backend servers
#### Run the frontend and backend in two separate terminals. 
##### Backend
        cd backend
        npm install
	npx prisma migrate dev
        npm run start
##### Frontend
        cd frontend
        npm install
        npm start