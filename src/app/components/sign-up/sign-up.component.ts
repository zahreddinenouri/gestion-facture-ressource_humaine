import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { mustMatch } from 'src/app/modules/mustMatch';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: [ './sign-up.component.css' ]
})
export class SignUpComponent implements OnInit {
	signupForm: FormGroup;
	role: string;
	constructor(private formBuilder: FormBuilder, private authService: AuthServiceService, private router: Router) {
		this.router.events
			.pipe(filter((e) => e instanceof NavigationEnd))
			.subscribe((event) => this.postRoleToDb(event));
	}

	ngOnInit() {
		this.signupForm = this.formBuilder.group(
			{
				firstName: [ '', [ Validators.minLength(5), Validators.required ] ],
				lastName: [ '', [ Validators.minLength(3), Validators.required ] ],
				email: [ '', [ Validators.email, Validators.required ] ],
				pwd: [ '', Validators.required ],
				confirmPwd: [],
				role: [ this.role ]
			},
			{
				validator: mustMatch('pwd', 'confirmPwd')
			}
		);
	}
	postRoleToDb(location) {
		if (location.url === '/admin/sign-up') {
			this.role = 'admin';
		} else {
			this.role = 'user';
		}
	}
	signup(user) {
		this.authService.addUser(user).subscribe((data) => {
			console.log(data.message);
		});
	}
}
