import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
constructor(private _CartService:CartService){}


removeCartItem(id:string):void{
  this._CartService.deleteitems(id).subscribe(
    {
      next: response => {
         
           this._CartService.cartNumber.next(response.numOfCartItems);
           this.cartItems= response.data;
      },
      error: error => {
        console.error(error);
      }
    }
  )
}

changeCount(id:string,count:number):void{
if(count >0){
  this._CartService.updateItems(id,count).subscribe({
    next: response => {
      this.cartItems= response.data;
    },
    error: error => {
      console.error(error);
    }
  })
}
}

cartItems:any = {};
ngOnInit(): void {
    this._CartService.getloggeduser().subscribe({
      next: response => {
       this.cartItems= response.data;
       ;
      },
      error: error => {
        console.error(error);
      }
    })
}

}
