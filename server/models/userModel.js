const mongoose = require('mongoose');
const models = {
  user: {
    'user': {type: String, require: 'true'},
    'pwd': {type: String, require: 'true'},
    'type': {type: String, require: 'true'},
    'avatar': {type: String},
    'desc': {type: String},
    //职位名
    'position': {type: String},
    // 如果是boss
    'money': {type: String},
    'compony': {type: String}
  }
};

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
}
module.exports = {
  getModel: function (name) {
    return mongoose.model(name);
  }
};