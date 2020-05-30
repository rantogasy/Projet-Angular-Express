const mysql = require('mysql')

//connexion à la bdd
var db = mysql.createConnection({
  database: 'angular',
  host: "localhost",
  user: "root",
  password: ""
})

//controle de la connexion
db.connect(function(err) {
  if (err) throw err
    console.log('Connected to the MYSQL database.')
})

module.exports = db