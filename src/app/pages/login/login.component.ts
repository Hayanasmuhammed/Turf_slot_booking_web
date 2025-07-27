import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TurfBookingServiceService } from '../../services/turf-booking-service.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OtpValidationComponent } from '../../components/otp-validation/otp-validation.component';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormsModule,OtpValidationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isLogin = true;
  authForm!: FormGroup;
  isSubmitted: any = {};
  isLoading: any = {};
  isForgotPassword = false;
  otpForm!: FormGroup;
  // isOtpSent: boolean = false;
  changePasswordForm!: FormGroup;
  otp: string[] = ['', '', '', '', '', ''];
  otpDigits = new Array(6);
  isOtpValid = false;
  showOtpModal = false;
  showChangePassword = false;

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor(
    private fb: FormBuilder,
    private turfBookingService: TurfBookingServiceService,
    private toastr: ToastrService,
   // private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  switchMode(isLogin: boolean): void {
    this.isLogin = isLogin;
    this.authForm.reset();
    this.setValidators();
    this.isSubmitted['loginOrSignUp'] = false;
  }

  initForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: [''],
      name: [''],
    });

    this.otpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.changePasswordForm = this.fb.group({
      otp: ['', [Validators.required, Validators.maxLength(6)]],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    });

    this.setValidators();
  }

  onSubmit(): void {
    console.log('errors', this.authForm.errors);

    this.isSubmitted['loginOrSignUp'] = true;
    if (this.authForm.invalid) {
      return;
    }
    this.isLoading['loginOrSignUp'] = true;
    const formData = this.authForm.value;
    if (this.isLogin) {
      console.log('Login', formData);
      this.turfBookingService.userLogin(formData).subscribe({
        next: (response: any) => {
          this.toastr.success('Login successful');
          this.isLoading['loginOrSignUp'] = false;
        },
        error: (error: any) => {
          this.isLoading['loginOrSignUp'] = false;
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
          this.isLoading['loginOrSignUp'] = false;
        },
        error: (error: any) => {
          if (error.error.message === 'Already registerd') {
            this.toastr.error(error.error.message);
          } else {
            this.toastr.error('Something went wrong, Try again later');
          }

          this.isLoading['loginOrSignUp'] = false;
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

  // onSubmitOtp() {}

  onSubmitChangePassword() {}

  cancelForgotPassword(): void {}

  onSubmitOtp() {
    this.isSubmitted['otp'] = true;
    if (this.otpForm.invalid) {
      return;
    }

    //this.isLoading['otp'] = true;
    this.showOtpModal = true;
    return;

    this.turfBookingService
      .sendOtp(this.otpForm.get('email')?.value)
      .subscribe({
        next: (response: any) => {
          this.toastr.success('OTP sent successfully');
          this.isLoading['otp'] = false;
          this.showOtpModal = true;

          
        },
        error: (error: any) => {
          if (error.error.message === 'Not a registered user') {
            this.toastr.error(error.error.message);
          } else {
            this.toastr.error('Something went wrong, Try again later');
          }
          this.isLoading['otp'] = false;
        },
      });
  }

  onInput(index: number) {
    const input = this.otpInputs.toArray()[index].nativeElement;
    if (this.otp[index].length > 0 && index < 5) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }

    if (this.otp.every((digit) => digit !== '')) {
      const otpCode = this.otp.join('');
      // this.validateOtp(otpCode);
    }
  }

  onBackspace(index: number, event: KeyboardEvent) {
    if (event.key === 'Backspace' && this.otp[index] === '' && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  onOtpValidated() {
    this.showChangePassword = true;
    this.showOtpModal = false;
  }
}
