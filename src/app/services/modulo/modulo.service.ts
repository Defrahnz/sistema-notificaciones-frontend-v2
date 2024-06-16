import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Modulo } from './modulo';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  constructor(private http:HttpClient) { }

  obtenerModulosActivos():Observable<Modulo>{
    return this.http.get<Modulo>(environment.urlApi+"modulo/activos").pipe(
      catchError(this.handleError)
    );
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
