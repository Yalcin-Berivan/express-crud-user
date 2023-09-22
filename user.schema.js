const mongoose = require('mongoose');


const User = new mongoose.Schema({
    name: String,
    age: Number,
    city: String,
    mezuniyetDurumu:String,
    sevdigiYemek:String
  });
  
  const UserModel = mongoose.model('User', User);

  module.exports= UserModel;