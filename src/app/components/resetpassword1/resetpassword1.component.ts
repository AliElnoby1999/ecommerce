import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-resetpassword1',
  templateUrl: './resetpassword1.component.html',
  styleUrls: ['./resetpassword1.component.css']
})
export class Resetpassword1Component {
  constructor(private _FormBuilder:FormBuilder,
    private _AuthService:AuthService,private _ToastrService:ToastrService,private _Router:Router){}

    resetpasswordform:FormGroup = this._FormBuilder.group({
      email:['',[Validators.required,Validators.email]],
  
      newPassword:['',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]]
    })
    handelform():void{

      this._AuthService.resetPassword(this.resetpasswordform.value).subscribe({
        next:(response) => {
          this._ToastrService.success('Password Reset Successfully');
       
        
          localStorage.removeItem('token')
          
          localStorage.setItem('token', response.token)
  
          this._AuthService.decodeUserData()
  
          this._Router.navigate(['/login'])
  

        },
        error:(err) => {
          this._ToastrService.error('Failed to Reset Password');
        }
      })
}

}
