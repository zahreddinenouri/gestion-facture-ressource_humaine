import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { FactureService } from 'src/app/service/facture.service';
import { printDiv } from '../../modules/printDiv';

@Component({
	selector: 'app-info-facture',
	templateUrl: './info-facture.component.html',
	styleUrls: [ './info-facture.component.css' ]
})
export class InfoFactureComponent implements OnInit {
	id: any;
	facture: any;
	user: any;
	userId: any;
	constructor(
		private activatedRoute: ActivatedRoute,
		private factureService: FactureService,
		private authService: AuthServiceService
	) {}

	ngOnInit() {
		this.userId = JSON.parse(localStorage.getItem('connectedUser'));
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		// this.match = searchById(this.id, 'matches');
		this.factureService.getFactureById(this.id).subscribe((data) => {
			this.facture = data.facture;
		});
		this.authService.getUserById(this.userId).subscribe((data) => {
			this.user = data.user;
		});
	}

	printPage() {
		printDiv('registration');
	}
}
