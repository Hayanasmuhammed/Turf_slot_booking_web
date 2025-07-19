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

  constructor(
    private fb: FormBuilder,
    private turfBookingService: TurfBookingServiceService
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
    this.authForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: [''],
        name: [''],
      },
      { validators: this.isLogin ? null : this.passwordMatchValidator }
    );

    this.setValidators();
  }

  onSubmit(): void {
    this.isSubmitted = true;
    console.log('inside submit');
    if (this.authForm.invalid) {
      return;
    }

    const formData = this.authForm.value;
    if (this.isLogin) {
      console.log('Login', formData);
    } else {
      this.turfBookingService.signUpAUser(formData).subscribe({
        next: (response: any) => {
          // handle response here
        },
      });
    }
  }

  setValidators(): void {
    if (this.isLogin) {
      this.authForm.get('name')?.clearValidators();
      this.authForm.get('confirmPassword')?.clearValidators();
      this.authForm.clearValidators(); // Remove group-level validator
    } else {
      this.authForm.get('name')?.setValidators([Validators.required]);
      this.authForm
        .get('confirmPassword')
        ?.setValidators([Validators.required]);
      this.authForm.setValidators(this.passwordMatchValidator as ValidatorFn);
    }

    this.authForm.get('name')?.updateValueAndValidity();
    this.authForm.get('confirmPassword')?.updateValueAndValidity();
    this.authForm.updateValueAndValidity();
  }

  passwordMatchValidator: ValidatorFn = (
    form: AbstractControl
  ): ValidationErrors | null => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}
