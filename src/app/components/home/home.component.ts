import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WhishlistService } from 'src/app/shared/services/whishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  customOptions1: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
  items:1,
    nav: false
  }



  products:Product[]=[];
  categories:any[]=[];
  wishlistData:string[]=[];
ngOnInit(): void {
  
  this._EcomdataService.getallproducts().subscribe( {
    next: (response) => {
   this.products=response.data
    },
    error: (err) => console.error(err)
    
  });




//getcategories

this._EcomdataService.getallCategories().subscribe({
  next: (response) => {
    this.categories=response.data
     },
     error: (err) => console.error(err)
});

this._WhishlistService.getWhishlist().subscribe({
  next: (response) => {
    this.wishlistData=response.data;
    const newData= response.data.map((item:any)=>item._id);
    this.wishlistData=newData;
    this._WhishlistService.whishNumber.next(response.data.length)
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
