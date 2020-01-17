const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const path = require('path')


//DB set
const dbURL = 'mongodb://localhost:27017/samtree'
const db = mongoose.connection
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(dbURL)
db.once('open', function(){
    console.log('DB connected');
});
db.on('error', function(err){
    console.log('DB ERROR : ', err);
});

//Other set
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs')
app.use('/public/', express.static(path.join(__dirname, '/public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret:'MySecret', resave:true, saveUninitialized:true})); //session hash 화

//flash
app.use(flash())

//passport
app.use(passport.initialize())
app.use(passport.session())

//bodyParser
app.use(bodyParser.json())



//route
app.use('/', require('./routes/home'))
app.use('/admin',require('./routes/admin'))
app.use('/upload', require('./routes/upload'))

//error handler 
app.use((req,res,next)=>{
    throw new Error(req.url + " " + 'not found')
})
app.use((err,req,res,next)=>{
    console.log(err)
    res.send(err.message)
})

//cookieParser
app.use(cookieParser())

// server listen 
const PORT = 3006
app.listen(PORT,()=>{
    console.log('Web Server Start on ' + PORT)
} )
