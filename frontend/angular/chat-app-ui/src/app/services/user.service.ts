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

    constructor(private httpClient: HttpClient) {
        this.baseUrl = localStorage.getItem("userBaseUrl") || ""
    }

    public getUser(): User | undefined {
        return this.checkAndGetValue();
    }

    private checkAndGetValue() {
        if (!this.userSubject.getValue() && (sessionStorage.getItem('user') || sessionStorage.getItem('user') != 'null')) {
            this.userSubject.next(JSON.parse(localStorage.getItem('user') as string))
        }
        return this.userSubject.getValue();
    }

    public loginUser(userId: string) {
        return this.httpClient.get(`${this.baseUrl}/user?userId=${userId}`).pipe(map(user => {
            this.userSubject.next({...user as User, isAuthenticated: true})
            sessionStorage.setItem('user', JSON.stringify(user))
            return this.userSubject.getValue()
        }))
    }

    public getUsers(): Observable<User[]> {
        return this.httpClient.get(`${this.baseUrl}/users`).pipe(map(users => users as User[]))
    }
}