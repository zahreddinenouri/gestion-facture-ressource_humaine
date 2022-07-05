import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	signinForm: FormGroup;
	constructor(private formBuilder: FormBuilder, private authService: AuthServiceService) {}

	ngOnInit() {
		this.signinForm = this.formBuilder.group({
			email: [ '' ],
			pwd: [ '' ]
		});
	}
	Signin(user) {
		this.authService.login(user);
	}
}
