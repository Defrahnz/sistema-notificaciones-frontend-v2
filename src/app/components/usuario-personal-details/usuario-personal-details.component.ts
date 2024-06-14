import { Component } from '@angular/core';
import { Usuario } from 'src/app/services/auth/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-usuario-personal-details',
  templateUrl: './usuario-personal-details.component.html',
  styleUrls: ['./usuario-personal-details.component.css']
})
export class UsuarioPersonalDetailsComponent {
  errorMessage:string="";
  usuario?:Usuario;

  constructor(private usuarioService:UsuarioService){
    this.usuarioService.getUsuario(environment.userId).subscribe({
      next:(usuarioData)=>{
        this.usuario=usuarioData;
      },
      error:(errorData)=>{
        this.errorMessage=errorData;
      },
      complete:()=>{
        console.info("Todo OK");
      }
    })
  }

}
