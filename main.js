const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('mysql')
const path = require('path')
const cors = require('cors')


const app = express()

//connexion à la bdd
var conn = mysql.createConnection({
  database: 'simona',
  host: "dwarves.iut-fbleau.fr",
  user: "simona",
  password: "simona"
})

//controle de la connexion
conn.connect(function(err) {
  if (err) throw err
  console.log('Connected to the MYSQL database.')
})


//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())


//app.use(cors())



app.get('/', (request, response) => {
    response.sendFile('tasks_list.html', {
        root: path.join(__dirname, './templates/')
    })
})


app.get('/:categorie', (request, response) => {
    response.sendFile('tasks_list.html', {
        root: path.join(__dirname, './templates/')
    })
})


app.post('/list_tasks', (request, response) => {
    const query = 'SELECT * FROM task'
    db.all(query, [], (err, rows) => {
      if (err) {
        throw err;
    }
    response.json(rows)
}); // Get all tasks from task table
})




app.listen(8080, () => console.log('Listening on port 8080'))


/*db.close((err) => {
  if (err) {
    return console.error(err.message)
}
console.log('Close the database connection.')
}) */