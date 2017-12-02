import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';

@Injectable()
export class DashboardService {

  api_url = 'http://localhost:8080';
  dashboardUrl = `${this.api_url}/api/dashborad`;

  constructor(
    private http: HttpClient
  ) { }

}
