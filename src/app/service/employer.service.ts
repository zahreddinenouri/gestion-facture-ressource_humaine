import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class EmployerService {
	empUrl = 'http://localhost:3000/employer';
	congeUrl = 'http://localhost:3000/conge';
	salaireUrl = 'http://localhost:3000/salaire';

	constructor(private httpClient: HttpClient) {}
	addEmployes(employer: any) {
		return this.httpClient.post<{ message: string }>(this.empUrl, employer);
	}
	getAllEmployer() {
		return this.httpClient.get<{ employer: any }>(this.empUrl);
	}
	deleteEmployer(id: any) {
		return this.httpClient.delete<{ message: string }>(`${this.empUrl}/${id}`);
	}
	getEmployerById(id: any) {
		return this.httpClient.get<{ employer: any }>(`${this.empUrl}/${id}`);
	}
	addConge(conge) {
		return this.httpClient.post<{ message: string }>(this.congeUrl, conge);
	}
	getAllConge() {
		return this.httpClient.get<{ conge: any }>(this.congeUrl);
	}
	deleteConge(id: any) {
		return this.httpClient.delete<{ message: string }>(`${this.congeUrl}/${id}`);
	}
	getCongeByIdEmployer(id: any) {
		return this.httpClient.get<{ conge: any }>(`${this.congeUrl}/${id}`);
	}
	getCongeByIdEmployerAndDate(id: any) {
		return this.httpClient.get<{ conge: any }>(`${this.congeUrl}/date/${id}`);
	}
	addSalaire(salaire) {
		return this.httpClient.post<{ message: string }>(this.salaireUrl, salaire);
	}
	getsalaireById(id: any) {
		return this.httpClient.get<{ salaire: any }>(`${this.salaireUrl}/${id}`);
	}
}
