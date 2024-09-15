import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {

  constructor(private _Router:Router){}

  navgateBack(): void {
    this._Router.navigate(['/home']); // Navigate to home page on button click
  }
}
