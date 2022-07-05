import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevisService } from 'src/app/service/devis.service';

@Component({
	selector: 'app-devis',
	templateUrl: './devis.component.html',
	styleUrls: [ './devis.component.css' ]
})
export class DevisComponent implements OnInit {
	devis: any;

	constructor(private devisService: DevisService, private router: Router) {}

	ngOnInit() {
		this.getAllDevis();
	}
	goToEditDevis(id) {
		this.router.navigate([ `edit-devis/${id}` ]);
	}
	deleteDevis(id) {
		this.devisService.deleteDevis(id).subscribe((data) => {
			console.log(data.message);

			this.getAllDevis();
		});
	}
	getAllDevis() {
		this.devisService.getAllDevis().subscribe((data) => {
			this.devis = data.devis;
			console.log(this.devis);
		});
	}
	displayDevis(id) {
		this.router.navigate([ `info-devis/${id}` ]);
	}
}
