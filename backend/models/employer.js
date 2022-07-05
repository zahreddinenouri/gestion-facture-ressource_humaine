const mongoose = require('mongoose');

const employerSchema = mongoose.Schema({
	name: String,
	cin: String,
	Adress: String,
	dateDeN: String,
	email: String,
	tel: String,
	contrat: String,
	post: String,
	SalaireParJ: Number,
	jourDuMois: Number
});

const employer = mongoose.model('Employer', employerSchema);
module.exports = employer;
