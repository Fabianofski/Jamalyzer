# Jamalyzer

Jamalyzer is a web-based tool for analyzing and evaluating game jams on itch.io. It provides valuable insights and statistics on the game development community by collecting data from various game jams and presenting it in an easy-to-understand format.

Visit the website at [https://www.jamalyzer.com](https://www.jamalyzer.com)

## Getting Started

### Local

#### Frontend
1. Clone the repository to your local machine: `git clone https://github.com/Fabianofski/Jamalyzer.git`
2. Go to the Frontend folder: `cd Frontend`
3. Install the required dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application

#### Backend
1. Clone the repository to your local machine: `git clone https://github.com/Fabianofski/Jamalyzer.git`
2. Go to the Backend folder: `cd Backend`
3. Install the required dependencies: `npm install`
4. Add .env file in Backend folder
    ```
    VERSION='0.2'
    NODE_ENV='DEVELOPMENT'
    MONGO_AUTH='root:password'
    MONGO_HOST='localhost:27017'
    REDIS_HOST='localhost'
    REDIS_PORT="6379"
    REDIS_PASSWORD='password'
    ```
5. Start the development server: `npm start`
6. The backend will be running on [http://localhost:3001](http://localhost:3001)

### Docker

1. Add .env file in Backend folder
    ```
    VERSION='0.2'
    NODE_ENV='DEVELOPMENT'
    MONGO_AUTH='root:password'
    MONGO_HOST='localhost:27017'
    REDIS_HOST='localhost'
    REDIS_PORT="6379"
    REDIS_PASSWORD='password'
    ```
2. Add .env in root directory
    ```
    REDIS_PASSWORD='password'
    MONGO_PASSWORD='password'
    ```
3. Run `docker compose up -d`
4. Open your browser and navigate to [http://localhost](http://localhost)

## Built With

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Node.js](https://nodejs.org/) - JavaScript runtime for back-end development
- [Express](https://expressjs.com/) - Node.js web application framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database used to store the data
- [Firebase](https://firebase.google.com/) - Google's mobile and web application development platform

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
