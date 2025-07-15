import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TurfBookingServiceService } from '../../services/turf-booking-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  constructor(private turfBookingService: TurfBookingServiceService) {}

  ngOnInit(): void {}

  onSignup(signUpForm: any) {
    console.log('signUpForm', signUpForm.value);
    
    this.turfBookingService.signUpAUser(signUpForm.value).subscribe({
      next: (response: any) => {
        // handle response here
      },
    });
  }
}
