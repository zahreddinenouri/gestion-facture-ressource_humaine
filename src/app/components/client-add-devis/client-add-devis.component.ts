import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DevisService } from 'src/app/service/devis.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
	selector: 'app-client-add-devis',
	templateUrl: './client-add-devis.component.html',
	styleUrls: [ './client-add-devis.component.css' ]
})
export class ClientAddDevisComponent implements OnInit {
	addClientDevisForm: FormGroup;
	id: any;
	devisClient: any = {};
	product: any;

	constructor(
		private formBuilder: FormBuilder,
		private DevisService: DevisService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private productService: ProductService
	) {}

	ngOnInit() {
		this.addClientDevisForm = this.formBuilder.group({
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
	addClientDevis() {
		this.devisClient.userID = JSON.parse(localStorage.getItem('connectedClient'));
		this.devisClient.userLastName = JSON.parse(localStorage.getItem('connectedUserLastName'));
		this.devisClient.userFirstName = JSON.parse(localStorage.getItem('connectedUserFirstName'));

		this.productService.getProductById(this.devisClient.idProduit).subscribe((res) => {
			this.devisClient.descriptionProduit = res.product.descriptionProduit;
			this.devisClient.prixHtProduit = res.product.prixHtProduit;

			this.devisClient.tvaProduit = res.product.tvaProduit;
			this.DevisService.addDevisClient(this.devisClient).subscribe((data) => {
				console.log(data.message);
				console.log('here devis add', this.devisClient);
			});
		});

		this.router.navigate([ 'devis-client' ]);
	}
}
