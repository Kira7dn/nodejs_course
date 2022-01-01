const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const User = new Schema({
    name: { type: String, default: '' },
    email: { type: String, default:''},
    password: { type: String, default:''},
    level: { type: String, default:''},
    slug: { type: String, slug: 'name', unique: true},

  },{
    timestamps:true,
  });

  // Set Plugin
  mongoose.plugin(slug);
  User.plugin(mongoose_delete, { 
    deletedAt : true, 
    overrideMethods: true, 
  });

  module.exports = mongoose.model('User', User);