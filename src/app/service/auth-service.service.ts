import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../backend/models/user';

@Injectable({
	providedIn: 'root'
})
export class AuthServiceService {
	userUrl = 'http://localhost:3000/api/users';

	private currentUserSubject: BehaviorSubject<User>;
	private currentClientSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;
	public currentClient: Observable<User>;
	constructor(private httpClient: HttpClient, private router: Router) {
		this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('connectedUser')));
		this.currentClientSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('connectedClient')));
		this.currentUser = this.currentUserSubject.asObservable();
		this.currentClient = this.currentClientSubject.asObservable();
	}
	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}
	addUser(user) {
		return this.httpClient.post<{ message: string }>(`${this.userUrl}/signup`, user);
	}
	login(user) {
		return this.httpClient.post<{ user: any }>(`${this.userUrl}/login`, user).subscribe((res) => {
			console.log(res);

			if (res.user.role == 'user') {
				localStorage.setItem('connectedClient', JSON.stringify(res.user.id));
				localStorage.setItem('connectedUserFirstName', JSON.stringify(res.user.firstName));
				localStorage.setItem('connectedUserLastName', JSON.stringify(res.user.lastName));
				this.router.navigate([ '/' ]);
				this.currentClientSubject.next(user);
			} else {
				localStorage.setItem('connectedUser', JSON.stringify(res.user.id));
				localStorage.setItem('connectedUserFirstName', JSON.stringify(res.user.firstName));
				localStorage.setItem('connectedUserLastName', JSON.stringify(res.user.lastName));
				this.router.navigate([ '/' ]);
				this.currentUserSubject.next(user);
			}

			return user;
		});
	}
	logout() {
		localStorage.removeItem('connectedClient');
		localStorage.removeItem('connectedUser');
		localStorage.removeItem('connectedUserFirstName');
		localStorage.removeItem('connectedUserLastName');
		this.currentUserSubject.next(null);
	}
	getUserById(id: any) {
		return this.httpClient.get<{ user: any }>(`${this.userUrl}/${id}`);
	}
}
