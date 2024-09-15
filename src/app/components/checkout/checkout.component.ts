import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor (private _FormBuilder:FormBuilder,private _ActivatedRoute:ActivatedRoute,private _CartService:CartService) {}
  checkoutForm = this._FormBuilder.group({
    "details": [''],
    "phone": [''],
    "city": ['']
  })

  cartId:any='';

  handleform():void{

    // implement your logic to process the form data here
   this._CartService.checkout(this.cartId,this.checkoutForm.value).subscribe({
     next: response => {
       if(response.status=="success"){
        window.open(response.session.url,'_self')
       }
     },
     error: err => console.error(err)
   })
  }

ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: params => {
        this.cartId=params.get('id')
        //let idorder:any=   params.get('id')
        //api call to fetch the order details
        //this.orderDetails = your_api_call(idorder)
      },
      error: err => console.error(err)
    })
}


}
