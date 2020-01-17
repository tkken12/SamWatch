const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const app = express()
const fs = require('fs')
const schema = require('../model/adminSchema')
const mongoose = require('mongoose')
const crypto = require('crypto')

// Admin Login Page Redirect
router.get('/',(req,res)=>{
    res.render('admin', {
        
    })  
})

//Log in 
passport.serializeUser((admin, done)=>{
    done(null, admin)
})

passport.deserializeUser((admin, done)=> {
    done(null, admin);
});

passport.use(new LocalStrategy({
    usernameField: 'adminName',
    passwordField : 'password',
    passReqToCallback : true//request callback 여부
},
function (req, adminName, password, done)
{
    schema.findOne({ adminName: adminName, password: crypto.createHash('sha512').update(password).digest('base64')}, function(err, user){
        if (err) {
            throw err;
        } else if (!user) {
            return done(null, false, req.flash('login_message','이메일 또는 비밀번호를 확인하세요.')); // 로그인 실패
        } else {
            return done(null, user); // 로그인 성공
        }
    });
}
));

router.post('/', passport.authenticate('local', {failureRedirect: '/admin', failureFlash: true}), // 인증 실패 시 '/admin'으로 이동
    function (req, res) {
        res.redirect('/');
        //로그인 성공 시 '/'으로 이동
    });

//Admin Register
router.get('/create',(req,res)=>{
    res.render('adminCreate')
})
router.post("/create", (req, res, next) => {
    
        schema.find({ adminName:req.body.adminName })
        .exec()
        .then(user => {
            
            if (user.length >= 1) {
                res.send('<script type="text/javascript">alert("이미 존재하는 ID."); window.location="/create"; </script>');
            } else {
                const admin = new schema({
                    _id: new mongoose.Types.ObjectId(),
                    adminName:req.body.adminName,
                    password: crypto.createHash('sha512').update(req.body.password).digest('base64')
                });
                admin
                    .save()
                    .then(result => {
                        console.log(result);
                        res.redirect("/admin");
                    })
                    .catch(err => {
                        console.log(err);
                    });
                  }
        });
});


//Admin Logout
router.get('/logout', (req,res)=>{
    req.logout()
    res.redirect('/')
})


module.exports = router