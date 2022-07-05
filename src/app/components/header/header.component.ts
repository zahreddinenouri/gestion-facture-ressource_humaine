import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { User } from '../../../../backend/models/user';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
	userIsAuthenticated: User;
	clientIsAuthenticated: User;
	connecteduserName: string = 'welcome';
	constructor(private authService: AuthServiceService, private router: Router) {}

	ngOnInit() {
		this.authService.currentUser.subscribe((x) => (this.userIsAuthenticated = x));
		this.authService.currentClient.subscribe((x) => (this.clientIsAuthenticated = x));
		let connectedUserFirstName = JSON.parse(localStorage.getItem('connectedUserFirstName'));
		let connectedUserLastName = JSON.parse(localStorage.getItem('connectedUserLastName'));
		this.connecteduserName = 'welcome' + ' ' + connectedUserFirstName + ' ' + connectedUserLastName;
	}

	logout() {
		this.authService.logout();
		this.router.navigate([ '/' ]);
	}
}
