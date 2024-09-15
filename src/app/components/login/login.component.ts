import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

//input  ----prop-from-control
//inputs---fromGroup--<from></from>

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthService :AuthService,private _Router:Router,private _FormBuilder:FormBuilder ){}

  msgError:string='';
  isloading:boolean=false;
  passwordShow: boolean = false;
  curentPasswordShow: boolean = false;
  rePasswordShow: boolean = false;
  
    // loginForm:FormGroup = new FormGroup({
    //   email:new FormControl('',[Validators.required,Validators.email]),
    //   password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    // });
  
    loginForm:FormGroup=this._FormBuilder.group({
email:[null,[Validators.required,Validators.email]],
password:[null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]]
    })
  handleForm():void {
  
   if(this.loginForm.valid){
    this.isloading=true;
    this._AuthService.setlogin(this.loginForm.value).subscribe(
      {next:(response) => {
        if(response.message=='success'){
          localStorage.setItem('token',response.token);
          this._AuthService.decodeUserData();
          this.isloading=false;
          this._Router.navigate(['/home'])
        }
      },
      error:(err:HttpErrorResponse)=>{
        this.isloading=false;
        this.msgError=err.error.message
      }})
   }
   else{
    this.loginForm.markAllAsTouched();
   }
  
  }




}
