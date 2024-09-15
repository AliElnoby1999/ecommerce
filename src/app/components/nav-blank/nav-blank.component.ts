import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { WhishlistService } from 'src/app/shared/services/whishlist.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit {

  constructor(private _AuthService:AuthService,private _CartService:CartService , private _WhishlistService:WhishlistService){}


  cartcount:number=0;
  whishItemNumber: number = 0;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.cartcount=data;
      },
      error: (error) => {
        console.error(error);
      }
    });

this._WhishlistService.whishNumber.subscribe({
  next: (data) => {
    this.whishItemNumber=data;
  },
  error: (error) => {
    console.error(error);
  }
});

  this._CartService.getloggeduser().subscribe({

    next: (response) => {
      this._CartService.cartNumber.next(response.numOfCartItems)
    }

  });

  this._WhishlistService.getWhishlist().subscribe({
    next: (response) => {
      this._WhishlistService.whishNumber.next(response.data.length)
    }
  })

    
  }

  logoutUser():void{
 this._AuthService.logout();
  }

  


}
