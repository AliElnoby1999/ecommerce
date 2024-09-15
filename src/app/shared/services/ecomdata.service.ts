
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcomdataService {

  constructor( private _HttpClient:HttpClient ) { }

  getallproducts(): Observable<any>{
   return   this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }

getproductdetails(id:string): Observable<any>{
   return   this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  
}


getallCategories():Observable<any>{
return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}


getallBarnds():Observable<any>{
  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands`)
}




}
