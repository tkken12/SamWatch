const express = require('express')
const router = express.Router()
const passport = require('passport')
const app = express()
const fs = require('fs')
// Admin Login
app.get('/',(req,res)=>{
    res.render('/admin', {
        adminName:adminName,
        errors:errors
    })  
})

//Admin post
router.post('/',(req,res,next)=>{
    var errors= {}
    var isValid = true

    if (!req.body.adminName){
        isValid = false
        errors.adminName = '관리자 아이디가 필요합니다.'
    }
    if(!req.body.password){
        isValid = false
        errors.passport = '관리자 패스워드가 필요합니다.'
    }
    if(isValid){
        next()
    }
    else {
        req.flash('errors',errors)
        res.redirect('/admin')
    }
},
    passport.authenticate('local-login',{
        successRedirect:'/',
        failureRedirect:'/admin'
    })
)

//Admin Logout
router.get('/logout', (req,res)=>{
    res.logout()
    res.redirect('/')
})


module.exports = router