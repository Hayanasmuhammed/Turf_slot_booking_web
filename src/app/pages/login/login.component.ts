import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TurfBookingServiceService } from '../../services/turf-booking-service.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isLogin = true;
  authForm!: FormGroup;
  isSubmitted = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private turfBookingService: TurfBookingServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  switchMode(isLogin: boolean): void {
    this.isLogin = isLogin;
    this.authForm.reset();
    this.setValidators();
    this.isSubmitted = false;
  }

  initForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: [''],
      name: [''],
    });

    this.setValidators();
  }

  onSubmit(): void {
    console.log('errors', this.authForm.errors);

    this.isSubmitted = true;
    if (this.authForm.invalid) {
      return;
    }
    this.isLoading = true;
    const formData = this.authForm.value;
    if (this.isLogin) {
      console.log('Login', formData);
      this.turfBookingService.userLogin(formData).subscribe({
        next: (response: any) => {
          this.toastr.success('Login successful');
          this.isLoading = false;
        },
        error: (error: any) => {
          this.isLoading = false;
          if (error.error.message === 'Invalid email or password') {
            this.toastr.error(error.error.message);
          } else {
            this.toastr.error('Something went wrong, Try again later');
          }
        },
      });
    } else {
      this.turfBookingService.userSignup(formData).subscribe({
        next: (response: any) => {
          this.toastr.success('Signup successful');
          this.isLoading = false;
        },
        error: (error: any) => {
          if (error.error.message === 'Already registerd') {
            this.toastr.error(error.error.message);
          } else {
            this.toastr.error('Something went wrong, Try again later');
          }

          this.isLoading = false;
        },
      });
    }
  }

  setValidators(): void {
    if (this.isLogin) {
      this.authForm.get('name')?.clearValidators();
      this.authForm.get('confirmPassword')?.clearValidators();
      this.authForm.setValidators(null); // ✅ Correct way to clear group-level validators
    } else {
      this.authForm.get('name')?.setValidators([Validators.required]);
      this.authForm
        .get('confirmPassword')
        ?.setValidators([Validators.required]);

      this.authForm.setValidators(this.passwordMatchValidator); // ✅ Group validator
    }

    this.authForm.get('name')?.updateValueAndValidity();
    this.authForm.get('confirmPassword')?.updateValueAndValidity();
    this.authForm.updateValueAndValidity(); // ✅ Very important to apply new validator
  }

  passwordMatchValidator: ValidatorFn = (
    form: AbstractControl
  ): ValidationErrors | null => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}
