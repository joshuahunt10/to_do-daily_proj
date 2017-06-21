const express = require('express');
const app = express();
const mustache = require('mustache-express');
const bodyParser = require('body-parser');


app.engine('mustache', mustache() )
app.set('view engine', 'mustache');

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }));

let todos = [];
let complete = [];

app.get('/', function (req, res) {
  res.render('index', {todos: todos, complete: complete});
});

app.post('/', function(req, res){
  item = req.body.listItem;
  completeTask = req.body.button

  if(item){
    todos.push(item);
  } else if(completeTask){
    console.log(completeTask);
    console.log(typeof completeTask);
      for(let i = 0; i < todos.length; i++){
        if(todos[i] === completeTask){
          todos.splice(i, 1);
        }
      }
    complete.push(completeTask);
  }
  res.redirect('/');
})

app.listen(3000, function () {
  console.log('Successfully started express application!')
});
