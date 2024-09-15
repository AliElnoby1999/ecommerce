import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {

  constructor(private _HttpClient:HttpClient) { }
  whishNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  whishList: BehaviorSubject<any> = new BehaviorSubject([]);
  addToWhishlist(productId:string|undefined): Observable<any>{
   return   this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId});

  }

getWhishlist():Observable<any>{
return  this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`);
}


deleteFromWhishlist(productId:string|undefined):Observable<any>{
return   this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`);

}








  }
