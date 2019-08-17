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
```
npm run docker:dev
```
### Test watcher
After launching `dev` docker services:
```
npm run docker:dev:test
```

## Run for production
```
npm run docker:prod
```
