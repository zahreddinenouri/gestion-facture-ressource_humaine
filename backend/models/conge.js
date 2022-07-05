const mongoose = require('mongoose');

const congeSchema = mongoose.Schema({
	employerName: String,
	curdate: String,
	employerID: String,
	nbrDeJourNonPaye: Number,
	nbrDeJour: Number,
	from: String,
	to: String,
	avance: Number,
	prime: Number,
	supp: Number
});

const conge = mongoose.model('Conge', congeSchema);
module.exports = conge;
