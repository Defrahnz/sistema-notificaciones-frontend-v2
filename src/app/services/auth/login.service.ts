import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUsuarioLoginOn:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  currentUsuarioData: BehaviorSubject<String>=new BehaviorSubject<String>("");

  constructor(private http:HttpClient) {
    this.currentUsuarioLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUsuarioData=new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
   }

  login(credentials:LoginRequest): Observable<any>{
    return this.http.post<any>(environment.urlHost+"auth/login",credentials).pipe(
      tap((usuarioData) => {
        sessionStorage.setItem("token", usuarioData.token);
        this.currentUsuarioData.next(usuarioData.token);
        this.currentUsuarioLoginOn.next(true);
      }),
      map((usuarioData)=>usuarioData.token),
      catchError(this.handleError)
    ) 
  }

  logout():void{
    sessionStorage.removeItem("token");
    this.currentUsuarioLoginOn.next(false);
  }

  private handleError(error:HttpErrorResponse){
    if(error.status==0){
      console.error('Se ha producido un error ', error.error);
    }else{
      console.error('Se retornó el código de estado ', error);
    }

    return throwError(()=> new Error('Algo fallo. Intenta nuevamente'))
  }

  get usuarioData():Observable<String>{
    return this.currentUsuarioData.asObservable();
  }

  get usuarioLoginOn():Observable<boolean>{
    return this.currentUsuarioLoginOn.asObservable();
  }
}
