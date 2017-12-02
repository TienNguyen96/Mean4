const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


// Validate Function to check e-mail length
let emailLengthChecker = (email) => {
    // Kiem tra neu email ton tai
    if (!email) {
      return false; 
    } else {
      // Kiem tra chieu dai email
      if (email.length < 5 || email.length > 30) {
        return false; 
      } else {
        return true; 
      }
    }
  };
  
  // Kiem tra format co dung cua email khong
  let validEmailChecker = (email) => {
    // Neu email khong ton tai thi bao loi
    if (!email) {
      return false; 
    } else {
      // Regular expression to test for a valid e-mail
      const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      return regExp.test(email); // Return regular expression test results (true or false)
    }
  };
  
  // Validator cua email
  const emailValidators = [
    {
      validator: emailLengthChecker,
      message: 'E-mail phai co it nhat 5 va nho hon 30 ky tu'
    },
    {
      validator: validEmailChecker,
      message: 'Email phai hop le'
    }
  ];
  
  // 
  let usernameLengthChecker = (username) => {
    // 
    if (!username) {
      return false; 
    } else {
      // 
      if (username.length < 5 || username.length > 15) {
        return false; 
      } else {
        return true; 
      }
    }
  };
  
  // 
  let validUsername = (username) => {
    // 
    if (!username) {
      return false; 
    } else {
      // Regular expression to test if username format is valid
      const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
      return regExp.test(username); // Return regular expression test result (true or false)
    }
  };
  
  // 
  const usernameValidators = [
    // 
    {
      validator: usernameLengthChecker,
      message: 'Username phai co it nhat 5 va nho hon 15 ky tu'
    },
    // 
    {
      validator: validUsername,
      message: 'Username khong duoc co ky tu dac biet'
    }
  ];
  
  // 
  let passwordLengthChecker = (password) => {
    // 
    if (!password) {
      return false; 
    } else {
      // Check password length
      if (password.length < 8 || password.length > 35) {
        return false; 
      } else {
        return true; 
      }
    }
  };
  
  // 
  let validPassword = (password) => {
    // 
    if (!password) {
      return false; 
    } else {
      // Regular Expression to test if password is valid format
      const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
      return regExp.test(password); // Return regular expression test result (true or false)
    }
  };
  
  // 
  const passwordValidators = [
    //
    {
      validator: passwordLengthChecker,
      message: 'Mat khau phai co it nhat 8 va nho hon 35 ky tu'
    },
    // 
    {
      validator: validPassword,
      message: ' Mat khau it nhat phai co 1 chu hoa, chu thuong, ky tu dac biet va so'
    }
  ];
  

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
    username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
    password: { type: String, required: true, validate: passwordValidators }
});

userSchema.pre('save', function(next){
    if(!this.isModified('password'))
    return next();

    bcrypt.hash(this.password, null, null, (err, hash)=>{
        if(err) return next(err);
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = (password) =>{
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);