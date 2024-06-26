import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenKey:string = 'app_token';
    isAuthenticated = true;
    private apiBaseUrl = 'https://localhost:7050/api/'; // Replace with your API endpoint

    constructor(private http: HttpClient
        ,private router: Router
    ) { }

    store(content:string) {
        localStorage.setItem(this.tokenKey,  content);
    }

    getToken(){
        return localStorage.getItem(this.tokenKey);
    }

    clearToken() {
        localStorage.removeItem(this.tokenKey);
    }

    login(user: any): Observable<any> {
        const api='Authenticate/login';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(this.apiBaseUrl+api, user, { headers });
    }

    goToLogin(){
        this.router.navigate(['/login']);
    }

    checkAuthentication(): boolean {
        return this.getToken()!=null && this.getToken()!='';
     }
}