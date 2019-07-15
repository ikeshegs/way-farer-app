[![Build Status](https://travis-ci.org/ikeshegs/way-farer-app.svg?branch=develop)](https://travis-ci.org/ikeshegs/way-farer-app)
[![Maintainability](https://api.codeclimate.com/v1/badges/4abc89c9126b138e8835/maintainability)](https://codeclimate.com/github/ikeshegs/way-farer-app/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4abc89c9126b138e8835/test_coverage)](https://codeclimate.com/github/ikeshegs/way-farer-app/test_coverage)
[![Coverage Status](https://coveralls.io/repos/github/ikeshegs/way-farer-app/badge.svg?branch=develop)](https://coveralls.io/github/ikeshegs/way-farer-app?branch=develop)

# way-farer-app
WayFarer is a public bus transportation booking App.

## Features
- Users can sign up.
- Users can sign in.
- Admin can create trips.
- Users can view all available trips.
- Users can create a new booking.
- Users can view all their bookings.
- Users can delete their booking.
- Admin can cancel a trip.

### Prerequisites
1. Internet connection
2. Internet browser
3. Install NodeJS
4. Install git
5. Postman

### API url
- API [Homepage](my-way-farer-app.herokuapp.com/)

### API Documentation
- Read documentation [here](my-way-farer-app.herokuapp.com/docs)

### Installing
1. Clone repo
2. cd way-farer-app
3. RUN npm install to install all dependencies
4. npm run dev-start
5. Open Postman
6. Test one endpoint select verb(action) eg. POST
7. Type url eg. localhost:3000/api/v1/auth/signup
8. Select Headers below url, under "key" type "Content-Type", "value" type "application/json"
9. Select Body beside Headers, select raw
10. From the select list choose JSON(application/json)
11. Type this into the body using this format below
    ```
    {
        "firstname": "Ikechuwu",
        "lastname": "okoro",
        "email": "test@test.com",
        "password": "password"
    }

    ```
12. If successful you will get a result similar to this:
    ```
    {
        "status": "success",
        "data": {
            "user_id": "c7fc9a0a-4a6a-447f-982d-8174c64fe19b",
            "is_admin": false,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzdmYzlhMGEtNGE2YS00NDdmLTk4MmQtODE3NGM2NGZlMTliIiwiZmlyc3RfbmFtZSI6IktpbmRuZXNzIiwibGFzdF9uYW1lIjoiT3Nhcm8iLCJlbWFpbCI6ImtpbmRuZXNzQHRlc3QuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkYXRJVDAvVkR3aWZiNFZRUWNsL0hJT0JsaDgwbTRSb0JaT3ZTUDVzanRQMTg4b0lzYVJlRWUiLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTU2MjgwMDU3NiwiZXhwIjoxNTYyODA0MTc2fQ.s--jSNwW839MEsjuE1W_kC1fA_u0GcQDAToohb9YBqM"
        }
    }
    ```

## Testing
Test locally by executing "npm test" on your terminal

```
I will update soon
```
### Built with 
1. [NodeJS](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine
2. [Express](https://expressjs.com/) - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
3. [ES6](http://es6-features.org/) - ECMA Script programming language
4. [Code Climate](https://codeclimate.com/) - Used to test code maintainability
5. [Coveralls](https://coveralls.io/) - Used to coverage history and statistics
6. [Travis CI](https://travis-ci.org/) - Used for Continuous Integration
7. [Mocha](https://mochajs.org/) - Used for code testing
8.  [Chai](https://www.chaijs.com/) - Is an assertion library used for testing in any JavaScript testing framework
9.  [Heroku](https://www.heroku.com/) - A cloud application platform used for app deployment

### Author 
* Ikechukwu Okoro
  
### Contributors
* [Olawale Adedeusi](https://www.codementor.io/olawalealadeusi896/building-a-simple-api-with-nodejs-expressjs-and-postgresql-db-masuu56t7)
* [Peter Adeoye](https://medium.com/the-andela-way/splitting-your-swagger-spec-into-multiple-files-in-a-node-project-2019575b0ced)
* [Stack Overflow](https://stackoverflow.com)
* [Andela](https://github.com/andela/bestpractices)
* [Tania Rascia](https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/)
* [PostgresSql Tutorial](http://www.postgresqltutorial.com/postgresql-primary-key/)
* [Stack Exchange](https://dba.stackexchange.com/questions/65289/multiple-primary-keys-in-postgresql)
* Amaobi Obikobe