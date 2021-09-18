const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique : true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    hash_password: {
        type: String
    },
    role : {
        type : String,
        enum : ['user','admin', ''],
        default : 'user'
    }
 
},{timestamps: true});


userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
  });
  
  userSchema.methods = {
    authenticate:  async function (password) {
      return  await bcrypt.compareSync(password, this.hash_password);
    },
  };
  


const UserModel = mongoose.model("User",userSchema);

module.exports = UserModel;