// const express = require('express');
// const app = express();
// const path = require('path');
// require('dotenv').config();

// const flash = require('express-flash-messages');
// const routes = require('./app/routes.js');

// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
// app.use(flash());


// routes(app);

// // const mongoose = require('mongoose');
// // mongoose.connect('process.env.MONGODB')
// //   .then(() => console.log('Connecté !'))
// //   .catch(err => console.error('Pas de:', err));

// app.listen(process.env.PORT,() => {
//     if(process.env.APP_ENV == 'dev') {
//         console.log(`Le serveur est démarré : http://localhost:${process.env.PORT}`);
//     }
// })

const express = require("express");
const app = express();
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();
const session = require('express-session')
const flash = require('express-flash-messages')
const routes = require("./app/routes.js");

//--------------------------------------------------------------------
//      Ajout du midlleware express session
//--------------------------------------------------------------------
app.use(session({
    secret: process.env.APP_KEY, resave:false, saveUninitialized:false, 
    cookie: {maxAge: 3600000} 
}));

app.use(flash())

//--------------------------------------------------------------------
//      Mise en place du moteur de template
//--------------------------------------------------------------------

app.set('view engine', 'pug');

//--------------------------------------------------------------------
//      Mise en place du répertoire static
//--------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

//--------------------------------------------------------------------
//      Récupération des données en POST
//--------------------------------------------------------------------
app.use(express.urlencoded({extended: false}));


//--------------------------------------------------------------------
//      Envoi information à la vue
//--------------------------------------------------------------------
app.use((req,res,next) => {
  res.locals.app = {
      route : req._parsedUrl.pathname,
      user: req.session.user || {}
  };
  next();
});




//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
routes(app);

//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(process.env.PORT,() => {
    console.log(`Le serveur est démarré : http://localhost:${process.env.PORT}`);
});