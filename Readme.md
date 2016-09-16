# Fit Today

This is a simple app to manage your meals and calories, so you can watch out for that extra fat!

# Main Frameworks

We are working with [Node v6.3.0](https://nodejs.org/en/) for our backend and [Angular 1.x](https://angularjs.org/) for our frontend. We chose [Angular Material](https://material.angularjs.org/latest/) as our UI Component Framework. For our persistence layer we are using [Mongo](https://www.mongodb.com/) with [Mongoose](http://mongoosejs.com/) as our ORM.

For our test suite we are using [Karma](https://karma-runner.github.io/1.0/index.html) with [Mocha](https://mochajs.org/) to run our front and back end tests. [Chai](http://chaijs.com/) is our BDD assertion library and [Sinon](http://sinonjs.org/) is our mock library.

# Installing

To install this app go to the root folder and run:

    $npm install

This will give you almost all you need to run this app. You will have to install [Mongo](https://www.mongodb.com/), if you do not have it yet.

# Running

To run this app there is one requirement, you need to have [Mongo](https://www.mongodb.com/) up and running. Make sure that it is before running this application.

    $npm start

If you just want to run it do:

    $npm run start:prod

# Testing

To run this app's tests run:

    $npm test

This will run all front and back end tests. If you want to run any of those seperatly, choose between:

    $npm run test:front

    $npm run test:back

# Final Considerations

 * I decided to create an Authorization feature from the ground so I could avoid using any framework. This way I could show how a JWT can be used in an app in a simple way;
 * There are still missing some of frontend features:
   * Admin actions on front end;
   * Meals search/sort;
   * User settings.
 * It could have ngMessages to handle input error on the frontend;
 * What took me the most time was to set up all the backend to support the frontend. That was not a smart decision since I could have done all the backend mock with [Firebase](https://firebase.google.com/) or such;
 * I decided to not use [Babel](https://babeljs.io/) to leave the bulp process more simple.
 * npm run start:prod is broken because it can't uglify for some reason.