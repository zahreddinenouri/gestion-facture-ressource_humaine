import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployerService } from 'src/app/service/employer.service';

@Component({
	selector: 'app-add-employes',
	templateUrl: './add-employes.component.html',
	styleUrls: [ './add-employes.component.css' ]
})
export class AddEmployesComponent implements OnInit {
	addEmployesForm: FormGroup;
	employes: any = {};
	constructor(private formBuilder: FormBuilder, private employerService: EmployerService, private router: Router) {}

	ngOnInit() {
		this.addEmployesForm = this.formBuilder.group({
			name: [ '' ],
			cin: [ '' ],
			Adress: [ '' ],
			dateDeN: [ '' ],
			email: [ '' ],
			tel: [ '' ],
			contrat: [ '' ],
			post: [ '' ],
			SalaireParJ: [ '' ],
			jourDuMois: [ '' ]
		});
	}
	addEmployes() {
		this.employerService.addEmployes(this.employes).subscribe((data) => {
			console.log(data.message);
			this.router.navigate([ 'employes' ]);
		});
	}
}
