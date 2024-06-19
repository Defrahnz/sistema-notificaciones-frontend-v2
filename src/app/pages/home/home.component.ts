import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { Usuario } from 'src/app/services/auth/usuario';
import { ModuloService } from 'src/app/services/modulo/modulo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  userLoginOn:boolean=false;
  usuarioData?:Usuario;
  modulos:any[]=[];
  constructor(private loginService:LoginService, private moduloService:ModuloService){}
  ngOnInit(): void {
    this.moduloService.obtenerModulosActivos().subscribe(
      (data:any)=>{
        this.modulos=data;
      },
      error=>{
        console.error("Ocurrió un error al obtener los módulos")
      }
    )
    this.loginService.currentUsuarioLoginOn.subscribe({
      next:(usuarioLoginOn)=>{
        this.userLoginOn=usuarioLoginOn;
      }
    });
  }
  

}
