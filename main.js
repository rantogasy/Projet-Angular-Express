//ajout des differents modules necessaires au projet
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('mysql')
const db = require('./src/JS/bdd.js')
const http = require('http')
const path = require('path')
const cors = require('cors')
const passport = require('passport')
const user = require('./src/JS/user.js')
const jwt = require('jsonwebtoken')



const app = express()

//configuration du BodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//configuration du cors
app.use(cors())

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*")
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})




app.get('/', (request, response) => {
    response.sendFile('tasks_list.html', {
        root: path.join(__dirname, './templates/')
    })
})


/*app.get('/:categorie', (request, response) => {
    response.sendFile('tasks_list.html', {
        root: path.join(__dirname, './templates/')
    })
  }) */


//Liste des articles au format JSON
app.get('/list_article', (request, response) => {
  db.query("SELECT * FROM article", function (err, result, fields)  {
    if (err) throw err;
    console.log(result);
    response.end(JSON.stringify(result))
  })
})


//Retourne un article au format JSON
app.get('/list_article/:nomArticle', (request, response) => {
  nomArticle = request.params.nomArticle
  db.query("SELECT * FROM article WHERE nomArticle = ?", [nomArticle], function (err, result, fields)  {
    if (err) throw err;
    console.log(result);
    response.end(JSON.stringify(result))
  })
})

//ajout de l'inscription
app.post('/signup', user.signup)

//ajout de la connexion
app.post('/signin', user.signin)

//Insertion d'un article via le formulaire
app.post('/save_article', (request, response) => {
  data = request.body
  db.query('INSERT INTO article SET ?', data, function (err, result) {
    if (err) throw err
      console.log(`A row has been inserted!`)
      console.log(result)
      response.end(JSON.stringify(result))
  })
})

//Modification d'un article
app.put('/modify_article', (request, response) => {
  idArticle = request.body.idArticle 
  nomArticle = request.body.nomArticle
  descriptionArticle = request.body.descriptionArticle
  dateArticle = request.body.dateArticle
  db.query('UPDATE `article` SET `nomArticle`= ?,`descriptionArticle`= ?,`dateArticle`= ? WHERE `idArticle`=?', [nomArticle, descriptionArticle, dateArticle, idArticle], function (error, result, fields) {
  if (error) throw error
    console.log(`A row has been modified!`)
    console.log(result)
    response.end(JSON.stringify(result))
  })
})

//Suppression d'un article
app.delete('/delete_article', (request, response) => {
  nomArticle = request.body.nomArticle
  db.query('DELETE FROM `article` WHERE `nomArticle`= ? ', [nomArticle], function (error, result, fields) {
  if (error) throw error
    console.log(`A row has been deleted!`)
    console.log(result)
    response.end(JSON.stringify(result))
  })
})




var server = http.createServer(app).listen(8080, "localhost", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App currently listening at http://%s:%s", host, port)

})
//app.listen(8080, () => console.log('Listening on port 8080'))