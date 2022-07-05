import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	productUrl = 'http://localhost:3000/product';
	constructor(private httpClient: HttpClient) {}
	getProductById(id: any) {
		return this.httpClient.get<{ product: any }>(`${this.productUrl}/${id}`);
	}
	addProduct(product: any) {
		return this.httpClient.post<{ message: string }>(this.productUrl, product);
	}
	updateProduct(product: any) {
		return this.httpClient.put<{ message: string }>(`${this.productUrl}/${product._id}`, product);
	}
	getAllProduct() {
		// Action :Get , Address: /facture
		return this.httpClient.get<{ product: any }>(this.productUrl);
	}
	deleteProduct(id: any) {
		return this.httpClient.delete<{ message: string }>(`${this.productUrl}/${id}`);
	}
}
