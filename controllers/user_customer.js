const User_customer = require("../models/user_customer");
const _ = require("lodash");



exports.getUserById = (req, res, next, id) => {
  User_customer.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  let {name,email,phone,address} = req.body
  let user = {}
  if(name){
    user={...user,name}
  }
  if(email){
    user={...user,email}
  }
  if(phone){
    user={...user,phone}
  }
  if(address){
    user={...user,address}
  }

  let customer = req.profile
  customer = _.extend(customer,user)
  console.log(customer)
  
  
  // user.save((err, user) => {
  //   if (err) {
  //     res.status(400).json({
  //       error: "Updation of Customer data failed"
  //     });
  //   }
  //   res.json(user);
  // });

  User_customer.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: customer },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user"
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

