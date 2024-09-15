import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private _HttpClient:HttpClient , private _AuthService:AuthService ) { }

//headers:any={token:localStorage.getItem('token')};

cartNumber:BehaviorSubject<number>= new BehaviorSubject(0)
whishNumber:BehaviorSubject<number>=new BehaviorSubject(0)
  addtoCart(productId:string): Observable<any>{
    // api endpoint to add product to cart

    return   this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
      { "productId": productId}
    
    )
   }


   getloggeduser():Observable<any>{
    return this._HttpClient.get( `https://ecommerce.routemisr.com/api/v1/cart`
    )
   }


   deleteitems(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`
    )
   }

   updateItems(idproduct:string,newcount:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${idproduct}`,
      {count: newcount})
   }


   checkout(CartId:string,userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:4200`,
      {
        shippingAddress:userData
    })
   }

   userData:any;
   getUserOrder():Observable<any>{
 
    if( localStorage.getItem('token')!= null){
      let encode:any =localStorage.getItem('token');
      let decodeToken =    jwtDecode(encode)
      this.userData=decodeToken;
         }
     return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${this.userData.id}`)
   }

  

}
