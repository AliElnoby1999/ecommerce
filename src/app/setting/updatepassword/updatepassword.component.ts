import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent {
  constructor(
    private _AuthService: AuthService,
    private _fb: FormBuilder,
    private _Router: Router
  ) {}

  passwordShow: boolean = false;
  curentPasswordShow: boolean = false;
  rePasswordShow: boolean = false;
  updateForm!: FormGroup;
  errMsg: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.updateForm = this._fb.group(
      {
        currentPassword: [
          '',
          [Validators.required, Validators.pattern(/^\w{6,}$/)],
        ],
        password: ['', [Validators.required, Validators.pattern(/^\w{6,}$/)]],
        rePassword: [''],
      },
      { validator: [this.checkPassword] } as FormControlOptions  
    );
  }

  checkPassword(group: AbstractControl): void {
    const password = group.get('password');
    const rePassword = group.get('rePassword');

    if (rePassword?.value === '') {
      rePassword?.setErrors({ required: true });
    } else if (rePassword?.value !== password?.value) {
      rePassword?.setErrors({ mismatch: true });
    }
  }

  public get f(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.updateForm.controls;
  }

  handleUpdate(): void {
    this.isLoading = true;
    if (this.updateForm.valid) {
      this._AuthService.setChangePassword(this.updateForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            this.isLoading = false;
            console.log(response);
            localStorage.setItem('_token', response.token);
            this.updateForm.reset();
            this.errMsg = response.message;
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errMsg = err.error.message;
        },
      });
    }
  }
}
