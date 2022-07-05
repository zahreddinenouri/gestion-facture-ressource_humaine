import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DevisService } from 'src/app/service/devis.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
	selector: 'app-add-devis',
	templateUrl: './add-devis.component.html',
	styleUrls: [ './add-devis.component.css' ]
})
export class AddDevisComponent implements OnInit {
	addDevisForm: FormGroup;
	id: any;
	devis: any = {};
	product: any;
	title: String;

	constructor(
		private formBuilder: FormBuilder,
		private DevisService: DevisService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private productService: ProductService
	) {}

	ngOnInit() {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		if (this.id) {
			this.title = 'Modifier';
			this.DevisService.getDevisById(this.id).subscribe((data) => {
				this.devis = data.devis;
			});
		} else {
			this.title = 'Ajouter';
		}
		this.addDevisForm = this.formBuilder.group({
			clientName: [ '' ],
			clientEmail: [ '' ],
			clientAdress: [ '' ],
			clientPays: [ '' ],
			clientTel: [ '' ],
			idProduit: [ '' ],
			qtyProduit: [ '' ],
			date: [ '' ],
			reference: [ '' ]
		});
		this.productService.getAllProduct().subscribe((data) => {
			this.product = data.product;
			console.log(this.product);
		});
	}
	addEditDevis() {
		if (this.id) {
			this.productService.getProductById(this.devis.idProduit).subscribe((res) => {
				this.devis.descriptionProduit = res.product.descriptionProduit;
				this.devis.prixHtProduit = res.product.prixHtProduit;

				this.devis.tvaProduit = res.product.tvaProduit;
				this.DevisService.updateDevis(this.devis).subscribe((data) => {
					console.log(data.message);
				});
			});

			this.router.navigate([ 'devis' ]);
		} else {
			this.devis.userID = JSON.parse(localStorage.getItem('connectedUser'));

			this.productService.getProductById(this.devis.idProduit).subscribe((res) => {
				this.devis.descriptionProduit = res.product.descriptionProduit;
				this.devis.prixHtProduit = res.product.prixHtProduit;

				this.devis.tvaProduit = res.product.tvaProduit;
				this.DevisService.addDevis(this.devis).subscribe((data) => {
					console.log(data.message);
					console.log('here devis add', this.devis);
				});
			});

			this.router.navigate([ 'devis' ]);
		}
	}
}
