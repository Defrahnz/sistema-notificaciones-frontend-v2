import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm=this.formBuilder.group({
    email:['dvaldivia98@hotmail.com',[Validators.required,Validators.email]],
    password:['',Validators.required]
  })
  constructor(private formBuilder:FormBuilder, private toastr:ToastrService, private router:Router){}
  ngOnInit(): void{}

  get email(){
    return this.loginForm.controls.email;
  }

  get password(){
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
      console.log("Se ha llamado al servicio de Login") 
      this.toastr.success('Te has logeado correctamente','Éxito',{
        timeOut:1000,
      });
      this.router.navigateByUrl('/inicio');
      this.loginForm.reset();
    }else{
      this.toastr.error( 'Ha habido un error al ingresar los datos','Error',{
        timeOut:1000,
      })
      this.loginForm.markAllAsTouched();
    }
  }
}
