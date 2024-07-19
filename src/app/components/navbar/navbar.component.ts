import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { Usuario } from 'src/app/services/auth/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userLoginOn:boolean=false;
  usuarioData?:Usuario;
  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.loginService.currentUsuarioLoginOn.subscribe({
      next:(usuarioLoginOn)=>{
        this.userLoginOn=usuarioLoginOn;
      }
    });
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}