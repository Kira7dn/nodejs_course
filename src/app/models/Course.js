const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const Course = new Schema({
    name: { type: String, default: '' },
    description: { type: String, default:''},
    image: { type: String, default:''},
    slug: { type: String, default:''},
    videoId: { type: String, default:''},
    level: { type: String, default:''},
    slug: { type: String, slug: 'name', unique: true},
    deleted: { type: String,  default: false},

  },{
    timestamps:true,
  });

  // Set Plugin
  mongoose.plugin(slug);
  Course.plugin(mongoose_delete, { 
    deletedAt : true, 
    overrideMethods: true, 
  });

  module.exports = mongoose.model('Course', Course);