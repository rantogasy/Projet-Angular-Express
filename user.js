const jwt = require('jsonwebtoken')
const db = require('./bdd.js')
const atob = require('atob')
const Cryptr = require('cryptr')
cryptr = new Cryptr('myTotalySecretKey')
 

exports.signup = function(request , response){
   var data = request.body
   var first_name = request.body.first_name
   var last_name = request.body.last_name
   var password = request.body.password
   var email = request.body.email
   var dec_password = atob(password)
   var encrypted_password = cryptr.encrypt(dec_password)
 	  //   var sql = `INSERT INTO login(idLogin, first_name, last_name, email, password) VALUES('', '${first_name}', '${last_name}', '${email}', '${password}')`
 	  var sql = "INSERT INTO login SET ?"
      db.query(sql, data, function(err, result){
      	console.log(result)
    	if (err) throw err
      	console.log(`A row has been inserted!`)
        response.end(JSON.stringify(result))
  })
}



//{"idLogin":"", "first_name":"ranto", "lastname":"ralijaona", "email":"mdr", "password":"password"}