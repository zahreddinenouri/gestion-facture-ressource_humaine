import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployerService } from 'src/app/service/employer.service';
import { printDiv } from '../../modules/printDiv';

@Component({
	selector: 'app-fiche-salaire',
	templateUrl: './fiche-salaire.component.html',
	styleUrls: ['./fiche-salaire.component.css']
})
export class FicheSalaireComponent implements OnInit {
	employer: any;
	conge: any;
	id: any;
	congeEmp: any;
	curdate = (new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString();

	curYear = new Date().getFullYear();
	total = 0;
	private value;
	total2 = 0;
	private value2;
	salaire: any = {};
	employerID: any;
	employerName: any;
	employerNbrJ: any;
	SalaireParJ: any;
	constructor(private activatedRouted: ActivatedRoute, private employerService: EmployerService) { }

	ngOnInit() {
		this.id = this.activatedRouted.snapshot.paramMap.get('id');
		this.employerService.getEmployerById(this.id).subscribe((data) => {
			this.employer = data.employer;
			console.log(this.employer);
			this.employerID = data.employer._id;
			this.employerName = data.employer.name;
			this.employerNbrJ = data.employer.jourDuMois;
			this.SalaireParJ = data.employer.SalaireParJ;
		});
		this.employerService.getCongeByIdEmployer(this.id).subscribe((data) => {
			this.conge = data.conge;
			console.log('here conge ', this.conge);
		});
		this.employerService.getCongeByIdEmployerAndDate(this.id).subscribe((res) => {
			this.congeEmp = res.conge;
			this.findsum(this.congeEmp);
			this.findsum2(this.congeEmp);
			console.log('here array conge', this.congeEmp);
		});
	}
	findsum(res) {
		this.value = res;

		for (let j = 0; j < res.length; j++) {
			this.total += this.value[j].nbrDeJour;
		}
	}
	findsum2(res) {
		this.value2 = res;

		for (let j = 0; j < res.length; j++) {
			this.total2 += this.value2[j].nbrDeJourNonPaye;
		}
	}
	printPage() {
		printDiv('registration');
		this.salaire.curdate = this.curdate;
		this.salaire.employerID = this.employerID;
		this.salaire.employerName = this.employerName;
		this.salaire.curYear = this.curYear;
		this.salaire.salaire = (this.employerNbrJ - this.total) * this.SalaireParJ;

		this.employerService.addSalaire(this.salaire).subscribe((data) => {
			console.log(data.message);
		});
	}
}
