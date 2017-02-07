var mongoose = require('mongoose');  
var blobSchema = new mongoose.Schema({  
  events_name: String,
  events_month: String,
  events_date: Number,
  events_day: String,
  events_cat: String,
  events_typ: String,
  dob: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Blob', blobSchema);