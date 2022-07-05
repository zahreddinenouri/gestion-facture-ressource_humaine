import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevisService } from 'src/app/service/devis.service';

@Component({
	selector: 'app-devis-client',
	templateUrl: './devis-client.component.html',
	styleUrls: [ './devis-client.component.css' ]
})
export class DevisClientComponent implements OnInit {
	devisClient: any;
	id: any;

	constructor(private devisService: DevisService, private router: Router) {}

	ngOnInit() {
		this.id = JSON.parse(localStorage.getItem('connectedClient'));
		this.getAllDevis();
	}
	goToEditDevis(id) {
		this.router.navigate([ `edit-devis/${id}` ]);
	}
	deleteDevis(id) {
		this.devisService.deleteDevisClient(id).subscribe((data) => {
			console.log(data.message);

			this.getAllDevis();
		});
	}
	getAllDevis() {
		this.devisService.getDevisClientById(this.id).subscribe((data) => {
			this.devisClient = data.devis;
			console.log(this.devisClient);
		});
	}
	displayDevis(id) {
		this.router.navigate([ `info-devisClient/${id}` ]);
	}
}
