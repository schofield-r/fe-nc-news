# NC News Frontend

## Contents

- [General Info](#General-Info)
- [Setup](#setup)
  - [Prerequisites](#Prerequisites)
  - [Deployment](#deployment)
- [Technologies](#built-with)

## General Info

This is a social news aggregation, web content rating, and discussion website. Articles are divided into topics, articles can have comments and both articles and comments have votes which can be changed. Users can be created and are used to make comments, write articles and create new topics.

Backend NC News Github : https://github.com/schofield-r/nc-news

Deployed Frontend: https://rms-nc-news.herokuapp.com/

## Setup

This setup will explain how to get a copy of this project running on your machine for testing and development. To begin, clone this repository with

`git clone https://github.com/schofield-r/fe-nc-news.git`

then

`cd nc-news-app`

to move to app folder.

### Prerequisites

Requires Node.js v12 to run locally
You will need node.js and npm
Open a terminal and type:

`sudo apt install nodejs`

_(To install node.js)_

`sudo apt install npm`

_(To install npm)_

After installing node.js and npm, in the terminal type

`npm init -y`

Followed by

`npm install`

This will install all packages needed.
- [moment](https://github.com/moment/moment)
- [axios](https://github.com/axios/axios) 
- [CORS](https://github.com/expressjs/cors)

## Built With

- [axios](https://github.com/axios/axios) - API requests
- [CORS](https://github.com/expressjs/cors)- node.js package for providing a Connect/Express middleware that can be used to enable CORS
- [moment](https://github.com/moment/moment)- A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
- [Heroku](https://www.heroku.com/home)- Deployment
- [React](https://reactjs.org/)
  This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
