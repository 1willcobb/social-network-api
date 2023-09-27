# Social Network API

A Node/express server with a database created utilizing MongoDB and Mongoose replicating a social media API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Sample](./assets/images/Screenshot%202023-09-27%20at%2012.55.24%20PM.png)
![Sample2](./assets/images/Screenshot%202023-09-27%20at%2012.55.49%20PM.png)

## Description 

This application is a Node.js and Express server running a MongoDB database with Mongoose schemas. It mimics a Social Media style database with Users, Friends, Posts (thoughts), and Reactions (comments). This is a server/backend application and is not hosted publicly. You will need to download the code, run the seeds, and access the server through a tool like Insomnia.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contributions)
- [Questions](#questions)
- [License](#license)

## Installation

```bash
npm install
```

  For installing this CLI application run the install command to gather the appropriate node_modules. 

  You will also need to setup mongoDB Compass on your computer for creating and storing the database. 

  Once both of those are complete run the seed command to seed some starter User data. 

  ```
npm run seed
  ```

  Once the database is seeded, or even without seeding, you can run the application as follows: 

  ```
  npm run dev
  ```

  this will start the server on localhost:3001 at which you can open Insomnia or Postman and access the routes. 


## Usage

Routes to hit can be found in the routes/api folder

## Demo

[Demo Video Here](https://drive.google.com/file/d/1wQTfNGzin_nUxbOr4J2pU3x_HOor-cjc/view?usp=sharing)


## Contributions
  You are welcome to contribute!

## Questions
  Please reach out to me if you have any questions about the functionality of the app or installation
  [GitHub](https://github.com/1willcobb) |
  [Email](mailto:cobb.will@gmail.com)

## License
[MIT License](https://choosealicense.com/licenses/mit/)

  The license used for this application is MIT License which can be found at the [here](https://choosealicense.com/licenses/mit/)
