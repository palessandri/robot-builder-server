//Widget model
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Project   = new Schema({
	name: String,
	widgets: [{type: Schema.Types.ObjectId, ref: 'Widget'}]
});

module.exports = mongoose.model('Project', Project);
