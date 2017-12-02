const User = require('../models/user');

module.exports = (router) => {

    router.post('/register', (req, res) => {
        if(!req.body.email) {
            res.json({ success: false, message:'Vui lòng nhập email!'});
        } else {
            if(!req.body.username) {
                res.json({ success: false, message:'Vui lòng nhập username!'});
            } else {
                if (!req.body.password) {
                    res.json({ success: false, message:'Vui lòng nhập password!'});
                } else {
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    });
                    // Luu user vao database
                    user.save((err)=> {
                        if(err)
                        {
                            if(err.code == 11000)
                            {
                                res.json({ success: false, message:'Username or Email đã tồn tại!'});
                            }
                            else
                            {
                                if(err.errors)
                                {
                                    if(err.errors.email)
                                    {
                                        res.json({ success: false, message: err.errors.email.message});
                                    }
                                    else
                                    {
                                        if (err.errors.username)
                                        {
                                            res.json({ success: false, message: err.errors.username.message });
                                        }
                                        else
                                        {
                                        if (err.errors.password)
                                        {
                                            res.json({ success: false, message: err.errors.password.message });
                                        }
                                        else
                                        {
                                            res.json({ success: false, message: err });
                                        }
                                }
                            }
                        }
                        else
                        {
                            res.json({ success: false, message: 'Đăng kí user thất bại!'});
                        }
                    }
                } else {
                    res.json ({ success: true, message:'Đăng kí user thành công'});
                }
                    });
                }
            }
        }
    });

    router.get('/checkEmail/:email', (req, res) => {
        if (!req.params.email) {
          res.json({ success: false, message: 'E-mail chưa được nhập' });
        } else {
          // Tim kiem email cua user trong database;
          User.findOne({ email: req.params.email }, (err, user) => {
            if (err) {
              res.json({ success: false, message: err });
            } else {
              // Kiem tra neu email da duoc su dung
              if (user) {
                res.json({ success: false, message: 'E-mail đã có người sử dụng' });
              } else {
                res.json({ success: true, message: 'E-mail hợp lệ' });
              }
            }
          });
        }
      });

    router.get('/checkUsername/:username', (req, res) => {
        if (!req.params.username) {
          res.json({ success: false, message: 'Username chưa được nhập vào' });
        } else {
          // Tim kiem username trong database
          User.findOne({ username: req.params.username }, (err, user) => {
            // Kiem tra neu thay loi ket noi
            if (err) {
              res.json({ success: false, message: err });
            } else {
              // Kiem tra neu tim thay username cua nguoi su dung
              if (user) {
                res.json({ success: false, message: 'Username đã được sử dụng!' });
              } else {
                res.json({ success: true, message: 'Username hợp lệ' });
              }
            }
          });
        }
      });


    return router;
}