//ajout des differents modules necessaires au projet
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('mysql')
const db = require('./src/JS/bdd.js')
const http = require('http')
const path = require('path')
const cors = require('cors')
const user = require('./src/JS/user.js')
const article = require('./src/JS/article.js')
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
    /*response.sendFile('tasks_list.html', {
        root: path.join(__dirname, './templates/')
    })*/
})


/*app.get('/:categorie', (request, response) => {
    response.sendFile('tasks_list.html', {
        root: path.join(__dirname, './templates/')
    })
  }) */


//Liste des articles au format JSON
app.get('/list_article', article.list_article)


//Retourne un article au format JSON
app.get('/list_article/:nomArticle', article.list_article_by_name)

//ajout de l'inscription
app.post('/signup', user.signup)

//ajout de la connexion
app.post('/signin', user.signin)

//Insertion d'un article via le formulaire
app.post('/save_article', article.save_article)

//Modification d'un article
app.put('/modify_article', article.modify_article)


//Suppression d'un article
app.delete('/delete_article', article.delete_article)

 /*function getArticle() {

 function setValue(value) {
    variable = value
    console.log(variable)
  }

  db.query("SELECT nomArticle FROM article WHERE nomArticle = ?", [nomArticle], function (err, result, fields)  {
    if (err) throw err; 
    console.log(result)
    nomArticle = setValue(result) 
  })

  console.log(nomArticle)
  return nomArticle

}*/



//configuration du serveur
var server = http.createServer(app).listen(8080, "localhost", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App currently listening at http://%s:%s", host, port)

})
//app.listen(8080, () => console.log('Listening on port 8080'))