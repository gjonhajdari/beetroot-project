# Beetroot Project

Full-Stack web app build during a training program focused on Node.js Back End Development by [Beetroot Academy](https://xk.beetroot.academy/). Features a REST API build with Express.js, including user authentication using JSON Web Tokens (JWT). The corresponding Front-End, provided by the training instructor, interacts with and utilizes this API.

## Getting started

```bash
$ git clone https://github.com/gjonhajdari/beetroot-project
```

### Prerequisites

```bash
$ npm i -g yarn
```

Using Homebrew on MacOS

```bash
$ brew install yarn
```

## Installation

Server-side dependencies

```bash
$ npm install
```

Client-side dependencies

```bash
$ cd client/
$ yarn install
```

## Starting up

Development server for the font-end

```bash
$ yarn run start
```

Development server for the back-end (in a new terminal instance)

```bash
$ npm run server
```

> Note: If you're on Windows and encounter an error with yarn, run PowerShell as Administrator and execute `Set-ExecutionPolicy - ExecutionPolicy RemoteSigned`.
