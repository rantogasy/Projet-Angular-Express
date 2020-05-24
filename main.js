const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('mysql')
const path = require('path')
const cors = require('cors')


const app = express()


var conn = mysql.createConnection({
  database: 'simona',
  host: "dwarves.iut-fbleau.fr",
  user: "simona",
  password: "simona"
})
 
conn.connect(function(err) {
  if (err) throw err
  console.log('Connected to the MYSQL database.')
})


//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())


//app.use(cors())





app.listen(8080, () => console.log('Listening on port 8080'))


/*db.close((err) => {
  if (err) {
    return console.error(err.message)
}
console.log('Close the database connection.')
}) */