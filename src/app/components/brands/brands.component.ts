import { Component } from '@angular/core';
import { Brand } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {

  constructor(private _EcomdataService:EcomdataService){}

  Brand:Brand[] = [];

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  

  this._EcomdataService.getallBarnds().subscribe({

    next: (response) => {
      this.Brand = response.data;
    },
    error:(err)=>console.error(err)

  })

}



}
