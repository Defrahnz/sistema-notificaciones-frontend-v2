import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Usuario } from '../auth/usuario';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuario(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(environment.urlApi+"usuario/"+id).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status==0){
      console.error("Se ha producido un error ->"+ error.error);
    }else{
      console.error("El backend retornó el siguiente código -> "+error.status,error.error);
    }
    return throwError(()=>new Error ('Algo falló, Inténtelo nuevamente en unos segundos.'));
  }
}
