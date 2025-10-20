Group Members: Avni Israni, Devansh Sharma, Kevin Volkov

Tech Stack: React, NestJS, MySQL

# How To Run
### 1. Clone the repository
        cd react-440
### 2. Create a Database
        Inside of MySQL Workbench, create a database (DATABASE_NAME)
        CREATE DATABASE DATABASE_NAME;
### 3. Set Up Environment Variables
        Inside of backend, navigate to the .env file and put the following:
        DATABASE_URL="mysql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE_NAME>"
        JWT_SECRET = "YOUR_SECRET_KEY"
### 4. Start Frontend and Backend servers
        cd frontend
        npm install
        npm start

        cd backend
        npm install
        npm start
