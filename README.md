# netatmo-weathermap-widget
A widget that can get weather data of the world's major cities from Netatmo Weather Stations and display the temperature, humidity, pressure information in an interactive interface.

## Tech Stack
Project is created with:

NPM Version: 8.1.0

NodeJS version: 17.0.0

NuxtJS version: 2.15.7

TailwindCSS

Typescript


## Development Env Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev
```

## Functions Summary

1. Access tokens are retrieved from Netatmo app following the instructions: https://dev.netatmo.com/apidocumentation/oauth.

2. Public data is retrieved using the /getpublicdata endpoint  (https://dev.netatmo.com/apidocumentation/weather#getpublicdata)

3. The widget can display the weather information of some of the world's major cites.