//Widget model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Widget = new Schema({
    name      : String,
    imageURL  : String,
    paramCount: Number,
    parameters: [String]
});

module.exports = mongoose.model('Widget', Widget);
