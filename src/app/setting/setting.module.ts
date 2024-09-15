import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { ForgetepasswordComponent } from './forgetepassword/forgetepassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { VerifycodeComponent } from './verifycode/verifycode.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    UpdatepasswordComponent,
    ForgetepasswordComponent,
    ResetpasswordComponent,
    VerifycodeComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ]
})
export class SettingModule { }
