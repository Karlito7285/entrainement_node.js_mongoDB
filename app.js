const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require("mongoose");
const fileupload = require('express-fileupload');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const connectFlash = require('connect-flash');
const bodyParser = require('body-parser');
const {stripTags} = require('./helpers/hbs');
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const Handlebars = require('handlebars');
const methodOverride = require('method-override'); // Pour methode put et delete



const app = express();

// Method-override
app.use(methodOverride("_method")); // Pour methode put et delete

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
const effacer = require('./controllers/delete');


// MongoDB
mongoose.connect("mongodb://localhost:27017/SerieStream", {useNewUrlParser: true, useUnifiedTopology: true},(err) => {
    if (!err) console.log("Mongodb connected");
    else console.log("Connection error :" + err);
  });

 
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json());
  const mongoStore = MongoStore(expressSession)
app.use(express.static('public'));
app.use(fileupload());
app.use(connectFlash())
app.use(expressSession({
  secret: 'securite',
  name: 'biscuit',
  saveUninitialized: true,
  resave: false,

  store: new mongoStore(
    { mongooseConnection: mongoose.connection })
}))

// Handlebars
app.engine('hbs', exphbs
    ({ extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers:{
      stripTags : stripTags},
      defaultLayout: 'main'}));

app.set('view engine', 'hbs');

app.use('*',(req, res , next)=>{
    res.locals.user = req.session.userId;
    next()
  });

//middleware
const validPost = require('./middleware/validPost');
const auth = require('./middleware/auth');
const redirectAuthSucces = require ('./middleware/redirectAuthSucces');

app.use('/series/post', validPost);
app.use('/add', auth);

//renvoie la page index
app.get('/',homePageController);
//ajout de série
app.get('/series/:id', auth, articleSingle);
app.get('/add', serieAddController);

//post
app.post("/series/post", auth, validPost,seriePost);

//user
app.get('/user/create', redirectAuthSucces, userCreate);
app.post('/user/register', redirectAuthSucces, userRegister);
app.get('/user/login',redirectAuthSucces , userLogin);
app.post('/user/LoginAuth',redirectAuthSucces, userLoginAuth);
app.get('/user/logout', userLogout);
app.delete('/:id', effacer);

//Ecoute le serveur
app.listen(7000,function(){
    console.log('Le serveur tourne sur le port 7000')
});