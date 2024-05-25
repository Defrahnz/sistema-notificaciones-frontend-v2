import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(credentials:LoginRequest): Observable<Usuario>{
    return this.http.get<Usuario>('././assets/data.json').pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status==0){
      console.error('Se ha producido un error ', error.error);
    }else{
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }

    return throwError(()=> new Error('Algo fallo. Intenta nuevamente'))
  }
}
