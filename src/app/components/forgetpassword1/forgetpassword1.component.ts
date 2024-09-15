import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgetpassword1',
  templateUrl: './forgetpassword1.component.html',
  styleUrls: ['./forgetpassword1.component.css']
})
export class Forgetpassword1Component {
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
          this._Router.navigate(['/verify'])
  
          
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err)
  
          this._ToastrService.warning( `${err.error.message}`,`${err.error.statusMsg}` )
  
        }
      });
    }
// end
}
