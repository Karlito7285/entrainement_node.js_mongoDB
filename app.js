const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require("mongoose");
const fileupload = require('express-fileupload');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const connectFlash = require('connect-flash');
const bodyParser = require('body-parser');

const app = express();

// MongoDB
mongoose.connect("mongodb://localhost:27017/SerieStream", {useNewUrlParser: true, useUnifiedTopology: true},(err) => {
    if (!err) console.log("Mongodb connected");
    else console.log("Connection error :" + err);
  });

  //Configurer express
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json());
app.use(express.static('public'));

// Handlebars
app.engine('hbs', exphbs({ extname: 'hbs'}));
app.set('view engine', 'hbs')

//renvoie la page index
app.get('/',(req, res)=>{
    res.render('index')
});

//Ecoute le serveur
app.listen(7000,function(){
    console.log('Le serveur tourne sur le port 7000')
});