const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const imgUpload = multer({dest:'../upload/image'})
const csvUpload = multer({dest:'../upload/csv'})

/*const storage = multer.diskStorage({
    destination: (req, res, callback)=> {
        callback(null, 'upload')
    },
    filename:(req, res, callback)=> {
        callback(null, file.originalname + Date.now())
    }
})
const upload = multer({ 
    storage, limits: { 
        files: 10, 
        fileSize: 1024 * 1024 * 1024 
    } 
})
*/

