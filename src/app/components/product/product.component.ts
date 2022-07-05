import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: [ './product.component.css' ]
})
export class ProductComponent implements OnInit {
	product: any;

	constructor(private productService: ProductService, private router: Router) {}

	ngOnInit() {
		this.getAllProduct();
	}
	goToEditFacture(id) {
		this.router.navigate([ `edit-product/${id}` ]);
	}
	deleteFacture(id) {
		this.productService.deleteProduct(id).subscribe((data) => {
			console.log(data.message);

			this.getAllProduct();
		});
	}
	getAllProduct() {
		this.productService.getAllProduct().subscribe((data) => {
			this.product = data.product;
		});
	}
}
