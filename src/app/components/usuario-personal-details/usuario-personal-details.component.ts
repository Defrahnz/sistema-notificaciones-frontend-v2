import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/auth/login.service';
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
  usuarioLoginOn:boolean=false;
  editMode:boolean=false;

  editarForm=this.formBuilder.group({
    id:[''],
    nombre:['',Validators.required],
    apellidop:['',Validators.required],
    apellidom:[''],
    calle:['',Validators.required],
    numinterior:[''],
    numexterior:['',Validators.required],
    colonia:['',Validators.required],
    ciudad:['',Validators.required],
    codigopostal:['',Validators.required],
    telefonocasa:['',Validators.required],
    telefonomovil:['',Validators.required]

  })

  constructor(private usuarioService:UsuarioService, private formBuilder:FormBuilder, private loginService:LoginService, private toastr:ToastrService){
    this.usuarioService.getUsuario(environment.userId).subscribe({
      next:(usuarioData)=>{
        this.usuario=usuarioData;
        this.editarForm.controls.id.setValue(usuarioData.id.toString());
        this.editarForm.controls.nombre.setValue(usuarioData.nombre);
        this.editarForm.controls.apellidop.setValue(usuarioData.apellidop);
        this.editarForm.controls.apellidom.setValue(usuarioData.apellidom);
        this.editarForm.controls.calle.setValue(usuarioData.calle);
        this.editarForm.controls.numinterior.setValue(usuarioData.numinterior);
        this.editarForm.controls.numexterior.setValue(usuarioData.numexterior);
        this.editarForm.controls.colonia.setValue(usuarioData.colonia);
        this.editarForm.controls.ciudad.setValue(usuarioData.ciudad);
        this.editarForm.controls.codigopostal.setValue(usuarioData.codigopostal);
        this.editarForm.controls.telefonocasa.setValue(usuarioData.telefonocasa);
        this.editarForm.controls.telefonomovil.setValue(usuarioData.telefonomovil);
      },
      error:(errorData)=>{
        this.errorMessage=errorData;
      },
      complete:()=>{
        console.info("Todo OK");
      }
    })
    this.loginService.usuarioLoginOn.subscribe({
      next:(usuarioLoginOn)=>{
        this.usuarioLoginOn=usuarioLoginOn;
      }
    })
  }
  get nombre(){
    return this.editarForm.controls.nombre;
  }

  get apellidop(){
    return this.editarForm.controls.apellidop;
  }
  get apellidom(){
    return this.editarForm.controls.apellidom;
  }
  get calle(){
    return this.editarForm.controls.calle;
  }
  get numinterior(){
    return this.editarForm.controls.numinterior;
  }
  get numexterior(){
    return this.editarForm.controls.numexterior;
  }
  get colonia(){
    return this.editarForm.controls.colonia;
  }
  get ciudad(){
    return this.editarForm.controls.ciudad;
  }
  get codigopostal(){
    return this.editarForm.controls.codigopostal;
  }
  get telefonocasa(){
    return this.editarForm.controls.telefonocasa;
  }
  get telefonomovil(){
    return this.editarForm.controls.telefonomovil;
  }

  savePersonalDetailsData(){
    if(this.editarForm.valid){
      this.usuarioService.updateUsuario(this.editarForm.value as unknown as Usuario).subscribe({
        next:()=>{
          this.toastr.success("Información actualizada correctamente");
          this.editMode=false;
          this.usuario=this.editarForm.value as unknown as Usuario;
        },
        error:(errorData)=> console.error(errorData)
      })
    }
  }
}
