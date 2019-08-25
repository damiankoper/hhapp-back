[![Build Status](https://travis-ci.org/damiankoper/hhapp-back.svg?branch=master)](https://travis-ci.org/damiankoper/hhapp-back.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/damiankoper/hhapp-back/badge.svg?branch=master)](https://coveralls.io/github/damiankoper/hhapp-back?branch=master)
# HouseholdApp Back
Built and tested with:
* [ExpressJS](https://expressjs.com/)
* [TypeORM](https://typeorm.io/#/)
* [JestJS](https://jestjs.io/)
* [Supertest](https://www.npmjs.com/package/supertest)

Set on: 
* Docker@19.03.1
* DockerCompose@1.24.1

## Run for development
To run app in watch mode:
```
npm run docker:dev
```
## Tests
Tests operates on seperate database container refreshed before each run. To run all tests with coverage once (e.g. for CI) type:
```
npm run docker:test
```
To run tests in watch mode:
```
npm run docker:test:watch
```
In watch mode database's state persists between runs so it is important to remove unnecessary records before/after each test/suite.

## Run for production
```
npm run docker:prod
```
