const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const imgUpload = multer({dest:'../upload/image'})
const csvUpload = multer({dest:'../upload/csv'})


router.get((req,res, next)=>{
    res.render('upload')
})

let storage = multer.diskStorage({
    destination: function(req, file ,callback){
        callback(null, "upload/csv")
    },
    filename: function(req, file, callback){
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, basename + "-" + Date.now() + extension);
    }
})

let upload = multer({
    dest:'upload/'
})

// 2. 파일 업로드 처리
router.post('/csv', upload.single("csvFile"), function(req, res, next) {
    // 3. 파일 객체
    let file = req.file

    // 4. 파일 정보
    let result = {
        originalName : file.originalname,
        size : file.size,
    }

    res.json(result);
});


