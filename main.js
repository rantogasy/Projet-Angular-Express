const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('mysql')
const path = require('path')
const cors = require('cors')


const app = express()

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
  }) */


//Liste des articles au format JSON
  app.get('/list_article', (request, response) => {
    db.query("SELECT nomArticle, descriptionArticle, dateArticle FROM article", function (err, result, fields)  {
      if (err) throw err;
      console.log(result);
      response.json(result)
    })
  })




//Retourne un article au format JSON
  app.get('/list_article/:nomArticle', (request, response) => {
    nomArticle = request.params.nomArticle
    db.query("SELECT nomArticle, descriptionArticle, dateArticle FROM article WHERE nomArticle = ?",[nomArticle] , function (err, result, fields)  {
      if (err) throw err;
      console.log(result);
      response.json(result)
    })
  })


//Insertion d'un article via le formulaire
  app.post('/save_article/', (request, response) => {
    data = request.body
    var sql = `INSERT INTO article (idArticle, nomArticle, descriptionArticle, dateArticle) VALUES('', '${data.nomArticle}', '${data.descriptionArticle}, '')`
    conn.query(sql, function (err, result) {
      if (err) throw err
      console.log(`A row has been inserted!`)
      console.log(result)
      response.json(result)
    })
  })





app.listen(8080, () => console.log('Listening on port 8080'))