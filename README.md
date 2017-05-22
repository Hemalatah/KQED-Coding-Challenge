# KQED-Coding-Challenge
A web service that shows on a map where movies have been filmed in the San Francisco Bay Area.

Networking:
  - Project URL: https://calm-anchorage-13250.herokuapp.com
  > Kindly take a look at my another project:  https://multi-user-blog-160020.appspot.com/blog
                                               

# Tech Stack:
```sh
    Supertest/Mocha.js
    Node.js/Express
    Handlebars.js
    JavaScript
    CSS/Bootstrap
    HTML
```
 
 - Front End:
    - Handlebars.js is used for the HTML Layout
    - Jquery is also used for all the map functions
    - Bootstrap helps a lot to list the movie titles and the alignment of HTML element
  - Back End:
    - Node.js with the Express web framework is used for uri routing and parsing of data for the project
    - Handlebars.js is accessed by express dev dependencies
    - No any database is used, data is retrieved in json format and gecoding is done to find the latitude and longitude. In future, data is to be stored in the database and retrieved using postgreSQL
  - Test:
    - Here, Supertest and Mocha are used. Supertest provides a high-level abstraction for testing HTTP calls, also works with any test framework like Mocha.
    - Chosen Mocha because of its simplicity and flexibility.
    - Error log is wel maintained with express framework.

  - Node and NPM is used as a package manager
  - Gulp is used as a task runner, helps in css, js minification, browser sync and linting.

# File Structure:
  - server.js is the root file (configuring ports and triggering up the backend file)
  - app.js runs on express.js helps to collaborate things together in Front end and Back end.
  - movie.json has the json formatted data about the movies
  - geocoding.js helps to find out the geo location based on the location given in movie.json
  - geo_movie.json same as movie.json with additional geo data
  - test folder has test.js file which does mocha testing along with supertest module
  - static folder has all the necessary css and js files. In that movie.js gives the interactivity for the website.
  - views folder has the handlebars.js files required for HTML formatting
  - routes folder has the functionality for url routing
  - dist folder has all the files needed for production env.

  
# Future Work
  - use the postgreSQL database
  - give more onfo related to the movie location, reviews etc...
