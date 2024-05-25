import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(credentials:LoginRequest): Observable<Usuario>{
    return this.http.get<Usuario>('././assets/data.json')
  }
}
