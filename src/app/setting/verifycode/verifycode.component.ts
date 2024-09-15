import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verifycode',
  templateUrl: './verifycode.component.html',
  styleUrls: ['./verifycode.component.css']
})
export class VerifycodeComponent {

  constructor(private _FormBuilder:FormBuilder , 
    private _AuthService:AuthService ,private _ToastrService:ToastrService ,private _Router: Router){}

  resetCodeform:FormGroup = this._FormBuilder.group({
    resetCode:['',[Validators.required]]
  });

  handelform():void{

    this._AuthService.verifyRestCode(this.resetCodeform.value).subscribe({
      next:(response) => {
        if(response.message=='success'){
          this._ToastrService.success('Reset code is valid','Success');
          this._Router.navigate(['setting/resetpassword'])
        }
        else{
          this._ToastrService.error('Reset code is not valid','Error');
        }
      },
      error:(err)=> {
        this._ToastrService.error('An error occurred','Error');
      }
 
    });

  }



}
