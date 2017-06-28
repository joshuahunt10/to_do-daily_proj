const express = require('express');
const app = express();
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
var models = require("./models");

app.engine('mustache', mustache())
app.set('view engine', 'mustache');

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res) {
  models.Todos.findAll({
    where: {
      completed: false
    }
  }).then(function(notDone) {
    models.Todos.findAll({
      where: {
        completed: true
      }
    }).then(function(alltrue) {
      res.render('index', {
        todos: notDone,
        complete: alltrue
      })
    });
  });
});
app.post('/add', function(req, res) {
  item = req.body.listItem;

  completeTask = req.body.button
  const todo = models.Todos.build({task: item})
  todo.save();
  return res.redirect('/');
})

app.post('/completed', function(req, res) {
  let buttonValue = req.body.button;
  console.log('the id of the button is', buttonValue);
  models.Todos.findOne({
    where: {
      id: buttonValue
    }
  }).then(function(todo) {
    todo.updateAttributes({
      completed: true
      // }).then(function(){
      // res.render('/index');
    })
    res.redirect('/');
  })

})

app.listen(3000, function() {
  console.log('Lets get this party started! -Pink')
});
