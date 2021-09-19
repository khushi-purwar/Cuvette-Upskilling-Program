const expect = require('chai').expect;
const request = require('request');

const { TESTING_URL } = require('../../../constants/test')

describe('User API', () => {

      it('Create user SUCCESS', done => {
        request.post(`${TESTING_URL}/api/v1/consumer/signup`, 
        {
            "firstName" : "Khushi",
            "lastName" : "Purwar",
            "email" : "khushipurwar@gmail.com",
            "password" : "kajalmishra123"
         }
        , (_, response) => {
          expect(response.statusCode).to.equal(200)
          done()
        })
      })
    })

