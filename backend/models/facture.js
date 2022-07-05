const mongoose = require('mongoose');

const factureSchema = mongoose.Schema({
	userID: String,
	clientName: String,
	clientEmail: String,
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

const facture = mongoose.model('Facture', factureSchema);
module.exports = facture;
