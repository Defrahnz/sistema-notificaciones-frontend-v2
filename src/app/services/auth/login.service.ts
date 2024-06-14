import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUsuarioLoginOn:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  currentUsuarioData: BehaviorSubject<Usuario>=new BehaviorSubject<Usuario>({id:0,username:''});

  constructor(private http:HttpClient) { }

  login(credentials:LoginRequest): Observable<Usuario>{
    return this.http.get<Usuario>('././assets/data.json').pipe(
      tap(usuarioData => {
        this.currentUsuarioData.next(usuarioData);
        this.currentUsuarioLoginOn.next(true);
      }),
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

  get usuarioData():Observable<Usuario>{
    return this.currentUsuarioData.asObservable();
  }

  get usuarioLoginOn():Observable<boolean>{
    return this.currentUsuarioLoginOn.asObservable();
  }
}
