import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployerService } from 'src/app/service/employer.service';

@Component({
	selector: 'app-employes',
	templateUrl: './employes.component.html',
	styleUrls: [ './employes.component.css' ]
})
export class EmployesComponent implements OnInit {
	employer: any;
	constructor(private employerService: EmployerService, private route: Router) {}

	ngOnInit() {
		this.getAllEmployer();
	}
	getAllEmployer() {
		this.employerService.getAllEmployer().subscribe((data) => {
			this.employer = data.employer;
		});
	}
	deleteEmployer(id) {
		this.employerService.deleteEmployer(id).subscribe((data) => {
			this.getAllEmployer();
			console.log(data.message);
		});
	}
	goToAddConge(id) {
		this.route.navigate([ `add-conge/${id}` ]);
	}
	displayFiche(id) {
		this.route.navigate([ `info-fiche/${id}` ]);
	}
	displaySalaire(id) {
		this.route.navigate([ `salaire/${id}` ]);
	}
}
