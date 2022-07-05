import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployerService } from 'src/app/service/employer.service';

@Component({
	selector: 'app-salaire',
	templateUrl: './salaire.component.html',
	styleUrls: ['./salaire.component.css']
})
export class SalaireComponent implements OnInit {
	salaire: any;
	id: any;
	total = 0;
	private value;
	constructor(private employerService: EmployerService, private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		this.employerService.getsalaireById(this.id).subscribe((data) => {
			this.salaire = data.salaire;
			console.log(this.salaire);
			this.findsum(this.salaire);
		});
	}
	findsum(data) {
		this.value = data;
		console.log('here value', this.value);
		for (let j = 0; j < data.length; j++) {
			this.total += this.value[j].salaire;
		}
		console.log('here total', this.total);
	}
}
