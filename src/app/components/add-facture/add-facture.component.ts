import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FactureService } from 'src/app/service/facture.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
	selector: 'app-add-facture',
	templateUrl: './add-facture.component.html',
	styleUrls: [ './add-facture.component.css' ]
})
export class AddFactureComponent implements OnInit {
	addFactureForm: FormGroup;
	facture: any = {};
	id: any;
	title: String;
	product: any;
	constructor(
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private factureService: FactureService,
		private router: Router,
		private productService: ProductService
	) {}

	ngOnInit() {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		if (this.id) {
			this.title = 'Modifier';
			this.factureService.getFactureById(this.id).subscribe((data) => {
				console.log('here data', data.facture);

				this.facture = data.facture;
			});
		} else {
			this.title = 'Ajouter';
		}
		this.addFactureForm = this.formBuilder.group({
			clientName: [ '' ],
			clientEmail: [ '' ],
			clientAdress: [ '' ],
			clientPays: [ '' ],
			clientTel: [ '' ],
			date: [ '' ],
			reference: [ '' ],
			idProduit: [ '' ],
			qtyProduit: [ '' ]
		});
		this.productService.getAllProduct().subscribe((data) => {
			this.product = data.product;
			console.log(this.product);
		});
	}
	addEditFacture() {
		if (this.id) {
			this.productService.getProductById(this.facture.idProduit).subscribe((res) => {
				this.facture.descriptionProduit = res.product.descriptionProduit;
				this.facture.prixHtProduit = res.product.prixHtProduit;

				this.facture.tvaProduit = res.product.tvaProduit;
				this.factureService.updateFacture(this.facture).subscribe((data) => {
					console.log(data.message);
				});
			});

			this.router.navigate([ 'factures' ]);
		} else {
			this.facture.userID = JSON.parse(localStorage.getItem('connectedUser'));
			this.productService.getProductById(this.facture.idProduit).subscribe((res) => {
				this.facture.descriptionProduit = res.product.descriptionProduit;
				this.facture.prixHtProduit = res.product.prixHtProduit;

				this.facture.tvaProduit = res.product.tvaProduit;
				this.factureService.addFacture(this.facture).subscribe((data) => {
					console.log(data.message);
				});
			});

			this.router.navigate([ 'factures' ]);
		}
	}
}
