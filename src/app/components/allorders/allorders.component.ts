import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent  implements OnInit{

  constructor(private _CartService:CartService,private _AuthService:AuthService){}

  cartproducts: any =  {} ;
  ngOnInit(): void {
    this._CartService.getUserOrder().subscribe({
      next:(respons)=>{
        this.cartproducts = respons ;
      },
      error:(err)=>{}
    })
  }
  getallorders(){

  }

}
