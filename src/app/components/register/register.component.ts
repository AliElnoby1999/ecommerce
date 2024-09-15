import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

//input  ----prop-from-control
//inputs---fromGroup--<from></from>
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

constructor(private _AuthService :AuthService,private _Router:Router){}


confirmPassword(grop:FormGroup): void{
  let password = grop.get('password');
   let repassword=grop.get('rePassword');

  if(repassword?.value==' '){
    repassword?.setErrors({required:true})
  }
  else  if(password?.value!==repassword?.value){
    repassword?.setErrors({notSame:true})
   }

}

msgError:string='';
isloading:boolean=false;
passwordShow: boolean = false;
  rePasswordShow: boolean = false;
  passwordShow2: boolean = false;
  rePasswordShow2: boolean = false;
  registerFrom:FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    rePassword:new FormControl(''),
    phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  },{validators: [this.confirmPassword] } as  FormControlOptions);

handleForm():void {

 if(this.registerFrom.valid){
  this.isloading=true;
  this._AuthService.setRegister(this.registerFrom.value).subscribe(
    {next:(response) => {
      if(response.message=='success'){
        this.isloading=false;
        this._Router.navigate(['/login'])
      }
    },
    error:(err:HttpErrorResponse)=>{
      this.isloading=false;
      this.msgError=err.error.message
    }})
 }

}


}
