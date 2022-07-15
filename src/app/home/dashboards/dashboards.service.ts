import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// ENV
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {
  
  private baseUrl = environment.serverUrl;

  constructor(private httpClient: HttpClient) {
  }

  getStaff(): Observable<Array<number>> {
    return this.httpClient.get<Array<number>>(`${this.baseUrl}/staff`);
  }

  getUsersLocation(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/location`);
  }

  getApts(): Observable<Array<number>> {
    return this.httpClient.get<Array<number>>(`${this.baseUrl}/apts`);
  }
}
