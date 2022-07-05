import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevisService } from 'src/app/service/devis.service';
import { printDiv } from '../../modules/printDiv';
@Component({
	selector: 'app-info-client-devis',
	templateUrl: './info-client-devis.component.html',
	styleUrls: [ './info-client-devis.component.css' ]
})
export class InfoClientDevisComponent implements OnInit {
	id: any;
	devis: any;

	constructor(private activatedRoute: ActivatedRoute, private devisService: DevisService) {}

	ngOnInit() {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');

		this.devisService.getDevisClientByIddevis(this.id).subscribe((data) => {
			this.devis = data.devis;
			console.log(this.devis);
		});
	}
	printPage() {
		printDiv('registration');
	}
}
