import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { DevisService } from 'src/app/service/devis.service';
import { printDiv } from '../../modules/printDiv';

@Component({
	selector: 'app-info-devis',
	templateUrl: './info-devis.component.html',
	styleUrls: [ './info-devis.component.css' ]
})
export class InfoDevisComponent implements OnInit {
	id: any;
	devis: any;
	user: any;
	userId: any;
	constructor(
		private activatedRoute: ActivatedRoute,
		private devisService: DevisService,
		private authService: AuthServiceService
	) {}

	ngOnInit() {
		this.userId = JSON.parse(localStorage.getItem('connectedUser'));
		this.id = this.activatedRoute.snapshot.paramMap.get('id');

		this.devisService.getDevisById(this.id).subscribe((data) => {
			this.devis = data.devis;
		});
		this.authService.getUserById(this.userId).subscribe((data) => {
			this.user = data.user;
		});
	}
	printPage() {
		printDiv('registration');
	}
}
