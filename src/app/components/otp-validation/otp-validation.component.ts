import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TurfBookingServiceService } from '../../services/turf-booking-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp-validation',
  imports: [CommonModule, FormsModule],
  templateUrl: './otp-validation.component.html',
  styleUrl: './otp-validation.component.scss',
})
export class OtpValidationComponent {
  otp: string[] = ['', '', '', '', '', ''];
  otpDigits = new Array(6);

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  @Output() otpValidated = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<void>();
  @Input() email!: string;

  constructor(
    private turfBookingService: TurfBookingServiceService,
    private toastr: ToastrService
  ) {}

  onInput(index: number) {
    if (this.otp[index].length > 0 && index < 5) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }

    if (this.otp.every((d) => d !== '')) {
      setTimeout(() => {
        const code = this.otp.join('');
        this.validateOtp(code);
      }, 0);
    }
  }

  onBackspace(index: number, event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];
    const isDigit = /^[0-9]$/.test(event.key);

    // Allow digit keys, navigation, and backspace
    if (!isDigit && !allowedKeys.includes(event.key)) {
      event.preventDefault();
      return;
    }
    if (event.key === 'Backspace' && this.otp[index] === '' && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  validateOtp(code: string) {
    // 🔁 Simulate API validation
    this.turfBookingService
      .validateOtp(this.email, parseInt(code, 10))
      .subscribe({
        next: (response) => {
        
            this.toastr.success('OTP validated successfully!');
            this.otpValidated.emit(); // Inform parent component
          }, error: (error: any) => {
          if (error.error.message === 'Invalid OTP') {
            this.toastr.error(error.error.message);
          } else {
            this.toastr.error('Something went wrong, Try again later');
          }
        },
      });
    // if (code === '123456') {
    //   this.otpValidated.emit(); // Inform parent
    // } else {
    //   alert('Invalid OTP');
    //   this.otp = ['', '', '', '', '', ''];
    //   console.log('this.otp', this.otp);
    //   this.otpInputs.first.nativeElement.focus();
    // }
  }

  close() {
    this.modalClosed.emit(); // Parent should hide this modal
  }
}
