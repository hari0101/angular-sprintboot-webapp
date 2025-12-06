import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = 'http://localhost:8081/api';

    constructor(private http: HttpClient) { }

    getHealth(): Observable<any> {
        return this.http.get(`${this.baseUrl}/health`);
    }

    sendMessage(message: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/chat`, { message });
    }
}
