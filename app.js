const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require("mongoose");
const fileupload = require('express-fileupload');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const connectFlash = require('connect-flash');
const bodyParser = require('body-parser');

const app = express();

//Controller//
//série
const serieAddController = require('./controllers/serieAdd');
const seriePost = require('./controllers/seriePost');
const homePageController = require('./controllers/homePage');
const articleSingle = require('./controllers/articleSingle');

//user
const userCreate = require('./controllers/userCreate');
const userRegister = require('./controllers/userRegister');
const userLogin = require('./controllers/userLogin');
const userLoginAuth = require('./controllers/userLoginAuth');
const userLogout = require('./controllers/userLogout');


// MongoDB
mongoose.connect("mongodb://localhost:27017/SerieStream", {useNewUrlParser: true, useUnifiedTopology: true},(err) => {
    if (!err) console.log("Mongodb connected");
    else console.log("Connection error :" + err);
  });

  //Configurer express
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json());
app.use(express.static('public'));
app.use(fileupload());

// Handlebars
app.engine('hbs', exphbs({ extname: 'hbs'}));
app.set('view engine', 'hbs');

app.use('*',(req, res , next)=>{
    res.locals.user = req.session.userId;
    next()
  });

//middleware
const validPost = require('./middleware/validPost');
const auth = require('./middleware/auth');
const redirectAuthSucces = require ('./middleware/redirectAuthSucces');

app.use('/articles/post', validPost);
app.use('/articles/add', auth);

//renvoie la page index
app.get('/',homePageController);
//ajout de série
app.get('/serie/:id', auth, articleSingle);
app.get('/add', serieAddController);

//post
app.post("/series/post", auth, validPost,seriePost);

//user
app.get('/user/create', redirectAuthSucces, userCreate);
app.post('/user/register', redirectAuthSucces, userRegister);
app.get('/user/login',redirectAuthSucces , userLogin);
app.post('/user/LoginAuth',redirectAuthSucces, userLoginAuth);
app.get('/user/logout', userLogout)

//Ecoute le serveur
app.listen(7000,function(){
    console.log('Le serveur tourne sur le port 7000')
});