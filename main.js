const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('mysql')
const path = require('path')
const cors = require('cors')


const app = express()

//connexion à la bdd
var conn = mysql.createConnection({
  database: 'angular',
  host: "localhost",
  user: "root",
  password: ""
})

//controle de la connexion
conn.connect(function(err) {
  if (err) throw err
    console.log('Connected to the MYSQL database.')
})


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(cors())



/*app.get('/', (request, response) => {
    response.sendFile('tasks_list.html', {
        root: path.join(__dirname, './templates/')
    })
})


app.get('/:categorie', (request, response) => {
    response.sendFile('tasks_list.html', {
        root: path.join(__dirname, './templates/')
    })
  })*/

//Liste des articles au format JSON
  app.get('/list_article', (request, response) => {
    conn.query("SELECT * FROM article", function (err, result, fields)  {
      if (err) throw err;
      console.log(result);
      response.json(result)
    })
  })


//Retourne un article au format JSON
  app.get('/list_article/:nomArticle', (request, response) => {
    data = request.body
    conn.query("SELECT * FROM article WHERE nomArticle = ?",[data.nomArticle] , function (err, result, fields)  {
      if (err) throw err;
      console.log(result);
      response.json(result)
    })
  })








app.listen(8080, () => console.log('Listening on port 8080'))


/*db.close((err) => {
  if (err) {
    return console.error(err.message)
}
console.log('Close the database connection.')
}) */