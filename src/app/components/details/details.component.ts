import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
constructor( private _ActivatedRoute:ActivatedRoute,private _EcomdataService:EcomdataService,private _CartService:CartService,private _toastr:ToastrService){}

productDetails:Product={} as Product;

addCartbrg(id:string):void{
  this._CartService.addtoCart(id).subscribe({
    next: response => {
     // console.log(response);
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




ngOnInit():void {

  //Add 'implements OnInit' to the class.
    this._ActivatedRoute.paramMap.subscribe({
      next: params => {
       
       let idproduct:any=   params.get('id')
      
       //api
     this._EcomdataService.getproductdetails(idproduct).subscribe(
      {
        next: response => {
          this.productDetails=response.data;
        },
        error: err => console.error(err)
      }
     );
      },
      error: err => console.error(err)
    })
}
}
