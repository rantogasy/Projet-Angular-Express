const jwt = require('jsonwebtoken')
const db = require('./bdd.js')
const atob = require('atob')
const Cryptr = require('cryptr')
cryptr = new Cryptr('myTotalySecretKey')

 
//inscription d'un utilisateur
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

//connexion d'un utilisateur avec un JWT
exports.signin = function(request, response) {
	var email =request.body.email
 	var password = request.body.password
 	var dec_password = atob(password)
	var encrypted_password = cryptr.encrypt(dec_password)
	
	var sql="SELECT idLogin, first_name, last_name, email FROM login WHERE email = ? and password = ?"
	 
	 db.query(sql, [email, password], function(err, result) {	
		 
		 if(result != ""){
			 
			 console.log(JSON.stringify(result))
			 
			 var data = JSON.stringify(result)
			 
			 var secret = 'TOPSECRETTTTT'
				var now = Math.floor(Date.now() / 1000),
					iat = (now - 10),
					expiresIn = 3600,
					expr = (now + expiresIn),
					notBefore = (now - 10),
					jwtId = Math.random().toString(36).substring(7);
				var payload = {
					iat: iat,
					jwtid : jwtId,
					audience : 'TEST',
					data : data
				}	
				
			 
			 jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn : expiresIn}, function(err, token) {
					
				if(err){
					console.log('Error occurred while generating token')
					console.log(err)
					return false
				}
				 else{
				if(token != false){
					//res.send(token);
					response.header()
					response.json({
  						"results":
  								{"status": "true"},
  						"token" : token,
						"data" : result
										
  					})
  					console.log(token)
					response.end(JSON.stringify(result))
				}
				else{
					response.send("Could not create token")
					response.end()
				}
				
				 }
			})
		
		 }
		 else if(result == ""){
			 	console.log("not a user")
		 }
	 })
}

//{"idLogin":"", "first_name":"ranto", "lastname":"ralijaona", "email":"mdr", "password":"password"}