const bodyParser = require('body-parser')
const db = require('./bdd.js')
const path = require('path')
const cors = require('cors')
const http = require('http')
const mysql = require('mysql')


exports.list_article = function(request, response) {
	db.query("SELECT * FROM article", function (err, result, fields)  {
    if (err) throw err;
    console.log(result);
    response.end(JSON.stringify(result))
  })
}


exports.list_article_by_name = function(request, response) {
	 nomArticle = request.params.nomArticle
  	 db.query("SELECT * FROM article WHERE nomArticle = ?", [nomArticle], function (err, result, fields)  {
     if (err) throw err
     console.log(result)
     response.end(JSON.stringify(result))
  })
}


exports.save_article = function(request, response) {
	 data = request.body
     db.query('INSERT INTO article SET ?', data, function (err, result) {
     if (err) throw err
     console.log(`A row has been inserted!`)
     console.log(result)
     response.end(JSON.stringify(result))
  })
}


exports.modify_article = function(request, response) {
	 idArticle = request.body.idArticle 
  	 nomArticle = request.body.nomArticle
  	 descriptionArticle = request.body.descriptionArticle
  	 dateArticle = request.body.dateArticle

  	db.query('UPDATE `article` SET `nomArticle`= ?,`descriptionArticle`= ? WHERE `idArticle`= ?', 
    [nomArticle, descriptionArticle, idArticle], function (error, result, fields) {
  	if (error) throw error
    console.log(`A row has been modified!`)
    console.log(result)
    response.end(JSON.stringify(result))
  })
}


exports.delete_article = function(request, response) {
	nomArticle = request.body.nomArticle
  	db.query('DELETE FROM `article` WHERE `nomArticle`= ? ', [nomArticle], function (error, result, fields) {
  	if (error) throw error
    console.log(`A row has been deleted!`)
    console.log(result)
    response.end(JSON.stringify(result))
  })
}