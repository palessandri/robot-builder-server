//Widget model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Widget = new Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    name: String,
    image: String
});

module.exports = mongoose.model('Widget', Widget);
