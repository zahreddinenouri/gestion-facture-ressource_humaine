const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	descriptionProduit: String,

	prixHtProduit: Number,
	tvaProduit: Number
});

const product = mongoose.model('Product', productSchema);
module.exports = product;
