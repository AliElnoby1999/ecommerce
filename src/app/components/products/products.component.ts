import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WhishlistService } from 'src/app/shared/services/whishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  constructor( private _EcomdataService:EcomdataService , private _CartService:CartService,private _toastr:ToastrService,
    private _WhishlistService:WhishlistService
  ){}

  searchTerm:string='';
addCartbrg(id:string):void{
  this._CartService.addtoCart(id).subscribe({
    next: response => {
     // console.log(response);
     this._CartService.cartNumber.next(response.numOfCartItems);
      this._toastr.success(response.message,'Fresh Cart');
    },
    error: err => console.error(err)
  })
}

products:Product[]=[];
categories:any[]=[];
wishlistData:string[]=[];
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this._EcomdataService.getallproducts().subscribe( {
    next: (response) => {
   this.products=response.data
    },
    error: (err) => console.error(err)
    
  });

  this._WhishlistService.getWhishlist().subscribe({
    next: (response) => {
      this.wishlistData=response.data;
      const newData= response.data.map((item:any)=>item._id);
      this.wishlistData=newData;
    },
    error:(err)=>console.error(err)
  });


}



addfav(prodId:string|undefined):void{

  this._WhishlistService.addToWhishlist(prodId).subscribe({

    next:(response)=>{
      console.log(response);
      this._toastr.success(response.message);
      this.wishlistData=response.data;
      this._WhishlistService.whishNumber.next(response.data.length)
    }

  })
}

removeFav(prodId:string|undefined):void{

  this._WhishlistService.deleteFromWhishlist(prodId).subscribe({
    next:(response)=>{
      console.log(response);
      this._toastr.success(response.message);
      this.wishlistData=response.data;
    }
});
}

}
