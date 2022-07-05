import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class FactureService {
	factureUrl = 'http://localhost:3000/facture';
	constructor(private httpClient: HttpClient) {}
	getFactureById(id: any) {
		return this.httpClient.get<{ facture: any }>(`${this.factureUrl}/${id}`);
	}
	addFacture(facture: any) {
		return this.httpClient.post<{ message: string }>(this.factureUrl, facture);
	}
	updateFacture(facture: any) {
		return this.httpClient.put<{ message: string }>(`${this.factureUrl}/${facture._id}`, facture);
	}
	getAllFactures() {
		// Action :Get , Address: /facture
		return this.httpClient.get<{ factures: any }>(this.factureUrl);
	}
	deleteFacture(id: any) {
		return this.httpClient.delete<{ message: string }>(`${this.factureUrl}/${id}`);
	}
}
