import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FactureService } from 'src/app/service/facture.service';

@Component({
	selector: 'app-factures',
	templateUrl: './factures.component.html',
	styleUrls: [ './factures.component.css' ]
})
export class FacturesComponent implements OnInit {
	facture: any;

	constructor(private factureService: FactureService, private router: Router) {}

	ngOnInit() {
		this.getAllFacture();
	}
	goToEditFacture(id) {
		this.router.navigate([ `edit-facture/${id}` ]);
	}
	deleteFacture(id) {
		this.factureService.deleteFacture(id).subscribe((data) => {
			console.log(data.message);

			this.getAllFacture();
		});
	}
	getAllFacture() {
		this.factureService.getAllFactures().subscribe((data) => {
			this.facture = data.factures;
		});
	}
	displayFacture(id) {
		this.router.navigate([ `info-facture/${id}` ]);
	}
}
