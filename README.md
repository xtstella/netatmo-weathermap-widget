# Weathermap Widget

A show-case to use Typescript for API service in VueJS.
The mini-project includes the following parts:
- An auth service including retrieving tokens and connecting a public API with Oauth2
- A simple interactive interface including an animated tags selector, a vertical tab selector and a table. Users can select from the world's major cities and get information of their temperature, humidity and pressure information.


## Demo
Try out a <a href="https://netatmo-weathermap-widget.herokuapp.com/">Live Demo</a>


## Technologies
* VueJS (NuxtJS)
* Tailwind CSS
* Typescript


## Development Env Setup
First create your .env file. (You can either create a netatmo account and a app to get the credentials or contact the author for more info.)

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev
```


## Functions Summary
* Access tokens are retrieved from Netatmo app following the instructions: https://dev.netatmo.com/apidocumentation/oauth.

* Public data is retrieved using the /getpublicdata endpoint  (https://dev.netatmo.com/apidocumentation/weather#getpublicdata)

* The widget can display the weather information of some of the world's major cites.


## API Doc
* Oauth Authentication: https://dev.netatmo.com/apidocumentation/oauth

* Weather API Documentation: https://dev.netatmo.com/apidocumentation/weather#documentation


## Todo
* Improve the Loading Spinner effect -> Overlay the content instead of replace the content

* Improve the Selected Tab style -> Add animation when a tab is selected

* Migrate to TypeScript (Refactor the Vuex Store and the Components), currently only the API serivce is written with TypeScript

* Create an auth middleware
