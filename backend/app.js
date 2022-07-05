// import express module
const express = require('express');
// import body-parse module
const bodyParser = require('body-parser');
// import mongoose module
const mongoose = require('mongoose');
// import bcrypt module
const bcrypt = require('bcrypt');
// import pdfkit-tables module
const fs = require('fs');
// import nodeMailler module
const nodemailer = require('nodemailer');

// import  module path predefini en node js
const path = require('path');
// import  module request predefini en node js
const request = require('request');
// import  module https predefini en node js
const https = require('https');

// import les models
const User = require('./models/user');
const Facture = require('./models/facture');
const Devis = require('./models/devis');
const Employer = require('./models/employer');
const Conge = require('./models/conge');
const Salaire = require('./models/salaire');
const Product = require('./models/product');
const DevisClient = require('./models/devis-client');
const { json } = require('body-parser');

// create express App
const app = express();

// configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// configure path
app.use('/images', express.static(path.join('backend/images')));

// Security configuration
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-with, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PATCH, PUT');
	next();
});
// connect mongoose
mongoose.connect('mongodb://localhost:27017/factureDB', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

// traitement logique add user
app.post('/api/users/signup', (req, res) => {
	bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
		console.log('here in post all users', req.body);

		const user = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			pwd: cryptedPwd,
			role: req.body.role
		});
		// TRANSPORT node mailler
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'your email',
				pass: 'your passWord'
			}
		});
		// mailOptions node mailler
		var mailOptions = {
			from: 'zahreddine.nouri16@gmail.com',
			to: req.body.email,
			subject: 'Sending Email using Node.js',
			text: 'test ok '
			// attachments: [
			// 	{
			// 		filename: 'invoice.pdf',
			// 		path: __dirname + '../../invoice.pdf',
			// 		cid: 'uniq-invoice.pdf'
			// 	}
			// ]
		};

		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});

		user.save().then(
			res.status(200).json({
				message: 'user added successfully'
			})
			// 	}
			// })
		);
	});
});
// traitement logique auth user
app.post('/api/users/login', (req, res) => {
	User.findOne({ email: req.body.email })
		.then((findedUser) => {
			console.log('findedUser', findedUser);
			if (!findedUser) {
				res.status(200).json({
					message: '0'
				});
			}
			return bcrypt.compare(req.body.pwd, findedUser.pwd);
		})
		.then((correctUserPwd) => {
			if (!correctUserPwd) {
				res.status(200).json({
					message: '1'
				});
			}
			User.findOne({ email: req.body.email }).then((finalUser) => {
				let user = {
					id: finalUser._id,
					firstName: finalUser.firstName,
					lastName: finalUser.lastName,
					email: finalUser.email,

					role: finalUser.role
				};
				res.status(200).json({
					user: user,
					message: '2'
				});
			});
		});
});
// get user By Id
app.get('/api/users/:id', (req, res) => {
	console.log('here id user ', req.params.id);

	User.findOne({ _id: req.params.id }).then((findedObject) => {
		if (findedObject) {
			res.status(200).json({
				user: findedObject
			});
		}
	});
});
// traitement logique add facture
app.post('/facture', (req, res) => {
	const facture = new Facture({
		userID: req.body.userID,
		clientName: req.body.clientName,
		clientEmail: req.body.clientEmail,
		clientAdress: req.body.clientAdress,
		clientPays: req.body.clientPays,
		clientTel: req.body.clientTel,
		date: req.body.date,
		reference: req.body.reference,
		idProduit: req.body.idProduit,
		descriptionProduit: req.body.descriptionProduit,
		prixHtProduit: req.body.prixHtProduit,
		qtyProduit: req.body.qtyProduit,
		tvaProduit: req.body.tvaProduit
	});
	facture.save().then(
		res.status(200).json({
			message: 'facture added successfully'
		})
	);
});
// traitement logique de  get facture
app.get('/facture', (req, res) => {
	console.log('here in get all factures');
	Facture.find((err, docs) => {
		if (err) {
			console.log('error widh DB');
		} else {
			res.status(200).json({
				factures: docs
			});
		}
	});
});
// traitement logique de  get facture bY id
app.get('/facture/:id', (req, res) => {
	console.log('here id Facture ', req.params.id);

	Facture.findOne({ _id: req.params.id }).then((findedObject) => {
		if (findedObject) {
			res.status(200).json({
				facture: findedObject
			});
		}
	});
});
// traitement logique de  update facture bY id
app.put('/facture/:id', (req, res) => {
	console.log('here match is update');
	const facture = new Facture({
		_id: req.body._id,
		clientName: req.body.clientName,
		clientEmail: req.body.clientEmail,
		clientAdress: req.body.clientAdress,
		clientPays: req.body.clientPays,
		clientTel: req.body.clientTel,
		date: req.body.date,
		reference: req.body.reference,
		idProduit: req.body.idProduit,
		descriptionProduit: req.body.descriptionProduit,
		prixHtProduit: req.body.prixHtProduit,
		qtyProduit: req.body.qtyProduit,
		tvaProduit: req.body.tvaProduit
	});

	Facture.updateOne({ _id: req.params.id }, facture).then((result) => {
		if (result) {
			res.status(200).json({
				message: 'Facture updated'
			});
		}
	});
});
// traitement logique delete facture
app.delete('/facture/:id', (req, res) => {
	console.log('here facture is deleted', req.params.id);
	Facture.deleteOne({ _id: req.params.id }).then(
		res.status(200).json({
			message: 'Facture deleted successfully'
		})
	);
});
// traitement logique de  get devis
app.get('/devis', (req, res) => {
	console.log('here in get all devis');
	Devis.find((err, docs) => {
		if (err) {
			console.log('error widh DB');
		} else {
			res.status(200).json({
				devis: docs
			});
		}
	});
});
// traitement logique add devis
app.post('/devis', (req, res) => {
	const devis = new Devis({
		userID: req.body.userID,
		clientName: req.body.clientName,
		clientEmail: req.body.clientEmail,
		clientAdress: req.body.clientAdress,
		clientPays: req.body.clientPays,
		clientTel: req.body.clientTel,
		date: req.body.date,
		reference: req.body.reference,
		idProduit: req.body.idProduit,
		descriptionProduit: req.body.descriptionProduit,
		prixHtProduit: req.body.prixHtProduit,
		qtyProduit: req.body.qtyProduit,
		tvaProduit: req.body.tvaProduit
	});
	devis.save().then(
		res.status(200).json({
			message: 'devis added successfully'
		})
	);
});
app.get('/devis/:id', (req, res) => {
	console.log('here id devis ', req.params.id);

	Devis.findOne({ _id: req.params.id }).then((findedObject) => {
		if (findedObject) {
			res.status(200).json({
				devis: findedObject
			});
		}
	});
});
// traitement logique de  update devis bY id
app.put('/devis/:id', (req, res) => {
	console.log('here devis is update');
	const devis = new Devis({
		_id: req.body._id,
		clientName: req.body.clientName,
		clientEmail: req.body.clientEmail,
		clientAdress: req.body.clientAdress,
		clientPays: req.body.clientPays,
		clientTel: req.body.clientTel,
		date: req.body.date,
		reference: req.body.reference,
		idProduit: req.body.idProduit,
		descriptionProduit: req.body.descriptionProduit,
		prixHtProduit: req.body.prixHtProduit,
		qtyProduit: req.body.qtyProduit,
		tvaProduit: req.body.tvaProduit
	});

	Devis.updateOne({ _id: req.params.id }, devis).then((result) => {
		if (result) {
			res.status(200).json({
				message: 'devis updated'
			});
		}
	});
});
// traitement logique delete devis
app.delete('/devis/:id', (req, res) => {
	console.log('here devis is deleted', req.params.id);
	Devis.deleteOne({ _id: req.params.id }).then(
		res.status(200).json({
			message: 'Facture deleted successfully'
		})
	);
});
// traitement logique add employer
app.post('/employer', (req, res) => {
	const employer = new Employer({
		name: req.body.name,
		cin: req.body.cin,
		Adress: req.body.Adress,
		dateDeN: req.body.dateDeN,
		email: req.body.email,
		tel: req.body.tel,
		contrat: req.body.contrat,
		post: req.body.post,
		SalaireParJ: req.body.SalaireParJ,
		jourDuMois: req.body.jourDuMois
	});
	employer.save().then(
		res.status(200).json({
			message: 'employer added successfully'
		})
	);
});
// traitement logique de  get employer
app.get('/employer', (req, res) => {
	console.log('here in get all employer');
	Employer.find((err, docs) => {
		if (err) {
			console.log('error widh DB');
		} else {
			res.status(200).json({
				employer: docs
			});
		}
	});
});
// traitement logique delete employer
app.delete('/employer/:id', (req, res) => {
	console.log('here employer is deleted', req.params.id);
	Employer.deleteOne({ _id: req.params.id }).then(
		res.status(200).json({
			message: 'employer deleted successfully'
		})
	);
});

