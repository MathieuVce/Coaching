# Coaching Studio
## _The Dashboard that suits your needs_

[![Build Status](https://github.com/MathieuVce/Coaching/actions/workflows/fireabse-deploy.yml/badge.svg?branch=develop)](https://github.com/MathieuVce/Coaching/actions/workflows/fireabse-deploy.yml)


Intern company project where another fullstack developper and I will work in order to improve my skills in web development and improve his on mobile. Using react and react native we will work on a single project: one mobile application and one web application. The main goal is to develop a back office platform where an administrator will be able to manage the users, reviews, comments and movies for a platform looking like Netflix. It will be a dashboard with many screens to add and/or remove items as we want.

## Features

- Login/register your user
- Acces your Dashboard from a Mobile or a Webapp
- A responsive design to fit all screens
- Manage your movies as you want
- Reviews, users, comments, items get the brand new  stage of your site

## Tech

Coaching Studio uses a number of open source projects to work properly:

- [node.js](https://nodejs.org/)  - Install packages/dependencies
- [firebase](https://firebase.google.com/) - Create and manage your database
- [react](https://fr.reactjs.org/) - For our webapp
- [react native](https://reactnative.dev/) - For our mobile part
- [redux.js](https://redux.js.org/) - Manage your state everywhere between React and React Native
- [tailwindcss](https://tailwindcss.com/) - No more style complication
- [vite](https://vitejs.dev/) - No setup complication

And of course Coaching Studio itself is open source with a [public repository](https://github.com/MathieuVce/Coaching/) on GitHub.

## Installation

Coaching Studio requires: 
- [Node.js](https://nodejs.org/) v16+
- [react](https://fr.reactjs.org/) v17+


Install the dependencies and devDependencies and start the server.

```sh
cd front
yarn install
yarn start
```

#### Building for source

For production release:

```sh
firebase deploy
```

Generating pre-built zip archives for distribution:

```sh
yarn build
```

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
http://localhost:3000/
```
or
```sh
https://coaching-fa243.web.app/
```
