import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient,private _Router:Router) { }
userData:any;
logout():void{
  localStorage.removeItem('token');
this._Router.navigate(['/login']);
  //login

}
  decodeUserData(){

   if( localStorage.getItem('token')!= null){
let encode:any =localStorage.getItem('token');
let decodeToken =    jwtDecode(encode)
this.userData=decodeToken;
   }
  }

  setRegister(userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,userData);
  }

  setlogin(userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,userData);
  }


  forgetpassword(email:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,email)
  }


  verifyRestCode(resetCode:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',resetCode)
  }

  resetPassword(newdata:object):Observable<any>{
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',newdata)
  }

  setChangePassword(userPass: Object):Observable<any>{

    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,userPass);
  }




}
