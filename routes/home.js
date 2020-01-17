const express = require('express')
const router = express.Router()
const app = express()
const fs = require('fs')

//home
router.get('/', (req,res)=>{
    res.render('index')
    
})



module.exports = router