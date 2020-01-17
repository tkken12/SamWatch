/*const passport = require('passport')
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

/*passport.use('local-login',
    new LocalStrategy({
        usernameField: 'adminName', //form 이름과 동일
        passwordField: 'password', // form 이름과 동일
        passReqToCallback: true
    })
)

passport.use(new LocalStrategy({
    usernameField: 'adminName',
    passwordField : 'password',
    passReqToCallback : true//request callback 여부
},
function (req, adminName, password, done)
{
    User.findOne({ adminName: adminName, password: crypto.createHash('sha512').update(password).digest('base64')}, function(err, user){
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

module.exports = passport
*/