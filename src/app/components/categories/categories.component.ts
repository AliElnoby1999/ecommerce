import { Component } from '@angular/core';
import { Category } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  constructor(private _EcomdataService:EcomdataService){}
  categories:Category[]=[];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this._EcomdataService.getallCategories().subscribe({
      next:(response)=>{
        this.categories=response.data
      },
      error:(err)=>console.error(err)
    })



  }


}
