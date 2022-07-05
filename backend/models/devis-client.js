const mongoose = require('mongoose');

const devisClientSchema = mongoose.Schema({
	userID: String,
	userLastName: String,
	userFirstName: String,
	clientAdress: String,
	clientPays: String,
	clientTel: String,
	date: String,
	reference: String,
	idProduit: String,
	descriptionProduit: String,
	prixHtProduit: Number,
	qtyProduit: Number,
	tvaProduit: Number
});

const devisClient = mongoose.model('DevisClient', devisClientSchema);
module.exports = devisClient;
