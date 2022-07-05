import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { EmployerService } from 'src/app/service/employer.service';

@Component({
	selector: 'app-add-conge',
	templateUrl: './add-conge.component.html',
	styleUrls: [ './add-conge.component.css' ]
})
export class AddCongeComponent implements OnInit {
	addCongeForm: FormGroup;
	conge: any = {};
	employerID: any;
	employerName: any;
	employer: any;
	curdate = (new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString();
	constructor(
		private formBuilder: FormBuilder,
		private employerService: EmployerService,
		private activatedRoute: ActivatedRoute,
		private route: Router
	) {}

	ngOnInit() {
		console.log(this.curdate);

		this.employerID = this.activatedRoute.snapshot.paramMap.get('id');
		this.addCongeForm = this.formBuilder.group({
			nbrDeJourNonPaye: [ '' ],
			nbrDeJour: [ '' ],
			from: [ '' ],
			to: [ '' ],
			avance: [ '' ],
			prime: [ '' ],
			supp: [ '' ]
		});
		this.employerService.getEmployerById(this.employerID).subscribe((data) => {
			this.employer = data.employer;
			this.employerName = data.employer.name;
		});
	}
	addConge() {
		this.conge.curdate = this.curdate;
		this.conge.employerID = this.employerID;
		this.conge.employerName = this.employerName;
		this.employerService.addConge(this.conge).subscribe((data) => {
			console.log(data.message);
		});
		this.route.navigate([ 'conge' ]);
	}
}
