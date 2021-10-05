const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const pg = require("pg");
const Pool = pg.Pool;


let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}


const Registrations = require('../services/reg');


const connectionString = process.env.DATABASE_URL ||'postgresql://codex:pg123@localhost:5432/registration';


const pool = new Pool({
 connectionString,
  ssl: {
    rejectUnauthorized:false
  }
});
 
var registration= Registrations(pool);
 const app = express();
 

 app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
 app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended : false}));

app.use(bodyParser.json());

app.use(session({
    secret: "Error",
    cookie: {
      maxAge: 3000
    },
    resave: false,
    saveUninitialized: true
  }));

  app.use(flash());




var list=[];


app.get('/reg_number',async function (req, res){
 
   list= await registration.getRegList();
    
    res.render('index', {
     list 
  })
      
  });


app.post('/reg_number',async function (req, res) {
  if(!req.body.regInput){
    req.flash('error', 'Please enter a registration with a valid registration');
  }
  
  else{
   await registration.setPlate(req.body.regInput);
    

  }

    res.redirect("/reg_number");
  });

  app.get('/reg_numbers',async function (req, res){
 
   
     
     res.render('index', {
      list 
   })
       
   });
 
  app.post('/reg_numbers', async function(req,res){

    if(req.body.town){
    list =  await registration.setTown(req.body.town);
      console.log( list);

    }
    else{
      req.flash('error', 'Please select a town before proceeding');

    }

  

    res.redirect("/reg_numbers")
  })

  app.post('/showAll',async function(req,res){
    res.redirect("/reg_number");

  })

  app.post('/reset', async function(req,res){
    req.flash('success','Application has succesfully been reset!')
    await registration.clearReg();

    res.redirect("/reg_number")
  })




const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
console.log("app started at port")
});
