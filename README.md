# Token-portfolio

An token-portfolio calculator API with basic features (listed below)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Brief Description

This is a token portfolio calculator API that determines each available token portfolio valuation based on the logs stored in a csv file. The csv must have the following columns stored:

- timestamp: Integer number of seconds since the Epoch
- transaction_type: Either a DEPOSIT or a WITHDRAWAL
- token: The token symbol
- amount: The amount transacted


## Features

- Given no parameters, return the latest portfolio value per token in USD
- Given a token, return the latest portfolio value for that token in USD
- Given a date, return the portfolio value per token in USD on that date
- Given a date and a token, return the portfolio value of that token in USD on that date


## API Documentation
https://documenter.getpostman.com/view/15869686/2s93JnU6L9#c61a075e-15ec-4345-926f-faca4c949b47

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for testing purposes.

### Prerequisites

System requirements for this project to work includes:

- Node.js(v16 or higher)
- Node Package Manager (NPM) or yarn
- Git
- Typescript globally installed

### Installation

To install the dependencies in the package.json file, run the following command:

```bash
npm/yarn install
```

### Running the project

To run the project on your local machine, follow the steps below:

-  Create a `.env` file in the root folder of the project.
- Populate the `.env` file with the content of the `.env.example` file (contained in the root folder) and update with the appropriate values (database credentials included)
- Copy the transactions.csv file into the root directory of the project.

Once the steps above have been taken, navigate to the project directory and run the following commands on the terminal:

```bash
npm/yarn run build
npm/yarn run start:dev
```

## Built With

- [Express](https://expressjs.com/) - The Node.js web framework used
- [Typescript](https://www.typescriptlang.org/) - The language used
- [Yarn](https://yarnpkg.com/) - Package Manager for Node.js

## System design and decisions
 
- ### Fs read stream for reading files:
    - Memory Efficiency: Using fs read stream avoids loading the entire file into memory at once. Instead, it reads the file in chunks, which means that only the data being processed at a given time is loaded into memory. This reduces the memory usage of the program and makes it more efficient.
    - Scalability: fs read stream is designed to handle large files and data sets. It can handle files of any size and can read them in chunks, which makes it more efficient than synchronous reading.
    - Flexibility: The fs read stream can be used to read from different types of sources such as files, pipes, and sockets. This makes it a flexible solution for reading data from different sources.
    - Non-blocking: The fs read stream operates asynchronously, which means that it does not block the execution of the program while reading a file. This allows other parts of the program to continue running while the file is being read, resulting in faster and more efficient code.

- ### Using Map function to sort data:
  - the map function allows me to classify each token in the log by storing the portfolio valuation for each token as the value with the key being a specific token.
  - Scalability: as more tokens are added to the logs, the map allows for new tokens to be sorted without problems.



