import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { Usuario } from 'src/app/services/auth/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  userLoginOn:boolean=false;
  usuarioData?:Usuario;
  constructor(private loginService:LoginService){}
  ngOnInit(): void {
    this.loginService.currentUsuarioLoginOn.subscribe({
      next:(usuarioLoginOn)=>{
        this.userLoginOn=usuarioLoginOn;
      }
    });

    this.loginService.currentUsuarioData.subscribe({
      next:(usuarioData)=>{
        this.usuarioData=usuarioData;
      }
    })
  }
  

}
