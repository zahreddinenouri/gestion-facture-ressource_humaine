const mongoose = require('mongoose');

const devisSchema = mongoose.Schema({
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

const devis = mongoose.model('Devis', devisSchema);
module.exports = devis;
