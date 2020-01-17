const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

var adminSchema = mongoose.Schema({
    adminName:{
        type: String,
        required:[true, '관리자 아이디를 입력을 해주세요'],
        match: [/^.{4,12}$/, '4-12사이의 문자 필수'],
        trim: true,
        unique: true
    },
    password:{
        type: String,
        require:[true, '관리자 비밀번호를 입력을 해주세요'],
        select: false        
    }
    
})