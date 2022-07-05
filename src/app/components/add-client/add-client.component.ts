import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienService } from 'src/app/service/clien.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  addEmployesForm: FormGroup;
	employes: any = {};
	constructor(private formBuilder: FormBuilder, private employerService: ClienService, private router: Router) {}

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
