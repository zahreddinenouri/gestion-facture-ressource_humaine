import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: [ './add-product.component.css' ]
})
export class AddProductComponent implements OnInit {
	addProductForm: FormGroup;
	produit: any = {};
	id: any;
	title: String;
	constructor(
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private productService: ProductService,
		private router: Router
	) {}

	ngOnInit() {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		if (this.id) {
			this.title = 'Modifier';
			this.productService.getProductById(this.id).subscribe((data) => {
				console.log('here data', data.product);

				this.produit = data.product;
			});
		} else {
			this.title = 'Ajouter';
		}
		this.addProductForm = this.formBuilder.group({
			descriptionProduit: [ '' ],

			prixHtProduit: [ '' ],
			tvaProduit: [ '' ]
		});
	}
	addEditproduct() {
		if (this.id) {
			this.productService.updateProduct(this.produit).subscribe((data) => {
				console.log(data.message);
			});
			this.router.navigate([ 'product' ]);
		} else {
			this.productService.addProduct(this.produit).subscribe((data) => {
				console.log(data.message);
			});
			this.router.navigate([ 'product' ]);
		}
	}
}
