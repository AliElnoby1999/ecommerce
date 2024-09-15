import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgetepassword',
  templateUrl: './forgetepassword.component.html',
  styleUrls: ['./forgetepassword.component.css']
})
export class ForgetepasswordComponent {
  constructor(private _FormBuilder:FormBuilder , 
    private _AuthService:AuthService ,private _ToastrService:ToastrService ,private _Router: Router){}

    forgetform:FormGroup = this._FormBuilder.group({
      email:['',[Validators.required,Validators.email]]
    });

    handelform():void{
      console.log(this.forgetform.value)
      this._AuthService.forgetpassword(this.forgetform.value).subscribe({
  
        next:(respons)=>{
  
          this._ToastrService.success(`${respons.message}` , `${respons.statusMsg}`)
          this._Router.navigate(['/verify1'])
  
          
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err)
  
          this._ToastrService.warning( `${err.error.message}`,`${err.error.statusMsg}` )
  
        }
      });
    }
// end
}