// traitement logique de  get employer bY id
app.get('/employer/:id', (req, res) => {
	console.log('here id employer ', req.params.id);

	Employer.findOne({ _id: req.params.id }).then((findedObject) => {
		if (findedObject) {
			res.status(200).json({
				employer: findedObject
			});
		}
	});
});
// traitement logique add conge
app.post('/conge', (req, res) => {
	const conge = new Conge({
		employerName: req.body.employerName,
		curdate: req.body.curdate,
		employerID: req.body.employerID,
		nbrDeJourNonPaye: req.body.nbrDeJourNonPaye,
		nbrDeJour: req.body.nbrDeJour,
		from: req.body.from,
		to: req.body.to,
		avance: req.body.avance,
		prime: req.body.prime,
		supp: req.body.supp
	});
	console.log(conge);
	conge.save().then(
		res.status(200).json({
			message: 'conge added successfully'
		})
	);
});
// traitement logique de  get congé
app.get('/conge', (req, res) => {
	console.log('here in get all conge');

	Conge.find((err, docs) => {
		if (err) {
			console.log('error widh DB');
		} else {
			res.status(200).json({
				conge: docs
			});
		}
	});
});
// traitement logique delete congé
app.delete('/conge/:id', (req, res) => {
	console.log('here conge is deleted', req.params.id);
	Conge.deleteOne({ _id: req.params.id }).then(
		res.status(200).json({
			message: 'conge deleted successfully'
		})
	);
});
// get conge by id employe
app.get('/conge/:id', (req, res) => {
	console.log('here id employer ', req.params.id);
	var datetime = (new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString();

	console.log(datetime);

	Conge.findOne({ employerID: req.params.id, curdate: datetime }).then((findedObject) => {
		if (findedObject) {
			res.status(200).json({
				conge: findedObject
			});
			console.log(findedObject);
		}
	});
});
// get conge by id employe and current date
app.get('/conge/date/:id', (req, res) => {
	console.log('here id employer ', req.params.id);
	var datetime = (new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString();

	console.log(datetime);

	Conge.find({ employerID: req.params.id, curdate: datetime }).then((findedObject) => {
		if (findedObject) {
			res.status(200).json({
				conge: findedObject
			});
			console.log('here conge by date', findedObject);
		}
	});
});
// traitement logique add salaire
app.post('/salaire', (req, res) => {
	const salaire = new Salaire({
		employerID: req.body.employerID,
		employerName: req.body.employerName,
		curdate: req.body.curdate,
		curYear: req.body.curYear,
		salaire: req.body.salaire
	});
	salaire.save().then(
		res.status(200).json({
			message: 'salaire added successfully'
		})
	);
});
// get salaire by id employe
app.get('/salaire/:id', (req, res) => {
	console.log('here id employer salaire ', req.params.id);

	Salaire.find({ employerID: req.params.id }).then((findedObject) => {
		if (findedObject) {
			res.status(200).json({
				salaire: findedObject
			});
			console.log(findedObject);
		}
	});
});
// traitement logique add product
app.post('/product', (req, res) => {
	const product = new Product({
		descriptionProduit: req.body.descriptionProduit,

		prixHtProduit: req.body.prixHtProduit,
		tvaProduit: req.body.tvaProduit
	});
	product.save().then(
		res.status(200).json({
			message: 'product added successfully'
		})
	);
});
// traitement logique de  get product
app.get('/product', (req, res) => {
	console.log('here in get all products');
	Product.find((err, docs) => {
		if (err) {
			console.log('error widh DB');
		} else {
			res.status(200).json({
				product: docs
			});
		}
	});
});
// traitement logique de  get product bY id
app.get('/product/:id', (req, res) => {
	console.log('here id product ', req.params.id);

	Product.findOne({ _id: req.params.id }).then((findedObject) => {
		if (findedObject) {
			res.status(200).json({
				product: findedObject
			});
		}
	});
});
// traitement logique de  update product bY id
app.put('/product/:id', (req, res) => {
	console.log('here product is update');
	const product = new Product({
		_id: req.body._id,
		descriptionProduit: req.body.descriptionProduit,

		prixHtProduit: req.body.prixHtProduit,
		tvaProduit: req.body.tvaProduit
	});

	Product.updateOne({ _id: req.params.id }, product).then((result) => {
		if (result) {
			res.status(200).json({
				message: 'product updated'
			});
		}
	});
});
// traitement logique delete product
app.delete('/product/:id', (req, res) => {
	console.log('here id product to deleted', req.params.id);
	Product.deleteOne({ _id: req.params.id }).then(
		res.status(200).json({
			message: 'product deleted successfully'
		})
	);
});
// traitement logique de  get devis client
app.get('/devis/client', (req, res) => {
	console.log('here in get all devis clinet');
	DevisClient.find((err, docs) => {
		if (err) {
			console.log('error widh DB');
		} else {
			res.status(200).json({
				devis: docs
			});
		}
	});
});
// traitement logique add devis client
app.post('/devis/client', (req, res) => {
	const devisClient = new DevisClient({
		userID: req.body.userID,
		userLastName: req.body.userLastName,
		userFirstName: req.body.userFirstName,
		clientAdress: req.body.clientAdress,
		clientPays: req.body.clientPays,
		clientTel: req.body.clientTel,
		date: req.body.date,
		reference: req.body.reference,
		idProduit: req.body.idProduit,
		descriptionProduit: req.body.descriptionProduit,
		prixHtProduit: req.body.prixHtProduit,
		qtyProduit: req.body.qtyProduit,
		tvaProduit: req.body.tvaProduit
	});
	devisClient.save().then(
		res.status(200).json({
			message: 'devis client added successfully'
		})
	);
});
// get devis client by id client
app.get('/devis/client/:id', (req, res) => {
	console.log('here id devis client ', req.params.id);

	DevisClient.find({ userID: req.params.id }).then((findedObject) => {
		if (findedObject) {
			res.status(200).json({
				devis: findedObject
			});
		}
	});
});
// get devis client by id devis
app.get('/devis/client/idDevis/:id', (req, res) => {
	console.log('here id devis client ', req.params.id);

	DevisClient.findOne({ _id: req.params.id }).then((findedObject) => {
		if (findedObject) {
			res.status(200).json({
				devis: findedObject
			});
		}
	});
});

// traitement logique delete devis client
app.delete('/devis/client/:id', (req, res) => {
	console.log('here devis is deleted', req.params.id);
	DevisClient.deleteOne({ _id: req.params.id }).then(
		res.status(200).json({
			message: 'devis client deleted successfully'
		})
	);
});

module.exports = app;
