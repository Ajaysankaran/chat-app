import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "@app/models/user";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators'

@Injectable({
    providedIn: "root"
})
export class UserService {
    private baseUrl = "";

    private userSubject = new BehaviorSubject<User | undefined>(undefined);
    private userObservable = this.userSubject.asObservable();

    constructor(private httpClient: HttpClient) {
        this.baseUrl = localStorage.getItem("userBaseUrl") || ""
    }

    public getUserObservable(): Observable<User | undefined> {
        return this.userObservable;
    }

    public getUser(): User | undefined {
        return this.checkAndGetValue();
    }

    private checkAndGetValue() {
        if (!this.userSubject.getValue() && (sessionStorage.getItem('user') && sessionStorage.getItem('user') != 'null')) {
            const user = JSON.parse(sessionStorage.getItem('user') as string);
            this.userSubject.next(user)
            return user;
        }
        return this.userSubject.getValue();
    }

    public loginUser(userName: string) {
        return this.httpClient.get(`${this.baseUrl}/user?userName=${userName}`).pipe(map(user => {
            const userToStore = {...user as User, isAuthenticated: true};
            this.userSubject.next(userToStore)
            sessionStorage.setItem('user', JSON.stringify(userToStore))
            return this.userSubject.getValue()
        }))
    }

    public getUsers(): Observable<User[]> {
        return this.httpClient.get(`${this.baseUrl}/users`).pipe(map(users => users as User[]))
    }
}