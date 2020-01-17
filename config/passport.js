const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Admin = require('../model/adminSchema')

passport.serializeUser((admin, done)=>{
    done(null, admin.id)
})

passport.deserializeUser((id,done)=>{
    Admin.findOne({_adminName:adminName}), (err,admin)=>{
        done(err,admin)
    }
})

passport.use('local-login',
    new LocalStrategy({
        usernameField: 'adminName', //form 이름과 동일
        passwordField: 'password', // form 이름과 동일
        passReqToCallback: true
    },
    (req,adminName, password,done)=>{
        Admin.findOne({ adminName:adminName })
        .select({password:1})
        .exec((err, admin)=>{
            if(err) return done(err)
            
            if (user && user.authenticate(password)){
                return (done, admin)
            }
            else{
                req.flash('adminName', adminName)
                req.flash('errors',{login: '관리자 아이디나 비밀번호를 확인하여 주십시오'})
                return(null, false)
               }
            })
        }
    )
)

module.exports = passport