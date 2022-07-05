import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DevisService {
	devisUrl = 'http://localhost:3000/devis';
	devisClientUrl = 'http://localhost:3000/devis/client';
	constructor(private httpClient: HttpClient) {}
	//CRUD pour devis Admin
	getDevisById(id: any) {
		return this.httpClient.get<{ devis: any }>(`${this.devisUrl}/${id}`);
	}
	addDevis(devis: any) {
		return this.httpClient.post<{ message: string }>(this.devisUrl, devis);
	}

	updateDevis(devis: any) {
		return this.httpClient.put<{ message: string }>(`${this.devisUrl}/${devis._id}`, devis);
	}
	getAllDevis() {
		return this.httpClient.get<{ devis: any }>(this.devisUrl);
	}
	deleteDevis(id: any) {
		return this.httpClient.delete<{ message: string }>(`${this.devisUrl}/${id}`);
	}
	//CRUD pour devis client
	addDevisClient(devis: any) {
		return this.httpClient.post<{ message: string }>(this.devisClientUrl, devis);
	}
	getDevisClientById(id: any) {
		return this.httpClient.get<{ devis: any }>(`${this.devisClientUrl}/${id}`);
	}
	getDevisClientByIddevis(id: any) {
		return this.httpClient.get<{ devis: any }>(`${this.devisClientUrl}/idDevis/${id}`);
	}
	deleteDevisClient(id: any) {
		return this.httpClient.delete<{ message: string }>(`${this.devisClientUrl}/${id}`);
	}
}
