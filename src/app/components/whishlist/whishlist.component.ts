import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { WhishlistService } from 'src/app/shared/services/whishlist.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent implements OnInit {
  products:Product[]=[];
  wishlistData:any[]=[];
constructor(private _WhishlistService:WhishlistService,
  private _ToastrService:ToastrService,private _CartService:CartService
){}
  ngOnInit(): void {
      this._WhishlistService.getWhishlist().subscribe({
        next:(response)=>{
          if (response.status === 'success') {
            this.products=response.data;
            //console.log(response)
           const newData= response.data.map((Product:any)=>Product._id);
           this.wishlistData=newData;
           this._WhishlistService.whishNumber.next(response.data.length);
           
          }
         
        },
        error:(error)=>{
          console.log(error)
        }
      });


      
  }

  addCartbrg(id:string):void{
    this._CartService.addtoCart(id).subscribe({
      next: response => {
       // console.log(response);
       this._CartService.cartNumber.next(response.numOfCartItems);
        this._ToastrService.success(response.message,'Fresh Cart');
      },
      error: error => console.error(error)
    })
  }
  addfav(prodId:string|undefined):void{

    this._WhishlistService.addToWhishlist(prodId).subscribe({
  
      next:(response)=>{
       // console.log(response);
        this._ToastrService.success(response.message);
        this.wishlistData=response.data;
      
      }
  
    })
  }
  
  removeFav(prodId:string|undefined):void{
  
    this._WhishlistService.deleteFromWhishlist(prodId).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success(response.message);
        this.wishlistData=response.data;

        // this.wishlistData = this.wishlistData.filter((item) =>
        //   response.data.includes(item._id)
        // );

        // this._WhishlistService.whishNumber.next(response.data.length);



      }
  });
  }








}
