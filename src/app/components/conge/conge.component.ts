import { Component, OnInit } from '@angular/core';
import { EmployerService } from 'src/app/service/employer.service';

@Component({
	selector: 'app-conge',
	templateUrl: './conge.component.html',
	styleUrls: [ './conge.component.css' ]
})
export class CongeComponent implements OnInit {
	conge: [];

	constructor(private employerService: EmployerService) {}

	ngOnInit() {
		// this.getAllConge();

		this.employerService.getAllConge().subscribe((res) => {
			this.conge = res.conge;

			console.log(res);
			console.log('here data conge', this.conge);

			// for (let i = 0; i < data.conge.length; i++) {
			// 	this.S += data.conge[i].nbrDeJour;
			// 	console.log('hereS', this.S);
			// }
		});
	}

	deleteConge(id) {
		this.employerService.deleteConge(id).subscribe((data) => {
			console.log(data.message);
			this.getAllConge();
		});
	}
	getAllConge() {
		this.employerService.getAllConge().subscribe((data) => {
			this.conge = data.conge;
			console.log(data.conge);
		});
	}
}
