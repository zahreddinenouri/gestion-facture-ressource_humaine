const mongoose = require('mongoose');

const salaireSchema = mongoose.Schema({
	employerID: String,
	employerName: String,
	curdate: String,
	curYear: String,
	salaire: Number
});

const salaire = mongoose.model('Salaire', salaireSchema);
module.exports = salaire;
